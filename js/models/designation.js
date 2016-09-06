define(['underscore','backbone'], function(_, Backbone) {
   
    var Designation = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
                designations.redisplay();
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},
    
        validate: function(attrs, options) {
            if (!attrs.name) {
               return "Designation name is required";
            }
                       
        }
    
    
    });
   
    return Designation; 
});