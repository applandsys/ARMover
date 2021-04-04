app_config.token = localStorage.getItem("token");

//console.log(app_config.token);

let authcheck = function(){
	
					var request_data = {'action':'authcheck'};
					
					$.ajax({
						type:'POST',
						url:app_config.base_url +"user/AuthCheck",
						data:request_data,
						headers: {"Authorization": "Bearer "+app_config.token},
						dataType: 'json',
						beforeSend: function(){
							showModal() ;
						},
						complete: function(){
							hideModal();
						},
						success: function(data){
							if(data.status=='invalid'){
								localStorage.removeItem("token");
								app_config.token = null;
								window.location.replace("index.html");
							}else{
								app_config.token = localStorage.getItem("token");	
							}	
						},
						error: function(data){
							ons.notification.alert({
										title: 'Sorry!',
										message: 'Internet Connection Problem'
									});
						}
						
					}); 
}




let orderPage = function(category){
	var data = {data: {title: 'Order',category:category}}
	fn.pushpage("order_info.html",data,"fade");
}


document.addEventListener('init', function(event) {
	
  var page = event.target ;
// order //	
	authcheck();


  if (page.matches('#order_info')) {
	  
	  	$("#signup_form").on('submit',function(e) {
		   e.preventDefault(); 
		   
			var form_data = $(this).serializeArray().reduce(function(a, x) { a[x.name] = x.value; return a; }, {});
			
			var data = {data: {title: 'Order_confirm',form_data:form_data,page_data:page.data}}
			fn.pushpage("order_confirm.html",data,"fade");
			
			
		});			
  }// end order
 
    if (page.matches('#order_confirm')) {
		
		var category = page.data.page_data.category;
	  	var order_date = page.data.form_data.order_date;
	  	var from_location = page.data.form_data.from_location;
	  	var to_location = page.data.form_data.to_location;
		$("#order-date").html(order_date);
		$("#from-location").html(from_location);
		$("#to-location").html(to_location); 
		

		page.querySelector('#send_request_button').onclick = function(){
			
				var request_data = { "order_date":order_date, "category_id":category, "from_location":from_location, "to_location":to_location  };
				
					$.ajax({
						type:'POST',
						url:app_config.base_url +"request/make_order",
						data:request_data,
						headers: {"Authorization": "Bearer "+app_config.token},
						dataType: 'json',
						beforeSend: function(){
							showModal() ;
						},
						complete: function(){
							hideModal();
						},
						success: function(data){	
						
							if(data.error==0){
								ons.notification.alert({
													title: 'Thanks',
													message: '<center>'+ data.message+ '</center>',
													callback: function(answer) {
														var pushdata = {pagedata: {title: 'Order_send',response:data}}
														fn.pushpage("thanks_page.html",pushdata,"fade");	
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
			
			
		}
		
		 
	}// end order
	
	
	if (page.matches('#order_list')) {
	   
			var request_data = {'action':'order_list'};
					
			$.ajax({
				type:'POST',
				url:app_config.base_url +"request/order_list",
				data:request_data,
				headers: {"Authorization": "Bearer "+app_config.token},
				dataType: 'json',
				beforeSend: function(){
					showModal() ;
				},
				complete: function(){
					hideModal();
				},
				success: function(data){
					console.log(data);
					var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
					var table = '';			
						$.each(data.order_list, function (idx, obj) {      						
							table += '<table id="customers">';
							table += '<tr><th>Category</th><td>'+obj.category.category_name+'</td></tr>';
							table += '<tr><th>From Address</th><td>'+obj.from_location+'</td></tr>';
							table += '<tr><th>To Address</th><td>'+obj.to_location+'</td></tr>';
							table += '<tr><th>Order Date</th><td>'+new Date(obj.created_at).toLocaleString('en-US', { timeZone: 'BST' },options)+'</td></tr>';
							table += '</table><hr/>';
						});   
						
						
					$("#ordr_list").html(table);
				},
				error: function(data){
					ons.notification.alert({
								title: 'Sorry!',
								message: 'Internet Connection Problem'
							});
				}
				
			}); 
	  			
	}// end order
	
	
	if (page.matches('#about')) {
	   
							
			$.ajax({
				type:'GET',
				url:app_config.base_url +"request/about",
				headers: {"Authorization": "Bearer "+app_config.token},
				dataType: 'json',
				beforeSend: function(){
					showModal() ;
				},
				complete: function(){
					hideModal();
				},
				success: function(data){
					console.log(data);
					 
						
						
					$("#title").html(data.about[0].title);
					$("#detail").html(data.about[0].content);
				},
				error: function(data){
					ons.notification.alert({
								title: 'Sorry!',
								message: 'Internet Connection Problem'
							});
				}
				
			}); 
	  			
	}// end about
	
	if (page.matches('#settings')) {
	   
							
	
	  			
	}// end setting
 
}, false);	
