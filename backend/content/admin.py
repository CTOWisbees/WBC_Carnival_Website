from django.contrib import admin
from django.utils.html import format_html

from .models import GalleryPhoto, PartnerLogo, SiteConfig, Testimonial, Video

admin.site.site_header = "Wisbees Business Carnival — Content"
admin.site.site_title = "WBC Content Admin"
admin.site.index_title = "Manage website images, videos & testimonials"


def _thumb(src, *, style):
    if not src:
        return "—"
    return format_html('<img src="{}" style="{}"/>', src, style)


@admin.register(SiteConfig)
class SiteConfigAdmin(admin.ModelAdmin):
    list_display = ("__str__", "logo_preview")
    fieldsets = (
        ("Logo", {"fields": ("logo",)}),
        ("Home hero", {
            "fields": ("hero_video", "hero_background", "hero_background_url",
                       "hero_title", "hero_subtitle"),
        }),
    )

    @admin.display(description="Logo")
    def logo_preview(self, obj):
        src = obj.logo.url if obj.logo else ""
        return _thumb(src, style="height:40px;background:#222;padding:4px;border-radius:4px")

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


@admin.register(Video)
class VideoAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "youtube_id", "order", "is_active")
    list_display_links = ("title",)
    list_editable = ("category", "order", "is_active")
    list_filter = ("category",)
    search_fields = ("title",)
