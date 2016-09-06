define(['underscore','backbone',
	'text!templates/employee/temp_list_of_employees.html',
	'modules/collection_module','libs/backbone.obscura','moment'], function(_, Backbone, template, colmod, Obscura, moment) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-employee',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                self.collection = colmod.sortBy(Obscura, self.collection, 'date', 'desc');
                var output = self.template({
                    'library': self.collection.toJSON(), 
                    'moment': moment
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $('#no-of-employees').text(self.collection.length);
                $(function(){
                    if (!self.collection.length) {
                    	self.$el.html('<tr><td colspan="3" class="text-danger">No employee was found.</td></tr>');
                    }
                });

                $(function() {
                    self.$el.find(':checkbox').change(function(event) {
                        /* Act on the event */
                        var is = $(this).is(':checked'), id = $(this).val();
                        var model = employees.get(id);
                        model.set({selected: is});
                    });
                });

                $(function() {
                    require(['libs/editable/master/mindmup-editabletable','libs/editable/master/numeric-input-example'], function(){
                        $('#table-emps').editableTableWidget();
                        $('#table-emps').find('td').on('validate', function(evt, newValue) {
                           
                            if (!newValue) { 
                                return false; // mark cell as invalid 
                            }

                        });
                        $('table td').on('change', function(evt, newValue) {
                            // do something with the new cell value 
                            var model = employees.get($(this).closest('tr').attr('id')), index = this.id;
                            var obj = {};
                            if(index === 'fullname'){
                                console.log(1);
                            }
                            if (!newValue) { 
                                return false; // reject change
                            }else {
                                obj[index] = newValue;
                                $.post('ajax/update/update.php', {
                                    table: 'employees',
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

                            if (index === 'date_hired') {
                                $(this).text(model.get('date_hired'));
                                router.alertify_error('Date cannot be edited')
                            }
                        });
                    });
                    
                });

        	}
    
    });
   
    return Subview; 
});