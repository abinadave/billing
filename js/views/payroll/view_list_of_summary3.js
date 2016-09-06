define(['underscore','backbone',
	'text!templates/payroll/temp_list_of_summary3.html',
    'libs/accounting.min','modules/employee_module'], 
    function(_, Backbone, template, accounting, employee_module) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-summary3',
    
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

                $(function() {
                    console.log(self.collection.length);
                });

                $(function(){
               // self.$el.find('td').css('padding', '3px'); 
                });


                $(function() {
                    var json = self.collection.toJSON();
                    $rowSpan = $('#rowspan-summary3');
                    $('#rowspan-summary3');
                    var total_tonage = 0;

                    json.forEach(function(model) {
                        if (model.designation === 'driver') {
                            total_tonage += Number(model.ton);                            
                        }
                    });
                    
                    var formated = accounting.formatMoney(total_tonage,' ', 2);
                    $rowSpan.text(formated).css({
                        'vertical-align': 'middle',
                        'font-weight': 'bolder',
                        'font-size': '14px'
                    }).prop('rowspan', self.collection.length + 2)
                });
        	}
    
    });
   
    return Subview; 
});