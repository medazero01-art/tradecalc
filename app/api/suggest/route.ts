import { NextRequest, NextResponse } from 'next/server';

interface SuggestionBody {
  name: string;
  description: string;
  contact?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: SuggestionBody = await req.json();
    const { name, description, contact } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Calculator name or idea is required.' },
        { status: 400 }
      );
    }

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return NextResponse.json(
        { error: 'A short description or use case is required.' },
        { status: 400 }
      );
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    // Graceful fallback if credentials are not configured yet
    if (!token || !chatId) {
      console.warn(
        '[Suggest Calculator] Telegram bot credentials missing. Suggestion logged locally:',
        {
          name: name.trim(),
          description: description.trim(),
          contact: contact?.trim() || 'N/A',
          timestamp: new Date().toISOString(),
        }
      );

      // Return success so end-user does not encounter an error
      return NextResponse.json({
        success: true,
        message: 'Thank you! Your calculator suggestion has been received.',
      });
    }

    // Build Telegram message
    const cleanName = name.trim();
    const cleanDesc = description.trim();
    const cleanContact = contact && contact.trim().length > 0 ? contact.trim() : 'Anonymous';
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'UTC' });

    const messageText = [
      '🛠️ *New TradeCalc Calculator Suggestion*',
      '',
      `*Name:* ${cleanName}`,
      `*Contact:* ${cleanContact}`,
      `*Submitted (UTC):* ${timestamp}`,
      '',
      '*Description & Math Notes:*',
      cleanDesc,
    ].join('\n');

    // Dispatch message to Telegram Bot API
    try {
      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: 'Markdown',
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('[Suggest Calculator] Telegram API error:', response.status, errorData);
      }
    } catch (telegramErr) {
      // Log network or unexpected fetch errors server-side without crashing the user flow
      console.error('[Suggest Calculator] Failed to dispatch Telegram notification:', telegramErr);
    }

    // Always report success to the user so failures fail gracefully
    return NextResponse.json({
      success: true,
      message: 'Thank you! Your calculator suggestion has been received.',
    });
  } catch (err) {
    console.error('[Suggest Calculator] Unexpected error processing suggestion:', err);
    return NextResponse.json(
      { success: true, message: 'Thank you! Your calculator suggestion has been received.' },
      { status: 200 }
    );
  }
}
