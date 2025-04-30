import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '✨ Neon Lottery | Daily ETH Draws on Base',
  description: 'Win ETH daily! Transparent blockchain lottery on Base Network',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta property="fc:frame" content={JSON.stringify({
          version: "vNext",
          image: "https://i.ibb.co/HfcPqDfC/ogneon.jpg",
          buttons: [{ label: "🎫 Buy Ticket", action: "post_redirect" }],
          postUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
        })} />
      </head>
      <body>{children}</body>
    </html>
  )
}
