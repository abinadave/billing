define(['underscore','backbone',
	'text!templates/eci/designation/temp_modal_create_designation.html',
	'moment',
	'models/designation'], function(_, Backbone, template, moment, Designation) {
   
    var SubviewCD = Backbone.View.extend({
    
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
                    $('#modalDesignations').modal('show');
                    require(['modules/designation_module'], function(designation_module){
                        designation_module.appendListInModal(designations);
                    });

                    $('#modalDesignations').on('hidden.bs.modal', function(event){
                        router.navigate('eci-workers');
                    });
                });

                $(function() {
                	self.$el.find('form').on('submit', function(event){
                		event.preventDefault();
                		var obj = {
                			name: self.$el.find('form').find('#name').val().toUpperCase(),
                			date_created: moment().format('MMMM DD, YYYY HH:mm:ss'),
                			created_by: sessionStorage.getItem('id'),
                			table: 'designations'
                		};
                		var designation = new Designation(obj);
                		if (designation.isValid()) {
                			designations.create(designation.attributes, {
                				success: function(a, b ,c) {
                					self.createForm();
                					router.alertify_success('New Designation was added.');
                                    
                				}
                			})
                		}
                	});
                });
        	},

        	createForm() {
        		var self = this;
        		self.$el.find('form')[0].reset();
        		self.$el.find('form').find('input:first').focus();
        	}
    
    });
   
    return SubviewCD; 
});