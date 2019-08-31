from rest_framework import mixins, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .models import CustomUser
from .serializers import CustomUserSerializer

class UserViewSet(mixins.ListModelMixin,
                    mixins.RetrieveModelMixin,
                    viewsets.GenericViewSet):
    # Lists all objects and retrieves object by id
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    
    # Included filtering by based on team field
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['team',]
    
    lookup_field = 'id'