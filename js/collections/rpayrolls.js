define(['underscore','backbone','models/rpayroll'], function(_, Backbone, Model) {
   
    var Rpayrolls = Backbone.Collection.extend({
        url: 'api.php/rpayroll',
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			var percentage = bp.get('value');
                bp.set({value: ++percentage});

    		});
    		this.on('remove', function(model){
    			console.log('rpayrolls successfully removed');
    		});
    	},
    
    	print: function(){
    		rpayrolls.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Rpayrolls; 
});