"""
Content models for the WBC website.

Every image-bearing model has BOTH an upload field and a matching `*_url`
text field. The website uses the uploaded file when present, otherwise the
URL. This lets us seed the database with the site's current (external) image
URLs without downloading anything, while letting editors upload real files
later that automatically take over.
"""
from django.db import models

URL_HELP = "External image URL — used only if no file is uploaded above."


class SiteConfig(models.Model):
    """Site-wide settings. Always a single row (pk=1)."""

    logo = models.ImageField(
        upload_to="site/", blank=True,
        help_text="Logo shown in the navbar (a PNG with a transparent background works best).",
    )
    hero_background = models.ImageField(
        upload_to="site/", blank=True,
        help_text="Background image behind the home hero video.",
    )
    hero_background_url = models.URLField(max_length=500, blank=True, help_text=URL_HELP)
    hero_video = models.FileField(
        upload_to="site/", blank=True,
        help_text="Home hero video (MP4).",
    )
    hero_title = models.CharField(
        max_length=120, default="Wisbees Business Carnival",
        help_text="Big title shown on the home hero.",
    )
    hero_subtitle = models.CharField(
        max_length=300, blank=True,
        help_text="Optional one-line subtitle under the hero title. "
                  "Leave blank to keep the styled default text.",
    )

    class Meta:
        verbose_name = "Site Configuration"
        verbose_name_plural = "Site Configuration"

    def __str__(self):
        return "Site Configuration"

    def save(self, *args, **kwargs):
        self.pk = 1  # enforce a single row
        super().save(*args, **kwargs)


class PartnerLogo(models.Model):
    """Logos in the home page 'Trusted by schools' strip."""

    name = models.CharField(
        max_length=120,
        help_text="Partner / school name (also used as the image's alt text).",
    )
    image = models.ImageField(upload_to="partners/", blank=True, help_text="Logo image.")
    image_url = models.URLField(max_length=500, blank=True, help_text=URL_HELP)
    link = models.URLField(blank=True, help_text="Optional website to open when the logo is clicked.")
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers appear first.")
    is_active = models.BooleanField(default=True, help_text="Untick to hide without deleting.")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Partner Logo"

    def __str__(self):
        return self.name


class GalleryPhoto(models.Model):
    """Photos for the Gallery / Past Events page and the home 'Glimpses' strip."""

    caption = models.CharField(max_length=200, help_text="Short caption / alt text.")
    image = models.ImageField(upload_to="gallery/", blank=True, help_text="Photo.")
    image_url = models.URLField(max_length=500, blank=True, help_text=URL_HELP)
    show_on_home = models.BooleanField(
        default=False,
        help_text="Also show this photo in the 'Glimpses from the Past' strip on the home page.",
    )
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers appear first.")
    is_active = models.BooleanField(default=True, help_text="Untick to hide without deleting.")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Gallery Photo"

    def __str__(self):
        return self.caption


class Testimonial(models.Model):
    """Testimonials shown on the home page and the Testimonials page."""

    CATEGORY_CHOICES = [
        ("home_column", "Home page — scrolling columns"),
        ("parent", "Testimonials page — Parents"),
        ("school", "Testimonials page — Schools"),
    ]

    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="home_column")
    quote = models.TextField(help_text="The testimonial text.")
    name = models.CharField(
        max_length=160,
        help_text="Who said it (e.g. 'Parent of Arnav — Sanskriti School').",
    )
    role = models.CharField(
        max_length=160, blank=True,
        help_text="Optional role / subtitle (shown on the home page columns).",
    )
    photo = models.ImageField(upload_to="testimonials/", blank=True, help_text="Avatar photo.")
    photo_url = models.URLField(max_length=500, blank=True, help_text=URL_HELP)
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers appear first.")
    is_active = models.BooleanField(default=True, help_text="Untick to hide without deleting.")

    class Meta:
        ordering = ["category", "order", "id"]
        verbose_name = "Testimonial"

    def __str__(self):
        return f"{self.get_category_display()} — {self.name}"


class SponsorshipTier(models.Model):
    """Sponsorship tiers shown on the Sponsors page (Silver, Gold, Platinum, …)."""

    name = models.CharField(max_length=80, help_text="e.g. Silver, Gold, Platinum.")
    tagline = models.CharField(max_length=200, blank=True, help_text="One-line description under the tier name.")
    badge = models.CharField(max_length=80, blank=True, help_text="Badge label, e.g. 'Most Popular'.")
    accent = models.CharField(
        max_length=20, default="#ffffff",
        help_text="Accent hex colour, e.g. #f5a623. Controls card border, icons, and button colour.",
    )
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers appear first.")
    is_active = models.BooleanField(default=True, help_text="Untick to hide without deleting.")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Sponsorship Tier"

    def __str__(self):
        return self.name


class SponsorshipTierFeature(models.Model):
    """Individual benefit lines inside a sponsorship tier."""

    tier = models.ForeignKey(SponsorshipTier, on_delete=models.CASCADE, related_name="features")
    text = models.CharField(max_length=300, help_text="One benefit / feature line.")
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers appear first.")

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "Feature"

    def __str__(self):
        return f"{self.tier.name}: {self.text[:60]}"


class Video(models.Model):
    """YouTube videos embedded across the site."""

    CATEGORY_CHOICES = [
        ("home_why", "Home page — 'Why WBC' video"),
        ("gallery", "Gallery page — Videos tab"),
        ("founder", "Founder Videos page"),
        ("student", "Testimonials page — Student videos"),
    ]

    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default="gallery")
    title = models.CharField(max_length=200)
    youtube_id = models.CharField(
        max_length=40,
        help_text="Just the YouTube video ID, e.g. 'dD-97KGGfqA' (the part after watch?v=).",
    )
    subtitle = models.CharField(
        max_length=200, blank=True,
        help_text="Optional subtitle (e.g. the student's name on the Testimonials page).",
    )
    order = models.PositiveIntegerField(default=0, help_text="Lower numbers appear first.")
    is_active = models.BooleanField(default=True, help_text="Untick to hide without deleting.")

    class Meta:
        ordering = ["category", "order", "id"]
        verbose_name = "Video"

    def __str__(self):
        return f"{self.get_category_display()} — {self.title}"
