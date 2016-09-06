define(['underscore','backbone'], function(_, Backbone) {
   
    var Rpayrollemp = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},
    
        validate: function(attrs, options) {
            if (!attrs.name) {
               return "name is required";
            }
        }
    
    
    });
   
    return Rpayrollemp; 
});