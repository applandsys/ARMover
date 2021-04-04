app_config.token = localStorage.getItem("token");

console.log(app_config);

let orderPage = function(category){
	var data = {data: {title: 'Order',category:category}}
	fn.pushpage("order_info.html",data,"fade");
}


document.addEventListener('init', function(event) {
	
  var page = event.target ;
// order //	
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
}, false);	
