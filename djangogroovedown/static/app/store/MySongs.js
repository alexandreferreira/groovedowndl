Ext.define('GrooveDownDL.store.MySongs', {
    extend: 'Ext.data.Store',
    model: 'GrooveDownDL.model.Song',
   	listeners: {
        load: function(){
            console.log('loaded!');
        }
    }   
});