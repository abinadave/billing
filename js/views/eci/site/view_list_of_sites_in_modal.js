define(['underscore','backbone',
	'text!templates/eci/site/temp_list_of_sites_in_modal.html',
	'libs/backbone.obscura'], function(_, Backbone, template, Obscura) {
   
    var SubviewSIM = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'ul',
    
        	el: '#list-of-project-site',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                self.collection = self.sortByName(self.collection);
                var output = self.template({'library': self.collection.toJSON()});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    if (!self.collection.length) {
                    	var div = '';
                    	div += '<div class="alert alert-info alert-dismissable">';
                    	div += '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>';
                    	div += '0 Project Site was found';
                    	div += '</div>';
                    	self.$el.html(div);
                    }
                });
        	},

        	sortByName: function(list) {
        		var proxy = new Obscura(list);
        		return proxy.setSort('name','asc');
        	}
    
    });
   
    return SubviewSIM; 
});