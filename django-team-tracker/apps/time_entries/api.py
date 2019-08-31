from rest_framework import mixins, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .models import TimeEntry
from .serializers import TimeEntrySerializer


class TimeEntryViewSet(mixins.ListModelMixin,
                        mixins.RetrieveModelMixin,
                        mixins.CreateModelMixin,
                        viewsets.GenericViewSet):
    # Lists all objects, retrieves object by id, creates a new TimeEntry
    # TimeEntry is sorted by time_in from most recent to oldest date
    queryset = TimeEntry.objects.all().order_by('-time_in')
    serializer_class = TimeEntrySerializer
        
    lookup_field = 'id'