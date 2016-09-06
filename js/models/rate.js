define(['underscore','backbone'], function(_, Backbone) {
   
    var Rate = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
            this.fetch();
    	},

        fetch: function(arguments) {
            $.get('ajax/select/select.php', {
                table: 'rate'
            }, function(json, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                var json = $.parseJSON(data);
                json.forEach(function(model) {
                    rate.set(model, {silent: true});
                });
            }).fail(function(xhr){
                router.alertify_error('Error in fetching data...');
            });
        }
    
    });
   
    return Rate; 
});