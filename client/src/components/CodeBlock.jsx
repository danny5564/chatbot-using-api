import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ language, children }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-3 rounded-xl overflow-hidden border border-surface-700/50">
      <div className="flex items-center justify-between px-4 py-2 bg-[#21252b]">
        <span className="text-xs font-mono text-surface-400">
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-surface-400 hover:text-surface-200 transition-colors"
        >
          {copied ? (
            <>
              <Check size={14} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: '#282c34',
          fontSize: '0.8125rem',
          lineHeight: '1.6',
        }}
        wrapLongLines={false}
      >
        {children}
      </SyntaxHighlighter>
    </div>
  );
}
