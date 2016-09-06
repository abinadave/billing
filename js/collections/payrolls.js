define(['underscore','backbone','models/payroll',
  'modules/payroll_module',
  'modules/collection_module',
  'modules/payrollemp_module'], function(_, Backbone, Payroll, pm, colmod, payrollemp_module) {
   
    var Payrolls = Backbone.Collection.extend({
       url: 'api.php/payroll',
       model: Payroll,
            
       initialize: function(){
          this.on('add', function(model){
             pm.appendList(payrolls);
                require(['modules/userlog_module'], function(userlog_module){
                    userlog_module.saveDB('New payroll was added, ID: ' + model.get('id') + ', total tonnage: ' + model.get('ton'));
                });
            });
          this.on('remove', function(model){
             pm.appendList(payrolls);
             $.post('ajax/delete/delete.php', { table : 'payrolls', prop: 'id', id: model.get('id') }, function(data, textStatus, xhr) {
               /*optional stuff to do after success */
             }).success(function(data){
                 var json = model.toJSON();
                 json.table = 'rpayrolls';
                 require(['modules/userlog_module'], function(userlog_module){
                    userlog_module.saveDB('Payroll was restored: ' + model.get('id'));
                 });
                 colmod.saveDB($.param(json), 'rpayrolls', {});
                 
             }).fail(function(xhr){
                 alert('error type: '+xhr.status);
             });
          });

          this.on('reset', function(models) {
              console.log(models.length);
          });
       },
    
       print: function(){
          payrolls.forEach(function(model) {
             console.log(model.attributes); 
          });
       }
    
    });
   
    return Payrolls; 
});