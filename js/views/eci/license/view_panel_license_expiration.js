define(['underscore','backbone',
	'text!templates/eci/license/temp_panel_license_expiration.html',
	'modules/functions',
    'modules/licenseddriver_module',
	'moment'], 
	function(_, Backbone, template, FN, LICENSEDDRIVER_MODULE, moment) {
   
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
                            self.$el.find('form :input').val(row.id);
                            self.$el.find('#rule-days').text(row.id)
                            LICENSEDDRIVER_MODULE.displayNearlyExpiredWorkers();
                        });
                    });
                });

                $(function() {
                	self.$el.find('form').submit(function(event) {
                		event.preventDefault();
                		var days = $(this).find(':input').val();
                		var objToSave = {
                			table: 'notify_license_days',
                			days: parseInt(days),
                			date: moment().format('MMMM DD, YYYY'),
                			created_by: sessionStorage.getItem('id')
                		};
                        
                        $.when(notify_license_days.create(objToSave)).then((response) => {
                            self.$el.find('#rule-days').text(objToSave.days);
                        }, (errorResp) => {
                            console.log('error when saving: '+errorResp);
                        });

                	});
                });
        	},

    
    });
   
    return Subview; 
});