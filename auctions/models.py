from django.contrib.auth.models import AbstractUser,User
from django.db import models


class User(AbstractUser):
    pass

class course(models.Model):
    createdby = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "created")
    title = models.CharField(max_length=100)
    Syllabus = models.CharField(max_length=1000, blank= True, null= True)
    image = models.URLField()
    def serialize(self):
        return {
            "id": self.id,
            "createdby":self.createdby.username,
            "syllabus": self.Syllabus,
            "course": self.title,
            "image": self.image
        }
class enroll(models.Model):
    students = models.ForeignKey(User, on_delete=models.CASCADE, related_name = "students")
    courses = models.ForeignKey(course, on_delete=models.CASCADE , related_name = "courses")
    def serialize(self):
        return {
            "Students":self.students.username,
            "courses":self.courses.title
        }    
class Announcement(models.Model):
    announce = models.CharField(max_length=1000)
    timestamp = models.DateTimeField(auto_now_add=True)
    by = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "by")
    ## self.timestamp.strftime("%b %#d %Y, %#I:%M %p")
class documents(models.Model):
    teacher = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "teacher")
    heading  = models.CharField(max_length=500, null = True, blank=True)
    lecture = models.URLField(null = True, blank=True)
    timestamp1 = models.DateTimeField(auto_now_add=True)
    forwhich = models.ForeignKey(course,null=True, blank=True, on_delete=models.CASCADE, related_name = "material")
    def serialize(self):
        return {
            "id":self.id,
            "teacher":self.teacher.username,
            "heading":self.heading,
            "lecture": self.lecture,
            "timestamp":self.timestamp1.strftime("%b %#d %Y, %#I:%M %p"),
            "course":self.forwhich.title
        }
class quries(models.Model):
    question = models.CharField(max_length=250)
    by = models.ForeignKey(User, on_delete = models.CASCADE, related_name = "stu")
    answer = models.CharField(max_length=250, null=True, blank=True)
    video = models.ForeignKey(documents, on_delete = models.CASCADE, related_name = "query")
    time = models.DateTimeField(auto_now_add=True,blank=True, null=True)
    def serialize(self):
        return {
            "id": self.id,
            "question":self.question,
            "by":self.by.username,
            "answer":self.answer,
            "video":self.video.heading,
            "timestamp":self.time.strftime("%b %#d %Y, %#I:%M %p")
        }