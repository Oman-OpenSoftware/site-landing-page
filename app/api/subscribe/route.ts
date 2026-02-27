import { NextResponse } from "next/server"

type SubscribeRequest = {
  email?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SubscribeRequest
    const email = body.email?.trim().toLowerCase()

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "البريد الإلكتروني غير صالح." }, { status: 400 })
    }

    const apiKey = process.env.MAILERLITE_API_KEY
    const groupId = process.env.MAILERLITE_GROUP_ID

    if (!apiKey || !groupId) {
      return NextResponse.json(
        { error: "الإعدادات غير مكتملة. أضف MAILERLITE_API_KEY و MAILERLITE_GROUP_ID في .env." },
        { status: 500 },
      )
    }

    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email,
        groups: [groupId],
        status: "active",
      }),
      cache: "no-store",
    })

    if (!res.ok) {
      const errorText = await res.text()
      return NextResponse.json(
        {
          error: "فشل التسجيل في MailerLite.",
          details: errorText,
        },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "حصل خطأ غير متوقع." }, { status: 500 })
  }
}
