define(['underscore','backbone','text!templates/payroll/temp_list_of_summary1.html',
	'libs/accounting.min','modules/employee_module'], 
	function(_, Backbone, template, accounting, employee_module) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-summary1',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({
                    'library': self.collection.toJSON(), 
                    'accounting': accounting,
                    'employee_module': employee_module
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    var total = 0.0;
                    self.collection.forEach(function(model) {
                        total += Number(model.get('ton'));
                    });
                    var formated = accounting.formatMoney(total.toString(),'Php ',2);
                    self.$el.find('td#summary1-total-ton').text(formated);
                });
                $(function() {
                    // self.$el.find('td').css('padding', '3px');
                });

                $(function() {
                    console.log(self.collection.length);
                });
        	}
    
    });
   
    return Subview; 
});