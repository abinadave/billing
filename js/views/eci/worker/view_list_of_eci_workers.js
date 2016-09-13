define([
    'underscore',
    'backbone',
	'text!templates/eci/worker/temp_list_of_eci_workers.html',
	'modules/designation_module',
	'modules/site_module',
    'modules/licenseddriver_module',
    'modules/contract_module'], function(_, Backbone, template, desig_module, site_module, 
        licenseddriver_module, contract_module) {
   
    var SubviewEW = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-eci-workers',
    
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
                	'site_module': site_module,
                	'desig_module': desig_module,
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
                    var $spanLength = $('#total-eci-workers');
                    $spanLength.text(self.collection.length);
                    if (!self.collection.length) {
                        var output = '<tr><td colspan="6" style="font-weight: bolder" class="text-primary">No data was found in this table.</td></tr>';
                        self.$el.html(output);
                    }
                });
        	}
    
    });
   
    return SubviewEW; 
});