define([
	'underscore',
	'backbone',
	'moment'
	], function(_, Backbone, moment) {
   
    var Module = {
    	saveDB: function(act) {
    		userlogs.create({
    			activity: act,
    			date: moment().format('MMMM DD, YYYY HH:mm:ss'),
    			person: sessionStorage.getItem('fullname'),
    			usertype: sessionStorage.getItem('usertype'),
    			table: 'userlogs'
    		});
    	}
    };
   
    return Module; 
});