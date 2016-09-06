define(['underscore','backbone','models/payrollemp'], function(_, Backbone, Payrollemp) {
   
    var Payrollemps = Backbone.Collection.extend({
        url: 'api.php/payrollemp',
    	model: Payrollemp,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new Payrollemp was added');
    		});
    		this.on('remove', function(model){
    			console.log('Payrollemp successfully removed');
    		});
    	},
    
    	print: function(){
    		payrollemps.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Payrollemps; 
});