from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import api

router = DefaultRouter()
router.register(r'time_entries', api.TimeEntryViewSet)

app_name = 'time_entries'
urlpatterns = [
    path('api/', include(router.urls)),
]