Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '/public/static/extjs/ux/');
Ext.require(['Ext.data.*', 'Ext.grid.*','Ext.tip.QuickTipManager',
    'Ext.ux.LiveSearchGridPanel']);
Ext.application({
    name: 'GrooveDownDL',
    appFolder: '/public/static/app',
    controllers: [
    	'SongViewController'
    ],
    launch: function () {
    	Ext.QuickTips.init();
    },
    autoCreateViewport: true
});