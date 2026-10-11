import { Redis } from '@upstash/redis';

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;
const KEY = 'c4:db:v1';

export const isPersistent = Boolean(redis);

const now = () => new Date().toISOString();
const ago = (mins) => new Date(Date.now() - mins * 60000).toISOString();
export const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);

/* pillar state per client: 0 = empty, 2 = syncing, 1 = connected  (index 0..3 = tracking, data, reporting, automation) */
export function seed() {
  return {
    version: 1,
    clients: [
      { id: uid(), name: 'Kestrel Group', plan: 'league', pillars: [1, 1, 1, 1], createdAt: ago(60 * 24 * 40) },
      { id: uid(), name: 'Aster Digital', plan: 'tournament', pillars: [1, 1, 1, 1], createdAt: ago(60 * 24 * 32) },
      { id: uid(), name: 'Fernwood Media', plan: 'tournament', pillars: [1, 2, 1, 0], createdAt: ago(60 * 24 * 20) },
      { id: uid(), name: 'Northbound Agency', plan: 'duo', pillars: [0, 1, 1, 0], createdAt: ago(60 * 24 * 14) },
      { id: uid(), name: 'Harbor Collective', plan: 'duo', pillars: [1, 0, 0, 1], createdAt: ago(60 * 24 * 9) },
      { id: uid(), name: 'Lumen & Co', plan: 'solo', pillars: [0, 0, 0, 1], createdAt: ago(60 * 24 * 3) }
    ],
    leads: [
      { id: uid(), name: 'Sara', agency: 'Brightline Studio', email: 'sara@example.com', pillars: ['tracking', 'reporting'], message: 'Our Meta numbers stopped matching Shopify last month. Can you take a look?', status: 'new', createdAt: ago(95) }
    ],
    queue: [
      { id: uid(), kind: 'report narrator', pillar: 2, client: 'Northbound Agency', title: 'weekly summary', detail: 'Plain-language recap of this week: spend steady, conversions up 9%, Instagram carried the gains.', status: 'waiting', createdAt: ago(30) },
      { id: uid(), kind: 'crisis alarm', pillar: 3, client: 'Aster Digital', title: 'sentiment spike', detail: '2 posts turning negative in the last hour. Draft alert ready for the account lead.', status: 'waiting', createdAt: ago(55) },
      { id: uid(), kind: 'creator concierge', pillar: 1, client: 'Lumen & Co', title: 'follow-up sequence', detail: '3 follow-up messages for new course sign-ups, spaced over 5 days.', status: 'waiting', createdAt: ago(120) },
      { id: uid(), kind: 'ad radar', pillar: 0, client: 'Harbor Collective', title: 'competitor digest', detail: '4 new competitor ads this week — two new offers, one new creative style.', status: 'waiting', createdAt: ago(240) }
    ],
    audits: [
      { id: uid(), client: 'Harbor Collective', stage: 0, note: 'Meta + TikTok · access granted', createdAt: ago(60 * 5) },
      { id: uid(), client: 'Fernwood Media', stage: 1, note: 'server events mapped', createdAt: ago(60 * 24 * 6) },
      { id: uid(), client: 'Kestrel Group', stage: 2, note: '+31% recoverable conversions found', createdAt: ago(60 * 24 * 11) },
      { id: uid(), client: 'Aster Digital', stage: 3, note: 'fix plan delivered → now a tournament client', createdAt: ago(60 * 24 * 30) }
    ],
    settings: { whiteLabel: true, humanApproval: true, weeklyEmail: true, anomalyAlerts: true, beta: false },
    activity: [
      { id: uid(), pillar: 0, text: 'Aster Digital — server event batch synced', at: ago(2) },
      { id: uid(), pillar: 2, text: 'Northbound Agency — weekly report approved and sent', at: ago(41) },
      { id: uid(), pillar: 1, text: 'Fernwood Media — warehouse sync in progress', at: ago(65) },
      { id: uid(), pillar: 3, text: 'Kestrel Group — fourth pillar connected. four in a row.', at: ago(180) }
    ],
    /* sample integration data — in production these come from your pipelines (n8n etc.) */
    stats: { eventsToday: 18240, eventsDelta: 6, reportsWeek: 7, automationsToday: 12, volume: [3, 4, 3, 5, 4, 6, 6] },
    pillarData: {
      tracking: [
        ['14:22', 'Aster Digital', 'purchase', 'server', 'ok:delivered'],
        ['14:21', 'Harbor Collective', 'lead_form', 'browser fallback', 'pending:review'],
        ['14:20', 'Fernwood Media', 'add_to_cart', 'server', 'ok:delivered'],
        ['14:19', 'Kestrel Group', 'page_view', 'server', 'ok:delivered'],
        ['14:18', 'Northbound Agency', 'signup', 'server', 'ok:delivered']
      ],
      data: [
        ['Meta Ads', 'Aster Digital', 'ad platform', '3m ago', 'ok:connected'],
        ['Google Ads', 'Kestrel Group', 'ad platform', '3m ago', 'ok:connected'],
        ['Shopify', 'Fernwood Media', 'commerce', '1h ago', 'pending:syncing'],
        ['HubSpot', 'Northbound Agency', 'CRM', '22m ago', 'ok:connected'],
        ['TikTok Ads', 'Lumen & Co', 'ad platform', '—', 'off:not connected']
      ],
      reporting: [
        ['performance summary', 'Northbound Agency', 'weekly · mon 8am', 'in 4 days', 'ok:active'],
        ['channel breakdown', 'Aster Digital', 'monthly · 1st', 'in 12 days', 'ok:active'],
        ['spend vs conversions', 'Kestrel Group', 'weekly · fri 5pm', 'in 2 days', 'ok:active'],
        ['client dashboard', 'Fernwood Media', 'real-time', '—', 'ok:live']
      ],
      automation: [
        ['lead → CRM handoff', 'Lumen & Co', 'new form submission', '3h ago', 'ok:ok'],
        ['spend anomaly alert', 'Aster Digital', 'daily spend check', 'this morning', 'ok:ok'],
        ['whatsapp lead routing', 'Kestrel Group', 'new enquiry', '12m ago', 'ok:ok'],
        ['stale lead follow-up', 'Harbor Collective', 'no reply in 48h', '1 day ago', 'alert:needs review']
      ]
    },
    updatedAt: now()
  };
}

export async function readDb() {
  if (redis) {
    const d = await redis.get(KEY);
    if (d) return d;
    const fresh = seed();
    await redis.set(KEY, fresh);
    return fresh;
  }
  if (!globalThis.__c4db) globalThis.__c4db = seed();
  return globalThis.__c4db;
}

export async function writeDb(d) {
  d.updatedAt = now();
  if (redis) await redis.set(KEY, d);
  else globalThis.__c4db = d;
  return d;
}
