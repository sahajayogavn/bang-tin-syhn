import { NextResponse } from 'next/server';
import { fetchEventsFromGoogleSheet } from '@/lib/sheets';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sheetUrl = searchParams.get('sheetUrl') || undefined;

  const result = await fetchEventsFromGoogleSheet(sheetUrl);
  return NextResponse.json(result);
}
