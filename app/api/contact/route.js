import { NextResponse } from 'next/server';
import { readDb, writeDb, uid } from '@/lib/db';
import { PILLARS } from '@/lib/actions';

export const dynamic = 'force-dynamic';
const clean = (v, max) => String(v ?? '').trim().slice(0, max);

export async function POST(req) {
  let body;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'bad request' }, { status: 400 }); }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot: bots fill hidden fields

  const lead = {
    id: uid(),
    name: clean(body.name, 80),
    agency: clean(body.agency, 80),
    email: clean(body.email, 120),
    pillars: (Array.isArray(body.pillars) ? body.pillars : []).filter((p) => PILLARS.includes(p)),
    message: clean(body.message, 2000),
    status: 'new',
    createdAt: new Date().toISOString()
  };
  if (!lead.name || !/^\S+@\S+\.\S+$/.test(lead.email)) {
    return NextResponse.json({ error: 'we need your name and a valid email.' }, { status: 400 });
  }

  const db = structuredClone(await readDb());
  db.leads.unshift(lead);
  db.leads = db.leads.slice(0, 500);
  db.activity.unshift({ id: uid(), pillar: 3, text: `${lead.agency || lead.name} — new message in the inbox`, at: lead.createdAt });
  db.activity = db.activity.slice(0, 60);
  await writeDb(db);

  if (process.env.N8N_WEBHOOK_URL) {
    try {
      await fetch(process.env.N8N_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) });
    } catch { /* the message is already saved; a webhook failure shouldn't fail the form */ }
  }
  return NextResponse.json({ ok: true });
}
