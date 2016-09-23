define([
		'underscore',
		'backbone',
		'text!templates/eci/site/temp_display_by_site.html',
        'modules/eciworker_module'
	], 
	function(_, Backbone, template, eciworker_module) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'select',
    
        	el: '#cbo-display-site',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var sortedList = self.sortByName(self.collection);
                var output = self.template({
                	'library': sortedList.toJSON()
            	});
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},

            sortByName(list){
                var sortedList = _.sortBy(list.toJSON(), 'name');
                return new Backbone.Collection(sortedList);
                
            },
    
        	onRender: function(){
                var self = this;
                $(function(){
                    //jQuery
                    self.$el.change(function(event) {
                        var i = $(this).val();
                        $.when(eci_workers.fetch({
                            url: 'index.php/eci_worker/site/'+i,
                            silent: true
                        })).then( (response) => {
                            eciworker_module.appendList(new Backbone.Collection(response));
                        }, (errorResp) => {
                            console.log('error: '+errorResp);
                        });                        
                    });
                });

        	}
    
    });
   
    return Subview; 
});