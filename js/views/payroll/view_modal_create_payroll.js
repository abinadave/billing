define(['underscore','backbone',
	'text!templates/payroll/temp_modal_create_payroll.html',
	'modules/payroll_module',
    'libs/backbone.obscura',
    'modules/employee_module',
    'modules/payrollemp_module',
    'libs/accounting.min',
    'modules/functions',
    'moment',
    'models/payroll'
	], function(_, Backbone, template, pm, Obscura, em, payrollemp_module, accounting, fn, moment, Payroll) {
   
    var SubviewModal = Backbone.View.extend({
    
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
                var proxy = new Obscura(employees);
                proxy.filterBy('selected', {selected: true});

                $(function(){
                    //jQuery
                   	self.$el.find('#modalCreatePayroll').modal('show');
                });

                $(function() {
                    self.$el.find('#shift-time').change(function(event) {
                        /* Act on the event */
                        // var shiftTime = $(this).val(),
                        // date = self.$el.find('#date').val();
                        // var emps = em.getSelectedEmps();
                        // var driver = emps.findWhere({designation: 'driver'});
                        // var filtered = payrollemp_module.getDriverTripNo(driver);
                        // console.log(filtered.length);
                    });
                });

                $(function() {
                    setTimeout(function() {
                        em.appendListOfSelectedEmps(proxy);
                    }, 500);
                });

                $(function() {
                    self.$el.find('#date').change(function(event) {
                        /* Act on the event */
                        // var date = moment($(this).val()).format('MMMM DD, YYYY');
                        // console.log(date);
                    });
                });

                $(function() {
                    self.$el.find('input[name="ton"]').keyup(function(event) {
                        var value = $(this).val()
                        proxy.forEach(function(model) {
                            switch(model.get('designation')) {
                                case 'driver':
                                    var salary = em.calculateSalaryDriver(Number(value));
                                    self.$el.find('td#selected-emp-'+model.get('id')).text(accounting.formatMoney(salary, '', 2));
                                    break;
                                case 'helper':
                                    var salary = em.calculateSalaryHelper(Number(value));
                                    self.$el.find('td#selected-emp-'+model.get('id')).text(accounting.formatMoney(salary, '', 2));
                                    break;
                            }
                        });
                    });
                });

                $(function() {
                    /* $(function() {
                        self.$el.find('select[name="shift_time"]').change(function(event) {
                             var date = self.$el.find('input[name="date"]').val(),
                             shift_time = $(this).val();
                             var proxy = new Obscura(employees);
                             proxy.filterBy('selected', {selected: true});
                             var model1 = proxy.findWhere({designation: 'driver'});
                             var rs = payrolls.where({date: date, shift_time: shift_time});
                             if (rs.length) {
                                var payroll = payrolls.findWhere({date: date, shift_time: shift_time});
                                var emps = payrollemp_module.getEmps(payroll.get('id'));
                                if (emps.length) {
                                    var model2 = emps.findWhere({designation: 'driver'});
                                    emps.forEach(function(model) {
                                        console.log(model.attributes); 
                                    });
                                }
                             }
                        });
                    }); */
                    
                    
                });

                $(function() {
                    self.$el.find('form').submit(function(event) {
                        /* Act on the event */
                        event.preventDefault();
                        var obj = fn.getFormValues(self);
                        obj.table = 'payrolls';
                        obj.unique_id = pm.generateId();
                        self.$el.find(':submit').prop('disabled', true);
                        obj.person = sessionStorage.getItem('fullname');
                        obj.date_time = fn.getDate();
                        var payroll = new Payroll(obj);
                        if (payroll.isValid()) {

                            payrolls.create(obj, {
                                success: function(model, json, options) {
                                    if (Number(json.id) > 0) {
                                        $('#modalCreatePayroll').find('form')[0].reset();
                                        payrollemp_module.savePayrollemps(json.id);
                                    }
                                }
                            });

                        }else {
                            setTimeout(function() {
                                self.$el.find(':submit').prop('disabled', false);
                            }, 500);
                        }         

                    });
                });

                $(function() {
                    var truck_no = self.getDriver();
                    $('#truck-no').val(truck_no);
                });

        	},

            getDriver: function() {
                var emps = em.getSelectedEmps();
                if (emps.where({designation: 'driver'}).length) {
                    return emps.findWhere({designation: 'driver'}).get('truck_no');
                }else {
                    return 'not found.';
                }
            }
    
    });
   
    return SubviewModal; 
});