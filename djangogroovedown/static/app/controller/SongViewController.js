Ext.define('GrooveDownDL.controller.SongViewController', {
	extend: 'Ext.app.Controller',
	stores: ['Songs','MySongs'],
	models: ['Song'],
	views: ['SongsView'],

	init: function() {
        
        this.control({
        	'songview': {
                'edit': this.afteredit
        	},
            'songview button[action=baixar]':{
                click: this.baixarMusicas
            },
            'songview checkcolumn':{
            	checkchange: this.onActionSongView
            },
            'mysongview checkcolumn':{
                checkchange: this.onActionMySongView
            },
            'songview button[action=populares]':{
                click: this.onPopulares
            },
            'songview button[action=buscar]':{
                click: this.onBuscar
            },
            'songview button[action=selall]':{
                click: this.onSelAll
            },
            'songview button[action=clear]':{
                click: this.onClear
            },
            '#textoBusca':{
                specialkey: this.handleSpecialKey
            }
        });
    },

    handleSpecialKey: function(field, e) {
        if(e.getKey() === e.ENTER) {
            this.onBuscar(null)
        }
    },

    onClear: function(button){
        var store = Ext.getStore("Songs");
        var storemysongs = Ext.getStore("MySongs");
        for (var i = 0; i < storemysongs.data.items.length; i++) {
            record = storemysongs.data.items[i]
            record.data['baixar'] = false;
            record.setDirty();
            if (store.data.containsKey(record.data['id'])){
                store.data.get(record.data['id']).baixar = false;
            }
        };
        storemysongs.removeAll();
        storemysongs.commitChanges();
        Ext.getCmp('mysongview').getView().refresh();
        Ext.getCmp('songview').getView().refresh(); 
    },

    onSelAll: function(button){
        var store = Ext.getStore("Songs");
        var storemysongs = Ext.getStore("MySongs");
        var musicas = new Array ();
        for (var i = 0; i < store.data.items.length; i++) {
            record = store.data.items[i]
            record.data['baixar'] = true;
            record.setDirty();
            if (!storemysongs.data.containsKey(record.data['id'])){
                musicas.push(record)
            }
        };
        storemysongs.add(musicas);
        //storemysongs.commitChanges();
        //store.commitChanges();
        Ext.getCmp('songview').getView().refresh();
        Ext.getCmp('mysongview').getView().refresh();   

    },

    onBuscar: function(button){
        var type = Ext.getCmp('buscatype').getValue();
        var query = Ext.getCmp('textoBusca').getValue();
        var store = Ext.getStore("Songs");
        store.load({
            params: {
                busca: query,
                tipo: type
            },
            url: '/buscar/'
            })
        console.log('buscar!');
    },

    onPopulares: function(button){
        var store = Ext.getStore("Songs");
        store.getProxy().url = '/popular/';
        store.load();
    },
    onActionSongView: function(view,row,checked){
    	var mySongStore = Ext.getStore("MySongs");
    	var store = Ext.getStore("Songs");
    	var item = store.getAt(row);
        if (checked){
            mySongStore.add(item);
            mySongStore.commitChanges();
            console.log(item);
        }else{
            index = mySongStore.indexOfId(item.data.id);
            mySongStore.removeAt(index)
            mySongStore.commitChanges();
        }
        

    },

    onActionMySongView: function(view,row,checked){
        var mySongStore = Ext.getStore("MySongs");
        var item = mySongStore.getAt(row);
        if (!checked){
            mySongStore.remove(item);
        }
        

    },

    baixarMusicas: function(button) {
        store = Ext.getStore("MySongs");
        var sendDataArray = [];
        store.each(function(record){
            record = record.data
            if (record.baixar == true){
                recordArray = {
                    "album": record.album,
                    "album_id": record.album_id,
                    "artist": record.artist,
                    "artist_id": record.artist_id,
                    "cover": record.cover,
                    "id": record.id, 
                    "name": record.name,
                    "duration": record.duration, 
                    "popularity": record.popularity,
                    "track": record.track       
                };
                sendDataArray.push(recordArray);   
            }
    	});
    	$.fileDownload("/download/",{
    		data: {"musicas":JSON.stringify(sendDataArray)},
    		successCallback: function (url) {
                console.log('baixou!');
            },
            failCallback: function (responseHtml, url) {
                console.log('Erro ao tentar baixar o arquivo :/'); 
            }
    	});
    	//console.log(sendDataArray);
    },

    afteredit: function(grid, row, field) {
        console.log("depois de editar");
    }


});