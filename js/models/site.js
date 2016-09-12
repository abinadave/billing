define(['underscore','backbone'], function(_, Backbone) {
   
    var Site = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
                sites.redisplay();
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},
    
        validate: function(attrs, options) {
            if (!attrs.name) {
               return "Name of Project site is required";
            }
        }
    
    
    });
   
    return Site; 
});