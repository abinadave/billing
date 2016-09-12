define(['underscore','backbone',
	'text!templates/eci/designation/temp_modal_create_designation.html',
	'moment',
	'models/designation',
    'modules/designation_module'], 
    function(_, Backbone, template, moment, Designation, designation_module) {
   
    var SubviewCD = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-create-designation',
    
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

                    $(function() {
                        $('#modalDesignations').on('shown.bs.modal', function(event){
                             designation_module.appendListInModal(designations);     
                        });
                    });
                    //jQuery
                    
                    $('#modalDesignations').on('hidden.bs.modal', function(event){
                        router.navigate('eci-workers');
                    });
                });

                $(function() {
                	self.$el.find('form').on('submit', function(event){
                		event.preventDefault();
                        
                        var $btn = $(this).find(':submit');
                        $btn.text('saving....');

                        $btn.prop('disabled', true);
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
                                    $btn.text('save').prop('disabled',false);
                				}
                			})
                		}

                        setTimeout(function() {
                            $btn.text('save').prop('disabled', false);
                        }, 8000);
                	
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