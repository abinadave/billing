define(['underscore','backbone',
	'text!templates/payroll/dialysheet/temp_total_of_dailysheet_all.html',
	'libs/accounting.min',
    'modules/employee_module'], 
	function(_, Backbone, template, Accounting, employee_module) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                // this.render();
        	},
    
        	tagName: 'div',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(selectedEmps){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({
                	'library': self.collection.toJSON(),
                    'selected': selectedEmps.toJSON(),
                	'Accounting': Accounting,
                    'employee_module': employee_module
            	});
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
   
    return Subview; 
});