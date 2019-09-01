from django.db import models

# Create your models here.
from django.db import models


class Team(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name='Team Name')

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(
        max_length=255,
        verbose_name='Project Name')
    team = models.ForeignKey(
        Team,
        related_name='team_projects',
        verbose_name='Team',
        on_delete=models.CASCADE)

    def __str__(self):
        return self.name