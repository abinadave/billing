define([
	'underscore',
	'backbone',
	'text!templates/eci/contract/temp_panel_contract_settings.html',
	'moment',
	'modules/functions',
	'modules/expiration_module'
	], 
	function(_, Backbone, template, moment, fn, expiration_module) {
   
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
                $(function(){
                    //jQuery
                    self.$el.find('#form-notify-contract').submit(function(event) {
                    	event.preventDefault();
                        var $btn = $(this).find(':submit');
                        $btn.prop('disabled', true).text('saving....');

                    	var obj = {
                    		days: $(this).find(':input').val(),
                    		date: moment().format('MMMM DD, YYYY HH:mm:ss'),
                    		created_by: sessionStorage.getItem('id'),
                    		table: 'notify_contract_days'
                    	};

                    	$.when(notify_contract_days.create(obj)).then((response) => {
                    		router.alertify_success('process completed.');
                            setTimeout(function() {
                                $btn.prop('disabled', false).text('save');
                            }, 1000);
                    	}, (errorResp) => {
                    		console.log(errorResp);
                    	});

                        setTimeout(function() {
                            $btn.prop('disabled', false).text('save');
                        }, 8000);       
                              	
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