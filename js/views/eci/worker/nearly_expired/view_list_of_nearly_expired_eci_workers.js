define([
	'underscore',
	'backbone',
	'text!templates/eci/worker/nearly_expired/temp_list_of_nearly_expired_eci_workers.html',
	'moment',
	'modules/expiration_module'
	], function(_, Backbone, template, moment, expiration_module) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-nearly-expired-eci-workers',
    
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
                	'moment': moment,
                	'expiration_module': expiration_module,
                	'self': self
            	});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){


                });
        	},

            getExpiredContracts(){
                
            },

        	displayContract(worker_id){
        		let rsContract = expiration_module.findLatestContract(worker_id);
        		if (rsContract.length) {
        			var contract = rsContract[0];
        			return contract.get('start') + ' <b>-</b> ' + contract.get('end');
        		}else {
        			return 'contract not found';
        		}
        	},

        	displayDesig(desig_id){
        		var rs = designations.where({id: desig_id});
        		if (rs.length) {
        			return rs[0].get('name');
        		}
        	},

        	displaySite(site_id){
        		var rs = sites.where({id: site_id});
        		if (rs.length) {
        			return rs[0].get('name');
        		}
        	},

        	displayExpiration(model){
        		var self = this;
        		var end = model.end;
        		return moment(model.end).fromNow();
        	},

            daysLeftB4Expiration(model){
                return model.diffInDays + ' days';
            }
    
    });
   
    return Subview; 
});