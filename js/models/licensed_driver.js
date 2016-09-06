define(['underscore','backbone'], function(_, Backbone) {
   
    var Licensed_driver = Backbone.Model.extend({
    	url: 'api.php/licensed_driver',
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},

         validate: function(attrs, options) {
            if (attrs.exp_date === 'Invalid date') {
               return "Expiration date is invalid.";
            }
           
        }
    
    
    });
   
    return Licensed_driver; 
});