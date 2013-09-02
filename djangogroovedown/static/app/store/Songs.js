Ext.define('GrooveDownDL.store.Songs', {
    extend: 'Ext.data.Store',
    model: 'GrooveDownDL.model.Song',
    id: 'storesongs',
    proxy:{
        type: 'ajax',
        
        reader: {
            type: 'json',
            root: 'data'
        }
   },
   listeners: {
        load: function(){
            console.log('loaded!');
        }
    },   
   remoteSort:false,
   autoSync:false
});