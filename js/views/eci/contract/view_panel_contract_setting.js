define([
	'underscore',
	'backbone',
	'text!templates/eci/contract/temp_panel_contract_settings.html',
	'moment',
	'modules/functions'
	], 
	function(_, Backbone, template, moment, fn) {
   
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
        				self.getNearlyExpiredContract(json.days);
        				self.$el.find('form :input').val(json.days);
        			}
        		})
        		.fail(function() {
        			console.log("error in fetching latest contract day");
        		})
        	},

        	getNearlyExpiredContract(rule_days){
        		var self = this;
        		var date_now = moment().format('MMMM DD, YYYY');
        		eci_workers.toJSON().filter(function(model) {
        			var contractFound = self.findLatestContract(model.id);
        			if (contractFound.length) {
        				var contract = contractFound[0];
        				var date_end = contract.get('end');
        				var diffInDays = moment(date_end).diff(moment().format('MMMM DD, YYYY'), 'days'); // 1 day
        				console.log('remaining days: ['+diffInDays + ']  worker_id: [' + contract.get('worker_id') + ']');
        			}
        		});
        	},

        	findLatestContract(worker_id){
        		var arrOfContracts = contracts.where({worker_id: worker_id}, false);
        		var largest = 0;
    			arrOfContracts.forEach(function(model) { if (Number(model.id) > largest) { largest = Number(model.id); } });
    			return contracts.where({id: largest.toString()});
        	}
    
    });
   
    return Subview; 
});