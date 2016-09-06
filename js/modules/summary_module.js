define(['underscore','backbone','moment'], function(_, Backbone, moment) {
   
    var Module = {

        initTwodates: function(moment) {
            var d1 = moment($('input#d1').val()).format('MMMM DD'),
            d2 = moment($('input#d2').val()).format('MMMM DD, YYYY');
            $('span#d1').text(d1);
            $('span#d2').text(d2);
        },

        getPayrolldate: function(arguments) {
            var d1 = moment($('input#d1').val()).format('MMMM DD'),
            d2 = moment($('input#d2').val()).format('MMMM DD, YYYY');
            return moment(d1).format('MMM DD') + '- ' + moment(d2).format('MMM DD, YYYY');
        },

    	appendTblSummary1: function() {
    		require(['views/payroll/view_table_summary1'], function(Subview){
    		    var view = new Subview();
    		});
    	},

        appendTblSummary2: function() {
            require(['views/payroll/view_table_summary2'], function(Subview){
                var view = new Subview();
            });
        },

    	appendListSummary1: function(list) {
    		require(['views/payroll/view_list_of_summary1'], function(Subview){
    		    var view = new Subview({
    		    	collection: list
    		    });
    		});
    	},

        appendListSummary2: function(list) {
            require(['views/payroll/view_list_of_summary2'], function(Subview){
                var view = new Subview({
                    collection: list
                });
            });
        },

        appendTblSummary3: function() {
            require(['views/payroll/view_table_summary3'], function(Subview){
                var view = new Subview();
            });
        },

        appendListOfSummary3: function(list) {
            require(['views/payroll/view_list_of_summary3'], function(Subview){
                var view = new Subview({
                    collection: list
                });
            });
        },

        appendEnvelopes: function(list) {
            require(['views/payroll/view_payroll_envelopes'], function(Subview){
                var view = new Subview({
                    collection: list
                });
            });
        }



    };
   
    return Module; 
});