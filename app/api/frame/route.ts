import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  
  if (body.untrustedData.buttonIndex === 1) {
    return NextResponse.json({
      type: 'frame',
      frame: {
        image: 'https://i.ibb.co/HfcPqDfC/ogneon.jpg',
        buttons: [
          { label: '🎫 Buy Ticket', action: 'post_redirect' },
          { label: '🏆 Winners', action: 'post' }
        ],
        postUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/frame`
      }
    })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}
