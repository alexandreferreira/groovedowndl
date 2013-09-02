from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class Song(models.Model):
    groove_id = models.IntegerField()
    name = models.CharField(max_length=255)
    artist_id = models.IntegerField()
    artist_nome = models.CharField(max_length=255)
    album_id = models.IntegerField()
    album_name = models.CharField(max_length=255)

    file_name = models.CharField(max_length=255)

    def __unicode__(self):
        return "%s - %s" % (self.name, self.artist_nome)


class Task(models.Model):
    created = models.DateTimeField(auto_created=True)
    user = models.ForeignKey(User)
    song = models.ManyToManyField('Song')
    def __unicode__(self):
        return "Task created by: %s" % self.user.first_name
