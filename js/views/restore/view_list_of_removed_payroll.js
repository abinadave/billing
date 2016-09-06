define(['underscore','backbone',
    'text!templates/restore/temp_list_of_removed_payroll.html',
    'modules/rpayroll_module',
    'moment',
    'libs/accounting.min'], function(_, Backbone, template, rpm, moment, Accounting) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-restored-payrolls',
    
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
                    'rpm': rpm,
                    'moment': moment,
                    'Accounting': Accounting
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    if (!self.collection.length) {
                        var output = '<tr><td colspan="6"><b class="text-primary">No payroll was found in this table</b></td></tr>';
                        self.$el.html(output);
                    }
                });
        	}
    
    });
   
    return Subview; 
});