from rest_framework import mixins, viewsets, generics
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

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


class CustomUserRegisterAPIView(generics.GenericAPIView):
    serializer_class = CustomUserSerializer

    def post(self, request, *args, **kwargs):
        # For creating new CustomUser
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(CustomUserSerializer(user, context=self.get_serializer_context()).data)