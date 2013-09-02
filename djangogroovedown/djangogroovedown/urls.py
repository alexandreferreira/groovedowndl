from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
from djangogroovedown import settings

admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'servicos.views.index', name='index'),
    url(r'^popular/$', 'servicos.views.get_list_popular_music', name='popular'),
    url(r'^download/$', 'servicos.views.download_musics', name='download'),
    url(r'^buscar/$', 'servicos.views.search_musics', name='busca'),
    # url(r'^djangogroovedown/', include('djangogroovedown.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
    urlpatterns += patterns('',
        url(r'^public/media/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.MEDIA_ROOT, 'show_indexes': True
        }),
        url(r'^public/static/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.STATIC_ROOT, 'show_indexes': True
        }),
    )


