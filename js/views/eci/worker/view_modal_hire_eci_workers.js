define([
    'underscore',
    'backbone',
	'text!templates/eci/worker/temp_modal_hire_eci_workers.html',
    'modules/designation_module',
    'modules/site_module',
    'moment'], function(_, Backbone, template, desig_module, site_module, moment) {
   
    var SubviewMHEW = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#placeholder',
    
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
                    $('#modalHire').modal('show');
                    $('#modalHire').on('shown.bs.modal', function(event){
                        self.$el.find('input:first').focus();
                    });
                });

                $(function() {
                    // console.log(1);
                });

                $(function() {
                    setTimeout(function() {
                        desig_module.appendListInCbo(designations);
                        site_module.appendListInCbo(sites);
                    }, 600);
                });

                $(function() {
                    self.$el.find('.the-dates').css({
                        width: '217px'
                    });
                });

                $(function() {
                    self.$el.find('#chk-with-license').change(function(event) {
                        var is = $(this).is(':checked'), $lbl = $('#lbl-with-license');
                        if (is) {
                            $lbl.slideDown('fast');
                        }else {
                            $lbl.slideUp('fast');
                        }
                    });
                });

                $(function() {
                    self.$el.find('form').submit(function(event) {
                        event.preventDefault();
                        $btnSubmit = $(this).find(':submit');
                        require(['models/contract','models/eci_worker'], function(Contract, Eci_worker){

                            var obj = {
                                fullname: self.$el.find('#fullname').val().toUpperCase(),
                                rpd: self.$el.find('#rpd').val(),
                                designation: self.$el.find('#designation').val(),
                                site: self.$el.find('#site').val(),
                                date_hired: moment(self.$el.find('#date-hired').val()).format('MMMM DD, YYYY')
                            };

                            var objContract = {
                                start: moment(self.$el.find('#start').val()).format('MMMM DD, YYYY'),
                                end: moment(self.$el.find('#end').val()).format('MMMM DD, YYYY'),
                                date_created: moment().format('MMMM DD, YYYY HH:mm:ss'),
                                created_by: sessionStorage.getItem('id')
                            };

                            var objDriversLicense = {
                                exp_date: moment(self.$el.find('#license-exp').val()).format('MMMM DD, YYYY'),
                                checked: $('#chk-with-license').is(':checked'),
                                table: 'licensed_drivers'
                            };

                            var eci_worker = new Eci_worker(obj);
                            var contract = new Contract(objContract);

                            obj.date_created = moment().format('MMMM DD, YYYY HH:mm:ss');
                            obj.table = 'eci_workers';
                           
                                if (eci_worker.isValid() === true && contract.isValid() === true) {
                                    var date = obj.date_hired;
                                    obj.date_hired = moment(date).format('MMMM DD, YYYY');
                                    $btnSubmit.prop('disabled', true);
                                    setTimeout(function() {
                                         $btnSubmit.prop('disabled', false);
                                    }, 2000);
                                    eci_workers.create(obj, {
                                        success: function(a, b, c) {
                                            if (Number(b.id) > 0) {
                                                contract.set({worker_id: b.id, table: 'contracts'}, {silent: true});
                                                self.saveContractDate(contract);
                                                self.saveLicense(objDriversLicense, b.id);
                                            }
                                        }
                                    });
                                }
                            
                        });
                    });
                });
                
        	},

            saveContractDate(contract){
                var self = this;
                contracts.create(contract.attributes, {
                    success: function(a, b ,c) {
                        if (Number(b.id) > 0) {
                            self.clearForm($btnSubmit);
                            router.alertify_success('Employee Saved');
                            // alert('success has id')
                        }else {
                            // alert('not success, no id');
                        }
                    }
                });
                // alert('good');
            },

            saveLicense(obj, i){
                var validDate = moment(obj.date).isValid();
                if (obj.checked && validDate === true) {
                    obj.worker_id = i;
                    licensed_drivers.create(_.omit(obj,'checked'));
                }
            },

            clearForm($btnSubmit){
                var self = this;
                self.$el.find('form')[0].reset();
                self.$el.find('input:first').focus();
                setTimeout(function() {
                    $btnSubmit.prop('disabled', false);
                }, 1000);
            }
    
    });
   
    return SubviewMHEW; 
});