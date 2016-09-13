define(['underscore','backbone'], function(_, Backbone) {
   
    var Reason = Backbone.Model.extend({
    	url: 'index.php/reason',
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},
   
        validate: function(attrs, options) {
            if (!attrs.body) {
               return "reason for resignation is required";
            }
        }
    
    
    });
   
    return Reason; 
});