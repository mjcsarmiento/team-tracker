from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import api

router = DefaultRouter()
router.register(r'users', api.UserViewSet)

app_name = 'users'
urlpatterns = [
    path('api/', include(router.urls)),
    path('register/', api.CustomUserRegisterAPIView.as_view(), name='api-user-register'),
]