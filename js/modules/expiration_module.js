define([
	'underscore',
	'backbone',
	'moment'
	], function(_, Backbone, moment) {
   
    /* This module is for nofity_contract_ days only */
    var Module = {

        displayNearlyExpired(){
            $.ajax({
                url: 'index.php/notify_contract_day/latest',
                type: 'GET'
            }).done(function(data) {
                var json = $.parseJSON(data);
                if (Number(json.days) > 0) {
                    $('#days-b4-expiration').val(json.days);
                    $('#days-b4-exp').text(json.days);
                    var listOfEmps = Module.getNearlyExpiredContract(json.days);
                    var expired = Module.getExpiredContracts(listOfEmps);
                    $('#expired-contract').text(expired);
                    setTimeout(function() {
                        Module.appendNearlyExpiredWorkers(
                            new Backbone.Collection(listOfEmps),
                            new Backbone.Model({ days: json.days})
                        );
                    }, 700);
                }
            }).fail(function() {
                console.log("error in fetching latest contract day");
            });
        },

        getExpiredContracts(listOfEmps){ 
            var negative = 0; listOfEmps.forEach(function(model) { if (model.diffInDays < 0) { ++negative; } }); return negative;
        },
    	
    	appendNearlyExpiredWorkers(list, model){
    		require(['views/eci/worker/nearly_expired/view_list_of_nearly_expired_eci_workers'], 
    			function(Subview){
    		    new Subview({
    		    	collection: list,
                    model: model
    		    });
    		});
    	},

    	getNearlyExpiredContract(rule_days){
    		var self = this;
    		var date_now = moment().format('MMMM DD, YYYY');
    		return eci_workers.toJSON().filter(function(model) {
    			var contractFound = self.findLatestContract(model.id);
    			if (contractFound.length) {
    				var contract = contractFound[0];
    				var date_end = contract.get('end');
    				var diffInDays = moment(date_end).diff(moment().format('MMMM DD, YYYY'), 'days'); // 1 day
    				// console.log('remaining days: ['+diffInDays + ']  worker_id: [' + contract.get('worker_id') + ']');
    				model.diffInDays = diffInDays;
                    model.start = contract.get('start');
                    model.end = contract.get('end');
    				return Number(diffInDays) <= Number(rule_days);
    			};
    		});
    	},

    	findLatestContract(worker_id){
    		var arrOfContracts = contracts.where({worker_id: worker_id}, false);
    		var largest = 0;
			arrOfContracts.forEach(function(model) { if (Number(model.id) > largest) { largest = Number(model.id); } });
			return contracts.where({id: largest.toString()});
    	}
    };
   
    return Module; 
});