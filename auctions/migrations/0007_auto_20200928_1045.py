# Generated by Django 3.1 on 2020-09-28 05:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0006_documents_forwhich'),
    ]

    operations = [
        migrations.AlterField(
            model_name='documents',
            name='forwhich',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='material', to='auctions.course'),
        ),
    ]
