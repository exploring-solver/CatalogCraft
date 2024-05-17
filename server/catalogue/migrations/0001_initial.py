# Generated by Django 4.1.4 on 2024-02-07 19:50

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='MasterCatalogue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(max_length=25)),
                ('product_image', models.ImageField(upload_to='master-images/')),
            ],
        ),
        migrations.CreateModel(
            name='Catalogue',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_name', models.CharField(max_length=50)),
                ('mrp', models.DecimalField(decimal_places=2, max_digits=10)),
                ('selling_prize', models.DecimalField(decimal_places=2, max_digits=10)),
                ('buying_prize', models.DecimalField(decimal_places=2, max_digits=10)),
                ('hsn_code', models.CharField(max_length=25)),
                ('gst_percentage', models.CharField(max_length=10)),
                ('unit', models.CharField(max_length=10)),
                ('quantity', models.CharField(max_length=10)),
                ('product_image', models.ImageField(upload_to='images/')),
                ('standardized', models.BooleanField()),
                ('category', models.CharField(max_length=25)),
                ('mapped_to_master', models.BooleanField()),
                ('seller', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Catalogue',
                'db_table': 'catalogue',
            },
        ),
    ]