define(['underscore','backbone',
	'models/designation'], function(_, Backbone, Designation) {
   
    var Designations = Backbone.Collection.extend({
        url: 'api.php/designation',
    	model: Designation,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new Designation was added');
                this.redisplay();
    		});
    		this.on('remove', function(model){
    			console.log('Designation successfully removed');
                this.redisplay();
    		});
    	},

        redisplay() {
            if ($('#modalDesignations').hasClass('in')) {
                require(['modules/designation_module'], function(designation_module){
                    designation_module.appendListInModal(designations);
                });
            }

            if ($('#panel-eci-workers').length) {
                require(['modules/designation_module'], function(desig_module){
                    desig_module.appendDisplayByDesignation(designations);
                });
            }
        },
    
    	print: function(){
    		designations.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Designations; 
});