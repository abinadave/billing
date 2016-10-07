define(['underscore','backbone',
	'text!templates/employee/temp_list_of_employee_in_update_payroll.html'], 
	function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-pemps',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    require(['libs/editable/master/mindmup-editabletable',
                        'libs/editable/master/numeric-input-example'], function(){
                        $('#tbl-pemps').editableTableWidget();
                        $('#tbl-pemps').find('td').on('validate', function(evt, newValue) {
                           
                            if (!newValue) { 
                                return false; // mark cell as invalid 
                            }

                        });
                        $('table td').on('change', function(evt, newValue) {
                            // do something with the new cell value 
                            var model = payrollemps.get($(this).closest('tr').attr('id')), 
                            index = this.id;
                            var obj = {};
                    
                            if (!newValue) { 
                                return false; // reject change
                            }else {
                                obj[index] = newValue;
                                $.post('ajax/update/update.php', {
                                    table: 'payrollemps',
                                    values: obj,
                                    where: 'id',
                                    where_value: model.get('id')
                                }, function(data, textStatus, xhr) {
                                    // optional stuff to do after success 
                                }).success(function(data){
                                    model.set(obj, {silent: true});
                                }).fail(function(xhr){
                                    router.alertify_error('Error type: ' + xhr.status + ' Cant update this employee right now.. Please try again later.');
                                });
                            }

                            if (index === 'designation') {
                                router.alertify_warning('Access denied');
                            }
                        });
                    });
                });
        	}
    
    });
   
    return Subview; 
});