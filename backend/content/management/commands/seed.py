"""
Seed the content database with the website's CURRENT images, videos and
testimonials, so the live site looks byte-for-byte identical on first run.

Idempotent: re-running it will not create duplicates. Local assets (logo,
hero video, partner logos) are copied from the Next.js `public/` folder into
Django's media store; everything else is seeded as external URLs that an
editor can later replace with uploads.
"""
import os

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.files import File
from django.core.management.base import BaseCommand

from content.models import GalleryPhoto, PartnerLogo, SiteConfig, Testimonial, Video

PUBLIC = settings.PROJECT_ROOT / "public"

# (name, public-filename)
PARTNERS = [
    ("Ryan International School", "Ryan_International_Group_logo.png"),
    ("VIBGYOR High School", "vibgyor.png"),
    ("Kaira Developers", "kairadevelopers.png"),
]

# (caption, unsplash-url, show_on_home) — first four mirror the home "Glimpses" strip.
_U = "https://images.unsplash.com/photo-{}?w=800&q=80&fit=crop"
GALLERY = [
    ("WBC Event 2024", _U.format("1540575467063-178a50c2df87"), True),
    ("Students presenting", _U.format("1529156069898-49953e39b3ac"), True),
    ("Business pitch", _U.format("1556761175-b413da4baf72"), True),
    ("Panel discussion", _U.format("1517245386807-bb43f82c33c4"), True),
    ("Team collaboration", _U.format("1519389950473-47ba0277781c"), False),
    ("Students at work", _U.format("1523240795612-9a054b0db644"), False),
    ("Conference hall", _U.format("1544531585-9847b68c8c86"), False),
    ("School students", _U.format("1503676260728-1c00da094a0b"), False),
    ("Team working", _U.format("1551434678-e076c223a692"), False),
    ("Live presentation", _U.format("1496180470114-6ef490f3ff22"), False),
    ("Business workshop", _U.format("1568992688065-536aad8a12f6"), False),
    ("Award ceremony", _U.format("1474631245212-32dc3c8310c6"), False),
    ("Group activity", _U.format("1491438590914-bc09fcaaf77a"), False),
    ("Entrepreneur talk", _U.format("1559136555-9303baea8ebd"), False),
    ("Workshop session", _U.format("1606761568499-6d2451b23c66"), False),
    ("Student pitch", _U.format("1515187029135-18ee286d815b"), False),
]

# (quote, name, role, avatar-url)
_R = "https://randomuser.me/api/portraits/{}.jpg"
HOME_COLUMN = [
    ("WBC Solutions transformed our operations entirely. Their strategic roadmap helped us reduce costs by 40% while improving output quality across the board.", "Briana Patton", "Operations Manager", _R.format("women/1")),
    ("Working with WBC was seamless from day one. Their team understood our needs quickly and delivered results that exceeded every expectation we had.", "Bilal Ahmed", "IT Manager", _R.format("men/2")),
    ("The support and guidance from WBC throughout our digital transformation was exceptional. They made a complex process feel entirely manageable.", "Saman Malik", "Customer Support Lead", _R.format("women/3")),
    ("WBC's strategic insights were invaluable for our expansion into new markets. Their data-driven approach gave us the confidence to make bold moves.", "Omar Raza", "CEO", _R.format("men/4")),
    ("Their robust methodology and quick turnaround transformed our entire workflow. We are significantly more efficient thanks to WBC Solutions.", "Zainab Hussain", "Project Manager", _R.format("women/5")),
    ("The implementation was smooth and the results were immediate. WBC streamlined our processes in ways we hadn't imagined were possible.", "Aliza Khan", "Business Analyst", _R.format("women/6")),
    ("Our brand presence and customer reach improved dramatically after WBC's marketing strategy overhaul. Highly recommend their expertise.", "Farhan Siddiqui", "Marketing Director", _R.format("men/7")),
    ("WBC delivered a solution that truly understood our business. Their consultants felt like part of our own team throughout the engagement.", "Sana Sheikh", "Sales Manager", _R.format("women/8")),
    ("Our e-commerce performance has never been better. WBC's analytics-driven approach boosted our conversion rates by over 60% in just three months.", "Hassan Ali", "E-commerce Manager", _R.format("men/9")),
]

# (quote, name, avatar-url)
_P = "https://i.pravatar.cc/150?img={}"
PARENTS = [
    ("My son came home and spent the entire dinner explaining business ideas he wanted to start. As a parent, I was surprised to see him so excited about building his own. Wisbees Business Carnival made him think beyond marks and careers.", "Parent of Arnav — Sanskriti School", _P.format(12)),
    ("Ritika was so inspired by the event that she and her friends are now actively brainstorming and exploring real-world business ideas they can implement.", "Parent of Ritika — Sri Chaitanya School", _P.format(47)),
    ("I had never seen my daughter beyond studies. This event has helped her to think differently.", "Anushka's Mother", _P.format(48)),
    ("What makes WBC different is that it doesn't tell children what to think — it teaches them how to think.", "Parent of Devansh", _P.format(15)),
    ("For the first time, my child understood concepts like budgeting, teamwork, and leadership through real experiences instead of textbooks.", "Parent of Vivaan — Sri Chaitanya School", _P.format(53)),
    ("What impressed me most was how engaged the students were throughout the event. They were thinking, discussing, pitching, and learning continuously.", "Parent of Reyansh — VIBGYOR School", _P.format(33)),
]

SCHOOLS = [
    ("WBC was the highlight of our academic calendar. Students were engaged, energised and talking about it for weeks after the event.", "Principal Meera Sharma, Delhi Public School", _P.format(32)),
    ("The WBC team was professional, organised and incredibly supportive throughout. Seamless execution from start to finish.", "Vice Principal Arjun Bose, Heritage School Kolkata", _P.format(59)),
    ("We've hosted many events, but nothing has created the kind of buzz among students that WBC did. The energy on that day was electric.", "Ms. Lakshmi Patel, Coordinator — Ryan International", _P.format(36)),
    ("WBC aligned perfectly with our vision of holistic education. Our students didn't just learn — they led, they sold, they won.", "Principal Rajan Nair, The International School Bangalore", _P.format(67)),
    ("The sponsors were real, the money was real, the stakes felt real. That's the magic of WBC — it's not a simulation, it's the real thing.", "Ms. Pooja Mehta, Activity Head — Podar International", _P.format(40)),
    ("Our quietest students became the loudest voices on WBC day. The transformation in confidence was remarkable to witness.", "Mr. Sandeep Kulkarni, Principal — Orchid International", _P.format(61)),
    ("We had students from Grade 6 to Grade 12 participating together. WBC created a school-wide culture of entrepreneurship in a single day.", "Ms. Rina Gupta, Principal — Amity Global School", _P.format(42)),
    ("As educators, we want students to fail safely and learn fast. WBC is the perfect environment for exactly that.", "Mr. Vivek Tiwari, Dean — Billabong High International", _P.format(64)),
]

_YT = "dD-97KGGfqA"
HOME_WHY = [("Why Wisbees Business Carnival 2026", _YT, "")]
GALLERY_VIDEOS = [
    ("WBC 2024 Highlights", _YT, ""),
    ("Student Pitches & Moments", _YT, ""),
    ("WBC Behind the Scenes", _YT, ""),
    ("Award Ceremony 2024", _YT, ""),
    ("Sponsor Spotlight", _YT, ""),
    ("WBC 2023 Recap", _YT, ""),
]
FOUNDER_VIDEOS = [
    ("The Problem with School Education in India", _YT, ""),
    ("What Financial Literacy Means for a 14-Year-Old", _YT, ""),
    ("How WBC Works — The Full Model Explained", _YT, ""),
    ("From 1 School to 500+ — Our Growth Story", _YT, ""),
    ("What Sponsors Get from WBC", _YT, ""),
    ("The Vision: WBC in Every Indian School by 2030", _YT, ""),
]
STUDENT_VIDEOS = [
    ('"WBC changed the way I think about business"', _YT, "Aarav Mehta, Grade 10"),
    ('"I pitched my idea to real investors at 15"', _YT, "Priya Sharma, Grade 11"),
]


class Command(BaseCommand):
    help = "Seed the database with the site's current content (idempotent)."

    def handle(self, *args, **options):
        self._seed_superuser()
        self._seed_site_config()
        self._seed_partners()
        self._seed_gallery()
        self._seed_testimonials()
        self._seed_videos()
        self.stdout.write(self.style.SUCCESS("Seeding complete."))

    # ── helpers ──────────────────────────────────────────────────────────
    def _attach(self, field, filename):
        """Copy public/<filename> into the given file field (no save)."""
        src = PUBLIC / filename
        if not src.exists():
            self.stdout.write(self.style.WARNING(f"  ! local asset not found: {src}"))
            return False
        with src.open("rb") as fh:
            field.save(filename, File(fh), save=False)
        return True

    # ── sections ─────────────────────────────────────────────────────────
    def _seed_superuser(self):
        User = get_user_model()
        username = os.environ.get("DJANGO_SUPERUSER_USERNAME", "admin")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "wbcadmin123")
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL", "admin@example.com")
        if User.objects.filter(username=username).exists():
            self.stdout.write(f"Admin user '{username}' already exists — leaving it unchanged.")
            return
        User.objects.create_superuser(username=username, email=email, password=password)
        self.stdout.write(self.style.SUCCESS(
            f"Created admin login -> username: '{username}'  password: '{password}'"
        ))
        self.stdout.write(self.style.WARNING(
            "  ! Change this password after first login (Admin -> top-right -> Change password)."
        ))

    def _seed_site_config(self):
        config, _ = SiteConfig.objects.get_or_create(pk=1)
        changed = False
        if not config.logo and self._attach(config.logo, "logo.png"):
            changed = True
        if not config.hero_video and self._attach(config.hero_video, "hero-video.mp4"):
            changed = True
        if not config.hero_background and not config.hero_background_url:
            config.hero_background_url = (
                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=85&fit=crop"
            )
            changed = True
        if not config.hero_title:
            config.hero_title = "Wisbees Business Carnival"
            changed = True
        # hero_subtitle is intentionally left blank to keep the styled default in the UI.
        config.save()
        self.stdout.write("Site configuration " + ("updated." if changed else "already set."))

    def _seed_partners(self):
        if PartnerLogo.objects.exists():
            self.stdout.write("Partner logos already present — skipping.")
            return
        for i, (name, filename) in enumerate(PARTNERS):
            logo = PartnerLogo(name=name, order=i)
            self._attach(logo.image, filename)
            logo.save()
        self.stdout.write(self.style.SUCCESS(f"Created {len(PARTNERS)} partner logos."))

    def _seed_gallery(self):
        if GalleryPhoto.objects.exists():
            self.stdout.write("Gallery photos already present — skipping.")
            return
        for i, (caption, url, on_home) in enumerate(GALLERY):
            GalleryPhoto.objects.create(
                caption=caption, image_url=url, show_on_home=on_home, order=i,
            )
        self.stdout.write(self.style.SUCCESS(f"Created {len(GALLERY)} gallery photos."))

    def _seed_testimonials(self):
        if Testimonial.objects.exists():
            self.stdout.write("Testimonials already present — skipping.")
            return
        for i, (quote, name, role, url) in enumerate(HOME_COLUMN):
            Testimonial.objects.create(
                category="home_column", quote=quote, name=name, role=role,
                photo_url=url, order=i,
            )
        for i, (quote, name, url) in enumerate(PARENTS):
            Testimonial.objects.create(
                category="parent", quote=quote, name=name, photo_url=url, order=i,
            )
        for i, (quote, name, url) in enumerate(SCHOOLS):
            Testimonial.objects.create(
                category="school", quote=quote, name=name, photo_url=url, order=i,
            )
        total = len(HOME_COLUMN) + len(PARENTS) + len(SCHOOLS)
        self.stdout.write(self.style.SUCCESS(f"Created {total} testimonials."))

    def _seed_videos(self):
        if Video.objects.exists():
            self.stdout.write("Videos already present — skipping.")
            return
        groups = [
            ("home_why", HOME_WHY),
            ("gallery", GALLERY_VIDEOS),
            ("founder", FOUNDER_VIDEOS),
            ("student", STUDENT_VIDEOS),
        ]
        count = 0
        for category, items in groups:
            for i, (title, yt, subtitle) in enumerate(items):
                Video.objects.create(
                    category=category, title=title, youtube_id=yt,
                    subtitle=subtitle, order=i,
                )
                count += 1
        self.stdout.write(self.style.SUCCESS(f"Created {count} videos."))
