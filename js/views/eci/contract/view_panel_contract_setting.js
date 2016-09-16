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
                    	var obj = {
                    		days: $(this).find(':input').val(),
                    		date: moment().format('MMMM DD, YYYY HH:mm:ss'),
                    		created_by: sessionStorage.getItem('id'),
                    		table: 'notify_contract_days'
                    	};
                    	$.when(notify_contract_days.create(obj)).then((response) => {
                    		router.alertify_success('process completed.');
                    	}, (errorResp) => {
                    		console.log(errorResp);
                    	});                    	
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
                		self.getLatestId();
                	});
                });
        	},

        	getLatestId(){
        		var self = this;
        		$.ajax({
        			url: 'index.php/notify_contract_day/latest',
        			type: 'GET'
        		})
        		.done(function(data) {
        			var json = $.parseJSON(data);
        			if (Number(json.days) > 0) {
        				self.$el.find('form :input').val(json.days);
        				var listOfEmps = expiration_module.getNearlyExpiredContract(json.days);
        				setTimeout(function() {
	        				expiration_module.appendNearlyExpiredWorkers(
	        					new Backbone.Collection(listOfEmps),
	        					new Backbone.Model({ days: json.days})
	        				);
        				}, 700);
        			}
        		})
        		.fail(function() {
        			console.log("error in fetching latest contract day");
        		})
        	},

        	
    
    });
   
    return Subview; 
});