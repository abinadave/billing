define(
    [
        'underscore',
        'backbone',
    	'text!templates/payroll/dialysheet/temp_modal_dailysheet.html',
        'modules/dailysheet_module',
        'modules/payroll_module',
        'moment'
    ],

    function(_, Backbone, template, dsm, payroll_module, moment) {
   
    var Subview = Backbone.View.extend({
    
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
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;

                $(function(){
                    $('#modalDailysheet').modal('show');

                    $('#modalDailysheet').on('shown.bs.modal', function(event) {
                        require(['jqueryui'], function(jqueryUi){
                            self.$el.find('#d1, #d2').datepicker();
                        });
                    });

                    self.$el.find('th').addClass('text-center');
                });

                $(function() {
                	self.$el.find('#btnSubmit').click(function(event) {
                        var is = self.$el.find('#chk-all-emps').is(':checked');
                		var d1 = self.$el.find('#d1').val(),
                		d2 = self.$el.find('#d2').val(), $btn = $(this);
                        $btn.text('Loading..').prop('disabled', true);
                        dailysheets.reset();
                        employees.forEach(function(model) { model.set({dailysheetSalary: '0'}, {silent: true}); });
                                
                        self.$el.find('tbody').text('loading......');
                        var list = payroll_module.getPayrollsBetween(moment(d1).subtract(1,'d'), moment(d2).add(1,'d'));

                        if (is) {
                            var html = "<i class='fa fa-spinner fa-pulse fa-3x fa-fw'></i><span class='sr-only'>Loading...</span>";
                            $('#div-tbl-dailysheet-loading').html(html);
                            dsm.noFilter(list);
                            setTimeout(function() {
                                dsm.appendAllList(dailysheets);
                            }, 1500);
                        }else {
                            dsm.filterPayroll(list);
                        };

                        setTimeout(function() {
                            $btn.text('SUBMIT').prop('disabled', false);
                        }, 500);
                	});
                });

                $(function() {
                    dailysheets.reset();
                    employees.forEach(function(model) {
                        model.set({dailysheetSalary: '0'}, {silent: true});
                    });
                });
                
                // (function() {

                //     var beforePrint = function() {
                //         console.log('Functionality to run before printing deliver');
                //     };

                //     var afterPrint = function() {
                //        $('#main, #navigation').show();
                //        $('#placeholder').empty();
                //     };

                //     if (window.matchMedia) {
                //         var mediaQueryList = window.matchMedia('print');
                //         mediaQueryList.addListener(function(mql) {
                //             if (mql.matches) {
                //                 beforePrint();
                //             } else {
                //                 afterPrint();
                //             }
                //         });
                //     }

                //     window.onbeforeprint = beforePrint;
                //     window.onafterprint = afterPrint;

                // }());

                jQuery(document).ready(function($) {
                    self.$el.find('#printThisDailysheet').on('click', function(event) {
                        $('#modalDailysheet').modal('hide');
                        setTimeout(function() {
                            var $div = $('#table-to-print').html();
                            $('#main, #navigation').hide();
                            $('#placeholder').html($div);
                            window.print();

                            setTimeout(function() {
                                $('#main, #navigation').show();
                                 $('#placeholder').empty($div);
                            }, 200);
                        }, 1000);
                    });
                });

        	}
    
    });
   
    return Subview; 
});