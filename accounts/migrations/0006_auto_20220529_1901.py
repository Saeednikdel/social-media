# Generated by Django 3.1.3 on 2022-05-29 14:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_auto_20220529_1901'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='header',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
