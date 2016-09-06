define([

    'underscore',
    'backbone',
	'libs/backbone.obscura',
	'modules/collection_module',
    'modules/payroll_module'], 

    function(_, Backbone, Obscura, colmod, payroll_module) {

    var $panel = $('#panel-payroll');
    var Module = {

    	afterSave: function(json) {
            if (++payrollemps.b === payrollemps.a) {
                router.alertify_success('Process Completed');
                 $('#modalCreatePayroll').find('form :submit').prop('disabled', false);
            }
    	},

    	doneFetch: function(colmod) {
            colmod.fetchData('payrolls','payrolls', payroll_module);
    	},

       

        getDriverTripNo: function(driver) {
            var found = new Backbone.Collection();
            payrollemps.forEach(function(model) {
                if(Number(model.get('emp_id')) === Number(driver.get('id'))){
                    found.add(model);  
                };
            });
            return found;
        },

        getHelpersOnLatestPayrollOfDriver: function(model) {
            var list = new Backbone.Collection();
            var driverTon = Number(model.ton);
            summaries.forEach(function(model) {
                if (model.get('ton') === driverTon && model.get('designation') !== 'driver') {
                    list.add(model);
                }
            });
            return list.toJSON();
        },

    	savePayrollemps: function(pid) {
    		var proxy = Module.filterSelectedEmployees();
            var obj = {};
            payrollemps.a = proxy.length;
            payrollemps.b = 0;
            proxy.forEach(function(model) {
            	obj.fullname = model.get('fullname');
                obj.designation = model.get('designation');
            	obj.emp_id = model.get('id');
            	obj.payroll_id = pid;
            	obj.table = 'payrollemps';
                console.log(obj);
                payrollemps.create(obj, {
                    success: function() {
                        if (++payrollemps.b === payrollemps.a) {
                            router.alertify_success('Process Completed');
                             $('#modalCreatePayroll').find('form :submit').prop('disabled', false);
                        }
                    }
                });
            });
    	},

        filterSelectedEmployees: function() {
            return employees.filter(function(model) {
                return model.get('selected') === true;
            });
        },

        getWorkers: function(id) {
            var models = Module.filterItems(id);
            var fullnames = [];
            models.forEach(function(model) {
                // fullnames.push(model.get('fullname').split(' ')[1]);
                fullnames.push(model.get('fullname'));
            });
            return fullnames.join(', ');
        },

        getLastNameWorkers(id) {
            var models = Module.filterItems(id);
            var fullnames = [];
            models.forEach(function(model) {
                fullnames.push(model.get('fullname').split(' ')[1]);
            });
            return fullnames.join(', ');
        },

        filterItems: function(id) {
            return payrollemps.filter(function(model) {
                return model.get('payroll_id') === id;
                // return model.payroll_id === id;
            });
        },

        getEmployees: function(id) {
             var proxy = new Obscura(payrollemps);
             var firstnames = [];
             proxy.filterBy('pid', {payroll_id: id});
             proxy.forEach(function(model) {
                 firstnames.push(model.get('emp_id') +'-'+ model.get('fullname').split(" ")[0] + '-' + model.get('designation').substr(0,1)) + ' ';
             });
             return firstnames;
        },

        

        calculateSummary: function(list) {
            /* Processing/Calculates summary of payroll of each employee */
            var emps = [], payroll_ton = 0;
            list.forEach(function(payroll) {
                emps = Module.getEmps(payroll.get('id'));
                emps.forEach(function(emp) {
                    payroll_ton = Number(payroll.get('ton'));
                    if (summaries.where({id: emp.get('emp_id')}).length) {
                        var summary = summaries.get(emp.get('emp_id'));
                        var summary_ton = Number(summary.get('ton'));
                        var total = summary_ton + payroll_ton;
                        summary.set({ton: total}, {silent: true});
                    }else {
                        var obj = {
                            id: emp.get('emp_id'),
                            designation: emp.get('designation'),
                            fullname: emp.get('fullname'),
                            ton: payroll_ton
                        };
                        summaries.add(obj, {silent: true});
                    }
                });
            });
        },

        getEmps: function(pid) {
            return payrollemps.filter(function(model) {
                return model.get('payroll_id') === pid;
            });
        },

        getEmpIdsWithPid: function(pid) {
            var ids = [];
            payrollemps.forEach(function(model) {
                if (model.get('payroll_id') === pid) {
                    ids.push(model.get('emp_id'));
                }
            });
            return ids;
        },


        getUniqueEmps: function(list) {
           var arr = [];
           list.forEach(function(model) {
               var ids = Module.getEmpIdsWithPid(model.id);
               ids.forEach(function(i) {
                  arr.push(i); 
               });
           });
           return _.uniq(arr);
        },

        removePayrollEmps: function() {
            $.post('ajax/delete/delete_payroll_emps.php', function(data, textStatus, xhr) {
                /*optional stuff to do after success */
            }).success(function(data){
                payrollemps.reset();
            }).fail(function(xhr){
                console.log('error type in transfering table: '+xhr.status);
            });
        },

        appendempsInUL: function(list) {
            require(['views/payroll/view_list_of_employee_list'], 
                function(Subview){
                var view = new Subview({
                    collection: list
                });
            });
        }
        
    };
   
    return Module; 
});