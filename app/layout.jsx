import './globals.css'

export const metadata = {
  title: 'Ibtissam Daif — Education Consultant',
  description:
    'Higher education and workforce development consultant. 12 years building programs across Morocco, the US, and Europe — for universities, companies, and civil society.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>◆</text></svg>",
  },
  openGraph: {
    title: 'Ibtissam Daif — Education Consultant',
    description: 'Higher education and workforce development consultant. 12 years building programs across Morocco, the US, and Europe.',
    type: 'website',
    siteName: 'Ibtissam Daif',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ibtissam Daif — Education Consultant',
    description: 'Higher education and workforce development consultant.',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
