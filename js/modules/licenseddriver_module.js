define(['underscore','backbone',
    'modules/functions',
    'moment'], function(_, Backbone, Fn, moment) {
   
    var Module = {

            displayNearlyExpiredWorkers(){
                var self = this;
                $.get('index.php/notify_license_days/latest_id', function(data) {
                    var row = $.parseJSON(data);
                    var list = self.getNearlyExpiredWorkers(row.days);
                    
                    self.appendNearlyExpiredWorkers(
                        new Backbone.Collection(list)
                    );

                    var obj = self.getExpiredLicense(list);
                    $('#expired-license').text(obj.expired);
                    $('#nearly-expired').text(obj.nearly);
                });
            },

            getExpiredLicense(list){
                var expired = 0, nearly = 0;
                list.forEach(function(model) {
                    if (model.diffInDays <= 0) {
                        ++expired;
                    }else {
                        ++nearly;
                    }
                });
                return {
                    expired: expired,
                    nearly: nearly
                };
            },

            getNearlyExpiredWorkers(rule_days){
                var self = this, diffInDays = 0;
                var date_now = moment().format('MMMM DD, YYYY');
                return eci_workers.toJSON().filter(function(model) {
                    var licenseFound = self.findLatestLicense(model.id);
                    if (licenseFound.length) {
                        var license = _.first(licenseFound);
                        var diffInDays = moment(license.get('exp_date')).diff(date_now,'days');
                        model.exp_date = license.get('exp_date');
                        model.diffInDays = diffInDays;
                        return Number(diffInDays) <= Number(rule_days);
                    }
                });
            },

            findLatestLicense(worker_id){
                var arrOfLicense = licensed_drivers.where({worker_id: worker_id}, false); var largest = 0;
                arrOfLicense.forEach(function(model) { if (Number(model.id) > largest) { largest = Number(model.id); } });
                return licensed_drivers.where({id: largest.toString()});
            },
    	
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
        },

        appendNearlyExpiredWorkers(list){
            require(['views/eci/worker/nearly_expired/view_list_of_nearly_expired_licensed_drivers'], 
                function(SubviewNearlyExpired){
                new SubviewNearlyExpired({
                    collection: list
                });
            });
        }
        
    }
   
    return Module; 
});