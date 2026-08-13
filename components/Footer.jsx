'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="py-8 px-6 md:px-12 border-t"
      style={{ background: '#000000', borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="px-8 md:px-16 lg:px-20 xl:px-28 max-w-[1800px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-pixel text-[0.7rem] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
          &copy; {year} Ibtissam Daif &middot; All rights reserved
        </span>
        <span className="font-pixel text-[0.65rem] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Education &amp; Workforce Development Consultant
        </span>
      </div>
    </footer>
  )
}
