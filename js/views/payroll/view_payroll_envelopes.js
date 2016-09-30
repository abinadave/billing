define(['underscore','backbone',
	'text!templates/payroll/temp_payroll_envelopes.html',
    'modules/summary_module',
    'modules/employee_module',
    'libs/accounting.min'], function(_, Backbone, template, summary_module, employee_module, Accounting) {
   
    var SubEnvelopes = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
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
                    'summary_module': summary_module,
                    'employee_module': employee_module,
                    'Accounting': Accounting
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;

                $(function() {
                    self.$el.find('ul').css({
                        'list-style': 'none'
                    }).end().find('li').css({
                        'font-size': '15px'
                    });
                });

                $(function(){
                     $('#main, #div-navigation').hide();
                     window.print();
                     setTimeout(function() {
                         $('#main, #div-navigation').show();
                     }, 500);
                });

                $(function() {
                    // self.$el.find('th, td').css({
                    //     fontSize: '16px'
                    // });
                });

             

        	}
    
    });
   
    return SubEnvelopes; 
});