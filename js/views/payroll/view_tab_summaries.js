define(['underscore','backbone',
	'text!templates/payroll/temp_tab_summaries.html',
    'modules/summary_module'], function(_, Backbone, template, sm) {
   
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
                    //jQuery
                    self.$el.find('#modal-summaries').modal('show');
                    sm.appendTblSummary1();
                    sm.appendTblSummary2();
                    sm.appendTblSummary3();
                });

                jQuery(document).ready(function($) {
                    self.$el.find('#printEnvelopeSummary1').click(function(event) {
                        /* Act on the event */
                        console.clog(1);
                    });
                });

                $(function() {
                    var width = $(window).width();
                    var height = $(window).height();
                                      
                    // if (width >= 1500) {
                        self.$el.find('.modal-dialog').css({
                            width: (width >= 1900) ? '40%': '50%'
                        });  
                    // }
                });

               
        	}
    
    });
   
    return Subview; 
});