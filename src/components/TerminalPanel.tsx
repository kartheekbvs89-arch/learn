'use client';

import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import '@xterm/xterm/css/xterm.css';
import { Folder, RotateCcw, Maximize2, Copy, Check } from 'lucide-react';

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

// Simulated file system for demo
const initialFiles = [
  { path: 'src/', type: 'dir' as const },
  { path: 'src/main.py', type: 'file' as const },
  { path: 'pyproject.toml', type: 'file' as const },
  { path: 'README.md', type: 'file' as const },
  { path: '.gitignore', type: 'file' as const },
];

export const TerminalPanel = forwardRef<TerminalHandle, TerminalPanelProps>(function TerminalPanel(
  { workingDir = '~/project', venv = '.venv', branch = 'main', files = initialFiles, onCommandRun },
  ref
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const termRef = useRef<Terminal | null>(null);
  const fitRef = useRef<FitAddon | null>(null);
  const [copied, setCopied] = useState(false);
  const [fileList, setFileList] = useState(files);

  // Simulated bash environment
  const history: string[] = [];
  let historyIndex = -1;
  let currentLine = '';

  const printPrompt = (term: Terminal) => {
    term.write(`\r\n\x1b[32m${venv}\x1b[0m \x1b[34m${workingDir}\x1b[0m \x1b[33m(${branch})\x1b[0m $ `);
  };

  const executeCommand = (cmd: string): string => {
    const trimmed = cmd.trim();
    if (!trimmed) return '';

    // Add to history
    history.push(trimmed);
    historyIndex = history.length;

    // Simulated commands
    if (trimmed === 'ls' || trimmed === 'll') {
      const output = fileList.map(f => {
        if (f.type === 'dir') return `\x1b[34m${f.path}\x1b[0m`;
        return f.path;
      }).join('  ');
      return output;
    }

    if (trimmed === 'pwd') {
      return `/home/user/${workingDir.replace('~/', '')}`;
    }

    if (trimmed.startsWith('mkdir ')) {
      const name = trimmed.slice(6).trim();
      setFileList(prev => [...prev, { path: name + '/', type: 'dir' }]);
      return '';
    }

    if (trimmed.startsWith('touch ')) {
      const name = trimmed.slice(6).trim();
      setFileList(prev => [...prev, { path: name, type: 'file' }]);
      return '';
    }

    if (trimmed.startsWith('echo ')) {
      return trimmed.slice(5).replace(/^["']|["']$/g, '');
    }

    if (trimmed === 'clear' || trimmed === 'cls') {
      return '__CLEAR__';
    }

    if (trimmed === 'python --version' || trimmed === 'python3 --version') {
      return 'Python 3.12.0';
    }

    if (trimmed.startsWith('python ') || trimmed.startsWith('python3 ')) {
      const filename = trimmed.split(' ')[1];
      return `Running ${filename}...\n✓ Done`;
    }

    if (trimmed === 'pip list' || trimmed === 'pip freeze') {
      return 'fastapi==0.110.0\nuvicorn==0.27.0\npydantic==2.6.0\nsqlalchemy==2.0.0';
    }

    if (trimmed.startsWith('pip install') || trimmed.startsWith('uv pip install')) {
      const pkg = trimmed.split(' ').slice(-1)[0];
      return `Collecting ${pkg}\n  Downloading ${pkg}-1.0.0-py3-none-any.whl\nInstalling collected packages: ${pkg}\nSuccessfully installed ${pkg}-1.0.0`;
    }

    if (trimmed === 'git status') {
      return 'On branch main\nYour branch is up to date\n\nnothing to commit, working tree clean';
    }

    if (trimmed === 'git log --oneline') {
      return 'a1b2c3d Initial commit\nb2c3d4e Add FastAPI setup\nc3d4e5f Add tests';
    }

    if (trimmed.startsWith('cat ')) {
      const filename = trimmed.slice(4).trim();
      const file = fileList.find(f => f.path === filename);
      if (file) {
        return `# ${filename}\n# Content would be shown here`;
      }
      return `cat: ${filename}: No such file or directory`;
    }

    if (trimmed === 'help') {
      return 'Available: ls, pwd, mkdir, touch, echo, clear, python, pip, git, cat';
    }

    if (trimmed.startsWith('uvicorn ')) {
      return 'INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)\nINFO:     Application startup complete.';
    }

    if (trimmed.startsWith('pytest')) {
      return '============================= test session starts ==============================\ncollected 5 items\n\ntests/test_main.py .....                                                  [100%]\n\n============================== 5 passed in 0.42s ===============================';
    }

    // Default: command not found
    return `bash: ${trimmed.split(' ')[0]}: command not found`;
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
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(containerRef.current);
    fitAddon.fit();

    termRef.current = term;
    fitRef.current = fitAddon;

    // Welcome message
    term.writeln('\x1b[36m╭─────────────────────────────────────╮\x1b[0m');
    term.writeln('\x1b[36m│  LearnStack Terminal  v1.0          │\x1b[0m');
    term.writeln('\x1b[36m│  Type "help" for available commands │\x1b[0m');
    term.writeln('\x1b[36m╰─────────────────────────────────────╯\x1b[0m');
    printPrompt(term);

    // Handle input
    term.onData(data => {
      const code = data.charCodeAt(0);

      // Enter
      if (code === 13) {
        const output = executeCommand(currentLine);
        if (output === '__CLEAR__') {
          term.clear();
        } else if (output) {
          term.writeln('\r\n' + output);
        }
        if (onCommandRun) {
          onCommandRun(currentLine, output);
        }
        currentLine = '';
        printPrompt(term);
      }
      // Backspace
      else if (code === 127) {
        if (currentLine.length > 0) {
          currentLine = currentLine.slice(0, -1);
          term.write('\b \b');
        }
      }
      // Arrow up (history)
      else if (data === '\x1b[A') {
        if (history.length > 0 && historyIndex > 0) {
          historyIndex--;
          const cmd = history[historyIndex];
          // Clear current line
          while (currentLine.length > 0) {
            term.write('\b \b');
            currentLine = currentLine.slice(0, -1);
          }
          currentLine = cmd;
          term.write(cmd);
        }
      }
      // Arrow down (history)
      else if (data === '\x1b[B') {
        if (historyIndex < history.length - 1) {
          historyIndex++;
          const cmd = history[historyIndex];
          while (currentLine.length > 0) {
            term.write('\b \b');
            currentLine = currentLine.slice(0, -1);
          }
          currentLine = cmd;
          term.write(cmd);
        }
      }
      // Ctrl+C
      else if (code === 3) {
        term.writeln('^C');
        currentLine = '';
        printPrompt(term);
      }
      // Regular character
      else if (code >= 32) {
        currentLine += data;
        term.write(data);
      }
    });

    // Resize handler
    const handleResize = () => {
      try {
        fitAddon.fit();
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      term.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    runCommand: (cmd: string) => {
      if (!termRef.current) return;
      const term = termRef.current;
      // Type the command
      term.write(cmd);
      currentLine = cmd;
      // Press enter
      const output = executeCommand(cmd);
      if (output === '__CLEAR__') {
        term.clear();
      } else if (output) {
        term.writeln('\r\n' + output);
      }
      if (onCommandRun) {
        onCommandRun(cmd, output);
      }
      currentLine = '';
      printPrompt(term);
    },
    clear: () => {
      termRef.current?.clear();
    },
    reset: () => {
      if (!termRef.current) return;
      termRef.current.clear();
      termRef.current.writeln('\x1b[36m✓ Lab reset to starter files\x1b[0m');
      setFileList(initialFiles);
      printPrompt(termRef.current);
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
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="text-green-400">{venv}</span>
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-blue-400">{workingDir}</span>
          <span className="text-zinc-600">|</span>
          <span className="text-yellow-400">({branch})</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-300"
            title="Copy selection"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => ref && 'reset' in (ref as any) && (ref as any).reset?.()}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-300"
            title="Reset lab"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            className="p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-300"
            title="Open in new tab"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* File Explorer */}
      <div className="px-3 py-2 bg-[#0D1117] border-b border-zinc-800 max-h-32 overflow-y-auto custom-scrollbar">
        <div className="flex items-center gap-1 text-[10px] text-zinc-500 uppercase mb-1">
          <Folder className="w-3 h-3" /> Files
        </div>
        <div className="space-y-0.5">
          {fileList.map((f, i) => (
            <div
              key={i}
              className={`text-xs flex items-center gap-1 ${
                f.type === 'dir' ? 'text-blue-400' : 'text-zinc-400'
              }`}
            >
              {f.type === 'dir' ? '📁' : '📄'} {f.path}
            </div>
          ))}
        </div>
      </div>

      {/* Terminal */}
      <div ref={containerRef} className="flex-1 min-h-[480px] p-2" />
    </div>
  );
});
