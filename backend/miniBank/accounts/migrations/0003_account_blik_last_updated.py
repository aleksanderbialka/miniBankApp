# Generated by Django 5.1.2 on 2024-10-19 12:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_account_blik_code_loanapplication'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='blik_last_updated',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
