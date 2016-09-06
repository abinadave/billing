define(['underscore','backbone',
	'models/eci_position'], function(_, Backbone, Eci_position) {
   
    var Eci_positions = Backbone.Collection.extend({
    	url: 'api.php/eci_position',
    	model: Eci_position,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new Eci_position was added');
    		});
    		this.on('remove', function(model){
    			console.log('Eci_position successfully removed');
    		});
    	},
    
    	print: function(){
    		eci_positions.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Eci_positions; 
});