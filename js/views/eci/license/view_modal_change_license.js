define(['underscore','backbone',
	'text!templates/eci/license/temp_modal_change_license.html',
	'models/licensed_driver',
	'moment'], function(_, Backbone, template, Licensed_driver, moment) {
   
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
                var output = self.template({
                	'model': self.model.toJSON()
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;

                $(function(){
                    $('#modal-change-license').modal('show');
                });

                $(function() {
                    $('#modal-change-license').on('hidden.bs.modal', function(event){
                       router.navigate('eci-workers');
                    });
                });

                $(function() {
                	self.$el.find('form').submit(function(event) {
                		event.preventDefault();
                		var obj = {
                			exp_date: moment(self.$el.find('#date').val()).format('MMMM DD, YYYY'),
                			worker_id: self.model.get('id'),
                			table: 'licensed_drivers'
                		};
                		var driver = new Licensed_driver(obj);
                		if (driver.isValid()) {
                			licensed_drivers.create(obj,{
	                			success: function(){
	                				self.$el.find('form')[0].reset();
	                				router.alertify_success('Licensed expiration successfully saved');
	                				$('#modal-change-license').modal('hide');
                                    router.navigate('eci-workers');
	                			}
	                		});
                		}
                	});
                });

        	}
    
    });
   
    return Subview; 
});