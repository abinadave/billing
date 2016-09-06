define(['underscore','backbone',
	'models/userlog'], function(_, Backbone, Userlog) {
   
    var Userlogs = Backbone.Collection.extend({
        url: 'api.php/userlog',
    	model: Userlog,
    		
    	initialize: function(){
    		// this.on('add', function(model){
    		// 	console.log('new Userlog was added');
    		// });
    		// this.on('remove', function(model){
    		// 	console.log('Userlog successfully removed');
    		// });
    	},
    
    	print: function(){
    		userlogs.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Userlogs; 
});