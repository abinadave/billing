define(['underscore','backbone',
	'text!templates/eci/license/temp_panel_license_expiration.html',
	'modules/functions'], 
	function(_, Backbone, template, FN) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                // this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
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
                	FN.loadData([
                		'licensed_drivers',
                		'eci_workers',
                		'designations',
                		'sites'
                	], function(){
                		console.log('done');
                	});
                    
                });
        	}
    
    });
   
    return Subview; 
});