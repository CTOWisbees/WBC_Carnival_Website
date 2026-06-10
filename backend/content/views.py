from django.http import JsonResponse

from .models import GalleryPhoto, PartnerLogo, SiteConfig, SponsorshipTier, Testimonial, Video


def _resolve(request, file_field, url_value):
    """Return an absolute URL for an uploaded file, falling back to a stored URL."""
    if file_field:
        return request.build_absolute_uri(file_field.url)
    return url_value or ""


def content_api(request):
    """Everything the website needs, in one JSON document."""
    config = SiteConfig.objects.first()

    site = {
        "logo": _resolve(request, config.logo if config else None, ""),
        "heroBackground": _resolve(
            request,
            config.hero_background if config else None,
            config.hero_background_url if config else "",
        ),
        "heroVideo": _resolve(request, config.hero_video if config else None, ""),
        "heroTitle": (config.hero_title if config else "") or "",
        "heroSubtitle": (config.hero_subtitle if config else "") or "",
    }

    partners = [
        {
            "name": p.name,
            "image": _resolve(request, p.image, p.image_url),
            "link": p.link or "",
        }
        for p in PartnerLogo.objects.filter(is_active=True)
    ]

    gallery = [
        {
            "caption": g.caption,
            "image": _resolve(request, g.image, g.image_url),
            "showOnHome": g.show_on_home,
        }
        for g in GalleryPhoto.objects.filter(is_active=True)
    ]

    def testimonials_for(category):
        return [
            {
                "quote": t.quote,
                "name": t.name,
                "role": t.role or "",
                "image": _resolve(request, t.photo, t.photo_url),
            }
            for t in Testimonial.objects.filter(is_active=True, category=category)
        ]

    def videos_for(category):
        return [
            {"title": v.title, "youtubeId": v.youtube_id, "subtitle": v.subtitle or ""}
            for v in Video.objects.filter(is_active=True, category=category)
        ]

    sponsorship_tiers = [
        {
            "name": t.name,
            "tagline": t.tagline,
            "badge": t.badge,
            "accent": t.accent,
            "features": [f.text for f in t.features.all()],
        }
        for t in SponsorshipTier.objects.filter(is_active=True).prefetch_related("features")
    ]

    return JsonResponse(
        {
            "site": site,
            "partners": partners,
            "gallery": gallery,
            "sponsorshipTiers": sponsorship_tiers,
            "testimonials": {
                "homeColumn": testimonials_for("home_column"),
                "parent": testimonials_for("parent"),
                "school": testimonials_for("school"),
            },
            "videos": {
                "homeWhy": videos_for("home_why"),
                "gallery": videos_for("gallery"),
                "founder": videos_for("founder"),
                "student": videos_for("student"),
            },
        }
    )
