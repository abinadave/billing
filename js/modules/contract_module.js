define(['underscore','backbone',
	'moment','modules/functions'], function(_, Backbone, moment, Fn) {
   
    var Module = {

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