define(['underscore','backbone',
	'text!templates/eci/site/temp_list_of_sites_in_cbo.html',
	'modules/site_module'], function(_, Backbone, template, site_module) {
   
    var SubviewSIC = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'select',
    
        	el: '#modalHire #site, #modalUpdateEciWorker #list-of-site',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                self.collection = site_module.sortByName(self.collection);
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    
                });
        	}
    
    });
   
    return SubviewSIC; 
});