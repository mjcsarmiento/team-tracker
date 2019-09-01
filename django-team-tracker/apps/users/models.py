from django.db import models
from django.contrib.auth.models import AbstractUser
from apps.team_projects.models import Team

optional = {
    'blank': True,
    'null': True,
}


class CustomUser(AbstractUser):
    team = models.ForeignKey(
        Team,
        related_name='team_users',
        verbose_name='Team',
        on_delete=models.CASCADE,
        **optional)
    image_url = models.TextField(
        verbose_name='Image URL',
        default='https://image.flaticon.com/icons/svg/149/149071.svg')


    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return ("{} {}".format(self.first_name, self.last_name)
            if self.first_name and self.last_name else self.username)