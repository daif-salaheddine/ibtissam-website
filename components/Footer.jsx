'use client'

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ibtissamdaif' },
  { label: 'Email',    href: 'mailto:ibtissamdaif02@gmail.com' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="py-8 px-6 md:px-12 border-t"
      style={{ background: 'hsl(var(--bg))', borderColor: 'hsl(var(--stroke))' }}
    >
      <div className="px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span
          className="font-body text-[0.7rem] tracking-widest uppercase"
          style={{ color: 'hsl(var(--muted))' }}
        >
          &copy; {year} Ibtissam Daif &middot; All rights reserved
        </span>

        {/* Social links + availability */}
        <div className="flex items-center gap-6">
          {SOCIAL_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-body text-[0.65rem] tracking-widest uppercase transition-colors duration-200"
              style={{ color: 'hsl(var(--muted))' }}
              onMouseEnter={e => e.currentTarget.style.color = 'hsl(var(--text))'}
              onMouseLeave={e => e.currentTarget.style.color = 'hsl(var(--muted))'}
            >
              {label}
            </a>
          ))}

          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-blink"
              style={{ background: '#4ADE80' }}
            />
            <span
              className="font-body text-[0.65rem] tracking-widest uppercase"
              style={{ color: 'hsl(var(--muted))' }}
            >
              Available for projects
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
