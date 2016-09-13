define(['underscore','backbone',
	'text!templates/eci/worker/previous/temp_list_of_recycled_eciworkers.html',
	'modules/designation_module',
	'modules/site_module',
	'modules/licenseddriver_module',
	'modules/contract_module'
	], function(_, Backbone, template, desig_module, 
		site_module, licenseddriver_module, contract_module) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-recycled-eciworkers',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({
                	'library': self.collection.toJSON(),
                	'desig_module': desig_module,
                	'site_module': site_module,
                	'licenseddriver_module': licenseddriver_module,
                	'contract_module': contract_module
                });
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
   
    return Subview; 
});