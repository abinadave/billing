define([
	'underscore',
	'backbone',
	'text!templates/eci/worker/previous/temp_modal_recycled_eciworkers.html',
    'modules/recycled_eciworker_module'
	], function(_, Backbone, template, RECYCLEC_ECIWORKER_MODULE) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-recycled-eci-workers',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    $('#modalRecycledEciWorkers').on('shown.bs.modal', function(event){
                    	$.when(recycled_eciworkers.fetch({
                    		silent: true
                    	})).then( (response) => {
                    		RECYCLEC_ECIWORKER_MODULE.appendList(recycled_eciworkers);
                    	}, (errorResp) => {
                    		console.log(errorResp);
                    	});
                    	
                    	
                    });

                    $('#modalRecycledEciWorkers').on('hidden.bs.modal', function(event){
                    	router.navigate('eci-workers');
                    });
                });
        	}
    
    });
   
    return Subview; 
});