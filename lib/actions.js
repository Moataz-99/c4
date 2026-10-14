import { seed, uid } from './db';
import { SECTIONS, cleanSection } from './content';

export const PLANS = ['solo', 'duo', 'tournament', 'league'];
export const PILLARS = ['tracking', 'data', 'reporting', 'automation'];
export const STAGES = ['intake', 'review', 'findings', 'handed over'];

const clean = (v, max = 200) => String(v ?? '').trim().slice(0, max);
const log = (db, text, pillar = 0) => {
  db.activity.unshift({ id: uid(), text, pillar, at: new Date().toISOString() });
  db.activity = db.activity.slice(0, 60);
};
const find = (list, id, what) => {
  const item = list.find((x) => x.id === id);
  if (!item) throw new Error(`${what} not found`);
  return item;
};

/** Applies one admin action to the database and returns it. Throws on bad input. */
export function applyAction(db, action) {
  const { type, payload: p = {} } = action || {};
  switch (type) {
    case 'client.add': {
      const name = clean(p.name, 80);
      if (!name) throw new Error('client name is required');
      const plan = PLANS.includes(p.plan) ? p.plan : 'solo';
      const pillars = Array.isArray(p.pillars) && p.pillars.length === 4 ? p.pillars.map((v) => ([0, 1, 2].includes(v) ? v : 0)) : [0, 0, 0, 0];
      db.clients.push({ id: uid(), name, plan, pillars, createdAt: new Date().toISOString() });
      log(db, `${name} — joined the board on the ${plan} plan`, 0);
      return db;
    }
    case 'client.update': {
      const c = find(db.clients, p.id, 'client');
      if (p.name !== undefined) c.name = clean(p.name, 80) || c.name;
      if (p.plan !== undefined && PLANS.includes(p.plan)) {
        c.plan = p.plan;
        log(db, `${c.name} — moved to the ${p.plan} plan`, 2);
      }
      return db;
    }
    case 'client.pillar': {
      const c = find(db.clients, p.id, 'client');
      const i = Number(p.index);
      if (!(i >= 0 && i < 4)) throw new Error('bad pillar');
      const next = { 0: 2, 2: 1, 1: 0 }[c.pillars[i]] ?? 0; // empty → syncing → connected → empty
      c.pillars[i] = next;
      const label = { 0: 'disconnected', 2: 'started syncing', 1: 'connected' }[next];
      log(db, `${c.name} — ${PILLARS[i]} ${label}${c.pillars.every((v) => v === 1) ? '. four in a row.' : ''}`, i);
      return db;
    }
    case 'client.delete': {
      const c = find(db.clients, p.id, 'client');
      db.clients = db.clients.filter((x) => x.id !== c.id);
      log(db, `${c.name} — removed from the board`, 3);
      return db;
    }
    case 'lead.status': {
      const l = find(db.leads, p.id, 'message');
      l.status = p.status === 'handled' ? 'handled' : 'new';
      return db;
    }
    case 'lead.convert': {
      const l = find(db.leads, p.id, 'message');
      const name = clean(l.agency || l.name, 80);
      const pillars = PILLARS.map((pl) => (l.pillars?.includes(pl) ? 2 : 0));
      db.clients.push({ id: uid(), name, plan: 'solo', pillars, createdAt: new Date().toISOString() });
      db.audits.push({ id: uid(), client: name, stage: 0, note: 'from contact form · awaiting access', createdAt: new Date().toISOString() });
      l.status = 'handled';
      log(db, `${name} — converted from the inbox, tracking audit opened`, 0);
      return db;
    }
    case 'lead.delete': {
      db.leads = db.leads.filter((x) => x.id !== p.id);
      return db;
    }
    case 'queue.approve': {
      const q = find(db.queue, p.id, 'item');
      q.status = 'approved';
      q.approvedAt = new Date().toISOString();
      log(db, `${q.client} — ${q.kind} ${q.title} approved by a person`, q.pillar ?? 2);
      return db;
    }
    case 'queue.edit': {
      const q = find(db.queue, p.id, 'item');
      q.detail = clean(p.detail, 1000) || q.detail;
      return db;
    }
    case 'audit.add': {
      const client = clean(p.client, 80);
      if (!client) throw new Error('client name is required');
      db.audits.push({ id: uid(), client, stage: 0, note: clean(p.note, 120) || 'waiting for ad-account access', createdAt: new Date().toISOString() });
      log(db, `${client} — tracking audit started`, 0);
      return db;
    }
    case 'audit.advance': {
      const a = find(db.audits, p.id, 'audit');
      a.stage = Math.min(3, a.stage + 1);
      if (p.note !== undefined) a.note = clean(p.note, 120);
      log(db, `${a.client} — audit moved to ${STAGES[a.stage]}`, a.stage);
      return db;
    }
    case 'audit.delete': {
      db.audits = db.audits.filter((x) => x.id !== p.id);
      return db;
    }
    case 'settings.set': {
      const key = p.key;
      if (!(key in db.settings) || key === 'humanApproval') throw new Error('that setting cannot be changed');
      db.settings[key] = Boolean(p.value);
      return db;
    }
    case 'content.set': {
      const value = cleanSection(p.section, p.value);
      db.content = { ...(db.content || {}), [p.section]: value };
      const title = SECTIONS.find((x) => x.key === p.section).title;
      log(db, `website — ${title.toLowerCase()} updated`, 2);
      return db;
    }
    case 'content.reset': {
      if (!SECTIONS.some((x) => x.key === p.section)) throw new Error('unknown section');
      if (db.content) delete db.content[p.section];
      const title = SECTIONS.find((x) => x.key === p.section).title;
      log(db, `website — ${title.toLowerCase()} back to the original wording`, 2);
      return db;
    }
    case 'db.reset': {
      // "reset to sample data" clears the board but keeps the website wording
      const fresh = seed();
      if (db.content) fresh.content = db.content;
      return fresh;
    }
    default:
      throw new Error('unknown action');
  }
}
