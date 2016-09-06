define(['underscore','backbone',
	'text!templates/eci/worker/temp_modal_update_eci_worker.html',
    'modules/functions',
    'moment'], 
	function(_, Backbone, template, Fn, moment) {
   
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
                    'model': self.model.toJSON(),
                    'moment': moment
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                
                $(function(){
                	$('#modalUpdateEciWorker').modal('show');
                });

                $(function() {
                    $('#modalUpdateEciWorker').on('hidden.bs.modal', function(event){
                        router.navigate('eci-workers');
                    });
                });

                $(function() {
                    require([
                        'views/eci/designation/view_list_of_designation_in_cbo',
                        'views/eci/site/view_list_of_sites_in_cbo'], 
                        function(SubviewDesigs, SubviewSites){
                            new SubviewDesigs({
                                collection: designations
                            });
                            new SubviewSites({
                                collection: sites
                            });
                            setTimeout(function() {
                                var desig = self.model.get('designation'), site = self.model.get('site');
                                $('option#desig-'+desig).prop('selected', true);
                                $('option#site-'+site).prop('selected', true);
                            }, 300);
                    });
                });
        	    
                $(function() {
                    self.$el.find('form').on('submit', function(event){
                        event.preventDefault();
                        var objToSave = Fn.getFormValues(self);
                        self.model.isNew();
                        self.model.set(objToSave);
                        self.model.save(objToSave, {
                            success: self.afterUpdate
                        });
                    });
                });

                $(function() {
                    require(['jqueryui'], function(jqueryUi){
                        $('#date-hired').datepicker();
                    });
                });
                
            },

            afterUpdate(a, b, c){
                if (b.updated === true) {
                    $('#modalUpdateEciWorker').modal('hide');
                    router.alertify_success('Eci employee updated');
                }
            }
    
    });
   
    return Subview; 
});