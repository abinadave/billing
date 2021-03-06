define(['underscore','backbone','models/eci_worker',
    'modules/eciworker_module'], function(_, Backbone, Eci_worker, eciworker_module) {
   
    var Eci_workers = Backbone.Collection.extend({
    	url: 'api.php/eci_worker',
    	model: Eci_worker,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new Eci_worker was added');
                this.redisplay();
    		});
    		this.on('remove', function(model){
    			console.log('Eci_worker successfully removed');
                var eci_worker = _.omit(model.toJSON(),'id');
                eci_worker.unique_id = model.get('id');
                recycled_eciworkers.create(eci_worker);
                this.redisplay();
    		});
            this.on('fetch', function(){
                console.log('fetching')
            })
    	},
        
        redisplay: function() {
            if ($('#panel-eci-workers').length) {
                eciworker_module.appendList(eci_workers);
            }
        },

    	print: function(){
    		eci_workers.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Eci_workers; 
});