define(['underscore','backbone',
	'text!templates/payroll/dialysheet/temp_list_of_all_dailysheets_with_total.html',
	'modules/payrollemp_module',
    'moment',
    'libs/accounting.min',
    'views/payroll/dailysheet/view_total_of_dailysheet_all',
    'modules/employee_module'], 
	function(_, Backbone, template, payrollemp_module, moment, 
        Accounting, SubviewTotalOfAllDailySheet, employee_module) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.collected_emp_ids = [];
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#div-tbl-dailysheet',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var obj = self.regroupCollection(self.collection);
                var output = self.template({
                    'library': obj.collection.toJSON(),
                	'ids': obj.driver_ids,
                	'self': self,
                    'payrollemp_module': payrollemp_module,
                    'moment': moment,
                    'Accounting': Accounting,
                    'dates': self.getDates(),
                    'employee_module': employee_module
            	});
                self.$el.append(output);
                self.onRender(obj);
    	        return self;
        	},

            getDates: function() {
                var $modal = $('#modalDailysheet');
                var d1 = $modal.find('#d1').val(),
                d2 = $modal.find('#d2').val();
                return {
                    from: moment(d1).format('MMMM DD'),
                    to: moment(d2).format('MMMM DD, YYYY')
                };
            },
    
        	onRender: function(obj){
                var self = this;

                $('#div-tbl-dailysheet-loading').empty();
                
                setTimeout(function() {
                    self.$el.find('th, td').addClass('text-center');
                }, 500);

                // $(function() {
                //     var listOfCollection = new Backbone.Collection();
                //     obj.driver_ids.forEach(function(driver_id) {
                //         var list = self.filter(obj.collection.toJSON(), driver_id);
                //         var empIds = payrollemp_module.getUniqueEmps(list); 
                //         self.collected_emp_ids.push(empIds);
                //     });
                //     self.afterExecution(obj);                    
                // });                
        	},

            afterExecution: function(obj) {
                var self = this;
                self.collected_emp_ids.forEach(function(empIds) {
                    var driverId = self.identifyDriver(empIds);
                    var list = self.filter(obj.collection.toJSON(), driverId);
                    var listOfCollection = self.getPayrolls(list);
                    var view = new SubviewTotalOfAllDailySheet({
                        el: '#div-driver-'+driverId,
                        collection: listOfCollection
                    });
                    view.render(self.getSelectedEmps(empIds));
                });
            },

            getSelectedEmps: function(empIds) {
                var collection = new Backbone.Collection();
                empIds.forEach(function(empId) {
                    if (employees.where({id: empId}).length) {
                        collection.add(employees.get(empId));
                    }
                });
                return collection;
            },

            getPayrolls: function(list) {
                var collection = new Backbone.Collection();
                list.forEach(function(model) {
                    collection.add(payrolls.get(model.id));
                }); 
                return collection;
            },

            identifyDriver: function(empIds) {
                var rs = '', model = {}, foundId = '';
                empIds.forEach(function(id) {
                    rs = employees.where({id: id});
                    if (rs.length) {
                        model = employees.get(id);
                        if (model.get('designation') === 'driver') {
                            foundId = id; 
                        }
                    }else {
                        foundId = empIds.push();
                    }
                });
                return foundId;
            },

            getSelectedEmployees: function(empIds) {
                console.log(empIds);
                var employeeList = new Backbone.Collection(), rs = '';
                empIds.forEach(function(i) {
                    rs = employees.where({id: i});
                    if (rs.length) {
                        employeeList.add(employees.get(i));
                    }
                });
                return employeeList;
            },

        	filter: function(collection, driver_id) {
        		return collection.filter(function(model) {
        			return Number(model.driver_id) === Number(driver_id);
        		});
        	},

        	regroupCollection: function(library) {
        		var json = {}, str = '', list = new Backbone.Collection();
        		var riders = [], arrIds = [];

        		library.forEach(function(model) {
        			json = model.attributes;
        			riders = payrollemp_module.getEmployees(json.id);
        			riders.forEach(function(arr) {
        				str = arr.split('-');
        				if (str[2] === 'd') {
        					list.add({
        						id: model.get('id'), /* driver payroll_id */
        						driver_name: str[1], /* driver name */
        						driver_id: str[0]    /* driver id */
        					});
        				}
        			});
        		});

        		list.forEach(function(model) {
        			arrIds.push(model.get('driver_id'));
        		});

        		var uniqueIds = _.uniq(arrIds);

        		return {
        			collection: list,
        			driver_ids: uniqueIds
        		};
        		
        	}
    
    });
   
    return Subview; 
});