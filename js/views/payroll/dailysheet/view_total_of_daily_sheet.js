define(['underscore','backbone',
	'text!templates/payroll/dialysheet/temp_total_of_daily_sheet.html',
	'moment',
	'libs/accounting.min',
	'modules/payrollemp_module',
    'modules/employee_module'], 
    function(_, Backbone, template, moment, Accounting, 
    payrollemp_module, employee_module) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'table',
    
        	el: '#total-of-daily-sheets',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var selectedEmps = employee_module.getSelectedEmps();
                var output = self.template({
                    'library': self.collection.toJSON(),
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
					self.$el.find('th, td').addClass('text-center');                   
                });

                jQuery(document).ready(function($) {
                   var rowspan = 0;
                    self.$el.find('tbody').find('td').each(function(index, el) {
                        var str = this.id.split('-');
                        if (Number(str[1]) > 1) {
                            $(this).remove();
                            ++rowspan;
                        }
                    });
                    $('#td-1').attr('rowspan', rowspan + 1).css({
                        'vertical-align': 'middle',
                        'font-weight': 'bolder'
                    });
                });
        	}
    
    });
   
    return Subview; 
});