define(['underscore','backbone',
    'modules/functions'], function(_, Backbone, Fn) {
   
    var Module = {
    	getDriversLicense(i){
    		var rs = licensed_drivers.where({worker_id: i});
    		if (rs.length) {
                var arrOfDrivers = Module.getArrOfLicensed(i);
                if (arrOfDrivers.length > 1) {  
                    var ids = _.pluck(arrOfDrivers, 'id').sort();
                    var id = ids.pop();
                    var model = _.where(arrOfDrivers, {id: id});
                    return model[0].exp_date;
                }else {
                    var model = arrOfDrivers[0];
                    return model.exp_date;
                }
    		}else {
    			return 'none';
    		}
    	},

        getLargestId(objModels){
            var largest = 0;
            objModels.forEach(function(obj) {
                if (Number(obj.id) > largest) {
                    largest = Number(obj.id);
                }
            });
            return largest;
        },

        getArrOfLicensed(wid){
            return licensed_drivers.toJSON().filter(function(model) {
                return Number(model.worker_id) === Number(wid);
            });
        },

        modalChangeLicense(model){
            require(['views/eci/license/view_modal_change_license'], function(Subview){
                new Subview({
                    model: model
                })
            });
        }
    }
   
    return Module; 
});