define(['underscore','backbone'], function(_, Backbone) {
   
    var Emp = Backbone.Model.extend({
        url: 'api.php/employee',
    	initialize: function(){
    		this.on('change', function(){
                // console.log(this.changedAttributes());
                var self = this, $el = $('#list-of-employee');
                var is = self.get('selected');
                // $el.find(':checkbox').attr('checked', this.get('selected'));
                require(['modules/employee_module'], function(employee_module){
                    var list = employee_module.coTruckWorkers(self.get('truck_no'));
                    // list.forEach(function(model) {
                    //     model.set({selected: is}, {silent: true});
                    //     $('#chk-'+model.get('id')).prop('checked', is); 
                    // });
                    $('button#btnCreateDailySheets').find('span').text(employees.where({selected: true}).length);
                });
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},
    
    	defaults: {
    		dailysheetSalary: '0',
            ton: '0'
    	},
    
        validate: function(attrs, options) {
            if (!attrs.fullname) {
               return "Fullname is required";
            }

            if (!attrs.designation) {
               return "Designation is required";
            }

            if (!attrs.truck_no) {
               return "Truck No. is required";
            }
        }
    
    
    });
   
    return Emp; 
});