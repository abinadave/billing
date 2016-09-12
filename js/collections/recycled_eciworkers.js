define(['underscore','backbone',
	'models/recycled_eciworker'], function(_, Backbone, Model) {
   
    var Recycled_eciworkers = Backbone.Collection.extend({
    	url: 'index.php/recycled_eciworker',
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new recycled eci worker was added');
    		});
    		this.on('remove', function(model){
    			console.log('recycled eci worker successfully removed');
    		});
    	},
    
    	print: function(){
    		recycled_eciworkers.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Recycled_eciworkers; 
});