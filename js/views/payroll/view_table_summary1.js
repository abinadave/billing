define(['underscore','backbone',
	'text!templates/payroll/temp_table_summary1.html',
	'modules/summary_module',
    'moment','printarea',
    'css!libs/print-area/demo/PrintArea.css'], function(_, Backbone, template, summary_module, moment) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',

        	el: '#table-summary1',
    
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
                    //jQuery
                    self.$el.find('th').addClass('text-center');
                    summary_module.appendListSummary1(summaries);
                });

                $(function() {
                    setTimeout(function() {
                        summary_module.initTwodates(moment);
                    }, 500);
                });

                (function() {

                    var beforePrint = function() {
                        console.log('Functionality to run before printing deliver');
                    };

                    var afterPrint = function() {
                       $('#main, #navigation').show();
                       $('#placeholder').empty();
                    };

                    if (window.matchMedia) {
                        var mediaQueryList = window.matchMedia('print');
                        mediaQueryList.addListener(function(mql) {
                            if (mql.matches) {
                                beforePrint();
                            } else {
                                afterPrint();
                            }
                        });
                    }

                    window.onbeforeprint = beforePrint;
                    window.onafterprint = afterPrint;

                }());


                jQuery(document).ready(function($) {

                    self.$el.find('#printTableSummary1').click(function(event) {
                        $('#modal-summaries').modal('hide');
                        setTimeout(function() {
                            var $div = $('#div-tbl-summary1').html();
                            $('#main, #navigation').hide();
                            $('#placeholder').html($div);
                            window.print();
                        }, 1000);
                    });
                });
        	}
    
    });
   
    return Subview; 
});