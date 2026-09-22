export default function Logo({ size = 'md', className = '' }) {
  const dims = { sm: 32, md: 48, lg: 72, xl: 88 };
  const d = dims[size] || dims.md;
  const borderRadius = size === 'sm' ? 8 : size === 'md' ? 14 : 20;

  return (
    <div
      className={`inline-flex items-center justify-center bg-gradient-to-br from-brand-500 via-brand-600 to-violet-600 shadow-lg shadow-brand-500/20 flex-shrink-0 ${className}`}
      style={{ width: d, height: d, borderRadius }}
    >
      <svg
        width={d * 0.5}
        height={d * 0.5}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 12c0 3.866-3.582 7-8 7a8.86 8.86 0 01-3.476-.7L4 20l1.21-3.632A6.58 6.58 0 014 12c0-3.866 3.582-7 8-7s8 3.134 8 7z"
          fill="white"
        />
        <circle cx="9" cy="12" r="1.1" fill="#4F46E5" />
        <circle cx="12" cy="12" r="1.1" fill="#6366F1" />
        <circle cx="15" cy="12" r="1.1" fill="#7C3AED" />
      </svg>
    </div>
  );
}
