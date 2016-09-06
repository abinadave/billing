define(['underscore','backbone','text!templates/temp_navigation.html'], function(_, Backbone, template) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#navigation',
    
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
                    //jQuery
                    self.$el.find('li').click(function(event) {
                        /* Act on the event */
                        self.$el.find('li').removeClass('active')
                        // self.$el.find('.navbar-nav').find('li').removeClass('active');
                        $(this).addClass('active');
                    });
                });
        	}
    
    });
   
    return Subview; 
});