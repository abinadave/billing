define(['underscore','backbone'], function(_, Backbone) {
   
    var Eci_position = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	}
    	
    });
   
    return Eci_position; 
});