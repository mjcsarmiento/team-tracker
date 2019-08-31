from rest_framework import mixins, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .models import Team, Project
from .serializers import TeamSerializer, ProjectSerializer


class TeamViewSet(mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    # Lists all objects and retrieves object by id
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    lookup_field = 'id'


class ProjectViewSet(mixins.ListModelMixin,
                        mixins.RetrieveModelMixin,
                        viewsets.GenericViewSet):
    # Lists all objects and retrieves object by id
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    
    # Included filtering by based on team field
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['team',]
        
    lookup_field = 'id'