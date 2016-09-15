define([
	'underscore',
	'backbone',
	'models/notify_contract_day'], function(_, Backbone, Model) {
   
    var Notify_contract_days = Backbone.Collection.extend({
    	url: 'index.php/notify_contract_day',
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new notification for contract was added.');
    		});
    		this.on('remove', function(model){
    			console.log('notification for contract was removed.');
    		});
    	},
    
    	print: function(){
    		notify_contract_days.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Notify_contract_days; 
});