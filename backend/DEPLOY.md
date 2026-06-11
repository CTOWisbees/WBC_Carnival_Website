# Deploying the WBC admin (Render + Neon + Cloudflare R2)

This guide puts the **admin panel** online at `https://admin.wisbees.com` for free,
with your content and uploaded images stored permanently. Your **public website**
stays on Cloudflare and reads its content live from the admin — so when you change
something in the admin, the website updates within a few seconds.

You only do this setup once. After that, day-to-day you just log into the admin
and edit. **No coding, no redeploys.**

Three free accounts are involved:
- **Neon** — the permanent database (your text content).
- **Supabase Storage** — permanent storage for uploaded images/videos (no card).
- **Render** — runs the Django admin itself.

---

## Phase 1 — Create the database (Neon)

1. Go to https://neon.com and sign up (free).
2. Create a new project (any name, e.g. `wbc`). Pick the region closest to India.
3. On the project dashboard, find **Connection string** and copy it. It looks like:
   `postgresql://USER:PASSWORD@ep-xxxx.region.aws.neon.tech/dbname?sslmode=require`
4. Keep this safe — it's the value for `DATABASE_URL` later.

---

## Phase 2 — Create image storage (Supabase Storage)

1. Go to https://supabase.com → sign up (free, no card). **New project** →
   name `wbc`, region closest to India (e.g. **Southeast Asia (Singapore)**),
   set a database password (required by Supabase but we won't use their DB).
   Wait ~2 minutes for it to provision.
2. **Storage** (left sidebar) → **New bucket** → name `wbc-media` →
   toggle **Public bucket ON** → Create.
3. Collect these values:
   - **Project URL:** Settings → Data API (or Project Settings → API) →
     `https://<ref>.supabase.co`. The `<ref>` part is your project ref.
   - **S3 connection:** Project Settings → Storage → **S3 Connection**. Note the
     **Endpoint** (`https://<ref>.supabase.co/storage/v1/s3`) and **Region**
     (e.g. `ap-southeast-1`).
   - **S3 access keys:** same page → **New access key** → copy the
     **Access Key ID** and **Secret Access Key** (secret shown once).

   These map to the env vars:
   - `S3_BUCKET_NAME` = `wbc-media`
   - `S3_ENDPOINT_URL` = `https://<ref>.supabase.co/storage/v1/s3`
   - `S3_REGION` = your project region, e.g. `ap-southeast-1`
   - `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` = the keys above
   - `S3_PUBLIC_HOST` = `<ref>.supabase.co/storage/v1/object/public/wbc-media`
     (no `https://`)

---

## Phase 3 — Deploy the admin (Render)

1. Push this repository to GitHub (if it isn't already).
2. Go to https://render.com → sign up (free) → connect your GitHub.
3. **New + → Web Service** → pick this repo.
4. Settings:
   - **Root Directory:** `backend`
   - **Runtime:** Python
   - **Build Command:** `bash build.sh`
   - **Start Command:** `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`
   - **Instance type:** Free
5. Add **Environment Variables** (Advanced → Add Environment Variable):

   | Key | Value |
   |---|---|
   | `DJANGO_DEBUG` | `0` |
   | `DJANGO_SECRET_KEY` | *(click Generate, or paste a long random string)* |
   | `DJANGO_ALLOWED_HOSTS` | `admin.wisbees.com` |
   | `DJANGO_CSRF_TRUSTED_ORIGINS` | `https://admin.wisbees.com` |
   | `CORS_ALLOWED_ORIGINS` | *(your live website, e.g. `https://www.wisbees.com`)* |
   | `DATABASE_URL` | *(from Neon, Phase 1)* |
   | `S3_BUCKET_NAME` | `wbc-media` |
   | `S3_ACCESS_KEY_ID` | *(from Supabase)* |
   | `S3_SECRET_ACCESS_KEY` | *(from Supabase)* |
   | `S3_ENDPOINT_URL` | `https://<ref>.supabase.co/storage/v1/s3` |
   | `S3_REGION` | *(e.g. `ap-southeast-1`)* |
   | `S3_PUBLIC_HOST` | `<ref>.supabase.co/storage/v1/object/public/wbc-media` |
   | `DJANGO_SUPERUSER_USERNAME` | `admin` |
   | `DJANGO_SUPERUSER_PASSWORD` | *(a strong password — you'll log in with this)* |
   | `DJANGO_SUPERUSER_EMAIL` | `you@wisbees.com` |

6. **Create Web Service.** Render builds and deploys (a few minutes). When done
   you get a URL like `https://wbc-admin.onrender.com`. Visit
   `https://wbc-admin.onrender.com/admin` and log in with the username/password
   above to confirm it works.

> Tip: the very first request after 15 minutes idle takes ~30–60s to wake. The
> pinger in Phase 5 fixes that.

---

## Phase 4 — Put the admin on admin.wisbees.com (Cloudflare DNS)

wisbees.com is *registered* at BigRock, but its nameservers point to
**Cloudflare** (`*.ns.cloudflare.com`), so DNS records are edited in the
**Cloudflare dashboard**, not BigRock. (Records added in BigRock are ignored.)

1. In Render → your service → **Settings → Custom Domains → Add**:
   `admin.wisbees.com`. Render shows a DNS target like
   `wbc-admin-2954.onrender.com`.
2. In Cloudflare → **wisbees.com → DNS → Add record**:
   - Type: `CNAME`
   - Name: `admin`
   - Target: the Render target (`wbc-admin-2954.onrender.com`)
   - Proxy status: **DNS only** (grey cloud) — so Render can verify and issue HTTPS.
3. Wait a few minutes; Render verifies the domain and issues HTTPS.
   `https://admin.wisbees.com/admin` should now load.

---

## Phase 5 — Keep it awake (UptimeRobot, free)

1. Go to https://uptimerobot.com → sign up (free).
2. **Add New Monitor** → type **HTTP(s)** → URL: `https://admin.wisbees.com/api/content/`
   → interval **every 5 minutes**. Save.
3. This quietly pokes the backend so it never falls asleep — keeping admin edits
   showing up in ~1–3 seconds.

---

## Phase 6 — Connect the website (done with Claude)

1. The file `.env.production` points the website at the live admin:
   `NEXT_PUBLIC_DJANGO_URL=https://admin.wisbees.com`
2. Rebuild and redeploy the static site to Cloudflare:
   ```powershell
   npm run build
   npx wrangler deploy
   ```
3. Open your live website. Within a few seconds it pulls content from the admin.
   Make a test edit in the admin, refresh the site — it should change.

---

## Everyday use (the non-tech part)

- Go to `https://admin.wisbees.com/admin`, log in.
- Edit Site Configuration, Partner Logos, Gallery Photos, Testimonials,
  Sponsorship Tiers, Videos. Upload an image or paste a URL; uploads win.
- Save. Your website reflects the change within a few seconds (on refresh).
- **No rebuild or redeploy needed for content changes.**

## Troubleshooting

- **Website didn't change after an edit:** hard-refresh (Ctrl+Shift+R). If still
  stale, the backend may be waking up — wait ~1 min and refresh again.
- **Images don't appear:** check the Supabase bucket is set **Public** and
  `S3_PUBLIC_HOST` is `<ref>.supabase.co/storage/v1/object/public/wbc-media`.
- **Can't log into admin (CSRF error):** confirm `DJANGO_CSRF_TRUSTED_ORIGINS`
  includes `https://admin.wisbees.com`.
- **Website blocked fetching content (CORS):** confirm `CORS_ALLOWED_ORIGINS` on
  Render lists your exact website origin (scheme + domain, no trailing slash).
