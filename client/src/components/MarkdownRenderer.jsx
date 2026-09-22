import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        pre({ children }) {
          return <div className="not-prose">{children}</div>;
        },
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const content = String(children).replace(/\n$/, '');

          if (match || className) {
            return (
              <CodeBlock language={match ? match[1] : ''}>
                {content}
              </CodeBlock>
            );
          }

          if (content.includes('\n')) {
            return <CodeBlock language="">{content}</CodeBlock>;
          }

          return (
            <code
              className="px-1.5 py-0.5 rounded-md bg-surface-100 dark:bg-surface-700/70 text-brand-600 dark:text-brand-400 text-[0.8125rem] font-mono"
              {...props}
            >
              {children}
            </code>
          );
        },
        p({ children }) {
          return <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>;
        },
        ul({ children }) {
          return (
            <ul className="mb-3 pl-5 space-y-1.5 list-disc marker:text-surface-400">
              {children}
            </ul>
          );
        },
        ol({ children }) {
          return (
            <ol className="mb-3 pl-5 space-y-1.5 list-decimal marker:text-surface-400">
              {children}
            </ol>
          );
        },
        li({ children }) {
          return <li className="leading-relaxed">{children}</li>;
        },
        h1({ children }) {
          return (
            <h1 className="text-xl font-semibold mb-3 mt-4 first:mt-0">
              {children}
            </h1>
          );
        },
        h2({ children }) {
          return (
            <h2 className="text-lg font-semibold mb-2 mt-3 first:mt-0">
              {children}
            </h2>
          );
        },
        h3({ children }) {
          return (
            <h3 className="text-base font-semibold mb-2 mt-3 first:mt-0">
              {children}
            </h3>
          );
        },
        a({ href, children }) {
          return (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 dark:text-brand-400 hover:underline"
            >
              {children}
            </a>
          );
        },
        strong({ children }) {
          return <strong className="font-semibold">{children}</strong>;
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-[3px] border-brand-500 pl-4 my-3 text-surface-600 dark:text-surface-400 italic">
              {children}
            </blockquote>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
