import '../../styles/globals.css'
import Header from './../../components/blog/Header'
import Banner from './../../components/blog/Banner'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body className="max-w-7xl mx-auto">
        <Header />
        <Banner />

        {children}
      </body>
    </html>
  )
}
