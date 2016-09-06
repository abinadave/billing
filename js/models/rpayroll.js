define(['underscore','backbone'], function(_, Backbone) {
   
    var Module = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
            this.on('destroy', function(){
                require(['views/restore/view_list_of_removed_payroll'], function(SubviewList){
                    new SubviewList({
                        collection: rpayrolls
                    });
                });
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
   
    return Module; 
});