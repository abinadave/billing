define([
    'underscore','backbone',
	'text!templates/eci/worker/temp_table_eci_workers.html',
    'modules/eciworker_module',
    'modules/designation_module',
    'modules/eciworker_module',
    'modules/site_module',
    'views/eci/site/view_modal_create_project_site',
    'views/eci/designation/view_modal_create_designation',
    'views/eci/worker/previous/view_modal_recycled_eciworkers'
    ], function(_, 
        Backbone, 
        template, 
        eciworker_module, 
        designation_module, 
        eciworker_module,
        site_module,
        SubviewModalProjSite,
        SubviewModalDesignation,
        SubviewModalRecycledEmps) {
   
    var SubTable = Backbone.View.extend({
    
        	initialize: function(){
                // this.render();
                this.searching = false;
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

                $(function() {
                    new SubviewModalProjSite();
                    new SubviewModalDesignation();
                    new SubviewModalRecycledEmps();
                });

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
                            designation_module.appendDisplayByDesignation(designations);
                            site_module.appendDisplayBySite(sites);
                            // sites.print();
                        });
                    });
                    
                });

                $(function() {
                    let width = $(window).width();
                    let height = $(window).height();
                    self.$el.find('#tbl-eci-workers').width(width + 50);
                    self.$el.find('#div-tbl-workers').height(height - 140);
                });

        	},

            allEvents: function(self) {

                self.$el.find('#btnHireEmployee').click(function(event) {
                    eciworker_module.appendModalHire();
                });

                self.$el.find('#btnProjectSite').click(function(event) {
                    $('#modalProjectSite').modal('show');
                });

                self.$el.find('#btnDesignation').click(function(event) {
                    $('#modalDesignations').modal('show');
                });

                self.$el.find('#search').on('keyup', function(event){
                    var value = $(this).val();
                    clearTimeout(self.timer);
                    self.timer = setTimeout(function() {
                        self.$el.find('#search-loading').hide();
                        var list = eciworker_module.search(value.toLowerCase());
                        eciworker_module.appendList(new Backbone.Collection(list));
                    }, 700);

                });

            }
    
    });
   
    return SubTable; 
});