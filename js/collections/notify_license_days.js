define(['underscore','backbone',
	'models/notify_license_day'], function(_, Backbone, Model) {
   
    var Notify_license_days = Backbone.Collection.extend({
        
        url: 'index.php/notify_license_day',
    	
        model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new notification for license was added');
    		});
    		this.on('remove', function(model){
    			console.log('license notification days successfully removed');
    		});
    	},
    
    	print: function(){
    		notify_license_days.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Notify_license_days; 
});