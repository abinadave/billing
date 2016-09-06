define(['underscore','backbone',
	'text!templates/payroll/temp_list_of_summary2.html',
	'libs/accounting.min',
    'modules/employee_module',
    'modules/payrollemp_module',
    'libs/backbone.obscura'], 
	function(_, Backbone, template, accounting, em, pem, Obscura) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
        
        	tagName: 'tbody',
    
        	el: '#list-of-summary2',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var proxy = new Obscura(self.collection);
                self.collection = proxy.setSort('ton','desc');
                var output = self.template({
                	'library': self.collection.toJSON(),
                	'accounting': accounting,
                    'em': em,
                    'pem': pem
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    // self.$el.find('td').css('padding', '3px');
                });

                $(function() {
                    console.log(self.collection.length);
                    
                });
        	}
    
    });
   
    return Subview; 
});