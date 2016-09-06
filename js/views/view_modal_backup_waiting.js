define(['underscore','backbone',
	'text!templates/temp_modal_backup_waiting.html'], function(_, Backbone, template) {
   
    var SubModal = Backbone.View.extend({
    
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
                    $('#modalWait').modal({
                    	backdrop: 'static',
  						keyboard: true
                    });
                });

                $(function() {
                    setTimeout(function() {
                        require(['modules/payroll_module'], function(payroll_module){
                            payroll_module.backupAllPayrolls();
                        });
                    }, 700);
                });
        	}
    
    });
   
    return SubModal; 
});