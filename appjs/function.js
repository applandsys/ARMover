window.fn = {};

window.fn.open = function() {
  var menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  var content = document.getElementById('content');
  var menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};



window.fn.pushpage = function(page,data,anime){
	document.querySelector('#appNavigator').pushPage(page,data,{animation: anime});
}

window.fn.popPage = function(){
	document.querySelector('#appNavigator').popPage();
}

window.fn.resetToPage = function(page){
	document.querySelector('#appNavigator').resetToPage(page, {animation: 'slide'});
}




function showPopover(target,message) {
   document.getElementById("message_text").innerHTML = message;
   document.getElementById('popover').show(target);
};

function hidePopover() {
  document.getElementById('popover').hide();
};


function showModal() {
  var modal = document.querySelector('ons-modal');
  modal.show();
}

function hideModal(){
	var modal = document.querySelector('ons-modal');
    modal.hide();
}


function showModalInternet() {
  var modal = document.querySelector('ons-modal#internetcheck');
  modal.show();
}


function NetproblemExit(){
	ons.notification.alert({
							title: 'Failed ?',
							message: '<center>  Connection Failed . Please Check your Internet Connection. </center>',
							callback: function(answer) {
								   navigator.app.exitApp();
							}
						});
	

}

window.fn.exit =  function(){
							ons.notification.alert({
									title: 'Thanks!',
									message: '<center>Are your Sure want to Exit</center>',
									callback: function(answer) {
											navigator.app.exitApp();
											}
									  });
					}





// Home Open by menu
window.fn.home = function() {
  fn.load('home.html');
};