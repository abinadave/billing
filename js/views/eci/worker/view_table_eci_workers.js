define(['underscore','backbone',
	'text!templates/eci/worker/temp_table_eci_workers.html',
    'modules/eciworker_module',
    'modules/site_module',
    'modules/designation_module',
    'modules/eciworker_module'], function(_, Backbone, template, eciworker_module, site_module, designation_module, eciworker_module) {
   
    var SubTable = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events..
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
                    self.allEvents(self);

                    require(['modules/functions'], function(Fn){
                        Fn.loadData([
                            'sites',
                            'designations',
                            'licensed_drivers',
                            'contracts',
                            'eci_workers'
                        ], function(){
                            eciworker_module.appendList(eci_workers);
                        });
                    });

                    // $.when(sites.fetch({url: 'api.php/get_order_by/sites/id/desc', silent: true})).then(function(response) {
                    //     $.when(designations.fetch({url: 'api.php/get_order_by/designations/id/desc', silent: true})).then(function(response) {
                            
                    //         $.when(eci_workers.fetch({
                    //             silent: true,
                    //             url: 'api.php/get_order_by/eci_workers/id/desc'
                    //         })).then(function(response) {
                    //             eciworker_module.appendList(eci_workers);
                    //         }, function(arguments) {
                    //             console.log('failed to load Eci workers.');
                    //         });
                            
                    //     }, function(arguments) {
                    //         console.log('failed to load designations');
                    //     });
                    // }, function(arguments) {
                    //     console.log('failed to load sites');
                    // });   
                    
                    
                });
        	},

            allEvents: function(self) {

                self.$el.find('#btnHireEmployee').click(function(event) {
                    eciworker_module.appendModalHire();
                });

                self.$el.find('#btnProjectSite').click(function(event) {
                    site_module.appendCreateSite();
                });

                self.$el.find('#btnDesignation').click(function(event) {
                    designation_module.appendModalCreate();
                });

                self.$el.find('#search').on('keyup', function(event){
                    var value = $(this).val();
                    clearTimeout(self.timer);
                    self.timer = setTimeout(function() {
                        var list = eciworker_module.search(value.toLowerCase());
                        eciworker_module.appendList(new Backbone.Collection(list));
                    }, 700);
                });

            }
    
    });
   
    return SubTable; 
});