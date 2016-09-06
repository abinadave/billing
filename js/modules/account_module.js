define(['underscore','backbone'], function(_, Backbone) {

    var Module = {
    	
    		verifyAccount: function (form) {
    			var self = this;
    			$('')
	    		$.post('ajax/select/verify_account.php', form, function(data, textStatus, xhr) {
	    			/*optional stuff to do after success */
	    		}).success(function(data){
	    			var resp = $.parseJSON(data);
	    			Module.setSession(resp);
	    			if (parseInt(resp.id) > 0) {
	    				setTimeout(function() {
	    					window.location = '.';
	    				}, 1200);
	    			}else {
	    				require(['modules/warehouseincharge_module'], function(wim){
	    				    wim.verify_account(form);
	    				});
	    			}
	    		}).fail(function(xhr){
	    			alert('error type: '+xhr.status);
	    		});
	    	},

	    	setSession: function(json) {
	    		$.each(json, function(index, val) {
	    			 /* iterate through array or object */
	    			 sessionStorage.setItem(index, val);
	    		});
	    	},

	    	signOut: function() {
	    		$.post('ajax/others/destroy_session.php', function(data, textStatus, xhr) {
	    			/*optional stuff to do after success */
	    		}).success(function(data){
	    			var json = $.parseJSON(data);
	    			if (json.success) {
	    				sessionStorage.clear();
	    				window.location = '.';
	    			};
	    		}).fail(function(xhr){
	    			alert('error type: '+xhr.status);
	    		});
	    	},

	    	signedInName: function() {
	    		var $span = $('span#signed-in-user');
	    		$span.text('loading....');
	    		setTimeout(function() {
	    			$span.text(sessionStorage.getItem('fullname'));
	    			if (sessionStorage.getItem('fullname') === null) {
	    				$span.text(sessionStorage.getItem('firstname'));
	    			};
	    		}, 500);
	    	},

	    	appendModalWait: function() {
	    		require(['views/view_modal_backup_waiting'], function(SubModal){
	    		    var view = new SubModal();
	    		});
	    	}
    }
   
    return Module; 
});