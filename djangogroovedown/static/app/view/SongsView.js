//Ext.QuickTips.init();
Ext.define('GrooveDownDL.view.SongsView' ,{
    extend: 'Ext.ux.LiveSearchGridPanel',
    alias : 'widget.songsview',
    forceFit: true,
    title : 'Busca de Músicas',
    id: 'songview',
    alias : 'widget.songview',
    columnLines: true,
    viewConfig: {
        stripeRows: true
    },
    initComponent: function() {
    	this.dockedItems = Ext.create('widget.toolbar', {
            items:[{
	            xtype: 'toolbar',
	            items: [{
	                text: 'Polulares no Dia',
	                action: 'populares'
		            },{
		        		xtype: 'tbseparator'
		    		},{
			            xtype: 'radiogroup',
			            id: 'buscatype',
			            width: 300,
			            items: [
			                {boxLabel: 'Nome', name: 'type', inputValue: 1, checked: true},
			                {boxLabel: 'Artista', name: 'type', inputValue: 2},
			                {boxLabel: 'Album', name: 'type', inputValue: 3},
			                {boxLabel: 'Lista', name: 'type', inputValue: 4}
		                
		            		]
		        	},{
                		xtype:'textfield',enableKeyEvents:true,id:'textoBusca',minLength:4,
            		},{
		                text: 'Buscar',
		                action: 'buscar'
		            },{
		        		xtype: 'tbseparator'
		    		},{
		        		text: 'Selecionar Todas',
		        		action: 'selall'
		    		},{
		        		text: 'Limpar',
		        		action: 'clear'
		    		},{
		        		xtype: 'tbseparator'
		    		},{
		                text: 'Baixar',
		                action: 'baixar'
		            }
	            ]
	        }]
        });
        this.features = [{
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
    	this.store = 'Songs';
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