define(['underscore','backbone'], function(_, Backbone) {
   
    var Notify_license_day = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                require(['modules/licenseddriver_module'], function(LDM){
                    LDM.displayNearlyExpiredWorkers();
                });
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},
    
    	defaults: {
    		
    	},
    
        validate: function(attrs, options) {
            if (!attrs.days) {
               return "days before notification is required";
            }
        }
    
    
    });
   
    return Notify_license_day; 
});