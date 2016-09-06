define(['underscore','backbone'], function(_, Backbone) {
   
    var Eci_worker = Backbone.Model.extend({
        url: 'api.php/eci_worker',
        initialize: function(){
            this.on('change', function(){
                require(['modules/eciworker_module'], function(eciworker_module){
                    eciworker_module.appendList(eci_workers);
                });
            });
            this.on('invalid', function(model, error){
                router.alertify_error(error);
            });
        },

        validate: function(attrs, options) {
            
            if (!attrs.fullname) {
               return "Fullname is required";
            }
            if (!attrs.rpd) {
               return "Rate per day is required";
            }
            if (!attrs.designation) {
               return "Employee designation is required";
            }
            if (!attrs.site) {
               return "Project location is required";
            }
            if (attrs.date_hired === 'Invalid date') {
                return "Employee date hired is invalid, Please try another date";
            }

        }
    
    
    });
   
    return Eci_worker; 
});