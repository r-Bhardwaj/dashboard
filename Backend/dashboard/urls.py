from django.contrib import admin
from django.urls import path
from dashboard import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path("admin/", admin.site.urls),
    path("signup/",views.signup),
    path("login/",views.login),
    path("items/",views.item_list),
    path("items/<int:id>",views.item_detail),
    path("category/",views.category),
     path("tag/",views.tag),
    path("forgotPassword/",views.forgot_password),
    path("resetPassword/<int:username>",views.reset_password)
]

urlpatterns=format_suffix_patterns(urlpatterns)