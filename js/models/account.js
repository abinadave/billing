define(['underscore','backbone'], function(_, Backbone) {
   
    var Account = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	}
    
    
    });
   
    return Account; 
});