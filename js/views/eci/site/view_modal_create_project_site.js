define([
	'underscore',
	'backbone',
	'text!templates/eci/site/temp_modal_create_project_site.html',
	'models/site',
    'modules/site_module',
	'moment'], function(_, Backbone, template, Site, site_module, moment) {
   
    var SubviewCPS = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder-modal-create-proj-site',
    
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
                
                $(function() {
                    $('#modalProjectSite').on('shown.bs.modal', function(event){
                        site_module.appendSitesInModel(sites);
                    });
                }); 

                $(function() {
                	self.$el.find('form').submit(function(event) {
                		event.preventDefault();
                        
                        var $btn = $(this).find(':submit');
                        $btn.text('saving...').prop('disabled', true);
                		
                        var obj = { 
                			name: self.$el.find('form').find('#name').val().toUpperCase(), 
                			date_created: moment().format('MMMM DD, YYYY HH:mm:ss'),
                			created_by: sessionStorage.getItem('id'),
	                		table: 'sites' 
	                	};

                		var site = new Site(obj);
                		sites.create(site.attributes, {
                			success: function(arguments) {
                				self.resetForm();
                                $btn.text('save').prop('disabled', false)
                			}
                		});

                        setTimeout(function() {
                            $btn.text('saving').prop('disabled', false)
                        }, 8000);
                	});
                });

        	},

        	resetForm(){
        		var self = this;
        		self.$el.find('form')[0].reset();
        		self.$el.find('#name').focus();
        		router.alertify_success('Project Site Saved!');
        	}
    
    });
   
    return SubviewCPS; 
});