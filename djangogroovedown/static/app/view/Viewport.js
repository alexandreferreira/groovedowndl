Ext.define('GrooveDownDL.view.Viewport', {
    extend: 'Ext.Viewport',    
    layout: 'fit',
    
    requires: [
        'GrooveDownDL.view.SongsView',
        'GrooveDownDL.view.MySongsView',
        'GrooveDownDL.view.SongsPanel'
    ], 
    
    initComponent: function() {
        var me = this;
        
        Ext.apply(me, {
            items: [
                {
                    xtype: 'songspanel'
                      
                }
            ]
        });
        
        me.callParent(arguments);
    }
});