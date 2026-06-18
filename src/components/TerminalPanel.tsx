'use client';

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { Folder, RotateCcw, Maximize2, Copy, Check, Terminal as TerminalIcon } from 'lucide-react';

export interface TerminalHandle {
  runCommand: (cmd: string) => void;
  clear: () => void;
  reset: () => void;
}

interface TerminalPanelProps {
  workingDir?: string;
  venv?: string;
  branch?: string;
  files?: { path: string; type: 'file' | 'dir' }[];
  onCommandRun?: (cmd: string, output: string) => void;
  starterFiles?: { path: string; content: string }[];
}

// In-memory virtual filesystem
class VirtualFS {
  files: Map<string, string> = new Map();
  dirs: Set<string> = new Set(['/', '/home', '/home/user', '/home/user/project']);

  constructor() {
    this.dirs.add('/home/user/project/src');
    this.dirs.add('/home/user/project/tests');
    this.files.set('/home/user/project/src/main.py', 'print("Hello, World!")');
    this.files.set('/home/user/project/pyproject.toml', '[project]\nname = "myapp"\nversion = "0.1.0"');
    this.files.set('/home/user/project/README.md', '# My App');
    this.files.set('/home/user/project/.gitignore', '.venv/\n__pycache__/');
  }

  writeFile(path: string, content: string) {
    this.files.set(path, content);
    const dir = path.substring(0, path.lastIndexOf('/'));
    this.dirs.add(dir);
  }

  readFile(path: string): string | null {
    return this.files.get(path) ?? null;
  }

  exists(path: string): boolean {
    return this.files.has(path) || this.dirs.has(path);
  }

  listFiles(dir: string): string[] {
    const result: string[] = [];
    const prefix = dir.endsWith('/') ? dir : dir + '/';
    
    for (const filepath of this.files.keys()) {
      if (filepath.startsWith(prefix)) {
        const rest = filepath.substring(prefix.length);
        if (!rest.includes('/')) {
          result.push(rest);
        }
      }
    }
    for (const dirpath of this.dirs) {
      if (dirpath.startsWith(prefix)) {
        const rest = dirpath.substring(prefix.length);
        if (rest && !rest.includes('/')) {
          result.push(rest + '/');
        }
      }
    }
    return result.sort();
  }
}

// Simple Python expression evaluator (handles basic operations)
function evaluatePython(code: string): string {
  const lines = code.trim().split('\n');
  const output: string[] = [];
  const vars: Record<string, any> = {};

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    try {
      // print() statement
      const printMatch = trimmed.match(/^print\((.*)\)$/);
      if (printMatch) {
        let expr = printMatch[1].trim();
        // Handle f-strings
        if (expr.startsWith('f"') || expr.startsWith("f'")) {
          const fstr = expr.slice(2, -1);
          let result = fstr.replace(/\{([^}]+)\}/g, (_, expr) => {
            try { return String(eval(expr.replace(/"/g, '\\"'))); }
            catch { return `{${expr}}`; }
          });
          output.push(result);
        } else if (expr.startsWith('"') || expr.startsWith("'")) {
          output.push(expr.slice(1, -1));
        } else {
          try {
            const val = eval(expr);
            output.push(String(val));
          } catch {
            output.push(String(expr));
          }
        }
        continue;
      }

      // Variable assignment
      const assignMatch = trimmed.match(/^(\w+)\s*=\s*(.*)$/);
      if (assignMatch) {
        const name = assignMatch[1];
        let val = assignMatch[2];
        try { vars[name] = eval(val); }
        catch { vars[name] = val; }
        continue;
      }

      // Bare expression (like in REPL)
      try {
        const val = eval(trimmed);
        if (val !== undefined) output.push(String(val));
      } catch {
        // Ignore syntax errors for complex code
      }
    } catch (e) {
      // Continue on error
    }
  }

  return output.join('\n');
}

export const TerminalPanel = forwardRef<TerminalHandle, TerminalPanelProps>(function TerminalPanel(
  { workingDir = '~/project', venv = '.venv', branch = 'main', onCommandRun },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitRef = useRef<FitAddon | null>(null);
  const [copied, setCopied] = useState(false);
  const [fileCount, setFileCount] = useState(4);
  const fsRef = useRef(new VirtualFS());
  const cwdRef = useRef('/home/user/project');
  const historyRef = useRef<string[]>([]);
  const historyIdxRef = useRef(-1);
  const currentLineRef = useRef('');

  const getPrompt = () => {
    return `\x1b[32m${venv}\x1b[0m \x1b[34m${workingDir}\x1b[0m \x1b[33m(${branch})\x1b[0m $ `;
  };

  const writePrompt = (term: Terminal) => {
    term.write('\r\n' + getPrompt());
  };

  const executeCommand = (cmd: string): string => {
    const trimmed = cmd.trim();
    if (!trimmed) return '';
    const fs = fsRef.current;
    const cwd = cwdRef.current;
    historyRef.current.push(trimmed);
    historyIdxRef.current = historyRef.current.length;

    const parts = trimmed.split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1);

    switch (command) {
      case 'ls':
      case 'll':
      case 'dir': {
        const target = args[0] || cwd;
        const files = fs.listFiles(target);
        if (files.length === 0) return '';
        return files.map(f => {
          if (f.endsWith('/')) return `\x1b[34m${f}\x1b[0m`;
          if (f.endsWith('.py')) return `\x1b[32m${f}\x1b[0m`;
          if (f.endsWith('.md') || f.endsWith('.toml') || f.endsWith('.cfg') || f.endsWith('.ini')) return `\x1b[36m${f}\x1b[0m`;
          return f;
        }).join('  ');
      }

      case 'pwd':
        return cwd;

      case 'cd': {
        if (!args[0] || args[0] === '~') {
          cwdRef.current = '/home/user';
          return '';
        }
        if (args[0] === '..') {
          const parts = cwd.split('/');
          parts.pop();
          cwdRef.current = parts.join('/') || '/';
          return '';
        }
        const target = args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`;
        if (fs.exists(target) || fs.dirs.has(target)) {
          cwdRef.current = target;
          return '';
        }
        return `cd: no such file or directory: ${args[0]}`;
      }

      case 'mkdir':
        if (args[0]) {
          const path = args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`;
          fs.dirs.add(path.replace(/\/$/, ''));
          setFileCount(c => c + 1);
          return '';
        }
        return 'mkdir: missing operand';

      case 'touch':
        if (args[0]) {
          const path = args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`;
          if (!fs.readFile(path)) {
            fs.writeFile(path, '');
            setFileCount(c => c + 1);
          }
          return '';
        }
        return 'touch: missing file';

      case 'cat':
        if (args[0]) {
          const path = args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`;
          const content = fs.readFile(path);
          if (content !== null) return content;
          return `cat: ${args[0]}: No such file or directory`;
        }
        return 'cat: missing file';

      case 'echo':
        return args.join(' ').replace(/^["']|["']$/g, '');

      case 'clear':
      case 'cls':
        return '__CLEAR__';

      case 'python':
      case 'python3': {
        if (args[0]) {
          const path = args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`;
          const code = fs.readFile(path);
          if (code !== null) {
            const result = evaluatePython(code);
            return result || '';
          }
          // Try evaluating inline code with -c
          if (args[0] === '-c') {
            const code = args.slice(1).join(' ').replace(/^["']|["']$/g, '');
            return evaluatePython(code);
          }
          return `python: can't open file '${args[0]}': No such file or directory`;
        }
        return 'Python 3.12.0 (interactive mode not available in browser)';
      }

      case 'pip':
      case 'pip3': {
        if (args[0] === 'list' || args[0] === 'freeze') {
          return 'Package    Version\n---------- -------\nfastapi    0.110.0\nuvicorn    0.27.0\npydantic  2.6.0\nhttpx     0.27.0\nrich      13.7.0';
        }
        if (args[0] === 'install') {
          const pkg = args[args.length - 1].replace(/^[^a-z]/i, '');
          return `Collecting ${pkg}\n  Downloading ${pkg}-1.0.0-py3-none-any.whl (100 kB)\nInstalling collected packages: ${pkg}\nSuccessfully installed ${pkg}-1.0.0`;
        }
        return `pip: unknown command '${args[0] || ''}'`;
      }

      case 'uv': {
        if (args[0] === 'pip' && args[1] === 'install') {
          const pkg = args[args.length - 1];
          return `Resolved 1 package in 120ms\nInstalled 1 package in 45ms\n + ${pkg}==1.0.0`;
        }
        if (args[0] === 'venv') {
          return 'Creating virtual environment at: .venv';
        }
        return '';
      }

      case 'git': {
        if (args[0] === 'status') {
          return `On branch ${branch}\nYour branch is up to date with 'origin/${branch}'.\n\nnothing to commit, working tree clean`;
        }
        if (args[0] === 'log') {
          if (args.includes('--oneline')) {
            return 'a1b2c3d (HEAD -> main) Initial commit\nb2c3d4e Add project structure\nc3d4e5f Add tests';
          }
          return `commit a1b2c3d (HEAD -> main)\nAuthor: Developer <dev@example.com>\nDate:   Mon Jan 15\n\n    Initial commit`;
        }
        if (args[0] === 'init') return 'Initialized empty Git repository in /home/user/project/.git/';
        if (args[0] === 'add') return '';
        if (args[0] === 'commit') return `[${branch} abc1234] ${args.slice(2).join(' ').replace(/"/g, '')}\n 1 file changed, 1 insertion(+)`;
        return `git: '${args[0] || ''}' is not a git command. See 'git --help'.`;
      }

      case 'uvicorn': {
        const module = args.find(a => a.includes(':')) || 'main:app';
        return `INFO:     Will watch for changes in these directories: ['/home/user/project']\nINFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)\nINFO:     Started reloader process [12345]\nINFO:     Started server process [12346]\nINFO:     Waiting for application startup.\nINFO:     Application startup complete.`;
      }

      case 'pytest': {
        return `============================= test session starts ==============================\nplatform linux -- Python 3.12.0\nplugins: asyncio-0.23.0, cov-5.0.0\ncollecting 5 items\n\ntests/test_main.py .....                                                  [100%]\n\n------------------------------ 5 passed in 0.42s ------------------------------`;
      }

      case 'ruff':
        return args[0] === 'check' ? 'All checks passed!' : '';

      case 'mypy':
        return 'Success: no issues found in 5 source files';

      case 'curl': {
        if (args.includes('localhost:8000') || args.includes('127.0.0.1:8000')) {
          return '{"message":"Hello, World!"}';
        }
        return `curl: try: 'curl http://localhost:8000' when the server is running`;
      }

      case 'help':
        return `Available commands:
  ls, pwd, cd, mkdir, touch, cat, echo, clear
  python <file.py>     Run Python file
  pip install <pkg>    Install package
  uv venv / uv pip install <pkg>
  git status/log/init/add/commit
  uvicorn main:app     Start FastAPI server
  pytest               Run tests
  ruff check .         Lint code
  mypy src/            Type check
  curl localhost:8000  Test API`;

      case 'whoami':
        return 'user';

      case 'date':
        return new Date().toString();

      case 'which':
        if (args[0]) return `/usr/bin/${args[0]}`;
        return '';

      case 'head':
      case 'tail':
        if (args[0]) {
          const path = args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`;
          const content = fs.readFile(path);
          if (content) {
            const lines = content.split('\n');
            return (command === 'head' ? lines.slice(0, 10) : lines.slice(-10)).join('\n');
          }
        }
        return '';

      case 'wc':
        if (args[0]) {
          const path = args[0].startsWith('/') ? args[0] : `${cwd}/${args[0]}`;
          const content = fs.readFile(path);
          if (content) {
            const lines = content.split('\n').length;
            const words = content.split(/\s+/).length;
            const chars = content.length;
            return `  ${lines}  ${words}  ${chars} ${args[0]}`;
          }
        }
        return '';

      case 'tree':
        return `.\n├── src/\n│   └── main.py\n├── tests/\n├── pyproject.toml\n├── README.md\n└── .gitignore`;

      default:
        return `bash: ${command}: command not found. Type 'help' for available commands.`;
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const term = new Terminal({
      theme: {
        background: '#0D1117',
        foreground: '#C9D1D9',
        cursor: '#58A6FF',
        selectionBackground: '#264F78',
        black: '#0D1117',
        red: '#FF7B72',
        green: '#3FB950',
        yellow: '#D29922',
        blue: '#58A6FF',
        magenta: '#BC8CFF',
        cyan: '#39C5CF',
        white: '#C9D1D9',
        brightBlack: '#484F58',
        brightRed: '#FF7B72',
        brightGreen: '#3FB950',
        brightYellow: '#D29922',
        brightBlue: '#58A6FF',
        brightMagenta: '#BC8CFF',
        brightCyan: '#39C5CF',
        brightWhite: '#F0F6FC',
      },
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 13,
      cursorBlink: true,
      convertEol: true,
      scrollback: 1000,
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(containerRef.current);
    
    try { fitAddon.fit(); } catch (e) {}

    termRef.current = term;
    fitRef.current = fitAddon;

    // Welcome message
    term.writeln('\x1b[36m╭─────────────────────────────────────────╮\x1b[0m');
    term.writeln('\x1b[36m│  LearnStack Terminal  v2.0              │\x1b[0m');
    term.writeln('\x1b[36m│  Type "help" for available commands     │\x1b[0m');
    term.writeln('\x1b[36m│  Click "Run" on lab steps to auto-run   │\x1b[0m');
    term.writeln('\x1b[36m╰─────────────────────────────────────────╯\x1b[0m');
    term.write(getPrompt());

    // Handle input
    term.onData(data => {
      const code = data.charCodeAt(0);

      if (code === 13) {
        // Enter - execute command
        const cmd = currentLineRef.current;
        const output = executeCommand(cmd);
        
        if (output === '__CLEAR__') {
          term.clear();
        } else if (output) {
          term.writeln('\r\n' + output);
        }
        
        if (onCommandRun) onCommandRun(cmd, output);
        currentLineRef.current = '';
        term.write('\r\n' + getPrompt());
      } else if (code === 127) {
        // Backspace
        if (currentLineRef.current.length > 0) {
          currentLineRef.current = currentLineRef.current.slice(0, -1);
          term.write('\b \b');
        }
      } else if (data === '\x1b[A') {
        // Arrow up - history
        if (historyRef.current.length > 0 && historyIdxRef.current > 0) {
          historyIdxRef.current--;
          const cmd = historyRef.current[historyIdxRef.current];
          while (currentLineRef.current.length > 0) {
            term.write('\b \b');
            currentLineRef.current = currentLineRef.current.slice(0, -1);
          }
          currentLineRef.current = cmd;
          term.write(cmd);
        }
      } else if (data === '\x1b[B') {
        // Arrow down - history
        if (historyIdxRef.current < historyRef.current.length - 1) {
          historyIdxRef.current++;
          const cmd = historyRef.current[historyIdxRef.current];
          while (currentLineRef.current.length > 0) {
            term.write('\b \b');
            currentLineRef.current = currentLineRef.current.slice(0, -1);
          }
          currentLineRef.current = cmd;
          term.write(cmd);
        }
      } else if (code === 3) {
        // Ctrl+C
        term.writeln('^C');
        currentLineRef.current = '';
        term.write(getPrompt());
      } else if (code >= 32) {
        currentLineRef.current += data;
        term.write(data);
      }
    });

    // Resize handler
    const handleResize = () => {
      try { fitAddon.fit(); } catch (e) {}
    };
    window.addEventListener('resize', handleResize);

    // Also try to fit after a delay (when container has proper size)
    setTimeout(() => { try { fitAddon.fit(); } catch (e) {} }, 100);
    setTimeout(() => { try { fitAddon.fit(); } catch (e) {} }, 500);

    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useImperativeHandle(ref, () => ({
    runCommand: (cmd: string) => {
      if (!termRef.current) return;
      const term = termRef.current;
      term.write(cmd);
      currentLineRef.current = cmd;
      const output = executeCommand(cmd);
      if (output === '__CLEAR__') {
        term.clear();
      } else if (output) {
        term.writeln('\r\n' + output);
      }
      if (onCommandRun) onCommandRun(cmd, output);
      currentLineRef.current = '';
      term.write('\r\n' + getPrompt());
    },
    clear: () => {
      termRef.current?.clear();
      termRef.current?.write(getPrompt());
    },
    reset: () => {
      if (!termRef.current) return;
      termRef.current.clear();
      fsRef.current = new VirtualFS();
      setFileCount(4);
      cwdRef.current = '/home/user/project';
      termRef.current.writeln('\x1b[36m✓ Lab reset to starter files\x1b[0m');
      termRef.current.write(getPrompt());
    },
  }));

  const handleCopy = () => {
    if (termRef.current) {
      const selection = termRef.current.getSelection();
      if (selection) {
        navigator.clipboard.writeText(selection);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0D1117]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#161B22] border-b border-zinc-800">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <TerminalIcon className="w-3 h-3" />
          <span className="text-green-400">{venv}</span>
          <span className="text-zinc-600">|</span>
          <span className="text-blue-400">{workingDir}</span>
          <span className="text-zinc-600">|</span>
          <span className="text-yellow-400">({branch})</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleCopy} className="p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-300" title="Copy selection">
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button onClick={() => ref && 'reset' in (ref as any) && (ref as any).reset?.()} className="p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-300" title="Reset lab">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button className="p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-300" title="Open in new tab">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* File Explorer */}
      <div className="px-3 py-2 bg-[#0D1117] border-b border-zinc-800 max-h-28 overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-1 text-[10px] text-zinc-500 uppercase mb-1">
          <Folder className="w-3 h-3" /> Files ({fileCount})
        </div>
        <div className="space-y-0.5">
          <div className="text-xs flex items-center gap-1 text-blue-400">📁 src/</div>
          <div className="text-xs flex items-center gap-1 text-green-400 ml-4">📄 main.py</div>
          <div className="text-xs flex items-center gap-1 text-cyan-400 ml-4">📄 __init__.py</div>
          <div className="text-xs flex items-center gap-1 text-blue-400">📁 tests/</div>
          <div className="text-xs flex items-center gap-1 text-zinc-400">📄 pyproject.toml</div>
          <div className="text-xs flex items-center gap-1 text-zinc-400">📄 README.md</div>
          <div className="text-xs flex items-center gap-1 text-zinc-400">📄 .gitignore</div>
        </div>
      </div>

      {/* Terminal */}
      <div ref={containerRef} className="flex-1 min-h-[400px] p-2" />
    </div>
  );
});
