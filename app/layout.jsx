import localFont from 'next/font/local'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header.jsx'
import Footer from '@/components/Footer.jsx'
import { LegalProvider } from '@/components/LegalModal.jsx'
import RevealProvider from '@/components/RevealProvider.jsx'
import ScrollHandler from '@/components/ScrollHandler.jsx'
import { SITE, BRAND } from '@/data/site.js'

// Self-hosted from src/fonts, so the face rules and the preloads are generated
// by Next but the files still ship from this origin. That is what keeps the
// privacy policy's "fonts are served from this domain" true - do not switch
// these to next/font/google.
const instrument = localFont({
  src: '../src/fonts/instrument-sans.woff2',
  weight: '400 700',
  variable: '--font-instrument',
  display: 'swap',
})

const inter = localFont({
  src: '../src/fonts/inter.woff2',
  weight: '400 700',
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(SITE),
  applicationName: BRAND,
  formatDetection: { telephone: false, address: false, email: false },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'YyVFUxLa1PAaG7913GQyzgz0fg0yfj4dxL6nJIf_vCk',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#322E80',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" className={`${instrument.variable} ${inter.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>

        {/* The legal modal's provider wraps the whole tree so the consent
            checkbox in the form and the footer links reach the same document
            source. It is a client component; the pages passed through it stay
            server components. */}
        <LegalProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </LegalProvider>

        <RevealProvider />
        <ScrollHandler />

        {/* Analytics, fetched once the page is idle so it never competes with
            the document for bandwidth. vercel.json's CSP allowlists both
            Google hosts and 'unsafe-inline' for the init block; without those
            entries this is blocked in production while every local check still
            passes. */}
        <Script
          id="ga-lib"
          src="https://www.googletagmanager.com/gtag/js?id=G-FC2EL0H3VM"
          strategy="lazyOnload"
        />
        <Script id="ga-init" strategy="lazyOnload">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-FC2EL0H3VM');
        `}</Script>
      </body>
    </html>
  )
}
