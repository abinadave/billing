define(['underscore','backbone',
	'text!templates/eci/contract/temp_modal_renew_contract_emp.html',
	'moment'], function(_, Backbone, template, moment) {
   
    var Subview = Backbone.View.extend({
    
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
                var output = self.template({'model': self.model.toJSON()});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    $('#modal-renew-contract').modal('show');
                    $('#modal-renew-contract').on('hidden.bs.modal', function(){
                    	router.navigate('eci-workers');
                    });
                });

                $(function() {
                	self.$el.find('form').on('submit', function(event){
                		event.preventDefault();
                		require(['modules/functions','models/contract'], function(fn, Contract){

                		    var obj = {
                		    	start: moment(self.$el.find('input[name="start"]').val()).format('MMMM DD, YYYY'),
                		    	end: moment(self.$el.find('input[name="end"]').val()).format('MMMM DD, YYYY'),
                		    	date_created:  moment().format('MMMM DD, YYYY HH:mm:ss'),
                		    	created_by:  sessionStorage.getItem('id'),
                		    	worker_id: self.model.get('id'),
                		    	table: 'contracts'
                		    };
                		   
                		    var contract = new Contract(obj);
                		    if (contract.isValid()) {
                		    	contracts.create(obj, {
                		    		success: function(){
                		    			self.$el.find('form')[0].reset();
                		    			$('#modal-renew-contract').modal('hide');
                		    			router.alertify_success('New Contract saved');
                		    		}
                		    	});
                		    }
                		    
                		});
                	});
                });
        	}
    
    });
   
    return Subview; 
});