define(['underscore','backbone','models/dailysheet',
    'modules/dailysheet_module'], function(_, Backbone, Dailysheet, dsm) {
   
    var Dailysheets = Backbone.Collection.extend({
    
    	model: Dailysheet,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			dsm.appendList(dailysheets);
    		});
    		this.on('remove', function(model){
    			dsm.appendList(dailysheets);
    		});
    	},
    
    	print: function(){
            dailysheets.forEach(function(model) {
                console.log(model.attributes); 
            });
    	}
    
    });
   
    return Dailysheets; 
});