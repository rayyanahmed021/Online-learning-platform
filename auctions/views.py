import json
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import *

@csrf_exempt
def create(request):
    if request.method == "POST":
        data = json.loads(request.body)
        title = data.get("title","")
        syllabus = data.get("syllabus","")
        image = data.get("image","")
        a = course(createdby=User.objects.get(username= request.user.username),
        title = title,Syllabus=syllabus,image=image)
        a.save()
        return JsonResponse(["created!"],safe=False)


@csrf_exempt
def answer(request, id):
    if request.method == "POST":
        data = json.loads(request.body)
        ans = data.get("ans", "")
        a = quries.objects.get(pk = id)
        a.answer = ans
        a.save()
        return JsonResponse(["SAVED"],safe=False)
@csrf_exempt
def editsyllabus(request,id):
    if request.method == "POST":
        data = json.loads(request.body)
        syllabus = data.get("syllabus","")
        a = course.objects.get(pk = id)
        a.Syllabus = syllabus
        a.save()
        return JsonResponse(["saved!"], safe=False)
@csrf_exempt
def addlecture(request,name):
     if request.method == "POST":
        data = json.loads(request.body)
        heading = data.get("heading","")
        url = data.get("url", "")
        a = documents(teacher=User.objects.get(username = request.user.username),
        heading = heading, lecture= url,forwhich=course.objects.get(title=name))
        a.save()
        return JsonResponse([a.serialize()],safe=False)
@csrf_exempt
def addquery(request,id):
    if request.method == "POST":
        data = json.loads(request.body)
        question = data.get("question","")
        a = quries(by=User.objects.get(username = request.user.username),question= question,video=documents.objects.get(pk = id))
        a.save()
        return JsonResponse(["saved!"],safe=False)
def query(request):
    a = User.objects.get(username = request.user.username)
    b = a.created.all()
    c = [course.id for course in b]
    d = documents.objects.filter(forwhich_id__in = c )
    e = [documents.id for documents in d]
    f = quries.objects.filter(video_id__in = e)
    g = [quries.serialize() for quries in f]
    if not g :
        h = a.stu.all()
        return JsonResponse([quries.serialize() for quries in h.order_by("-time").all()]+[False],safe = False)
    else:
        return JsonResponse(g + [True], safe = False)
def saveenroll(request,save,name):
    if save == "save":
        a = enroll(students = User.objects.get(username = request.user.username), courses= course.objects.get(title = name))
        a.save()
        return JsonResponse(["saved"],safe=False)
    else:
        b = enroll.objects.get(students=User.objects.get(username=request.user.username), courses = course.objects.get(title=name))
        b.delete()
        return JsonResponse(["deleted"],safe=False)

def enrolled(request,name):
    b = course.objects.get(title = name)
    a = enroll.objects.filter(courses = b)
    d = User.objects.get(username = request.user.username)
    g = [enroll.serialize() for enroll in a]

    list = []
    for names in a:
        list.append(names.students.username)
    if request.user.username in list:    
        return JsonResponse(g+[True],safe=False)
    elif request.user.username not in list :
        return JsonResponse(g + [False],safe=False)
    else:
        return JsonResponse([False], safe = False)
        

def lecture(request,name):
    return render(request,"auctions/view.html")
def lectureJson(request,name):
    a = course.objects.get(title = name)
    b = documents.objects.filter(forwhich = a)
    c = [documents.serialize() for documents in b.order_by("-timestamp1").all()]
    if not c:
        return JsonResponse([{"course":name,"teacher":a.createdby.username},None,request.user.username],safe=False)
    else:
        return JsonResponse(c + [request.user.username], safe=False)
def mycourse(request):
    a = User.objects.get(username=request.user.username)
    b = a.students.all()
    return JsonResponse([enroll.courses.serialize() for enroll in b],safe = False)
def view(request, id):
    a = course.objects.get(pk = id)
    return JsonResponse([a.serialize()]+[request.user.username],safe = False)
def allposts(request):
    a = course.objects.all()
    return JsonResponse([course.serialize() for course in a],safe = False)
def index(request):
    return render(request, "auctions/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "auctions/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "auctions/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "auctions/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "auctions/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "auctions/register.html")
