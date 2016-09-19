define(['underscore','backbone',
	'text!templates/eci/license/temp_panel_license_expiration.html',
	'modules/functions',
    'modules/licenseddriver_module',
	'moment',
    'views/eci/license/view_modal_change_license_notify_day'], 
	function(_, Backbone, template, FN, LICENSEDDRIVER_MODULE, moment,
        SubviewModalLicenseDay) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                // this.render();
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
                	FN.loadData([
                		'licensed_drivers',
                		'eci_workers',
                		'designations',
                		'sites',
                        'notify_license_days'
                	], function(){
                        $.get('index.php/notify_license_days/latest_id', function(response) {
                            var row = $.parseJSON(response);
                            self.$el.find('form :input').val(row.days);
                            self.$el.find('#rule-days').text(row.days);
                            LICENSEDDRIVER_MODULE.displayNearlyExpiredWorkers();
                        });
                    });
                });

                $(function() {
                    new SubviewModalLicenseDay();
                });
        	},

    
    });
   
    return Subview; 
});