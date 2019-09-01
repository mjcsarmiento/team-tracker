from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import api

router = DefaultRouter()
router.register(r'teams', api.TeamViewSet)
router.register(r'projects', api.ProjectViewSet)

app_name = 'team_projects'
urlpatterns = [
    path('api/', include(router.urls)),
]