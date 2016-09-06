define(['underscore','backbone'], function(_, Backbone) {
   
    var Contract = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},
    
        validate: function(attrs, options) {
            if (!attrs.start) {
               return "Start of Contract date is required";
            }
            if (!attrs.end) {
               return "End of Contract date is required";
            }
            if (attrs.start === 'Invalid date') {
                return 'Invalid start of contract date, Contract dates is required';
            }
            if (attrs.end === 'Invalid date') {
                return 'Invalid end of contract date, Contract dates is required';
            }
        }
    
    
    });
   
    return Contract; 
});