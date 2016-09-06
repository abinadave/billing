define([
    'underscore',
    'backbone',
    'text!templates/payroll/temp_table_payroll.html',
    'modules/collection_module',
    'modules/payrollemp_module',
    'modules/payroll_module',
    'moment'
    ], 
    function(_, Backbone, template, colmod, payrollemp_module, payroll_module,  moment) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
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
                    self.$el.find('tbody').html('<tr><td colspan="10">Please wait while fetching data from the server....</td></tr>');
                    setTimeout(function() {
                        $.when(employees.fetch({silent: true})).then(function() {
                            $.when(payrollemps.fetch({silent: true, url: 'api.php/payrollemp/partial'})).then(function() {
                                $.when(payrolls.fetch({silent: true, url: 'api.php/get_order_by/payrolls/date_time/desc'})).then(function() {
                                    require(['views/payroll/view_list_of_payroll'], function(Subview){
                                        var view = new Subview({
                                            collection: payrolls
                                        });
                                    });
                                });  
                            });
                        });
                    }, 700);
                });

                $(function() {
                    self.$el.find('#backup-all').click(function(event) {
                        require(['modules/account_module',
                            'css!libs/alertify/css/alertify.css',
                            'css!libs/alertify/css/themes/bootstrap.css',
                            'libs/alertify/alertify'], function(am, css1, css2, alertify){
                                alertify.defaults.glossary.title = 'Confirmation Message';
                                alertify.confirm('Are you Sure ?', function(a, b) {
                                    if(!a.cancel) {
                                        payrolls.total = payrolls.length;
                                        $(this).prop('disabled', true);
                                        am.appendModalWait();
                                        payrollemp_module.removePayrollEmps();
                                    };
                                });
                        });
                    });
                });

                jQuery(document).ready(function($) {
                    self.$el.find('#btnSummaries').click(function(event) {
                        $(this).prop('disabled', true);
                        summaries.reset();
                        setTimeout(function() {
                            /* Act on the event */
                            var d1 = moment(self.$el.find('#d1').val()).format('MMMM DD, YYYY');
                            var d2 = moment(self.$el.find('#d2').val()).format('MMMM DD, YYYY');
                            if (d1 === 'Invalid date' || d2 === 'Invalid date') {
                                router.alertify_error('Please pick two different dates.');
                            }else {
                                var isBefore = moment(d1).isBefore(d2);
                                if (isBefore) {
                                    var list = payroll_module.getPayrollsBetween(moment(d1).subtract(1,'d'), moment(d2).add(1,'d'));
                                    payrollemp_module.calculateSummary(list);
                                    payroll_module.appendTabSummaries();
                                }else {
                                    router.alertify_warning('Incorrect date, date 1 should be before date 2.');
                                }
                            }
                            self.$el.find('#btnSummaries').prop('disabled', false);
                        }, 700);
                        
                    });
                });

                jQuery(document).ready(function($) {
                    setTimeout(function() {
                        require(['jqueryui'], function(jqueryui){
                            self.$el.find('#d1, #d2').datepicker();
                        });
                    }, 700);
                });

        	}
    
    });
   
    return Subview; 
});