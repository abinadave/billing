define(['underscore','backbone'], function(_, Backbone) {

    var Notify_contract_day = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                require(['modules/expiration_module'], function(expiration_module){
                    expiration_module.displayNearlyExpired();
                });
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},
   
        validate: function(attrs, options) {
            if (!attrs.days) {
               return "day of notification is required";
            }
        }
    
    });
   
    return Notify_contract_day; 
});