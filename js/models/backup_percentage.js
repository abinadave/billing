define(['underscore','backbone'], function(_, Backbone) {
   
    var Backup_percentage = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                //30/40*100 = 75.
                var total = this.get('value') / payrolls.total * 100;
                $('#complete').text(parseInt(total));
                if(parseInt(total) >= 100){
                    $('#modalWait').modal('hide');
                }
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},
    
    	defaults: {
    		value: 0
    	}
    
    });
   
    return Backup_percentage; 
});