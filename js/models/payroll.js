define(['underscore','backbone',
    'modules/payroll_module'], function(_, Backbone, payroll_module) {
   
    var Payroll = Backbone.Model.extend({
    
    	initialize: function(){
    		this.on('change', function(){
                console.log(this.changedAttributes());
                payroll_module.appendList(payrolls);
    		});
    		this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
    	},
    
    	defaults: {
    		
    	},
    
        validate: function(attrs, options) {
            if (!attrs.date) {
               return "date is required";
            }
            if (!attrs.ton) {
               return "total ton. is required";
            }
            if (!attrs.trip_no) {
               return "trip no. is required";
            }
            if (!attrs.shift_time) {
               return "shift time is required";
            }
            // if (payrolls.where({date: attrs.date, shift_time: attrs.shift_time, trip_no: attrs.trip_no}).length > 0) {
            //     console.log(attrs);
            //    return "Duplicate payroll is not allowed, You already created a payroll with this data.";
            // }
        }
    
    
    });
   
    return Payroll; 
});