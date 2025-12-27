import './globals.css'
import { Metadata } from 'next'
import BottomNav from '@/components/BottomNav'

export const metadata: Metadata = {
  title: 'Kiwi Travel Footsteps',
  description: 'Explore the world, connect with travelers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ paddingBottom: '70px' }}>
        {children}
        <BottomNav />
      </body>
    </html>
  )
}
