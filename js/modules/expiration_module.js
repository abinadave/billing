define([
	'underscore',
	'backbone',
	'moment'
	], function(_, Backbone, moment) {
   
    var Module = {
    	
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