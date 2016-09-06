define(['underscore','backbone','text!templates/temp_login.html',
	'css!libs/css/signin',
    'css!libs/css/for_body.css'], function(_, Backbone, template, signin, for_body) {
   
    var Subview = Backbone.View.extend({
    
        	initialize: function(){
                this.render();
        	},
    
        	tagName: 'div',
    
        	el: '#main',
    
        	template: _.template(template),
    
            events: {
                // bound events
            },
    
        	render: function(){
        	    var self = this;
                self.$el.off();
                self.$el.empty();
                var output = self.template(template);
                self.$el.append(output);
                self.onRender();
    	        return self;
        	},
    
        	onRender: function(){
                var self = this;

                jQuery(document).ready(function($) {
                    $('#div-navigation').hide();
                });

                $(function() {
                    self.windowResize();
                });

                $(function() {
                    $(window).on('resize', function(event) {
                        self.windowResize();
                    });
                });
                
                $(function(){
                    self.$el.find('form').submit(function(event) {
                    	/* Act on the event */
                    	event.preventDefault();
                    	$('#btnSubmit').prop('disabled', true);
                    	$.post('ajax/select/verify_account.php', $(this).serialize() , function(data, textStatus, xhr) {
                    		/*optional stuff to do after success */
                    	}).success(function(data){
                    		var json = $.parseJSON(data);
                    		if (json.hasOwnProperty('match')) {
                    			if (!json.match) {                    				
	                    			$('#btnSubmit').prop('disabled', false);
	                    			router.alertify_error('Invalid account');
                    			}else {
                                    $('#btnSubmit').text('Signin in....');
                    				router.alertify_success('Login Successfull, Please wait..');
                    				$.each(_.omit(json.session,'password'), function(index, val) {
                    					sessionStorage.setItem(index, val);
                    				});
                    				setTimeout(function() {
                    					window.location = '.';
                    				}, 1200);
                    			}
                    		}
                    	}).fail(function(xhr){
                    		alert('error type: '+xhr.status);
                    	});
                    });
                });

                $(function() {
                    self.$el.find(':checkbox').change(function(event) {
                        /* Act on the event */
                        var is = $(this).is(":checked");
                        if (is) {
                            self.$el.find('#password').prop('type','text');
                        }else {
                            self.$el.find('#password').prop('type','password');
                        }
                    });
                });

        	},

            windowResize: function() {
                var self = this;
                var $container = self.$el.find('#container-login');
                var width = $(window).width();
                if (width <= 1400) {
                    /* For small Screen */
                    $container.css('width', '30%');
                    $('body').addClass('for-body');
                }else {
                    /* For Big Screen */
                    $('body').removeClass('for-body');
                    $container.css('width', '20%');
                }
            }
    
    });
   
    return Subview; 
});