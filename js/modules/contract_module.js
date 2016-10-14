define(['underscore','backbone',
	'moment','modules/functions',
    'modules/expiration_module'], function(_, Backbone, moment, Fn, EXPIRATION_MODULE) {
   
    var Module = {

        notifyNearlyExpired(self){
            $.ajax({
                url: 'index.php/notify_contract_day/latest',
                type: 'GET'
            }).done(function(data) {
                var json = $.parseJSON(data);
                if (Number(json.days) > 0) {
                    $('#days-b4-expiration').val(json.days);
                    $('#rule-days').text(json.days);
                    var listOfEmps = EXPIRATION_MODULE.getNearlyExpiredContract(json.days);
                    var expired = EXPIRATION_MODULE.getExpiredContracts(listOfEmps);
                    
                    var nearlyExpired = Number(listOfEmps.length) - Number(expired);
                    self.notifyExpiredContract({
                        nearly: nearlyExpired,
                        expired: expired
                    });
                }
            }).fail(function() {
                console.log("Error in fetching latest contract day.");
            });
        },

        notification(self){
            console.log(self);
        },

    	getContract(i){
    		var rs = contracts.where({worker_id: i});
    		if (rs.length) {
    		    var models = Module.getArrOfContracts(i);
                if (models.length > 1) {
                    var model = Fn.sortByKey(models,'id').pop();
                    return '<b class="text-info">' +moment(model.start).format('MMM DD, YYYY') + '</b> &nbsp;&nbsp;To&nbsp;&nbsp; <b class="text-info">' + moment(model.end).format('MMM DD, YYYY') + '</b>';
                }else {
                    var model = _.first(models);
                   return '<b class="text-info">' +moment(model.start).format('MMM DD, YYYY') + '</b> &nbsp;&nbsp;To&nbsp;&nbsp; <b class="text-info">' + moment(model.end).format('MMM DD, YYYY') + '</b>';
                }
            }else {
    			return 'not found';
    		}
    	},

        getArrOfContracts(work_id){
            return contracts.toJSON().filter(function(model) {
                return Number(model.worker_id) === Number(work_id);
            });
        },

    	showModalRenew(model){
    		require(['views/eci/contract/view_modal_renew_contract_emp'], function(Subview){
    		    new Subview({
                    model: model
                });
    		});
    	}
        
    };
   
    return Module; 
});