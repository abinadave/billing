define(['underscore','backbone',
	'text!templates/restore/temp_list_of_rpayrolls.html','moment',
    'modules/rpayroll_module'], function(_, Backbone, template, moment, rpayroll_module) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'tbody',
    
        	el: '#list-of-restored-payrolls',
    
        	template: _.template(template),
    
            events: {
                // bound events..
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template({'library': self.collection.toJSON(), 'moment': moment ,'rpayroll_module': rpayroll_module });
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;
                $(function(){
                    console.log('rendered')
                    self.$el.find('td').addClass('text-center');
                    // require(['modules/functions'], function(Fn){
                    //     setTimeout(function() {
                    //         Fn.datatablePlugin('#table-rpayrolls');
                    //     }, 500);
                    // });
                });
        	}
    
    });
   
    return Subview; 
});