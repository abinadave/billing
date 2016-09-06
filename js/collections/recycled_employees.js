define(['underscore','backbone',
	'models/recycled_employee'], function(_, Backbone, RE_model) {
   
    var Recycled_emps = Backbone.Collection.extend({
    	url: 'api.php/recycled_employee',
    	model: RE_model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new recycled employee was added');
    		});
    		this.on('remove', function(model){
    			console.log('recycled employee successfully removed');
    		});
    	},
    
    	print: function(){
    		recycled_employees.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Recycled_emps; 
});