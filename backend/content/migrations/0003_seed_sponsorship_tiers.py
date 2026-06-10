from django.db import migrations

TIERS = [
    {
        "name": "Silver",
        "tagline": "Economical exposure with real reach",
        "badge": "Great Value",
        "accent": "#a8b5c8",
        "order": 1,
        "features": [
            "Name placement at bottom-most position on Shark Pitch / Bank Tables / Stage",
            "Included in Money Market PPT",
            "Included in social media promotions (no YouTube ads)",
            "Proof of Visibility report included",
        ],
    },
    {
        "name": "Gold",
        "tagline": "Strong visibility at a moderate budget",
        "badge": "Most Popular",
        "accent": "#f5a623",
        "order": 2,
        "features": [
            "Branding on banners & posters (medium size)",
            "Inclusion in Money Market PPT",
            "Second-position branding on Shark Pitch / Bank Tables / Stage",
            "Opening Ceremony presence + mentions (5–7 shout-outs)",
            "Presence in social media videos only",
            "7-day pre-event social media campaign",
            "Stall allowed",
            "Brand presence at the Selfie Point",
            "Proof of Visibility report",
        ],
    },
    {
        "name": "Platinum",
        "tagline": "Maximum visibility & premium branding",
        "badge": "Most Exclusive",
        "accent": "#e8c96d",
        "order": 3,
        "features": [
            'Branding as "Powered By" partner',
            "Large banners & posters across venue",
            "Branding on participation badges / ID cards",
            "Inclusion in Money Market PPT",
            "Top-most placement on Shark Pitch / Bank Tables / Stage / Nameplates",
            "Opening Ceremony presence + Host shout-outs (10+ mentions)",
            "Inclusion in YouTube Ads & full social media videos",
            "7-day pre-event promotional campaign",
            "Stall allowed for product display",
            "Brand presence at the Selfie Point",
            "Full Proof of Visibility report provided",
        ],
    },
]


def seed(apps, schema_editor):
    SponsorshipTier = apps.get_model("content", "SponsorshipTier")
    SponsorshipTierFeature = apps.get_model("content", "SponsorshipTierFeature")
    for tier_data in TIERS:
        features = tier_data.pop("features")
        tier, _ = SponsorshipTier.objects.get_or_create(
            name=tier_data["name"], defaults=tier_data
        )
        for i, text in enumerate(features):
            SponsorshipTierFeature.objects.get_or_create(tier=tier, text=text, defaults={"order": i})


def unseed(apps, schema_editor):
    apps.get_model("content", "SponsorshipTier").objects.filter(
        name__in=["Silver", "Gold", "Platinum"]
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("content", "0002_sponsorshiptier_sponsorshiptierfeature"),
    ]

    operations = [
        migrations.RunPython(seed, unseed),
    ]
