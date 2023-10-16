import './globals.css'
import { Inter } from 'next/font/google'
// import {theme} from './styles/material-theme'
// import { ThemeProvider } from '@mui/material'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Beer Club',
  description: 'En Beer Club vas a encontrar a los gururs que te guiarán para tener la mejores experiencia degutando cervezas de todo el mundo.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* <ThemeProvider theme={theme}> */}
        <body className={inter.className}>
          {children}
        </body>
      {/* </ThemeProvider> */}
      </html>
  )
}
