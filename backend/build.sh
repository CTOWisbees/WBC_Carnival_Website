#!/usr/bin/env bash
# Render build step for the WBC content admin.
# Runs from the `backend/` directory (Render "Root Directory" = backend).
set -o errexit

pip install -r requirements.txt

# Collect the admin's static files for WhiteNoise to serve.
python manage.py collectstatic --no-input

# Apply database migrations (Neon Postgres).
python manage.py migrate

# Create the admin login + load the site's starting content. Idempotent:
# safe to run on every deploy — it skips anything that already exists.
python manage.py seed
