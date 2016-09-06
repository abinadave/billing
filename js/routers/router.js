define([
		'jquery', 
		'underscore',
		'backbone',
		'moment',
	], 
function($, _, Backbone, moment){
	var Router = Backbone.Router.extend({

		usertype: sessionStorage.getItem('usertype'),

		initialize: function(){
			Backbone.history.start();
		},

		routes: {
			 '': 'defaultRoute',
			'logout': 'logoutNow',
			'employees': 'showEmployees',
			'payrolls': 'showPayrolls',
			'editPayroll/:id': 'updatePayroll',
			'deletePayroll/:id': 'removePayroll',
			'removeSelectedEmp/:id': 'deleteSelectedEmp',
			'restore': 'restorePayrolls',
			'removeThisEmployee/:id': 'deleteEmp',
			'systemActivity': 'showSystemActivity',
			'eci-workers': 'showEciWorkers',
			'eci-workers/edit/:id': 'updateEciWorker',
			'contract/renew/:id': 'showRenewContract',
			'license/change/:id': 'showChangeLicensedExp',
			'restorePayroll/:id': 'showRestorePayroll',
			'removeDesignation/:id': 'deleteDesig',
			'eci-workers/delete/:id': 'deleteEciWorker'
		},

		defaultRoute: function(){
			if (this.usertype === null) {
				// not logged in..
				require(['views/view_login'], function(SubviewLogin){
				    var view = new SubviewLogin();
				});
			}else {
				// logged in..
				this.displayNav();
				
				switch(sessionStorage.getItem('usertype')) {
				    case 'admin':
				    	console.log('admin');
				        this.navigate('restore', true);
				        break;
				    case 'secretary':
				    	console.log('secretary');
				        this.navigate('employees', true);
				        break;
				    default:
				        console.log('this is the default route');
				}
			}
		},

		displayNav: function() {
			require(['views/view_navigation'], function(Subview){
			    var view = new Subview();
			});
		},

		logoutNow: function() {
			accounts.destroySession();
		},

		showEmployees: function() {
			require(['modules/employee_module'], function(empMod){
			    empMod.appendTable();
			    
			});
		},	

		showPayrolls: function(argument) {
			require(['views/payroll/view_table_payroll'], function(Subview){
			    var view = new Subview();
			});
		},

		updatePayroll: function(id) {
			this.navigate('payrolls');
			console.log(id);
			require(['libs/backbone.obscura'], function(Obscura){
	            require(['modules/payroll_module'], function(pm){
	            	var model = payrolls.get(id);
	                pm.appendUpdatePayroll(model);
	            });
            });
		},

		removePayroll: function(id) {
			this.navigate('payrolls');
			var rs = payrolls.where({id: id}).length;
			if (rs) {
				require(['css!libs/alertify/css/alertify.css',
					'css!libs/alertify/css/themes/bootstrap.css',
					'libs/alertify/alertify'], function(css1, css2, alertify){
						alertify.defaults.glossary.title = 'Confirmation Message';
						alertify.confirm('Are you Sure ?', function(a, b) {
							if(!a.cancel) {
								payrolls.remove(id);
								$.post('ajax/delete/insert_delete_payrollemps.php', 
									{ payroll_id: id }
								, function(data, textStatus, xhr) {
									/*optional stuff to do after success */
								}).success(function(data){
									alert('success');
								}).fail(function(xhr){
									alert('error type: '+xhr.status);
								});
							}
						});
				});
			}else {
				router.alertify_error('Cant find payroll with id of: '+id);
			}
		},

		deleteSelectedEmp: function(i) {
			this.navigate('employees');
			employees.get(i).set({selected: false}, {silent: true});
			$('#chk-'+employees.get(i).get('id')).prop('checked', false); 
			$('#td-selected-'+i).remove();
		},

		restorePayrolls: function () {
			require(['modules/rpayroll_module'], function(rpayroll_module){
			    rpayroll_module.appendTable();
			});
		},

		deleteEmp: function(i) {
			this.navigate('employees');
			var confirmation = "Delete this employee: " + employees.get(i).get('fullname');
			var ok = confirm(confirmation);
			if(ok){
				var model = employees.get(i);
				var objToRecycle = _.omit(model.attributes,'id','dailysheetSalary');
				objToRecycle.unique_id = model.get('id');
			  	$.when(employees.get(i).destroy({
				    'url': 'api.php/employee/'+i
			    })).then(function(arguments) {
			  	    recycled_employees.create(objToRecycle);
			    }, function(arguments) {
			  	    // body...
			    });
			 }
		},

		showSystemActivity: function() {
			var self = this;
			$.get('api.php/check_admin', function(data) {
				var json = $.parseJSON(data);
				if (json.resp === false) {
					alert('Access Denied, you are not allowed to access this information.');					
					self.navigate('logout', true);
				}else {
					require(['views/system-activity/view_table_system_activity'], function(Subview){
					    var view = new Subview();
					});
				}
			});
		},

		showEciWorkers: function() {
			require(['views/eci/worker/view_table_eci_workers'], 
				function(SubviewTEW){
			    var view = new SubviewTEW();
			});
		},

		updateEciWorker: function(i) {

			var rs = eci_workers.where({id: i});
			if (rs.length) {
				var model = eci_workers.get(i);
				require(['modules/eciworker_module'], function(eciworker_module){
				    eciworker_module.appendUpdateEciWorker(model);
				});
			}else {
				this.navigate('eci-workers', true);
			}
		},

		showRenewContract(i){
			console.log(i)
			var rs = eci_workers.where({id: i});
			if (rs.length) {
				var model = eci_workers.get(i);
				require(['modules/contract_module'], function(contract_module){
				    contract_module.showModalRenew(model);
				});
			}else {
				this.navigate('eci-workers', true);
			}
			
		},

		showChangeLicensedExp(i){
			var rs = eci_workers.where({id: i});
			if (rs.length) {
				var model = eci_workers.get(i);
				require(['modules/licenseddriver_module'], function(ldm){
				    ldm.modalChangeLicense(model);
				});
			}else {
				this.navigate('eci-workers', true);
			}
		},

		showRestorePayroll(i){
			this.navigate('restore');
			var model = rpayrolls.get(i);
			$.when(model.destroy()).then((data) => {
				if (data.response) {
					
				}
			}, (errorResponse) => {
				console.log(errorResponse);
			});		
		},

		deleteDesig (desigId){
			var confirmed = confirm('Are you sure you want to delete this designation ?');
			if (!designations.where({id: desigId}).length) { 
				this.navigate('eci-workers', true);
			}else {
				if(confirmed) {
					if (eci_workers.where({designation: desigId}).length) {
						alert('cant remove this designation with existing employees');
					}else {
						var model = designations.get(desigId);
						model.destroy({url: '/remove_desig/'+desigId});
					}
				}
			}
		},

		deleteEciWorker(i){
			var rs = eci_workers.where({id: i});
			var ok = confirm('Are you sure you want to delete this employee ?');
			if (ok) {
				if (rs.length) {
					var model = eci_workers.get(i);
					model.destroy({url: '/eci_worker/'+i});
				}else {
					this.navigate('eci-workers', true);
				}
			}else {
				this.navigate('eci-workers', true);
			}
			
		},

		alertify_error: function(msg) {
			require(['css!libs/alertify/css/alertify.css',
				'css!libs/alertify/css/themes/semantic.css',
				'libs/alertify/alertify'], function(css1, css2, alertify){
					alertify.error(msg);
			});
		},

		alertify_warning: function(msg) {
			require(['css!libs/alertify/css/alertify.css',
				'css!libs/alertify/css/themes/semantic.css',
				'libs/alertify/alertify'], function(css1, css2, alertify){
					alertify.warning(msg);
			});
		},

		alertify_success: function(msg) {
			require(['css!libs/alertify/css/alertify.css',
				'css!libs/alertify/css/themes/semantic.css',
				'libs/alertify/alertify'], function(css1, css2, alertify){
					alertify.success(msg);
			});
		}


	});

	return Router;
});
