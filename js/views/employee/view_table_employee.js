define(['underscore','backbone',
    'text!templates/employee/temp_table_employee.html',
    'modules/employee_module',
    'modules/collection_module',
    'modules/dailysheet_module',
    'libs/backbone.obscura'], function(_, Backbone, template, emp, colmod, dailysheet_module, Obscura) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
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
                    self.$el.find('#btnHire').click(function(event) {
                        emp.modalAddEmp();
                    });
                });

                $(function() {
                    self.$el.find('#btnCreateDailySheets').mouseenter(function(event) {
                        var id = this.id;
                        var popover = $(this);
                        popover.attr('data-content', self.getSelectedEmps());
                    });
                });

                $(function () {
                   self.$el.find('[data-toggle="popover"]').popover();
                });

                $(function() {
                    self.$el.find('#chk-all').change(function(event) {
                        var is = $(this).is(':checked');
                        self.$el.find('tbody').find(':checkbox').prop('checked', is);
                    });
                });

                $(function() {
                    require(['modules/collection_module'], function(colmod){
                        self.$el.find('tbody').html('<tr><td colspan="7">Please wait...</td></tr>');
                        employees.fetch({silent: true,
                            success: function() {
                                emp.doneFetch(colmod);
                            }
                        });
                    });
                });

                $(function() {
                    self.$el.find('#search').keyup(function(event) {
                        var value = $(this).val();
                        var list = colmod.search('employees', value);
                        if (list.length > 500) {
                            clearTimeout(self.timer);
                            self.timer = setTimeout(function() {
                                emp.appendList(list);
                            }, 700);
                        }else {
                            emp.appendList(list);
                        }
                    });
                });

                $(function() {
                    self.$el.find('#btnPayroll').click(function(event) {
                        var proxy = new Obscura(employees);
                        proxy.filterBy('selected', {selected: true});
                        if (proxy.where({designation: 'driver'}).length > 1) {
                            router.alertify_warning('Only one driver is required.');
                        }else {
                            if (proxy.where({designation: 'helper'}).length < 2) {
                                router.alertify_warning('Please select atleast 2 helpers.');
                            }else {
                                if (proxy.where({designation: 'driver'}).length === 1) {
                                      require(['modules/payroll_module'], function(pm){
                                          pm.appendModalCreatePayroll();
                                      });
                                }
                            }
                        }
                    });
                });

                $(function() {
                    self.$el.find('#btnCreateDailySheets').click(function(event) {
                        dailysheet_module.appendDailySheetModal();
                    });
                });
        	},

            getSelectedEmps: function() {
                var proxy = new Obscura(employees);
                proxy.filterBy('selected', {selected: true});
                return proxy.pluck('fullname');
            }
    
    });
   
    return Subview; 
});