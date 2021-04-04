app_config.token = localStorage.getItem("token");

//Login page
document.addEventListener('init', function(event) {
	
  var page = event.target ;
// Login //	
  if (page.matches('#login_page')) {
	  

	  if(app_config.token != null ){
		  // check login and redirect
			window.location.replace("panel.html");
	  }
		
		
		$("#login_form").on('submit',function(e) {
		   e.preventDefault(); 
		
			var form_data = $(this).serializeArray().reduce(function(a, x) { a[x.name] = x.value; return a; }, {});
			
					$.ajax({
						type:'POST',
						url:app_config.base_url +"user/login",
						data:form_data,
						dataType: 'json',
						beforeSend: function(){
							showModal() ;
						},
						complete: function(){
							hideModal();
						},
						success: function(data){	

							if(data.message=='Failed'){
								ons.notification.alert({
										title: 'Sorry!',
										message: data.error.phone[0]
									});
							}else{
								localStorage.setItem("token",  data.access_token); //login id		
								
									ons.notification.alert({
													title: data.title,
													message: '<center>'+ data.message+ '</center>',
													callback: function(answer) {
														window.location.replace('panel.html');
													}
												});
								
							}	
						},
						error: function(data){
							ons.notification.alert({
										title: 'Sorry!',
										message: 'Internet Connection Problem'
									});
						}
						
					});  
			
			return false;
			 // ajax call
		});	
		
		
	page.querySelector('#new_signup').onclick = function(){
		var data = {data: {title: 'Signup'}}
		fn.pushpage("signup_page.html",data,"fade");
	}
	
		
  }
  
 // Signup // 
    if (page.matches('#signup_page')) {
	  
		$("#signup_form").on('submit',function(e) {
		   e.preventDefault(); 
		   
			var form_data = $(this).serializeArray().reduce(function(a, x) { a[x.name] = x.value; return a; }, {});
			
				$.ajax({
						type:'POST',
						url:app_config.base_url +"user/signup",
						data:form_data,
						dataType: 'json',
						beforeSend: function(){
							showModal() ;
						},
						complete: function(){
							hideModal();
						},
						success: function(data){	

							if(data.message=='Failed'){
								ons.notification.alert({
										title: 'Sorry!',
										message: data.error.phone[0]
									});
							}else{
								localStorage.setItem("token",  data.access_token); //login id		
								
									ons.notification.alert({
													title: data.title,
													message: '<center>'+ data.message+ '</center>',
													callback: function(answer) {
														window.location.replace('panel.html');
													}
												});
								
							}	
						},
						error: function(data){
							ons.notification.alert({
										title: 'Sorry!',
										message: 'Internet Connection Problem'
									});
						}
						
					});  
			
			return false;
		});	
    }// end signup
 
  
}, false);	





