define(['underscore','backbone',
	'modules/rpayroll_module'], function(_, Backbone, rpayroll_module) {
   
    var Module = {
    	doneFetch: function(colmod) {
    		colmod.fetchData('rpayrolls','rpayrolls', rpayroll_module);
    	}
    };
   
    return Module; 
});