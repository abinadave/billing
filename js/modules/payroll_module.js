define(
    [
       'underscore',
       'backbone',
       'moment'
    ], function(_, Backbone, moment) {
   
    var Module = {

    	afterSave: function(json) {
    		console.log(json);
            
    	},

    	doneFetch: function(colmod) {
            this.appendList(payrolls);
            
    	},

        generateId: function(arguments) {
            var rand = 0, done = false;
            while(!done){
                rand = _.random(1,999999);
                if (payrolls.where({id: rand.toString()}).length === 0) {
                    done = true;
                }
            }
            return rand;
        },

        getPayrollsBetween: function(d1, d2) {
            var date = '',
            date1 = moment(d1).format('MMMM DD, YYYY'), 
            date2 = moment(d2).format('MMMM DD, YYYY');
            var returnModels = new Backbone.Collection();
            payrolls.forEach(function(model) {
                date = moment(model.get('date')).format('MMMM DD, YYYY');
                if (moment(date).isBetween(date1, date2)) {
                    returnModels.add(model);
                }
            });
            return returnModels;
        },

        backupAllPayrolls: function() {
            var ids = [];
            payrolls.forEach(function(model) {
                ids.push(model.get('id'));
            });
            payrolls.remove(ids);
        },

        appendTabSummaries: function() {
            require(['views/payroll/view_tab_summaries'], function(Subview){
                var view = new Subview();
            });
        },

        appendUpdatePayroll: function(model) {
            require(['views/payroll/view_modal_update_payroll'], function(Submodal){
                var view = new Submodal({
                    model: model
                });
            });
        },

        appendList: function(list) {
            require(['views/payroll/view_list_of_payroll'], function(Subview){
                var view = new Subview({
                    collection: list
                });
            });
        },

    	appendModalCreatePayroll: function() {
    		require(['views/payroll/view_modal_create_payroll'], function(Subview){
    		    var view = new Subview();
    		});
    	},

    	appendOutputTrips: function(value) {
    		require(['views/payroll/view_output_trips'], function(SubviewTrips){
    		    var view = new SubviewTrips({
    		    	model: new Backbone.Model({
    		    		trips: value
    		    	})
    		    })
    		});
    	}


    };
   
    return Module; 
});