define(['underscore','backbone'], function(_, Backbone) {
   
    var Module = {
    	appendList(list){
    		require(['views/eci/worker/previous/view_list_of_recycled_eciworkers'], 
    			function(Subview){
    		    new Subview({
    		    	collection: list
    		    });
    		});
    	}
    };
   
    return Module; 
});