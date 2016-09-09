define(['underscore','backbone',
    'libs/backbone.obscura'], function(_, Backbone, Obscura) {
   
    var Module = {

        sortByName(list) {
            var proxy = new Obscura(list);
            return proxy.setSort('name','asc');
        },

        getIndex(i) {
            var rs = designations.where({id: i});
            if (rs.length) {
                return designations.get(i).get('name');
            }else {
                return '';
            }
        },

    	appendModalCreate() {
    		require(['views/eci/designation/view_modal_create_designation'], function(SubviewMCD){
    		    new SubviewMCD();
    		});
    	},

    	appendListInModal(list) {
    		require(['views/eci/designation/view_list_of_designation_in_modal'], function(SubviewDIM){
    		    new SubviewDIM({
    		    	collection: list
    		    });
    		});
    	},

        appendListInCbo(list) {
            require(['views/eci/designation/view_list_of_designation_in_cbo'], function(SubviewDIC){
                new SubviewDIC({
                    collection: list
                });
            });
        }


    };
   
    return Module; 
});