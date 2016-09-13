define(['underscore','backbone',
	'models/reason'], function(_, Backbone, Reason) {
   
    var Reasons = Backbone.Collection.extend({
    
    	model: Reason,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new model was added');
    		});
    		this.on('remove', function(model){
    			console.log('model successfully removed');
    		});
    	},
    
    	print: function(){
    		
    	}
    
    });
   
    return Reasons; 
});