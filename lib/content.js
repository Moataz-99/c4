/* Everything on the website that can be edited from the admin dashboard.
   DEFAULTS is the original wording; whatever is saved in the database overrides it section by section.
   SECTIONS describes the edit form for each section. */

export const DEFAULTS = {
  brand: {
    tagline: 'backend ops for agencies',
    demoButton: 'book a demo',
    footer: '© 2026 connect 4 digital tech · four in a row, every time'
  },
  tabs: {
    items: [
      { label: 'the problem', detail: 'what we fix · the four pillars' },
      { label: 'the proof', detail: 'white label · demos · our work' },
      { label: 'the edge', detail: 'private AI · tracking audit' },
      { label: 'the win', detail: 'how it works · pricing · contact' }
    ],
    nextLead: 'next up:',
    finalLine: "four in a row. that's the whole board.",
    restart: 'back to the start'
  },
  dropbar: {
    idle: 'insert coin to connect',
    wins: ['your stack, connected.', 'your logo, our uptime.', 'no duct tape required.', 'the backend team you never hired.'],
    cleared: 'board cleared.',
    next: 'next agency, please.',
    score: 'rows this visit'
  },
  hero: {
    eyebrow: 'for agencies who are done duct-taping',
    line1: 'your stack, finally',
    line2: 'four in a row',
    lede: 'we run the tracking, data, reporting and automation behind your client work. your logo on it, not ours.',
    cta1: 'drop your first connection',
    cta2: 'see what we connect'
  },
  game: {
    hint: "three are already in. drop the fourth — it's the actual game we're named after.",
    button: 'drop the winning piece',
    winTitle: '🏆 four in a row!',
    winStory: "as you dropped that fourth piece, we quietly connected four systems right behind it — tracking, data, reporting, automation. that's the whole pitch.",
    again: 'drop again',
    real: 'see it for real',
    toyHint: 'psst — click anywhere to drop a disc'
  },
  about: {
    text: "we're not another dashboard — we're the backend team that plugs straight into your agency's delivery, invisibly.",
    counters: [
      { num: '4', label: 'pillars we\nconnect' },
      { num: '4', label: 'steps to\ngo live' },
      { num: '4', label: 'board sizes\nto pick from' },
      { num: '1', label: 'logo on it —\nyours' }
    ]
  },
  problem: {
    label: 'what we fix',
    title: 'four things break, and none of them are your job',
    subtitle: "every agency backend has the same four failure points. you didn't sign up to debug pixels — we did.",
    cards: [
      { title: 'tracking', text: 'conversions stopped matching the ad platform three weeks ago and nobody can say why.' },
      { title: 'data', text: 'every client sits in a different set of tools and none of them talk to each other.' },
      { title: 'reporting', text: 'someone on your team spends two days a month copying numbers into slides.' },
      { title: 'automation', text: 'the workflow only works because one person remembers to click the thing.' }
    ],
    closer: "you sell strategy. you shouldn't be debugging pixels at 11pm."
  },
  pillars: {
    label: 'what we connect',
    title: "drop in what's missing",
    subtitle: "pick one pillar or all four. every connection ships white-labelled under your agency's name.",
    cards: [
      { title: 'tracking that survives', text: "server-side events that don't disappear when a browser blocks them." },
      { title: 'data in one place', text: 'every platform, every client, one warehouse you actually own.' },
      { title: 'reporting that runs itself', text: 'dashboards your client opens themselves. no monthly scramble.' },
      { title: 'automation that holds', text: 'the handoffs, the alerts, the reports. built once, runs quietly.' }
    ]
  },
  whiteLabel: {
    label: 'white label',
    title: 'your logo. our uptime.',
    body: "your client never sees us. the dashboard is yours, the domain is yours, the credit is yours. we're the part of your agency that happens to be very good at backends.",
    closing: 'you keep the relationship. we keep the pager.'
  },
  demos: {
    label: 'see it in action',
    title: "what you'll actually be looking at",
    subtitle: 'a quick look at the screens behind the pitch — including the admin dashboard your team runs day to day.',
    dashTitle: 'admin dashboard',
    dashText: 'one calm screen for every client — connections, activity, and status at a glance. the agency admin console — sign in to see the live board.',
    dashLink: 'open the full dashboard →',
    cards: [
      { title: 'tracking', text: 'server-side events landing in real time, even when the browser blocks the pixel.' },
      { title: 'reporting', text: 'dashboards your client opens themselves — no monthly export.' },
      { title: 'automation', text: 'the handoffs and alerts, built once, running quietly since.' }
    ]
  },
  work: {
    label: 'not theory',
    title: "things we've already shipped",
    subtitle: 'real builds, running in production for real businesses.',
    builds: [
      { title: 'comment-to-lead engine', who: 'retail brand, social-led', text: 'comments on organic and paid posts captured automatically, intent extracted, enriched into a qualified lead list and routed into a follow-up campaign.', stack: 'n8n · Firecrawl · self-hosted AI', win: 'cost per lead a fraction of the SaaS equivalent.' },
      { title: 'receipts straight into the ERP', who: 'distribution business on Odoo', text: 'receipts read automatically, line items and totals extracted, and written into Odoo with pricing and reconciliation logic applied on the way in.', stack: 'OCR pipeline · n8n · Odoo API', win: 'manual data entry gone. numbers finally agree.' },
      { title: 'one dashboard, every channel', who: 'multi-channel advertiser', text: 'TikTok, Facebook, Instagram and WhatsApp performance in a single live view — spend, reach and response on one screen.', stack: 'platform APIs · n8n · custom dashboard', win: 'five tabs and a spreadsheet became one link.' }
    ],
    slotTitle: 'your build',
    slotWho: 'the fourth slot is open',
    slotText: 'three pieces down. the next thing we ship could be the one that completes your row.',
    slotLink: 'start with the audit →',
    note: 'client names withheld — the same discretion your clients get from us.'
  },
  ai: {
    label: 'private AI',
    title: 'AI power, without the AI bill',
    lede: 'we run open AI models on our own servers. your clients get the capability — without per-message costs or their data leaving home.',
    serverKicker: 'OUR SERVER',
    serverTitle: 'running open models',
    models: ['Llama', 'Qwen', 'Mistral', 'Gemma', 'Whisper'],
    reasons: [
      { title: 'flat cost, not per message', text: 'one fixed monthly bill. the ten-thousandth message costs the same as the first.' },
      { title: 'client data stays home', text: 'briefs, comments and customer data never leave our infrastructure.' },
      { title: 'arabic-capable', text: "open models handle Arabic well and can be tuned on each brand's own content." },
      { title: 'no lock-in', text: 'when a better model ships, we swap it in. nothing gets rebuilt.' }
    ],
    routingTitle: 'smart routing.',
    routingText: 'local models handle the volume; premium AI is called only for the cases worth paying for.',
    ideas: [
      { title: 'crisis alarm', text: "flags a brand's comment sentiment turning — dialect-aware — before it trends." },
      { title: 'report narrator', text: 'turns the numbers into a plain-language summary a client actually reads.' },
      { title: 'competitor ad radar', text: "watches competitors' live ads and surfaces what changed each week." },
      { title: 'creator concierge', text: 'booking, payments and follow-ups for personal brands — built once, reused across the roster.' }
    ],
    principle: 'AI does the heavy lifting. a person approves anything a client sees.'
  },
  audit: {
    label: 'where we start',
    title: 'the tracking audit',
    text: "most agencies' reported ROAS is lower than their real ROAS — browser-only tracking quietly loses a share of conversions. we prove it on one account before you commit to anything.",
    items: [
      'full review of pixel, server-side and platform event setup',
      'side-by-side of reported vs. actually recoverable conversions',
      'fixes ranked by the revenue they recover',
      'a fix plan you can act on, with or without us'
    ],
    button: 'start with one account',
    facts: [
      { num: '1', label: 'account' },
      { num: '2', label: 'weeks' },
      { num: '1', label: 'fixed fee' },
      { num: '0', label: 'lock-in after' }
    ]
  },
  how: {
    label: 'how it works',
    title: 'four steps, one connected stack',
    steps: [
      { title: "we look at what's broken", text: 'free, 30 minutes, no deck.' },
      { title: 'we connect the first thing', text: 'usually tracking — the highest-pain, fastest-win piece.' },
      { title: 'we connect the other three', text: 'data, reporting, automation — at your pace.' },
      { title: 'four in a row', text: 'a backend that runs quietly, under your name.' }
    ]
  },
  pricing: {
    label: 'pricing',
    title: 'pick your board size',
    tiers: [
      { name: 'solo', desc: 'one client, one connection. for testing us.', features: ['one active client', 'one pillar of your choice', 'email support'], button: 'drop a disc', badge: '' },
      { name: 'duo', desc: 'a handful of clients, full stack.', features: ['up to 5 clients', 'all four pillars', 'priority support'], button: 'drop a disc', badge: '' },
      { name: 'tournament', desc: 'unlimited clients, white-label, your brand everywhere.', features: ['unlimited clients', 'all four pillars', 'full white-label', 'priority support'], button: 'drop a disc', badge: 'most popular' },
      { name: 'league', desc: 'agency groups and multi-brand networks.', features: ['multiple agencies or brands', 'custom integrations', 'dedicated engineer', 'agreed SLAs'], button: 'talk to us', badge: '' }
    ]
  },
  cta: {
    title: 'still doing this manually?',
    text: "no deck. we'll open your account and tell you what's broken.",
    button: 'book 30 minutes'
  },
  contact: {
    label: 'contact',
    title: 'your move.',
    text: "tell us what's broken, or just say hi. four ways to reach us — pick the one you'd actually use.",
    email: 'hello@connect4.tech',
    whatsapp: '+20 1XX XXX XXXX',
    location: 'Cairo, Egypt',
    linkedinLabel: 'connect 4 digital tech',
    linkedinUrl: 'https://www.linkedin.com/',
    replyNote: 'we reply within one working day.',
    formTitle: 'drop us a message',
    formSub: 'takes a minute. no deck, no sales script.',
    formButton: 'drop it in',
    sentTitle: 'message dropped in.',
    sentText: "four in a row — we'll be in touch within a working day."
  }
};

/* field helpers for the editor */
const t = (k, label, extra = {}) => ({ k, label, ...extra });
const long = (k, label) => t(k, label, { long: true });
const list = (k, label, fields, opts = {}) => t(k, label, { type: 'list', fields, ...opts });
const lines = (k, label, opts = {}) => t(k, label, { type: 'lines', ...opts });

export const SECTIONS = [
  { key: 'contact', title: 'Contact details', tab: 'win', anchor: 'contact', fields: [
    t('email', 'email address'), t('whatsapp', 'WhatsApp number (as shown, include the country code)'), t('location', 'based in'),
    t('linkedinLabel', 'LinkedIn — shown text'), t('linkedinUrl', 'LinkedIn — link'), t('replyNote', 'reply-time line'),
    t('label', 'section label'), t('title', 'heading'), long('text', 'intro text'),
    t('formTitle', 'form heading'), t('formSub', 'form subtext'), t('formButton', 'send button'),
    t('sentTitle', 'after sending — heading'), t('sentText', 'after sending — text')
  ] },
  { key: 'brand', title: 'Header & footer', tab: 'problem', fields: [
    t('tagline', 'tagline next to the logo'), t('demoButton', 'header button'), t('footer', 'footer line')
  ] },
  { key: 'tabs', title: 'Tabs', tab: 'problem', fields: [
    list('items', 'the four tabs', [t('label', 'name'), t('detail', 'what it holds (shown on hover)')], { fixed: 4, itemName: 'tab' }),
    t('nextLead', 'end of tab — text before the next tab name'), t('finalLine', 'end of the last tab'), t('restart', 'last tab — button')
  ] },
  { key: 'dropbar', title: 'Drop-bar', tab: 'problem', fields: [
    t('idle', 'waiting text'), lines('wins', 'punchlines after “four in a row” (one per line)', { max: 8 }),
    t('cleared', 'after the release'), t('next', 'after the release — bold part'), t('score', 'score label')
  ] },
  { key: 'hero', title: 'Hero', tab: 'problem', anchor: 'tab-problem', fields: [
    t('eyebrow', 'small tag above the headline'), t('line1', 'headline — first line'), t('line2', 'headline — highlighted line'),
    long('lede', 'intro text'), t('cta1', 'pink button'), t('cta2', 'blue button')
  ] },
  { key: 'game', title: 'Drop-to-win game', tab: 'problem', anchor: 'tab-problem', fields: [
    long('hint', 'text above the board'), t('button', 'drop button'), t('winTitle', 'win — heading'), long('winStory', 'win — story'),
    t('again', 'win — replay button'), t('real', 'win — contact button'), t('toyHint', 'first-visit hint')
  ] },
  { key: 'about', title: 'Intro strip', tab: 'problem', fields: [
    long('text', 'sentence under the hero'),
    list('counters', 'four counters', [t('num', 'number'), long('label', 'label (press Enter for a line break)')], { fixed: 4, itemName: 'counter' })
  ] },
  { key: 'problem', title: 'What we fix', tab: 'problem', anchor: 'problem', fields: [
    t('label', 'section label'), t('title', 'heading'), long('subtitle', 'subheading'),
    list('cards', 'the four problem cards', [t('title', 'title'), long('text', 'text')], { fixed: 4, itemName: 'card' }),
    t('closer', 'closing line')
  ] },
  { key: 'pillars', title: 'What we connect', tab: 'problem', anchor: 'pillars', fields: [
    t('label', 'section label'), t('title', 'heading'), long('subtitle', 'subheading'),
    list('cards', 'the four pillars', [t('title', 'title'), long('text', 'text')], { fixed: 4, itemName: 'pillar' })
  ] },
  { key: 'whiteLabel', title: 'White label', tab: 'proof', anchor: 'white-label', fields: [
    t('label', 'section label'), t('title', 'heading'), long('body', 'text'), t('closing', 'bold closing line')
  ] },
  { key: 'demos', title: 'Demos', tab: 'proof', anchor: 'demos', fields: [
    t('label', 'section label'), t('title', 'heading'), long('subtitle', 'subheading'),
    t('dashTitle', 'dashboard card — title'), long('dashText', 'dashboard card — text'), t('dashLink', 'dashboard card — link'),
    list('cards', 'the three small cards', [t('title', 'title'), long('text', 'text')], { fixed: 3, itemName: 'card' })
  ] },
  { key: 'work', title: 'Shipped work', tab: 'proof', anchor: 'work', fields: [
    t('label', 'section label'), t('title', 'heading'), long('subtitle', 'subheading'),
    list('builds', 'builds', [t('title', 'title'), t('who', 'client type'), long('text', 'what it does'), t('stack', 'stack'), t('win', 'result')], { max: 6, itemName: 'build' }),
    t('slotTitle', 'open slot — title'), t('slotWho', 'open slot — subtitle'), long('slotText', 'open slot — text'), t('slotLink', 'open slot — link'),
    t('note', 'note under the cards')
  ] },
  { key: 'ai', title: 'Private AI', tab: 'edge', anchor: 'ai', fields: [
    t('label', 'section label'), t('title', 'heading'), long('lede', 'subheading'),
    t('serverKicker', 'server card — small label'), t('serverTitle', 'server card — title'), lines('models', 'models (one per line)', { max: 8 }),
    list('reasons', 'reasons', [t('title', 'title'), long('text', 'text')], { max: 6, itemName: 'reason' }),
    t('routingTitle', 'routing box — bold start'), long('routingText', 'routing box — text'),
    list('ideas', 'AI ideas', [t('title', 'title'), long('text', 'text')], { max: 8, itemName: 'idea' }),
    t('principle', 'closing line')
  ] },
  { key: 'audit', title: 'Tracking audit', tab: 'edge', anchor: 'audit', fields: [
    t('label', 'section label'), t('title', 'heading'), long('text', 'text'), lines('items', 'what’s included (one per line)', { max: 8 }),
    t('button', 'button'), list('facts', 'the four fact discs', [t('num', 'number'), t('label', 'label')], { fixed: 4, itemName: 'fact' })
  ] },
  { key: 'how', title: 'How it works', tab: 'win', anchor: 'how', fields: [
    t('label', 'section label'), t('title', 'heading'),
    list('steps', 'the four steps', [t('title', 'title'), long('text', 'text')], { fixed: 4, itemName: 'step' })
  ] },
  { key: 'pricing', title: 'Pricing', tab: 'win', anchor: 'pricing', fields: [
    t('label', 'section label'), t('title', 'heading'),
    list('tiers', 'the four plans (board sizes 1–4)', [t('name', 'plan name'), long('desc', 'description'), lines('features', 'features (one per line)', { max: 8 }), t('button', 'button'), t('badge', 'badge (leave empty for none)')], { fixed: 4, itemName: 'plan' })
  ] },
  { key: 'cta', title: 'Final call to action', tab: 'win', anchor: 'cta', fields: [
    t('title', 'heading'), long('text', 'text'), t('button', 'button')
  ] }
];

/* the saved content always sits on top of the defaults, so new fields keep working after updates */
export function mergeContent(saved) {
  const out = {};
  for (const key of Object.keys(DEFAULTS)) out[key] = { ...DEFAULTS[key], ...(saved && typeof saved[key] === 'object' ? saved[key] : {}) };
  return out;
}

/* keeps only known fields, trims strings, caps list lengths */
export function cleanSection(key, value) {
  const section = SECTIONS.find((s) => s.key === key);
  if (!section) throw new Error('unknown section');
  const str = (v, max = 1200) => String(v ?? '').slice(0, max);
  const cleanField = (f, v, def) => {
    if (f.type === 'lines') {
      const arr = (Array.isArray(v) ? v : String(v ?? '').split('\n')).map((x) => str(x, 300).trim()).filter(Boolean);
      return arr.slice(0, f.max || 12);
    }
    if (f.type === 'list') {
      let arr = Array.isArray(v) ? v : def;
      arr = f.fixed ? Array.from({ length: f.fixed }, (_, i) => arr[i] || def[i] || {}) : arr.slice(0, f.max || 12);
      return arr.map((item) => Object.fromEntries(f.fields.map((sf) => [sf.k, cleanField(sf, item?.[sf.k], [])])));
    }
    return str(v);
  };
  const def = DEFAULTS[key];
  return Object.fromEntries(section.fields.map((f) => [f.k, cleanField(f, value?.[f.k], def[f.k])]));
}
