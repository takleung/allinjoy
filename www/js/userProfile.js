function doResetPassword(){
	if ($('#resetPassword').val() != $('#confirmPassword').val()){
		alert("Reset Password and Confirm Password is not same!");

	}else {

	    $.ajax({
          type: 'POST',
          url: contextRoot+'/forgetPassword.php',

          data: { 
          'userName':userName,
          'newPassword' : $('#resetPassword').val(),
      	   'mode':'RESET_PASSWORD'
      		},
          success: function(msg) {
          		alert(msg);
          		$('#resetPassword').val("");
          		$('#confirmPassword').val("");
          
          }
        });


	}



}