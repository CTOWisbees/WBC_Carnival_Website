from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SponsorshipTier',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='e.g. Silver, Gold, Platinum.', max_length=80)),
                ('tagline', models.CharField(blank=True, help_text='One-line description under the tier name.', max_length=200)),
                ('badge', models.CharField(blank=True, help_text="Badge label, e.g. 'Most Popular'.", max_length=80)),
                ('accent', models.CharField(default='#ffffff', help_text='Accent hex colour, e.g. #f5a623. Controls card border, icons, and button colour.', max_length=20)),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers appear first.')),
                ('is_active', models.BooleanField(default=True, help_text='Untick to hide without deleting.')),
            ],
            options={
                'verbose_name': 'Sponsorship Tier',
                'ordering': ['order', 'id'],
            },
        ),
        migrations.CreateModel(
            name='SponsorshipTierFeature',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(help_text='One benefit / feature line.', max_length=300)),
                ('order', models.PositiveIntegerField(default=0, help_text='Lower numbers appear first.')),
                ('tier', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='features', to='content.sponsorshiptier')),
            ],
            options={
                'verbose_name': 'Feature',
                'ordering': ['order', 'id'],
            },
        ),
    ]
