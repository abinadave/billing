// This is the main entry point for the App
define(
	[   
		//models..
	    'models/rate',
	    'models/backup_percentage',

	    //collections..
		'collections/accounts',
		'collections/employees',
		'collections/payrolls',
		'collections/payrollemps',
		'collections/summaries',
		'collections/dailysheets',
		'collections/rpayrolls',
		'collections/rpayrollemps',
		'collections/userlogs',
		'collections/eci_workers',
		'collections/eci_positions',
		'collections/sites',
		'collections/designations',
		'collections/contracts',
		'collections/licensed_drivers',
		'collections/recycled_employees',
		'collections/recycled_eciworkers',
		'collections/reasons',
		'collections/notify_contract_days',
		'collections/notify_license_days',

		/* views */
		'views/eci/contract/view_panel_contract_setting',
		'views/eci/license/view_panel_license_expiration',
		'views/eci/worker/view_table_eci_workers',
		'views/payroll/view_table_payroll',
		'views/restore/view_table_restore_payrolls',
		'views/employee/view_table_employee',

		//router..
		'routers/router'
	], 

	function(
		//models
		Rate,
		Backup_percentage,

		//Collections
		Accounts,
		Employees,
		Payrolls,
		Payrollemps,
		Summaries,
		Dailysheets,
		Rpayrolls,
		Rpayrollemps,
		Userlogs,
		Eci_workers,
		Eci_positions,
		Sites,
		Designations,
		Contracts,
		Licensed_drivers,
		Recycled_employees,
		Recycled_eciworkers,
		Reasons,
		Notify_contract_days,
		Notify_license_days,

		//views
		ViewContractSetting,
		ViewLicenseExpiration,
		ViewTblEciWorkers,
		ViewTblPayrolls,
		ViewTblResporePayrolls,
		ViewTblEmployees,

		//routers
		Router
	){

	var init = function(){

		//models..
		rate = new Rate();
		bp = new Backup_percentage();

		//collections..
		accounts = new Accounts();
		employees = new Employees();
		payrolls = new Payrolls();
		payrollemps = new Payrollemps();
		summaries = new Summaries();
		dailysheets = new Dailysheets();
		rpayrolls = new Rpayrolls();
		rpayrollemps = new Rpayrollemps();
		userlogs = new Userlogs();
		eci_workers = new Eci_workers();
		eci_positions = new Eci_positions();
		sites = new Sites();
		designations = new Designations();
		contracts = new Contracts();
		licensed_drivers = new Licensed_drivers();
		recycled_employees = new Recycled_employees();
		recycled_eciworkers = new Recycled_eciworkers();
		reasons = new Reasons();
		notify_contract_days = new Notify_contract_days();
		notify_license_days = new Notify_license_days();

		//views
		viewContractSetting = new ViewContractSetting();
		viewLicenseExpiration = new ViewLicenseExpiration();
		viewTblEciWorkers = new ViewTblEciWorkers();
		viewTblPayrolls = new ViewTblPayrolls();
		viewTblRestorePayrolls = new ViewTblResporePayrolls();
		viewTblEmployees = new ViewTblEmployees();

		//router..
		router = new Router();


	};
	
	return { init: init };
});
