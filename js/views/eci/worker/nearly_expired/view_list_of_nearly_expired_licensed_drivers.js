define([
	'underscore',
	'backbone',
	'text!templates/eci/worker/nearly_expired/temp_list_of_nearly_expired_licensed_drivers.html',
    'moment'], 
	function(_, Backbone, template, moment) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-nearly-expired-licensed-drivers',
    
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
                    'self': self
                });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    
                });
        	},


            getDesignation(desig_id){
                var rs = designations.where({id: desig_id});
                if (rs.length) {
                    var model = _.first(rs);
                    return model.get('name');
                }else {
                    return '-';
                }
            },

            getSiteLocation(site_id){
                var rs = sites.where({id: site_id});
                if (rs.length) {
                    var model = _.first(rs);
                    return model.get('name');
                }else {
                    return '-';
                }
            },

            getDaysLeftB4Exp(exp_date){
                return moment(exp_date).fromNow();
            },

            determinIfExpired(model){
                var self = this;
                if (model.diffInDays <= 0) {
                    return '<b class="text-danger">expired </b>' + self.getDaysLeftB4Exp(model.exp_date);
                }else {
                    return '<b class="text-primary">will expire in '+ model.diffInDays + ' days</b>';
                }
            }
    
    });
   
    return Subview; 
});