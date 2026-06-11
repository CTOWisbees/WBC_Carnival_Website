"""
Django settings for the Wisbees Business Carnival content admin.

This is a small, self-contained CMS whose only job is to let a non-technical
editor manage the images, videos and testimonials shown on the Next.js site.
It exposes one JSON endpoint (/api/content/) that the website reads.
"""
import os
from pathlib import Path

# backend/config/settings.py  ->  BASE_DIR = backend/
BASE_DIR = Path(__file__).resolve().parent.parent
# The Next.js project root that contains public/ (one level above backend/).
PROJECT_ROOT = BASE_DIR.parent

SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "dev-insecure-change-me-in-production")
DEBUG = os.environ.get("DJANGO_DEBUG", "1") == "1"


def _split_env(name):
    """Read a comma-separated environment variable into a clean list."""
    return [item.strip() for item in os.environ.get(name, "").split(",") if item.strip()]


# Hosts allowed to serve this app. Locally we keep the dev hosts; in production
# (Render) we add the public hostname and any custom domain via env vars.
ALLOWED_HOSTS = ["127.0.0.1", "localhost"]
ALLOWED_HOSTS += _split_env("DJANGO_ALLOWED_HOSTS")
RENDER_EXTERNAL_HOSTNAME = os.environ.get("RENDER_EXTERNAL_HOSTNAME")
if RENDER_EXTERNAL_HOSTNAME:
    ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "storages",
    "content",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    # Serves the admin's CSS/JS in production without a separate web server.
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# In production (Render) we use the Neon Postgres database from DATABASE_URL.
# Locally, with no DATABASE_URL set, we fall back to the bundled SQLite file so
# `npm run dev` keeps working with zero configuration.
if os.environ.get("DATABASE_URL"):
    import dj_database_url

    DATABASES = {
        "default": dj_database_url.config(
            conn_max_age=600,
            ssl_require=True,
        )
    }
else:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

AUTH_PASSWORD_VALIDATORS = []

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ── Static & media files ─────────────────────────────────────────────────
# Static files = the admin's own CSS/JS (served by WhiteNoise in production).
STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# Uploaded images/videos go to S3-compatible cloud storage (Supabase Storage)
# when the S3_* env vars are present. Without them we store uploads on the local
# disk so local development needs no cloud account.
USE_S3 = bool(os.environ.get("S3_BUCKET_NAME"))
if USE_S3:
    AWS_ACCESS_KEY_ID = os.environ["S3_ACCESS_KEY_ID"]
    AWS_SECRET_ACCESS_KEY = os.environ["S3_SECRET_ACCESS_KEY"]
    AWS_STORAGE_BUCKET_NAME = os.environ["S3_BUCKET_NAME"]
    AWS_S3_ENDPOINT_URL = os.environ["S3_ENDPOINT_URL"]
    # Supabase requires path-style addressing and a real region.
    AWS_S3_ADDRESSING_STYLE = os.environ.get("S3_ADDRESSING_STYLE", "path")
    AWS_S3_REGION_NAME = os.environ.get("S3_REGION", "auto")
    # Public host (+ path) used to build image URLs the website can load, e.g.
    # "<ref>.supabase.co/storage/v1/object/public/wbc-media".
    AWS_S3_CUSTOM_DOMAIN = os.environ.get("S3_PUBLIC_HOST") or None
    AWS_DEFAULT_ACL = None          # Bucket is public; no per-object ACLs.
    AWS_QUERYSTRING_AUTH = False    # Serve plain (unsigned) public URLs.
    AWS_S3_FILE_OVERWRITE = False
    _default_storage = {"BACKEND": "storages.backends.s3boto3.S3Boto3Storage"}
else:
    _default_storage = {"BACKEND": "django.core.files.storage.FileSystemStorage"}

STORAGES = {
    "default": _default_storage,
    "staticfiles": {"BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"},
}

# ── Cross-origin / CSRF ──────────────────────────────────────────────────
# The public website (on Cloudflare) fetches /api/content/ from the browser, so
# its origin must be allowed here. Dev origins are always allowed; production
# origins come from CORS_ALLOWED_ORIGINS (e.g. https://www.wisbees.com).
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
CORS_ALLOWED_ORIGINS += _split_env("CORS_ALLOWED_ORIGINS")

# Needed for logging into the Django admin over HTTPS on a custom domain.
CSRF_TRUSTED_ORIGINS = _split_env("DJANGO_CSRF_TRUSTED_ORIGINS")
if RENDER_EXTERNAL_HOSTNAME:
    CSRF_TRUSTED_ORIGINS.append(f"https://{RENDER_EXTERNAL_HOSTNAME}")

# ── Production hardening (active only when DEBUG is off) ──────────────────
if not DEBUG:
    # Render terminates HTTPS at its proxy and forwards this header.
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
