Ext.define('GrooveDownDL.view.SongsPanel' ,{
    extend: 'Ext.panel.Panel',
    alias : 'widget.songspanel',

    frame: true,
    title: 'GrooveDownDL! Projeto Open Sorce Django + Exjs',
    bodyPadding: 5,
    layout: {
        type: 'vbox',
        align: 'stretch',
        pack  : 'start'
    }, 

    items: [{
        xtype: 'songview',
        layout: 'fit',
        flex:5
        
    },{
    	xtype: 'mysongview',
        layout: 'fit',
        flex:3
    	
    }]

});    