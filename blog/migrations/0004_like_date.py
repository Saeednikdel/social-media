# Generated by Django 3.1.3 on 2022-05-17 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_auto_20220516_2238'),
    ]

    operations = [
        migrations.AddField(
            model_name='like',
            name='date',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
