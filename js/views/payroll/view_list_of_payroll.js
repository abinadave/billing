define([
    'underscore',
    'backbone',
	'text!templates/payroll/temp_list_of_payroll.html',
    'moment',
    'libs/backbone.obscura',
    'modules/collection_module',
    'modules/payroll_module',
    'modules/payrollemp_module',
    'libs/accounting.min'], function(_, Backbone, template, moment, 
        Obscura, colmod, payroll_module, payrollemp_module, Accounting) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-payrolls',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                self.collection = colmod.sortBy(Obscura, self.collection, 'date_time', 'desc');
                var output = self.template({'library': self.collection.toJSON(), 'moment': moment,
                'payrollemp_module': payrollemp_module, 'Accounting': Accounting });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    self.$el.find('tr').css({
                        cursor: 'pointer'
                    });
                });

                jQuery(document).ready(function($) {
                    self.$el.find('tr').mouseenter(function(event) {
                        var id = this.id.split('-')[1];
                        var proxy = new Obscura(payrollemps);
                        proxy.filterBy('payroll_id', {payroll_id: id});
                        require(['modules/payrollemp_module'], function(pem){
                            pem.appendempsInUL(proxy);
                        });
                    });
                });

                $(function() {
                    if (!self.collection.length) {
                        $('.remove-when-nothing').remove();
                    }
                });

                $(function() {
                    require(['modules/functions'], function(Fn){
                        setTimeout(function() {
                            Fn.datatablePlugin('#tbl-payroll');
                        }, 500);
                    });
                });

                $(function() {
                    self.$el.find('a').mouseenter(function(event) {
                        // var id = this.id;
                        // var lists = payrollemp_module.getEmps(id);
                        // var popover = $(this);
                        // popover.attr('data-content', lists.pluck('fullname'));
                    });
                });

                $(function () {
                    $('[data-toggle="popover"]').popover();
                });

        	}
    
    });
   
    return Subview; 
});