define(['underscore','backbone',
	'modules/payrollemp_module',
    'modules/employee_module'], function(_, Backbone, payrollemp_module, employee_module) {
   
    var Module = {

    	appendDailySheetModal: function(arguments) {
    		require(['views/payroll/dailysheet/view_modal_dailysheet'], function(Subview){
    		    var view = new Subview();
    		});
    	},

    	filterPayroll: function(thepayroll) {
            // console.log(thepayroll)
            var selectedEmps = employee_module.getSelectedEmps(), json, thepayrollemps, found = 0;
			thepayroll.forEach(function(payrollModel) {
                emps = payrollemp_module.getEmps(payrollModel.get('id'));
                var empsFound = new Backbone.Collection(emps);
                selectedEmps.forEach(function(employee) {
                    if (empsFound.where({emp_id: employee.get('id')}).length) {
                        dailysheets.add(payrollModel);
                        found++;
                        switch(employee.get('designation')) {
                            case 'driver':
                                var total = Number(employee.get('dailysheetSalary')) + employee_module.calculateSalaryDriver(Number(payrollModel.get('ton')));
                                employee.set({
                                    dailysheetSalary: total.toString()
                                }, {silent: true});
                                break;
                            case 'helper':
                                var total = Number(employee.get('dailysheetSalary')) + employee_module.calculateSalaryHelper(Number(payrollModel.get('ton')));
                                employee.set({
                                    dailysheetSalary: total.toString()
                                }, {silent: true});
                                break;
                        }
                    };
                });
            });
            if (!found) {
                router.alertify_error('No data was found');
            }
    	},

        noFilter: function(thepayroll) {
            var selectedEmps = employee_module.getSelectedEmps(), json, thepayrollemps, ton = 0;
            var empIds = [], emps = [];
            thepayroll.forEach(function(payrollModel) {
                emps = payrollemps.where({payroll_id: payrollModel.get('id')}, false);
                dailysheets.add(payrollModel, {silent: true});
                emps.forEach(function(payroll_emp) {
                    var employee = employees.get(payroll_emp.get('emp_id'));

                    // var currentSalary = Number(employee.get('dailysheetSalary'));
                    // var ton = Number(payrollModel.get('ton'));
                    // var salary = employee_module.calculateSalary(ton, employee.attributes);
                    // employee.set({
                    //     dailysheetSalary: currentSalary + salary
                    // });

                });
            });
        },


        /* Subviews */
        appendList: function(list) {
            require(['views/payroll/dailysheet/view_list_of_daily_sheets'], function(Subview){
                var view = new Subview({
                    collection: list
                });
            });
            Module.appendTotalList(list);
        },

        appendTotalList: function(list) {
            require(['views/payroll/dailysheet/view_total_of_daily_sheet'], function(Subview){
                var view = new Subview({
                    collection: list
                });
            });
        },

        appendAllList: function(list) {
            require(['views/payroll/dailysheet/view_list_of_all_dailysheets_with_total'], 
                function(Subview){
                var view = new Subview({
                    collection: list
                });
            });
        }

    }
   
    return Module; 
});