define([
	'underscore',
	'backbone',
	'text!templates/eci/site/temp_modal_create_project_site.html',
	'models/site',
	'moment'], function(_, Backbone, template, Site, moment) {
   
    var SubviewCPS = Backbone.View.extend({
    
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
                    $('#modalProjectSite').modal('show');
                });
                $(function() {
                	self.$el.find('form').submit(function(event) {
                		event.preventDefault();
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
                			}
                		});
                	});
                });

                $(function() {
                	require(['modules/site_module'], function(site_module){
                	    site_module.appendSitesInModel(sites);
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