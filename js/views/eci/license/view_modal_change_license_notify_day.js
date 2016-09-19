define([
	'underscore',
	'backbone',
	'text!templates/eci/license/temp_modal_change_license_notify_day.html',
	'moment'], 
	function(_, Backbone, template, moment) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-license-days',
    
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
                    $('#modal-change-license-notify-days').on('hidden.bs.modal', function(event) {
                    	router.navigate('expiration/license');
                    });
                });

                $(function() {
                	self.$el.find('form').submit(function(event) {
                		event.preventDefault();
                		var days = self.$el.find('#license-notify-days').val();
                		var objToSave = {
                			table: 'notify_license_days',
                			days: parseInt(days),
                			date: moment().format('MMMM DD, YYYY'),
                			created_by: sessionStorage.getItem('id')
                		};                        
                        $.when(notify_license_days.create(objToSave)).then((response) => {
                            $('#rule-days').text(objToSave.days);
                        }, (errorResp) => {
                            console.log('error when saving: '+errorResp);
                        });

                	});
                });
        	}
    
    });
   
    return Subview; 
});