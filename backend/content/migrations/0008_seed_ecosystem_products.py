from django.db import migrations


DEFAULT_PRODUCTS = [
    {
        "name": "Buzz by Wisbees",
        "tagline": "Join Community & FAQs",
        "note": "",
        "link": "https://buzz.wisbees.com/categories",
        "order": 0,
    },
    {
        "name": "WisBees",
        "tagline": "Storytelling platform of business and finance",
        "note": "",
        "link": "https://www.wisbees.com/",
        "order": 1,
    },
    {
        "name": "Wisbees Wealth",
        "tagline": "Mutual fund investment platform",
        "note": "(Coming Soon)",
        "link": "",
        "order": 2,
    },
]


def seed(apps, schema_editor):
    EcosystemProduct = apps.get_model("content", "EcosystemProduct")
    if EcosystemProduct.objects.exists():
        return
    for p in DEFAULT_PRODUCTS:
        EcosystemProduct.objects.create(**p)


def unseed(apps, schema_editor):
    EcosystemProduct = apps.get_model("content", "EcosystemProduct")
    EcosystemProduct.objects.filter(
        name__in=[p["name"] for p in DEFAULT_PRODUCTS]
    ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("content", "0007_ecosystemproduct"),
    ]

    operations = [
        migrations.RunPython(seed, unseed),
    ]
