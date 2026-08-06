'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="py-8 px-6 md:px-12 border-t"
      style={{
        background: '#080706',
        borderColor: 'rgba(242,235,224,0.07)',
      }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-[0.55rem] tracking-[0.2em] uppercase" style={{ color: '#6B6055' }}>
          © {year} Ibtissam Daif · All rights reserved
        </span>
        <span className="font-mono text-[0.55rem] tracking-[0.15em] uppercase" style={{ color: '#6B6055' }}>
          Education & Workforce Development Consultant
        </span>
      </div>
    </footer>
  )
}
