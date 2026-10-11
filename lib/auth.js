export const COOKIE = 'c4_admin';
export const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
  return process.env.AUTH_SECRET || (process.env.ADMIN_PASSWORD ? 'c4:' + process.env.ADMIN_PASSWORD : '');
}

async function hmac(message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export function authConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export async function checkPassword(input) {
  const real = process.env.ADMIN_PASSWORD;
  if (!real || typeof input !== 'string') return false;
  // compare hashes so the comparison time doesn't depend on the password length
  return safeEqual(await hmac('pw:' + input), await hmac('pw:' + real));
}

export async function createToken() {
  const exp = Math.floor(Date.now() / 1000) + MAX_AGE;
  return `${exp}.${await hmac('admin.' + exp)}`;
}

export async function verifyToken(token) {
  if (!token || !secret()) return false;
  const [exp, sig] = token.split('.');
  if (!exp || !sig || Number(exp) < Date.now() / 1000) return false;
  return safeEqual(sig, await hmac('admin.' + exp));
}
