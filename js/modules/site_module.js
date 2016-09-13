define(['underscore','backbone',
    'libs/backbone.obscura'], function(_, Backbone, Obscura) {
   
    var Module = {

        getIndex(i) {
            var rs = sites.where({id: i});
            if (rs.length) {
                return sites.get(i).get('name');
            }else {
                return '';
            }
        },

    	appendCreateSite() {
    		require(['views/eci/site/view_modal_create_project_site'], function(Subview){
    		    var view = new Subview();
    		});
    	},

    	appendSitesInModel(list) {
    		require(['views/eci/site/view_list_of_sites_in_modal'], function(SubviewSIM){
    		    var view = new SubviewSIM({
    		    	collection: list
    		    });
    		});
    	},

        appendListInCbo(list) {
            require(['views/eci/site/view_list_of_sites_in_cbo'], function(SubviewSIC){
                new SubviewSIC({
                    collection: list
                });
            });
        },

        appendDisplayBySite(list){
            require(['views/eci/site/view_display_by_site'], function(SubviewDisplayBySite){
                new SubviewDisplayBySite({
                    collection: list
                });
            });
        },

        sortByName(list) {
            var proxy = new Obscura(list);
            return proxy.setSort('name','asc');
        }

    };
   
    return Module; 
});