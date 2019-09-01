from django.db import models
from apps.users.models import CustomUser
from apps.team_projects.models import Team, Project


class TimeEntry(models.Model):
    time_in = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Time In')
    hours = models.PositiveIntegerField(
        verbose_name='Number of Hours')
    user = models.ForeignKey(
        CustomUser,
        related_name='user_time_entries',
        verbose_name='User',
        on_delete=models.CASCADE)
    project = models.ForeignKey(
        Project,
        related_name='project_time_entries',
        verbose_name='Project',
        on_delete=models.CASCADE)
    task_description = models.TextField(
        verbose_name='Task Description')


    class Meta:
        verbose_name = 'Time Entry'
        verbose_name_plural = 'Time Entries'

    def __str__(self):
        return "{} by {}".format(self.time_in, self.user.username)
