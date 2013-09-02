import os
import random
import string
import zipfile
import datetime
from django.contrib.auth.models import User
from djangogroovedown import settings
from grooveshark import Client
from servicos.models import Song, Task

__author__ = 'alexandreferreira'


def get_or_none(model, **kwargs):
    try:
        return model.objects.get(**kwargs)
    except model.DoesNotExist:
        return None


def zipdir(zip, files_list):
    path = settings.MUSIC_FILES_GROOVE
    rootlen = len(path) + 1
    for f in files_list:
        fn = os.path.join(path, f)
        zip.write(fn, fn[rootlen:])


def rand_key(size):
    return "".join([random.choice(string.letters + string.digits)
                          for i in range(size)])


def download_music_temp_file(musics_list):

    folder = rand_key(40)
    user = User.objects.get(pk=1)
    task = Task(created=datetime.datetime.now(), user=user)
    task.save()
    for music in musics_list:
        music_local = get_or_none(Song, groove_id=music.id, artist_id=music.artist.id)
        if not music_local:
            try:
                music.download(directory=settings.MUSIC_FILES_GROOVE, song_name='%i %a - %s - %A')
                song = Song(name=music.name, groove_id=music.id, artist_id=music.artist.id,
                            artist_nome=music.artist.name, album_id=music.album.id,
                            album_name=music.album.name, file_name=music.format("%i %a - %s - %A.mp3"))
                song.save()
                task.song.add(song)
            except Exception as e:
                pass
        else:
            task.song.add(music_local)


    zip = zipfile.ZipFile(os.path.join(settings.TEMP_FILES_GROOVE, '%s.zip' % folder), 'w')
    song_path = []
    for song in task.song.all():
        song_path.append(song.file_name)
    zipdir(zip, song_path)
    zip.close()
    #os.path.exists(os.path.join(settings.TEMP_FILES_GROOVE, '%s.zip' % folder)) and os.remove(os.path.join(settings.TEMP_FILES_GROOVE, '%s.zip' % folder))
    return os.path.join(settings.TEMP_FILES_GROOVE, '%s.zip' % folder)


def search_for_musics(query, option):
    client = Client()
    client.init()
    musicas_list = []
    if option == '1':
        musicas = client.search(query, Client.SONGS)
        for musica in musicas:
            musicas_list.append(musica.export())
    elif option == '2':
        musicas = client.search(query, Client.ALBUMS)
        for musica in musicas:
            musicas_list.append(musica.export())
    elif option == '3':
        musicas = client.search(query, Client.ARTISTS)
        for musica in musicas:
            musicas_list.append(musica.export())
    elif option == '4':
        playlist = client.playlist(query)
        for musica in playlist:
            musicas_list.append(musica.export())
    else:
        musicas_list = []
    return musicas_list

