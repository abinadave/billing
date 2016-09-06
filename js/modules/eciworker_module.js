define(['underscore','backbone'], function(_, Backbone) {
   
    var Module = {
    	appendModalHire(){
    		require(['views/eci/worker/view_modal_hire_eci_workers'], function(Subview){
    		    var view = new Subview();
    		});
    	},

        search (value) {
            return eci_workers.filter(function(model) {
                return model.get('fullname').toLowerCase().indexOf(value) !== -1 || model.get('rpd').indexOf(value) !== -1 || model.get('date_hired').toLowerCase().indexOf(value) !== -1;
            });
        },

    	appendList(list) {
    		require(['views/eci/worker/view_list_of_eci_workers'], function(SubviewEW){
    		    new SubviewEW({
    		    	collection: list
    		    });
    		});
    	},

        appendUpdateEciWorker(model){
            require(['views/eci/worker/view_modal_update_eci_worker'], function(Subview){
                new Subview({
                    model: model
                });
            });
        }
    };
   
    return Module; 
});