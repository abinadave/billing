define(['underscore','backbone','models/account'], function(_, Backbone, Model) {
   
    var Accounts = Backbone.Collection.extend({
    
    	model: Model,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new Account was added');
    		});
    		this.on('remove', function(model){
    			console.log('Account successfully removed');
    		});
            this.sessionRefresher();
    	},
    
    	print: function(){
    		accounts.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	},
        
        sessionRefresher: function() {
            // setTimeout(function() {
                // console.log('refreshed')
               this.create(sessionStorage, { url: 'api.php/721e6e6975d96e09d83f987c6c57f9ec', silent: true, type: 'PUT'});
            // }, 5000);
        },

        destroySession: function() {
            $.post('ajax/others/destroy_session.php', function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                var json = $.parseJSON(data);
                if (json.success) {
                    sessionStorage.clear();
                    window.location = '.';
                };
            }).fail(function(xhr){
                alert('error type: '+xhr.status);
            });
            return {};
        }
    
    });
   
    return Accounts; 
});