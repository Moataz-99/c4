# Connect 4 Digital Tech

Marketing site + admin dashboard, built with **Next.js 15** (App Router).

- `/` — the site (four moves, coin navigation, drop-to-win game, contact form)
- `/admin` — the admin board (password protected)
- `/api/contact` — saves contact-form messages into the admin **Inbox**

## Deploy to Vercel

1. Push this folder to a new GitHub repository.
2. On vercel.com → **Add New → Project** → import the repo. Vercel detects Next.js automatically.
3. Add **Environment Variables** in *Project → Settings → Environment Variables*:

   | name | value |
   |---|---|
   | `ADMIN_PASSWORD` | the password for `/admin` (required) |
   | `AUTH_SECRET` | a long random string, e.g. the output of `openssl rand -hex 32` |

4. **Add the database** so changes are saved: *Project → Storage* → connect an **Upstash Redis** store
   (Vercel Marketplace, has a free tier). It adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` for you. Redeploy.
   Without it the dashboard runs in **demo mode**: everything works, but resets when the server restarts.
5. Optional: set `N8N_WEBHOOK_URL` to also forward every contact-form message to an n8n workflow.

Alternative without GitHub: run `npx vercel` in this folder and follow the prompts, add the
variables with `npx vercel env add`, then run `npx vercel --prod`.

## Run locally

```bash
npm install
cp .env.example .env.local   # then set ADMIN_PASSWORD
npm run dev                  # http://localhost:3000
```

## Before going live

Replace the placeholders in `components/site/Contact.jsx` and `components/site/Footer.jsx`:
the WhatsApp number, the LinkedIn link, and `hello@connect4.tech` if your domain differs.
The pillar tables in the dashboard (tracking events, data sources, reports, workflows) are sample
data in `lib/db.js` — that's where your n8n pipelines would write real numbers.

## Where things live

```
app/(site)/         site layout, page, styles
app/admin/          dashboard page, login, styles
app/api/            contact, admin actions, login/logout
components/site/    one component per section + DropToWin, CoinNav, ContactForm
components/admin/   Dashboard shell + all views
lib/db.js           storage (Upstash Redis, or in-memory demo mode) + sample data
lib/actions.js      every change the dashboard can make
lib/auth.js         signed login cookie
middleware.js       protects /admin and /api/admin
```
