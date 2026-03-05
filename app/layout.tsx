'use client';

import './globals.css'
import { ReactNode } from 'react'
import { UserJourneyProvider } from '@/contexts/UserJourneyContext'
import AppShell from '@/components/AppShell'

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#030712" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <title>Kiwi Travel · Footsteps</title>
      </head>
      <body>
        <UserJourneyProvider>
          <AppShell>
            {children}
          </AppShell>
        </UserJourneyProvider>
      </body>
    </html>
  )
}
