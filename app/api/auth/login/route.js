import { NextResponse } from 'next/server';
import { COOKIE, MAX_AGE, checkPassword, createToken } from '@/lib/auth';

export async function POST(req) {
  const form = await req.formData();
  const ok = await checkPassword(form.get('password'));
  const url = new URL(ok ? '/admin' : '/admin/login?error=1', req.url);
  const res = NextResponse.redirect(url, 303);
  if (ok) {
    res.cookies.set(COOKIE, await createToken(), {
      httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: MAX_AGE
    });
  }
  return res;
}
