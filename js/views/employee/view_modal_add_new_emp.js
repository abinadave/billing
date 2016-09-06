define(['underscore','backbone',
	'text!templates/employee/temp_modal_add_new_emp.html',
    'modules/functions',
    'models/employee',
    'modules/collection_module'], function(_, Backbone, template, fn, Employee, colmod) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
        	template: _.template(template),
    
            events: {

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
                    self.$el.find('#modalAddEmp').modal('show');
                    setTimeout(function() {
                        self.$el.find('input[name="fullname"]').focus();
                    }, 700);
                });

                $(function() {
                    self.$el.find('form').submit(function(event) {
                        /* Act on the event */
                        event.preventDefault();
                        $(this).find('button[type="submit"]').prop('disabled', true);
                        var obj = fn.getFormValues(self);
                        obj.table = 'employees';
                        obj.date_hired = fn.getDate();
                        var employee = new Employee(obj);
                        if (employee.isValid()) {
                            colmod.saveDB($.param(obj), 'employees', {
                                afterSave: function(json) {
                                    if (Number(json.id) > 0) {
                                        self.$el.find('button[type="submit"]').prop('disabled', false);
                                        self.$el.find('form')[0].reset();
                                        router.alertify_success('Successfully added');
                                    }
                                }
                            });
                        }else {
                            setTimeout(function() {
                                 self.$el.find('button[type="submit"]').prop('disabled', false);
                            }, 500);
                        }
                    });    
                });    

                $(function() {
                    self.$el.find('#fullname').keyup(function(event) {
                        var value = $(this).val(), duplicate = 0;
                        clearTimeout(self.timer);
                        self.timer = setTimeout(function() {
                            employees.forEach(function(model) {
                                if (model.get('fullname').toLowerCase() === value) {
                                    duplicate++;
                                }
                            });

                            if (duplicate > 0) {
                                router.alertify_warning('Employee Already Exist');
                                self.$el.find(':submit').prop('disabled', true);

                            }else {
                                self.$el.find(':submit').prop('disabled', false);
                            }
                        }, 700);
                        
                        
                    });
                });

                $(function() {
                    self.$el.find('form').css('padding', '20px');
                });
        	}
    
    });
   
    return Subview; 
});