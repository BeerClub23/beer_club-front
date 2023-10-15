import './globals.css'
import { Inter } from 'next/font/google'
import Footer from '@/app/components/footer/footer'
import HeaderGeneral from '@/app/components/headerGeneral/headerGeneral'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Beer Club',
  description: 'En Beer Club vas a encontrar a los gururs que te guiarán para tener la mejores experiencia degutando cervezas de todo el mundo.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={inter.className}>
      <HeaderGeneral/>
        {children}
      <Footer/>
      </body>
    </html>
  )
}
