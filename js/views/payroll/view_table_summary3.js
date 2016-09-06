define(['underscore','backbone',
	'text!templates/payroll/temp_table_summary3.html'], function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#table-summary3',
    
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
                
                jQuery(document).ready(function($) {
                    require(['modules/summary_module'], function(sm){
                        setTimeout(function() {
                            sm.appendListOfSummary3(summaries);
                        }, 500);
                    });
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
                    self.$el.find('#printTableSummary3').click(function(event) {
                        $('#modal-summaries').modal('hide');
                        setTimeout(function() {
                            var $div = $('#div-tbl-summary3').html();
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