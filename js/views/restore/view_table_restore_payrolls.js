define(['underscore','backbone',
	'text!templates/restore/temp_table_restore_payrolls.html',
    'views/restore/view_list_of_removed_payroll',
    'modules/functions',
    'moment',
    'modules/rpayroll_module'], 
    function(_, Backbone, template, SubviewRemovedPayrolls,
     Fn, moment, rpm) {
   
    var SubRestore = Backbone.View.extend({
    
        	initialize: function(){
                // this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                	self.$el.find('tbody').html('<tr><td colspan="10">Please wait while fetching data from the server....</td></tr>');
                        // console.log('load');
                        Fn.loadData([
                            'employees',
                            'rpayrollemps',
                            'rpayrolls'
                        ], function(){
                            require(['views/restore/view_list_of_removed_payroll'], function(Subview){
                                new Subview({
                                    collection: rpayrolls
                                });
                            });
                        });
                                    
                });

                $(function() {
                    self.$el.find('th').addClass('text-center');
                });

                $(function() {
                    self.$el.find('#search-r-payrolls').on('keyup', function(event){
                        var value = $(this).val();
                        clearTimeout(self.timer);
                        self.timer = setTimeout(function() {
                            var arrFound = self.filterItems(value.toLowerCase());
                            new SubviewRemovedPayrolls({
                                collection: new Backbone.Collection(arrFound)
                            });
                        }, 700);
                    });
                });
        	},

            filterItems(value){
                var self = this;
                var momentDate = '';
                var workers = [], plate = '', indexOf = 0;
                return rpayrolls.toJSON().filter(function(rpayroll) {
                    workers = rpm.getWorkers(rpayroll.id);
                    indexOf = self.returnTrueIfFound(workers, value);
                    plate = rpm.getPlate(workers); momentDate = moment(rpayroll.date).format('MMMM DD, YYYY').toLowerCase();
                    return rpayroll.ton.indexOf(value) != -1 ||
                           rpayroll.truck_no.indexOf(value) != -1 ||
                           momentDate.indexOf(value) != -1 ||
                           plate.indexOf(value) != -1 ||
                           indexOf > 0;
                });
            },

            returnTrueIfFound(workers, value){
                var indexOf = 0; workers.forEach(function(fullname) { if (fullname.toLowerCase().indexOf(value) != -1) { ++indexOf; } }); return indexOf;
            }
    
    });
   
    return SubRestore; 
});