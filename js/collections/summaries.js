define(['underscore','backbone'
	,'models/summary'], function(_, Backbone, Summary) {
   
    var Summaries = Backbone.Collection.extend({
    
    	model: Summary,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			// console.log('new Summary was added');
    		});
    		this.on('remove', function(model){
    			// console.log('Summary successfully removed');
    		});
    	},
    
    	print: function(){
    		summaries.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Summaries; 
});