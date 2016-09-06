define(['underscore','backbone',
	'text!templates/payroll/dialysheet/temp_list_of_daily_sheets.html',
	'moment',
	'libs/accounting.min',
    'libs/backbone.obscura',
	'modules/payrollemp_module',
    'modules/employee_module'], 
    function(_, Backbone, template, moment, Accounting, Obscura,
    payrollemp_module, employee_module) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-dailysheets',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                var proxy = new Obscura(self.collection);
                self.$el.off();
                self.$el.empty();
                var selectedEmps = employee_module.getSelectedEmps();
                var output = self.template({'library': proxy.setSort('date','asc').toJSON(),
                	'moment': moment,
                	'payrollemp_module': payrollemp_module,
                	'Accounting': Accounting,
                    'selected': selectedEmps.toJSON(),
                    'employee_module': employee_module
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    self.$el.find('td').addClass('text-center');
                    var d1 = $('#d1').val(), d2 = $('#d2').val();
                    var text = 'Summary of Salary Covered from: ' + moment(d1).format('MMM DD') + ' - ' + moment(d2).format('MMM DD, YYYY') ;
                    $('#dailysheet-d1-d2').text(text);
                });
               
        	}
    
    });
   
    return Subview; 
});