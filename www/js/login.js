function login(){

var loginName = $('#userName').val();
var password = $('#password').val();
      $.ajax({
      type: 'POST',
      url: contextRoot+'/login.php',
      data: { 
          'userName':loginName,
          'password':password
      },
      success: function(msg) {
      		if (msg == true){
				window.localStorage.setItem("loggedIn", 1);
				window.localStorage.setItem("userName", $('#userName').val());
				userName = window.localStorage.getItem("userName");
				mainInit();


      		}else {
      			alert("Username or Password wrong!");
      		}

      }
    });


}


function switchToForgetPassword(){
	$('#loginPanel').hide();
	$('#forgetPasswordPanel').show();


}

function backToLogin(){
	$('#loginPanel').show();
	$('#forgetPasswordPanel').hide();

}

function forgetPassword(){
	    $.ajax({
          type: 'POST',
          url: contextRoot+'/forgetPassword.php',

          data: { 
          'userName':$('#forgotPasswordUserName').val(),
      	   'mode':'FORGET_PASSWORD'
      		},
          success: function(msg) {
            alert(msg);
            backToLogin();
          }
        });
}


function logout(){
	window.localStorage.removeItem("loggedIn");
	window.localStorage.removeItem("userName");

    contentSwaper("LOGIN");
    $('.content').load("template/login.html", function(data){
        // $("#sideBarLeftMain").hide();
        // $("#snapDrawers").hide();
        dualSnapper.close();
        dualSnapper.disable();
        $('#openLeftSideBar').hide();
        $("#header_logo").show();
        $('body').removeClass("dual-sidebar");
        $('body').addClass("no_sidebar");


    });


}