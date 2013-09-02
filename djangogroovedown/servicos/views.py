# Create your views here.
import json
import os
from django.http.response import HttpResponse, Http404
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.views.decorators.csrf import csrf_exempt
from djangogroovedown.utils import download_music_temp_file, search_for_musics
from grooveshark import Client
from grooveshark.classes.song import Song
from django.core.servers.basehttp import FileWrapper


def index(request):
    return render_to_response('index.html', {}, context_instance=RequestContext(request))


def get_list_popular_music(request):
    perido = request.GET.get('period')
    client = Client()
    client.init()
    if perido == '1':
        popular_music = client.popular(period=Client.DAILY)
    else:
        popular_music = client.popular(period=Client.MONTHLY)
    musicas = []
    for musica in popular_music:
        musicas.append(musica.export())
    return HttpResponse(json.dumps(musicas), mimetype="application/json")


def search_musics(request):
    query = request.GET.get('busca')
    if query:
        tipo = request.GET.get('tipo')
        musicas = search_for_musics(query, tipo)
        return HttpResponse(json.dumps({'data': musicas, 'success': True}, encoding="utf-8"),
                            mimetype="application/json")
    else:
        return HttpResponse(json.dumps({'success': False, 'data': []}, encoding="utf-8"),
                            mimetype="application/json")

@csrf_exempt
def download_musics(request):
    musicas = json.loads(request.GET.get('musicas', '[]'))
    if musicas:
        client = Client()
        client.init()
        musics_list = []
        for musica in musicas:
            song = Song.from_export(musica, client.connection)
            musics_list.append(song)
        zip_path = download_music_temp_file(musics_list)

        response = HttpResponse(FileWrapper(file(zip_path)), content_type='application/zip',
                                mimetype="application/zip")
        response['Content-Disposition'] = 'attachment; filename=myfile.zip'
        response['Content-Length'] = os.path.getsize(zip_path)
        return response
    else:
        raise Http404
