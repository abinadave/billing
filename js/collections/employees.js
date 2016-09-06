define(['underscore','backbone','models/employee',
    'modules/employee_module'], function(_, Backbone, Emp, em) {
   
    var Emps = Backbone.Collection.extend({
        url: 'api.php/employee',
    	model: Emp,
    		
    	initialize: function(){
    		this.on('add', function(model){
    			console.log('new employee was added');
                em.appendList(employees);
                require(['modules/userlog_module'], function(userlog_module){
                    userlog_module.saveDB('New employee was hired --> ' + model.get('fullname'));
                });
    		});
    		this.on('remove', function(model){
    			console.log('employee successfully removed');
                em.appendList(employees);
                require(['modules/userlog_module'], function(userlog_module){
                    userlog_module.saveDB('Employee was delete from the list --> ' + model.get('fullname'));
                });
    		});
    	},
    
    	print: function(){
    		employees.forEach(function(model) {
    			console.log(model.attributes); 
    		});
    	}
    
    });
   
    return Emps; 
});