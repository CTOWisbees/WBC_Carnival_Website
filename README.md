# Wisbees Business Carnival Website

Marketing and information website for the Wisbees Business Carnival (WBC) event.

## Stack

- **Frontend:** Next.js 15, React 18, Tailwind CSS, Framer Motion
- **Backend / CMS:** Django (Python) — admin panel + JSON content API
- **Database:** SQLite (dev)

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+

### Setup

```powershell
# Install frontend dependencies
npm install

# Set up the Django backend (creates venv, installs packages, runs migrations)
npm run setup
```

### Development

```powershell
# Runs Next.js + Django concurrently
npm run dev
```

- Frontend: http://localhost:3000
- Django admin: http://localhost:8000/admin

## Project Structure

```
/app              # Next.js pages (App Router)
/components       # React components
/lib              # Shared data and utilities
/backend          # Django CMS
  /content        # Models, views, admin, migrations
  /config         # Django settings and URL config
```

## Content Management

All site content (hero, gallery, testimonials, videos, sponsors, ecosystem products) is managed via the Django admin at `/admin`. The frontend fetches from `/api/content/` at build time or on request.

## Environment Variables

| Variable | Description |
|---|---|
| `DJANGO_SECRET_KEY` | Django secret key (required in production) |
| `DJANGO_DEBUG` | Set to `0` in production |
| `DJANGO_ALLOWED_HOSTS` | Comma-separated list of allowed hostnames |
| `RENDER_EXTERNAL_HOSTNAME` | Auto-set by Render for the public hostname |

## Build

```powershell
npm run build
npm run start
```
