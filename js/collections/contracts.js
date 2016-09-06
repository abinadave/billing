define(['underscore','backbone',
	'models/contract'], function(_, Backbone, Contract) {
   
    var Contracts = Backbone.Collection.extend({
        url: 'api.php/contract',
    	model: Contract,
    		
    	initialize: function(){
    		this.on('add', function(model){
                this.afterAdd();
    		});
    		this.on('remove', function(model){
    			console.log('Contract successfully removed');
    		});
    	},

        afterAdd(){
            /* check if panel eci worker is present */
            if ($('#panel-eci-workers').length) {
                require(['modules/eciworker_module'], function(eciworker_module){
                    eciworker_module.appendList(eci_workers);
                });
            }
        },
    
    	print: function(){
    		contracts.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Contracts; 
});