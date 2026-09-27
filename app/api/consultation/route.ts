// app/api/consultation/route.ts
// Telegram Bot Dispatcher — routes consultation submissions to artist's Telegram

import { NextRequest, NextResponse } from 'next/server'
import { ConsultationFormSchema } from '@/shared/types'
import { toRomanNumeral } from '@/shared/lib/utils'

const ZONE_LABELS: Record<string, string> = {
  'chest-core': 'Göğüs & Biyomekanik Çekirdek',
  'cervical-conduit': 'Şahdamarı & Boyun Lifleri',
  'deltoid-architecture': 'Sol Pazu & Mekanik Silindirler',
  'untouched-canvas': 'Dokunulmamış Mermer Göğüs',
  'abdominal-fissure': 'Alt Karın & Kintsugi Kırılma Hattı',
}

const SESSION_LABELS: Record<string, string> = {
  'single-session': 'Tek Seans Odaklı',
  'large-scale': 'Büyük Ölçekli Proje',
  'body-concept': 'Beden Konsepti',
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: unknown = await request.json()

    // Validate with Zod
    const parsed = ConsultationFormSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const data = parsed.data

    // Generate Roman numeral for Milat year
    const milatYear = new Date(data.milatDate).getFullYear()
    const milatRoman = isNaN(milatYear) ? 'N/A' : toRomanNumeral(milatYear)

    // Format Telegram message
    const message = [
      '🔱 YENİ TUVAL TALEBİ — TUNCAY GEZER ATELIER',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `• Bölge: ${ZONE_LABELS[data.zone] ?? data.zone}`,
      `• Milat: ${milatRoman} (${milatYear})`,
      `• Seans: ${SESSION_LABELS[data.sessionScale] ?? data.sessionScale}`,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `• İsim: ${data.name}`,
      `• Telefon: ${data.phone}`,
      `• E-posta: ${data.email}`,
      `• Şehir: ${data.city}`,
      '━━━━━━━━━━━━━━━━━━━━━━━━━━',
      `• Felsefe: ${data.philosophy.slice(0, 300)}${data.philosophy.length > 300 ? '...' : ''}`,
    ].join('\n')

    const botToken = process.env['TELEGRAM_BOT_TOKEN']
    const chatId = process.env['TELEGRAM_CHAT_ID']

    if (botToken && chatId) {
      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
      const telegramResponse = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        }),
      })

      if (!telegramResponse.ok) {
        console.error('Telegram API error:', await telegramResponse.text())
      }
    } else {
      // Log to console in development
      console.log('[CONSULTATION SUBMISSION]\n', message)
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Talebiniz başarıyla iletildi.',
        milatRoman,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Consultation API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
