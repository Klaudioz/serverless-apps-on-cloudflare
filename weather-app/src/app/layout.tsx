import 'bootstrap/dist/css/bootstrap.css';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Weather App',
  description: 'See the weather, anywhere in the world (sort of)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <section className="vh-100">
          <div className="container py-5 h-100">

            <div className="row d-flex justify-content-center 
                align-items-center h-100">
              <div className="col-md-8 col-lg-6 col-xl-4">
                {children}
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  )
}

