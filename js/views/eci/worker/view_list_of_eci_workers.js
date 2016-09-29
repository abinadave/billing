define([
    'underscore',
    'backbone',
	'text!templates/eci/worker/temp_list_of_eci_workers.html',
	'modules/designation_module',
	'modules/site_module',
    'modules/licenseddriver_module',
    'modules/contract_module',
    'modules/expiration_module',
    'moment'
    ], function(_, Backbone, template, desig_module, site_module, 
        licenseddriver_module, contract_module, expiration_module,
        moment) {
   
    var SubviewEW = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-eci-workers',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({
                	'library': self.collection.toJSON(),
                	'site_module': site_module,
                	'desig_module': desig_module,
                    'licenseddriver_module': licenseddriver_module,
                    'contract_module': contract_module,
                    'self': self,
                    'moment': moment
           		});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    var $spanLength = $('#total-eci-workers');
                    $spanLength.text(self.collection.length);
                    if (!self.collection.length) {
                        var output = '<tr><td colspan="6" style="font-weight: bolder" class="text-primary">No data was found in this table.</td></tr>';
                        self.$el.html(output);
                    }
                });

                $(function() {
                    self.initPopOver();
                });
        	},

            initPopOver(){
                var self = this;
                require(
                    [
                        /* This are the files for popover */
                        '../assets/bootstrap/js/transition',
                        '../assets/bootstrap/js/tooltip',
                        '../assets/bootstrap/js/popover'
                    ], 
                    function(transition, tooltip, popover){

                        var popover = $('#list-of-eci-workers').find('[data-toggle="popover"]').popover({
                            trigger : 'hover',  
                            placement : 'top',
                            html: 'true'
                        });

                        popover.on('show.bs.popover', function() {
                            var id = this.id;
                            var rsWorker = eci_workers.where({id: id});
                            var rsContract = expiration_module.findLatestContract(id);
                            var html = '<div style="width: 200px">';

                            if (rsWorker.length) {
                                var worker = rsWorker[0].toJSON();
                                html += '<label class="label label-info">Fullname </label>';
                                html += '<p>' + worker.fullname + '</p>';
                            }

                            if(rsContract.length){
                                var contract = _.first(rsContract).toJSON();
                                var contractFromNow = moment(contract.end).fromNow();
                                /* contract */
                                if(contractFromNow.search('ago') !== -1){
                                    html += '<label class="label label-danger">Contract status</label>';
                                    html += '<br>Expired, ' + contractFromNow;
                                }else {
                                    html += '<label class="label label-warning">Contract status</label>';
                                    html += '<br>Will Expire ' + contractFromNow;
                                }
                            };

                            var rsLicense = licenseddriver_module.findLatestLicense(id);
                            if (rsLicense.length) {
                                var license = _.first(rsLicense).toJSON();
                                var licenseFromNow = moment(license.exp_date).fromNow();
                                html += '<br/><br/>';
                                if (licenseFromNow.search('ago') !== -1) {
                                    html += '<label class="label label-danger">License status</label>';
                                    html += '<br>Expired, ' + licenseFromNow;
                                }else {
                                    html += '<label class="label label-warning">License status</label>';
                                    html += '<br>Will Expire ' + licenseFromNow;
                                }
                            }

                            html += '</div>';
                            $(this).attr('data-content', html);
                        });

                });
            },

            displayLatestContract(worker_id){
                var rs = expiration_module.findLatestContract(worker_id);
                if (rs.length) {
                    var contract = rs[0];
                    return contract.get('start') + ' <b>-</b> ' + contract.get('end');
                }else {
                    return 'contract not found';
                }
            },

            getLatestContract(){
                var largest = 0;
                arr.forEach(function(model) {

                });
            }
    
    });
   
    return SubviewEW; 
});