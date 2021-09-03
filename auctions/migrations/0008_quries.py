# Generated by Django 3.1 on 2020-09-29 16:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0007_auto_20200928_1045'),
    ]

    operations = [
        migrations.CreateModel(
            name='quries',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('question', models.CharField(max_length=250)),
                ('answer', models.CharField(blank=True, max_length=250, null=True)),
                ('by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='stu', to=settings.AUTH_USER_MODEL)),
                ('video', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='query', to='auctions.documents')),
            ],
        ),
    ]