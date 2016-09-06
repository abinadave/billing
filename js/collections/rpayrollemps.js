define(['underscore','backbone','models/rpayrollemp'], function(_, Backbone, Model) {
   
    var Rpayrollemps = Backbone.Collection.extend({
    
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new removed payrollemp was added');
    		});
    		this.on('remove', function(model){
    			console.log('removed payrollemp successfully removed');
    		});
    	},
    
    	print: function(){
    		rpayrollemps.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Rpayrollemps; 
});