// This set's up the module paths for underscore and backbone
require.config({ 
	waitSeconds : 25,
    'paths': { 
		"underscore": "libs/underscore-min", 
		"backbone": "libs/backbone-min",
		"domReady": "libs/requirejs/domReady",
		"moment": "libs/momentjs/moment.min",
		"css": "libs/require-css/css",
		'printarea': 'libs/print-area/demo/jquery.PrintArea',
		'is': 'libs/is/master/is.min',
		"datatable": "libs/dataTables/jquery.dataTables",
		"DT-bootstrap": "libs/dataTables/dataTables.bootstrap",
		"jqueryui": "libs/jquery-ui/jquery-ui.min",
		"alertify": "libs/alertify/alertify"
	},
	
	'shim': 
	{	
		
		backbone: {
			'deps': ['jquery', 'underscore'],
			'exports': 'Backbone'
		},

		underscore: {
			'exports': '_'
		},

		domeReady: {
			'exports': 'domeReady'
		},

		is: {
			'exports': 'is'
		},

		datatable: {
			"deps": ['jquery']
		},

		"DT-bootstrap": {
            "deps": ['datatable']
        },

        "jqueryui": {
        	"deps": [
        		'jquery',
        		'css!libs/jquery-ui/jquery-ui.min.css'
        	]
        },

        "alertify": {
        	"deps": [
        		'css!libs/alertify/css/alertify.css',
        		'css!libs/alertify/css/themes/bootstrap.min.css'
        	]
        }



	},

	'map': {
        "*": {
            "css":  "libs/require-css/css"
        }
    }	

}); 

require(['domReady','underscore','backbone','app'], 
	function(domReady, _,  Backbone,  app){
		
	domReady(function(){
		app.init();
	});

});

