from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("lecture/<str:name>", views.lecture, name="lecture"),
    ##API routes

    path('allposts', views.allposts, name = "all"),
    path('course/<int:id>', views.view, name = "view"),
    path('lecturej/<str:name>', views.lectureJson, name = "lecturej"),
    path('mycourse', views.mycourse, name = "mycourse"),
    path('enrolled/<str:name>', views.enrolled, name="enrolled"),
    path('saveenroll/<str:save>/<str:name>', views.saveenroll, name = "save"),
    path('answer/<int:id>', views.answer, name = "answer"),
    path('query', views.query, name = "query"),
    path('editsyllabus/<int:id>', views.editsyllabus, name = "editsyllabus"),
    path('addlecture/<str:name>', views.addlecture, name = "addlecture"),
    path('addquery/<int:id>',views.addquery, name="addquery"),
    path('create', views.create,name="createcourse")

]
