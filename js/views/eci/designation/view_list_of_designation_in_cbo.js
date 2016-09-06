define(['underscore','backbone',
	'text!templates/eci/designation/temp_list_of_designation_in_cbo.html',
    'modules/designation_module'], function(_, Backbone, template, desig_module) {
   
    var SubviewDIC = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'select',
    
        	el: '#modalHire #designation, #modalUpdateEciWorker #list-of-desig',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                self.collection = desig_module.sortByName(self.collection);
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    
                });
        	}
    
    });
   
    return SubviewDIC; 
});