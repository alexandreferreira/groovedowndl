Ext.define('GrooveDownDL.model.Song', {
    extend:'Ext.data.Model',
    //idProperty:'id',
    fields:[
    {
        name: 'id',
        type: 'int'
    }, {
        name: 'duration',
        type: 'string'
    },{
        name: 'popularity',
        type: 'int'      
    },{
        name: 'name',
        type: 'string'
    },{
        name: 'artist',
        type: 'string'
    },{
        name: 'track',
        type: 'string'
    },{
        name: 'artist_id',
        type: 'string'
    },{
        name: 'album_id',
        type: 'string'
    },{
        name: 'cover',
        type: 'string'
    },{
        name: 'album',
        type: 'string'
    },{
        name: 'baixar',
        type: 'boolean'
    }]
});