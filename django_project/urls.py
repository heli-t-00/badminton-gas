from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('gas/', include('accounts.urls')),
    path("api/", include("django.contrib.auth.urls")),
    path("", TemplateView.as_view(template_name="home.html"), name="home"),
    path("bgas", TemplateView.as_view(template_name="bgas.html"), name="bgas"),
    path("myaccount", TemplateView.as_view(template_name="myaccount.html"), name="myaccount"),
]
