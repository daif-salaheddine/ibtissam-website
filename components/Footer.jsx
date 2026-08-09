'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="py-8 px-6 md:px-12 border-t"
      style={{ background: '#3D5040', borderColor: 'rgba(255,255,255,0.08)' }}
    >
      <div className="px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[0.75rem] tracking-[0.14em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
          &copy; {year} Ibtissam Daif &middot; All rights reserved
        </span>
        <span className="font-mono text-[0.55rem] tracking-[0.15em] uppercase" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Education &amp; Workforce Development Consultant
        </span>
      </div>
    </footer>
  )
}
