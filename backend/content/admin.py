from django.contrib import admin
from django.utils.html import format_html

from .models import GalleryPhoto, PartnerLogo, SiteConfig, SponsorshipTier, SponsorshipTierFeature, Testimonial, Video

admin.site.site_header = "Wisbees Business Carnival — Content"
admin.site.site_title = "WBC Content Admin"
admin.site.index_title = "Manage website images, videos & testimonials"


def _thumb(src, *, style):
    if not src:
        return "—"
    return format_html('<img src="{}" style="{}"/>', src, style)


@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ("__str__", "logo_preview", "hero_bg_preview", "hero_video_preview")
    readonly_fields = ("logo_preview", "hero_bg_preview", "hero_video_preview")
    fieldsets = (
        ("Logo", {"fields": ("logo", "logo_preview")}),
        ("Home Hero — Video", {
            "fields": ("hero_video", "hero_video_preview"),
            "description": "Upload an MP4 video shown on the landing page hero section.",
        }),
        ("Home Hero — Background Image", {
            "fields": ("hero_background", "hero_background_url", "hero_bg_preview"),
            "description": "Upload an image (or paste an external URL) for the hero background.",
        }),
        ("Home Hero — Text", {
            "fields": ("hero_title", "hero_subtitle"),
        }),
    )

    @admin.display(description="Logo")
    def logo_preview(self, obj):
        src = obj.logo.url if obj.logo else ""
        return _thumb(src, style="height:40px;background:#222;padding:4px;border-radius:4px")

    @admin.display(description="BG Preview")
    def hero_bg_preview(self, obj):
        src = obj.hero_background.url if obj.hero_background else obj.hero_background_url
        if not src:
            return "No image set"
        return format_html(
            '<img src="{}" style="max-width:320px;max-height:160px;object-fit:cover;'
            'border-radius:6px;border:1px solid #ccc"/>',
            src,
        )

    @admin.display(description="Video Preview")
    def hero_video_preview(self, obj):
        if not obj.hero_video:
            return "No video uploaded"
        return format_html(
            '<video src="{}" controls style="max-width:320px;max-height:180px;'
            'border-radius:6px;border:1px solid #ccc"></video>',
            obj.hero_video.url,
        )

    def has_add_permission(self, request):
        # Only ever one configuration row.
        return not SiteConfig.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(PartnerLogo)
class PartnerLogoAdmin(admin.ModelAdmin):
    list_display = ("thumb", "name", "order", "is_active")
    list_display_links = ("name",)
    list_editable = ("order", "is_active")
    search_fields = ("name",)

    @admin.display(description="Preview")
    def thumb(self, obj):
        src = obj.image.url if obj.image else obj.image_url
        return _thumb(src, style="height:34px;background:#222;padding:3px;border-radius:4px")


@admin.register(GalleryPhoto)
class GalleryPhotoAdmin(admin.ModelAdmin):
    list_display = ("thumb", "caption", "show_on_home", "order", "is_active")
    list_display_links = ("caption",)
    list_editable = ("show_on_home", "order", "is_active")
    search_fields = ("caption",)

    @admin.display(description="Preview")
    def thumb(self, obj):
        src = obj.image.url if obj.image else obj.image_url
        return _thumb(src, style="height:46px;width:64px;object-fit:cover;border-radius:4px")


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("thumb", "name", "category", "order", "is_active")
    list_display_links = ("name",)
    list_editable = ("category", "order", "is_active")
    list_filter = ("category",)
    search_fields = ("name", "quote")

    @admin.display(description="Photo")
    def thumb(self, obj):
        src = obj.photo.url if obj.photo else obj.photo_url
        return _thumb(src, style="height:40px;width:40px;object-fit:cover;border-radius:50%")


class SponsorshipTierFeatureInline(admin.TabularInline):
    model = SponsorshipTierFeature
    extra = 1
    fields = ("text", "order")


@admin.register(SponsorshipTier)
class SponsorshipTierAdmin(admin.ModelAdmin):
    list_display = ("name", "badge", "accent_swatch", "is_active")
    list_display_links = ("name",)
    list_editable = ("is_active",)
    readonly_fields = ("name", "tagline", "badge", "accent_swatch_detail", "order")
    fieldsets = (
        ("Tier (read-only)", {
            "fields": ("name", "tagline", "badge", "accent_swatch_detail"),
            "description": "Tier identity is fixed. Edit the feature points below.",
        }),
    )
    inlines = [SponsorshipTierFeatureInline]

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    @admin.display(description="Accent")
    def accent_swatch(self, obj):
        return format_html(
            '<span style="display:inline-block;width:24px;height:24px;border-radius:4px;'
            'background:{};border:1px solid #ccc" title="{}"></span>',
            obj.accent, obj.accent,
        )

    @admin.display(description="Accent colour")
    def accent_swatch_detail(self, obj):
        return format_html(
            '<span style="display:inline-flex;align-items:center;gap:8px;">'
            '<span style="display:inline-block;width:32px;height:32px;border-radius:6px;'
            'background:{};border:1px solid #ccc"></span>'
            '<code>{}</code></span>',
            obj.accent, obj.accent,
        )


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "youtube_id", "order", "is_active")
    list_display_links = ("title",)
    list_editable = ("category", "order", "is_active")
    list_filter = ("category",)
    search_fields = ("title",)
