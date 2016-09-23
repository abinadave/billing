define(['underscore','backbone',
	'models/site'], function(_, Backbone, Site) {
   
    var Sites = Backbone.Collection.extend({
        url: 'api.php/site',
    	model: Site,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			this.redisplay();
    		});
    		this.on('remove', function(model){
    			console.log('model project site removed');
                this.redisplay();
    		});
    	},

        redisplay() {
            if ($('#modalProjectSite').hasClass('in')) {
                require(['modules/site_module'], function(site_module){
                    site_module.appendSitesInModel(sites);
                });
            }else {
                
            }

            if ($('#panel-eci-workers').length) {
                require(['modules/site_module'], function(site_module){
                    site_module.appendDisplayBySite(sites);
                });
            }
        },
    
    	print: function(){
    		sites.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Sites; 
});