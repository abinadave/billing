define(['underscore','backbone',
	'text!templates/payroll/temp_modal_update_payroll.html',
	'moment',
	'modules/collection_module'], function(_, Backbone, template, moment, colmod) {
   
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
                var output = self.template({'model': self.model.toJSON(),
                	'moment': moment });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                	var json = self.model.toJSON();
                    self.$el.find('#modalUpdatePayroll').modal('show');
                    self.$el.find('option#'+json.shift_time).prop('selected', true);
                    self.$el.find('option#'+json.trip_no).prop('selected', true);
                });


                $(function() {
                	self.$el.find('form').submit(function(event) {
                		/* Act on the event */
                		event.preventDefault();
                		require(['modules/functions'], function(fn){
                		    var formValues = fn.getFormValues(self);
                		    formValues.last_modified = fn.getDate();
                		    var obj = {
                		    	table: 'payrolls',
                		    	values: formValues,
                		    	where: 'id',
                		    	where_value: self.model.get('id')
                		    };
                		    colmod.updateDB(obj, 'payrolls', {
                		    	afterUpdate: function() {
                		    		self.model.set(formValues);
                		    		router.alertify_success('Process completed')
                		    		// router.alertify_successs('Successully updated');
                		    	}
                		    });
                		});
                		// var form = $(this).serialize();

                		
                	});
                });
        	}
    
    });
   
    return Subview; 
});