define([
	'underscore',
	'backbone',
	'text!templates/eci/contract/temp_panel_contract_settings.html',
	'moment',
	'modules/functions',
	'modules/expiration_module',
    'views/eci/contract/view_modal_notify_contract_days'
	], 
	function(_, Backbone, template, moment, fn, expiration_module, SubviewModalContractdays) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                // this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;

                $(function() {
                    new SubviewModalContractdays();    
                });

                $(function() {
                    self.$el.find('#btnShowModal').on('click', function(event) {
                        $('#modal-notify-contract-days').modal('show');
                    });
                });

                
                $(function() {
                	fn.loadData([
                		'contracts',
                		'designations',
                		'sites',
                		'eci_workers',
                		'notify_contract_days'
                	], function(){
                		expiration_module.displayNearlyExpired();
                	});
                });
        	},

        	

        	
    
    });
   
    return Subview; 
});