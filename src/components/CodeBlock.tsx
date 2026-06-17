'use client';

import { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  approach?: 'minimal' | 'real-world' | 'production';
}

const approachStyles = {
  minimal: { label: 'Minimal', color: 'text-zinc-400', bg: 'bg-zinc-800' },
  'real-world': { label: 'Real-World', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  production: { label: 'Production', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
};

export function CodeBlock({ code, language, filename, approach }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const style = approach ? approachStyles[approach] : null;

  return (
    <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0D1117] my-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161B22] border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          {filename && (
            <span className="text-xs text-zinc-400 font-mono ml-2">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {style && (
            <span className={`text-[10px] px-2 py-0.5 rounded ${style.bg} ${style.color} font-medium`}>
              {style.label}
            </span>
          )}
          <span className="text-[10px] text-zinc-600 uppercase">{language}</span>
          <button
            onClick={handleCopy}
            className="p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-zinc-300 transition"
            title="Copy code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code */}
      <Highlight theme={themes.vsDark} code={code.trim()} language={language as any}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} overflow-x-auto p-4 text-sm leading-relaxed custom-scrollbar`}
            style={{ ...style, background: 'transparent' }}
          >
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line });
              return (
                <div key={i} {...lineProps} className={`${lineProps.className} table-row`}>
                  <span className="table-cell pr-4 text-right text-zinc-700 select-none w-8">
                    {i + 1}
                  </span>
                  <span className="table-cell">
                    {line.map((token, key) => {
                      const tokenProps = getTokenProps({ token });
                      return <span key={key} {...tokenProps} />;
                    })}
                  </span>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
