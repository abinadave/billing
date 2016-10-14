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
                            self.stoNotifications();
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

                self.$el.find('#cbo-filter-by, #cbo-type').change(function(event) {
                    var index = self.$el.find('#cbo-filter-by').val(),
                    type = self.$el.find('#cbo-type').val();

                    var url = 'index.php/eci_worker/order_index_type/'+index+'/'+type;
                    
                    $.when(eci_workers.fetch({
                        url: url
                    })).then((response) => {
                        eciworker_module.appendList(new Backbone.Collection(response));
                    }, (errorResp) => {
                        console.log('error in fetching eci workers index and type: error type was '+ errorResp);
                    });
                });
            },

            stoNotifications(){
                var self = this;
                setTimeout(function() {
                    require(['modules/licenseddriver_module'], function(LDM){
                        LDM.notification(self);
                    });
                }, 10000);
            },

            notifyExpiredLicense(obj){
                var self = this;
                require(['toastr'], function(toastr){
                    toastr.options.timeOut = 10000;
                    toastr.info(obj.nearly + ' nearly expired license');
                    toastr.error(obj.expired + ' expired license');
                });                
            }
    
    });
   
    return SubTable; 
});