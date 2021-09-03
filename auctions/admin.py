from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(User)
admin.site.register(course)
admin.site.register(Announcement)
admin.site.register(documents)
admin.site.register(enroll)
admin.site.register(quries)