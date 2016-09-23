define(['underscore','backbone'], function(_, Backbone) {
   
    var Module = {
    	doneFetch: function(colmod) {
    		Module.appendList(rpayrolls);
    	},

        getWorkers: function(id) {
            var list = Module.workersWithPid(id);
            return _.pluck(list, 'fullname');
        },

        workersWithPid(pid){
            return rpayrollemps.toJSON().filter(function(model) {
                return Number(model.payroll_id) === Number(pid);
            });
        },

        getPlate(workers){
            var rs = '', model = {}, truck_no = '';
            workers.forEach(function(arr) {
                rs = employees.where({fullname: arr});
                if (rs.length) {
                    model = employees.where({fullname: arr}, true).toJSON();
                    if (model.designation.substr(0,1).toLowerCase() === 'd') {
                       truck_no = model.truck_no;
                    }
                }
            });
            return truck_no;
        },

    	appendList: function(list) {
    		require(['views/restore/view_list_of_rpayrolls'], function(SubviewList){
    		    var view = new SubviewList({
                    collection: list
                });
    		});
    	}


    };
   
    return Module; 
});