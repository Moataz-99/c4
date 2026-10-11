import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { applyAction } from '@/lib/actions';
import { COOKIE, verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function authed(req) {
  return verifyToken(req.cookies.get(COOKIE)?.value); // second check, in case middleware is bypassed
}

export async function GET(req) {
  if (!(await authed(req))) return NextResponse.json({ error: 'not signed in' }, { status: 401 });
  return NextResponse.json(await readDb());
}

export async function POST(req) {
  if (!(await authed(req))) return NextResponse.json({ error: 'not signed in' }, { status: 401 });
  let action;
  try { action = await req.json(); } catch { return NextResponse.json({ error: 'bad request' }, { status: 400 }); }
  try {
    const db = applyAction(structuredClone(await readDb()), action);
    return NextResponse.json(await writeDb(db));
  } catch (e) {
    return NextResponse.json({ error: e.message || 'failed' }, { status: 400 });
  }
}
