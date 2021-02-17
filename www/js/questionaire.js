var questionaireResult;
var assessmentGender;
var assessmentCourse;

function checkOther(){
  if($('#Q06').val() === 'N') {$('#Q06A').hide(); $('#Q06A').val('');};
  if($('#Q06').val() === 'D') {$('#Q06A').hide(); $('#Q06A').val('');};
  if($('#Q06').val() === 'S') {$('#Q06A').show();};
}

function saveQuestionaire(){
  if($('#Q04A').attr('checked')) {var AQ04A = 'checked'} else {var AQ04A = ''};
  if($('#Q04B').attr('checked')) {var AQ04B = 'checked'} else {var AQ04B = ''};
  if($('#Q04C').attr('checked')) {var AQ04C = 'checked'} else {var AQ04C = ''};
  if($('#Q04D').attr('checked')) {var AQ04D = 'checked'} else {var AQ04D = ''};
  if($('#Q04E').attr('checked')) {var AQ04E = 'checked'} else {var AQ04E = ''};
  if($('#Q04F').attr('checked')) {var AQ04F = 'checked'} else {var AQ04F = ''};
  if($('#Q04G').attr('checked')) {var AQ04G = 'checked'} else {var AQ04G = ''};
  if($('#Q04H').attr('checked')) {var AQ04H = 'checked'} else {var AQ04H = ''};

  if($('#Q05A').attr('checked')) {var AQ05A = 'checked'} else {var AQ05A = ''};
  if($('#Q05B').attr('checked')) {var AQ05B = 'checked'} else {var AQ05B = ''};
  if($('#Q05C').attr('checked')) {var AQ05C = 'checked'} else {var AQ05C = ''};
  if($('#Q05D').attr('checked')) {var AQ05D = 'checked'} else {var AQ05D = ''};
  if($('#Q05E').attr('checked')) {var AQ05E = 'checked'} else {var AQ05E = ''};
  if($('#Q05F').attr('checked')) {var AQ05F = 'checked'} else {var AQ05F = ''};
  if($('#Q05G').attr('checked')) {var AQ05G = 'checked'} else {var AQ05G = ''};
  if($('#Q05H').attr('checked')) {var AQ05H = 'checked'} else {var AQ05H = ''};
  if($('#Q05I').attr('checked')) {var AQ05I = 'checked'} else {var AQ05I = ''};
  if($('#Q05J').attr('checked')) {var AQ05J = 'checked'} else {var AQ05J = ''};
  if($('#Q05K').attr('checked')) {var AQ05K = 'checked'} else {var AQ05K = ''};

  questionaireResult =
    {
    Q01: $('#Q01').val(),
    Q02: $('#Q02').val(),
    Q02A: $('#Q02A').val(),
    Q03: $('#Q03').val(),
    Q04: $('#Q04').val(),
    Q05A: AQ04A,Q04B:AQ04B,Q04C:AQ04C,Q04D:AQ04D,Q04E:AQ04E,Q04F:AQ04F,Q04G:AQ04G,Q04H:AQ04H,
    Q05: $('#Q05').val(),
    Q05A: AQ05A,Q05B:AQ05B,Q05C:AQ05C,Q05D:AQ05D,Q05E:AQ05E,Q05F:AQ05F,
    Q05G: AQ05G,Q05H:AQ05H,Q05I:AQ05I,Q05J:AQ05J,Q05K:AQ05K,
    Q06: $('#Q06').val(),
    Q06A: $('#Q06A').val()
    };

      var queryString = JSON.stringify(questionaireResult);

      console.log(queryString);


        $.ajax({
        type: 'POST',
        url: contextRoot+'/questionaire.php',
        data: {
            'mode': 'saveQuestionaire',
            'result' : queryString,
            'userName':userName
        },
        success: function(msg) {
            if (msg == 1){
            	alert("Save questionaire Successfully!");
              updateTrainingPlan();
            }else{
            	alert("Save questionaire Fail!! :"+msg);

            }

        }
      });
}
