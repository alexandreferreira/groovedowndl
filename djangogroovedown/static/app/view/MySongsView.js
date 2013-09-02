//Ext.QuickTips.init();
Ext.define('GrooveDownDL.view.MySongsView' ,{
    extend: 'Ext.ux.LiveSearchGridPanel',
    alias : 'widget.mysongsview',
    forceFit: true,
    title : 'Minhas Músicas Seleciondas',
    id: 'mysongview',
    alias : 'widget.mysongview',
    columnLines: true,
    viewConfig: {
        stripeRows: true
    },
    initComponent: function() {
        this.features = [{
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
    	this.store = 'MySongs';
	    this.columns = [{
	            text: 'ID',
	            width: 80,
	            sortable: false,
	            dataIndex: 'id'
	        }, {
	            text: 'Nome',
	            flex: 3,
	            sortable: true,
	            dataIndex: 'name',
	            
	        }, {
	            header: 'Artista',
	            flex: 1,
	            sortable: true,
	            dataIndex: 'artist',
	            
	        },{
	            xtype: 'checkcolumn',
	            header: 'Baixar?',
	            dataIndex: 'baixar',
	            sortable: false,
	            width: 60,
	            editor: {
	                xtype: 'checkbox'
	            }
	        }
	    ];
	    this.callParent(arguments);
    }
});