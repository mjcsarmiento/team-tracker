from rest_framework import serializers
from datetime import datetime, timedelta, time
from django.db.models import Sum

from .models import Team, Project
from apps.time_entries.models import TimeEntry
from apps.time_entries.serializers import TimeEntrySerializer


class ProjectSerializer(serializers.ModelSerializer):
    total_hours = serializers.SerializerMethodField()
    class Meta:
        model = Project
        fields = '__all__'

    def get_total_hours(self, obj):
        time_entries = obj.project_time_entries.values_list('id', flat=True)
        total_hours = 0
        if len(time_entries.values()):
            total_hours = time_entries.aggregate(Sum('hours'))['hours__sum']
        return total_hours
        

class TeamSerializer(serializers.ModelSerializer):
    # Included values for TeamSerializer
    team_projects = ProjectSerializer(many=True)
    recent_time_entries = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = ('id',  'name', 'team_projects', 'recent_time_entries')

    def get_recent_time_entries(self, obj):
        # Returns a list of TimeEntry created in current date's week
        team_projects_list = obj.team_projects.values_list('id', flat=True)
        recent_time_entries = []

        if len(team_projects_list.values()):
            weekday = datetime.now().weekday()
            monday = datetime.now() - timedelta(days=weekday)
            midnight_time = time(0)
            first_day = datetime.combine(monday.date(), midnight_time)

            # Returns a list of TimeEntry where time_in is within the week and project is in team_projects
            recent_time_entries = TimeEntry.objects.filter(
                time_in__gte=first_day,
                project__in=team_projects_list)
            recent_time_entries = recent_time_entries.order_by('-time_in')
        
        # TimeEntrySerializer will return a sorted list from most recent to oldest according to time_in
        serializer = TimeEntrySerializer(recent_time_entries, many=True)
        return serializer.data
