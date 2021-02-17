var runningResult;

function saveRunningProfile(){
    $.each(runningResult, function(k, v) {
          runningResult[k] =  $("#"+k).val();
      });

    var queryString = JSON.stringify(runningResult);

    console.log(queryString);

      $.ajax({
      type: 'POST',
      url: contextRoot+'/running_profile.php',
      data: {
          'mode': 'updateRunning',
          'result' : queryString,
          'userName':userName
      },
      success: function(msg) {
          if (msg == 1){
          	alert("Save Running Profile Successfully!");
          }else{
          	alert("Save Running Profile Fail!! :"+msg);

          }

      }
    });

}


function enableRunningProfile(){
    $.each(runningResult, function(k, v) {
        $("#"+k).prop('disabled', false);

    });

    $('#USER_ID').prop('disabled', true);


}



function getRunningProfile(){
	console.log("Get Running Profile");
    $.ajax({
      type: 'POST',
      url: contextRoot+'/running_profile.php',
      data: {
          'mode': 'getRunning',
          'userName':userName
      },
      success: function(msg) {
        runningResult = JSON.parse(msg);
        $.each(runningResult, function(k, v) {
//            if (isNaN(v)){$("#"+k).val(v)} else {$("#"+k).val(roundUp(v))}
            if (isNaN(v)){$("#"+k).val(v);} else {$("#"+k).html(roundUp(v));}
            $("#"+k).prop('disabled', true);
            if (k == 'WEEKLY_MILEAGE_IN_THE_PAST_MONTH') {
              if (v == 0){$('#runningProfile').hide()};
            };
        });
      }
    });
}
