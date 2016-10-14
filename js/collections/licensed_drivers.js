define(['underscore','backbone',
	'models/licensed_driver'], function(_, Backbone, LDModel) {
   
    var LD = Backbone.Collection.extend({
        url: 'index.php/licensed_driver',
    	model: LDModel,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new Licensed driver was added');
                this.afterAdd();
    		});
    		this.on('remove', function(model){
    			console.log('Licensed driver successfully removed');
    		});
    	},

        afterAdd(){
            console.log('new add');
            require(['modules/eciworker_module'], function(eciworker_module){
                eciworker_module.appendList(eci_workers);
            });
        },
    
    	print: function(){
    		licensed_drivers.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return LD; 
});