'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="py-8 px-6 md:px-12 border-t"
      style={{
        background: '#F3F1EC',
        borderColor: 'rgba(34,31,28,0.08)',
      }}
    >
      <div className="px-8 md:px-16 lg:px-24 xl:px-32 max-w-[1800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase" style={{ color: '#9B968F' }}>
          &copy; {year} Ibtissam Daif &middot; All rights reserved
        </span>
        <span className="font-mono text-[0.55rem] tracking-[0.15em] uppercase" style={{ color: '#9B968F' }}>
          Education &amp; Workforce Development Consultant
        </span>
      </div>
    </footer>
  )
}
