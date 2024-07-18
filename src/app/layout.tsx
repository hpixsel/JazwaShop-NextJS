import '/styles/globals.css'
import { Metadata } from 'next'
import Navbar from '@components/Navbar'
import Footer from '@components/Footer'

export const metadata: Metadata = {
  title: 'JazwaStore',
  description: 'Strona, na której znajdziesz używane podręczniki wystawiane przez samych uczniów oraz z pomocą naszej strony znajdziesz do nich łatwy kontakt',
  keywords: "JazwaStore, JazwaShop, giełda, podręczniki, używane",
  authors: [{ name: 'KacperAdamus', url: 'https://adamusdev.pl' }, { name: 'KacperJanusz' }],
  robots: {
    index: false,
    follow: true,
    nocache: true,
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body>
        <div className='App'>
          <Navbar />
          <div className="container">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  )
}