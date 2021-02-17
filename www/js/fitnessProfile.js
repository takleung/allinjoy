var fitnessResult;
var assessmentGender;
var assessmentCourse;
var pStartWith;
var pRaceDate;

function validateFormInput(){
  var canSave = true;
  var requiredDuration = 0;
  $(".requiredN").each(function() {
    if (parseFloat($.trim($(this).val())) <= 0) {
      alert("'" + $(this).attr('id') + "' please input");
      canSave = false;
    }
  });

  $(".requiredS").each(function() {
    if ($.trim($(this).val()) == '') {
      alert("'" + $(this).attr('id') + "' please select");
      canSave = false;
    }
  });

  $("select").each(function() {
    if($(this).attr('id').indexOf("BEST_TIME") >= 0) {requiredDuration += parseFloat($.trim($(this).val()))};
  });
  if (requiredDuration <= 0){
    alert("Please input your best time!");
    canSave = false;
  }

  $("select").each(function() {
    if($(this).attr('id').indexOf("EXPECT_TIME") >= 0) {requiredDuration += parseFloat($.trim($(this).val()))};
  });
  if (requiredDuration <= 0){
    alert("Please input your expected time!");
    canSave = false;
  }

  /*
  requiredDuration = 0;
  $("select").each(function() {
    if($(this).attr('id').indexOf("WALK_TEST1") >= 0) {requiredDuration += parseFloat($.trim($(this).val()))};
  });
  if (requiredDuration <= 0){
    alert("Please input your 2.4K run test!");
    canSave = false;
  }

  requiredDuration = 0;
  $("select").each(function() {
    if($(this).attr('id').indexOf("RUN_TEST1") >= 0) {requiredDuration += parseFloat($.trim($(this).val()))};
  });
  if (requiredDuration <= 0){
    alert("Please input your 200m run test");
    canSave = false;
  }
  */

  return canSave;
}

function saveFitnessProfile(){
    CAL();
    if (validateFormInput() == true) {
      $.each(fitnessResult, function(k, v) {
            if (combineDuration(k,v) == false) {
              fitnessResult[k] =  $("#"+k).val();
            }
        });

      var queryString = JSON.stringify(fitnessResult);

      console.log(queryString);

        $.ajax({
        type: 'POST',
        url: contextRoot+'/fitness_profile.php',
        data: {
            'mode': 'updateFitness',
            'result' : queryString,
            'userName':userName
        },
        success: function(msg) {
            if (msg == 1){
              alert("Save Fitness Profile Successfully!");
            }else{
              alert("Save Fitness Profile Fail!! :"+msg);

            }

        }
      });

    }

}

function enableFitnessProfile(){
    $.each(fitnessResult, function(k, v) {
        $("#"+k).prop('disabled', false);

    });
    $('#USER_ID').prop('disabled', true);
    $('#START_WITH').prop('disabled', true);
    $('#BMI').prop('disabled', true);
    $('#BODY_FAT_COMPOISITION').prop('disabled', true);
    $('#VO2_MAX').prop('disabled', true);
}

function getFitnessProfile(){
	console.log("Get Fitness Profile");
    $.ajax({
      type: 'POST',
      url: contextRoot+'/fitness_profile.php',
      data: {
          'mode': 'getFitness',
          'userName':userName
      },
      success: function(msg) {
        fitnessResult = JSON.parse(msg);
        assessmentGender = fitnessResult.GENDER;
        assessmentCourse = fitnessResult.COURSE;
        $.each(fitnessResult, function(k, v) {
          if (splitDuration(k,v) == false) {
            $("#"+k).val(v);
            $("#"+k).prop('disabled', true);
          }
        });

        /* store the folliwng values and ready to reset and create new program */
        pStartWith = $('#START_WITH').val();
        pRaceDate = $('#RACE_DATE').val();
        /* end with store values*/
        enableFitnessProfile();
      }
    });
}

function splitDuration(k,v){
  var needSplit = false;
  if (k == "BEST_TIME" || k == "EXPECT_TIME" || k == "WALK_TEST1" || k == "WALK_TEST2" || k == "RUN_TEST1" || k == "RUN_TEST2"){
    $("#" + k + "_HH").val(Math.floor(v / 3600));
    $("#" + k + "_MM").val(Math.floor(v % 3600 / 60));
    $("#" + k + "_SS").val(Math.floor(v % 3600 % 60));
    //$("#"+k).prop('disabled', true);
    needSplit = true;
  } else {needSplit = false}
  return needSplit;
}

function combineDuration(k,v){
  var needCombine = false;
  if (k == "BEST_TIME" || k == "EXPECT_TIME" || k == "WALK_TEST1" || k == "WALK_TEST2" || k == "RUN_TEST1" || k == "RUN_TEST2"){
    fitnessResult[k] =  parseFloat($("#" + k + "_HH").val())*3600 + parseFloat($("#" + k + "_MM").val())*60 + parseFloat($("#" + k + "_SS").val());
    needCombine = true;
  } else {needCombine = false}
  return needCombine;
}

function goQuestionaire(){
	console.log("goQuestionaire");
    $.ajax({
      type: 'POST',
      url: contextRoot+'/fitness_profile.php',
      data: {
          'mode': 'checkFitness',
          'userName':userName
      },
      success: function(msg) {
//        alert(msg);
        if (msg == 0){
          alert("Fitness proifle is empty, please fill in!");
          contentSwaper("FITNESS_PROFILE");
        }
        else {
          checkResult = JSON.parse(msg);
          if (checkResult.WEEK_RUN && checkResult.SPEED &&
              checkResult.WALK_TEST1 &&
              checkResult.RUN_TEST1 > 0)
              {
                contentSwaper("QUESTIONAIRE");
              } else {
                alert("Please fill in required fields");
                contentSwaper("FITNESS_PROFILE");
              };
        }
      }
    });
}

function checkFitness(){
	console.log("checkLogEmpty");
    $.ajax({
      type: 'POST',
      url: contextRoot+'/fitness_profile.php',
      data: {
          'mode': 'checkLogEmpty',
          'userName':userName
      },
      success: function(msg) {
        if (msg == 1) {goQuestionaire()} else {updateTrainingPlan()};
      }
    });
}

function getAssessmentCheck(uiId, assessmentId){
  // alert(uiId +"-"+assessmentId);
  // alert(userName+"-"+assessmentGender+"-"+assessmentCourse);
  var requestData = {
              'userName': userName,
              'assessmentGender' : assessmentGender,
              'assessmentCourse' : assessmentCourse
              };

requestData[assessmentId] = $("#"+uiId).val();

    $.ajax({
      type: 'GET',
      url: contextRoot+'/assessmentCheck.php',
      data: requestData,
      success: function(msg) {
        var assessmentResult = JSON.parse(msg);
        if (assessmentResult.messageId != 0){
          $("#"+uiId+"_message").html(assessmentResult.messageBody);
        }else {
          $("#"+uiId+"_message").html("");
        }

      }
    });
}

function CAL(){
  CAL_BMI();
  CAL_BODY_FAT_COMPOISITION();
  CAL_VO2_MAX();
}

function CAL_BMI(){
  var WEIGHT = parseFloat($("#WEIGHT").val());
  var HEIGHT = parseFloat($("#HEIGHT").val());
  if (WEIGHT <= 0 || HEIGHT <= 0)
    {alert('Please input weight or height to get your correct BMI')}
  else
    { var BMI = WEIGHT / ( HEIGHT/100 * HEIGHT/100 );
      $("#BMI").val(roundUp(BMI));
  }
}

function CAL_BODY_FAT_COMPOISITION(){
    /*
    % Body Fat = (495 / Body Density) – 450

    Percentage of body fat
    Male
    3-Site Skinfold Equation
    Body Density = 1.10938 - (0.0008267 x sum of pectoral, abdomen and thigh skinfolds in mm ) + (0.0000016 x square of the sum of pectoal, abdomen and thigh) - (0.0002574 x age)
    Then
    % Body Fat = (495 / Body Density) – 450
    Female
    3 site skinfold equation
    Body Density = 1.0994921 - (0.0009929 x sum of triceps, thigh and suprailiac skinfolds) + (0.0000023 x square of the sum of triceps, thigh and suprailiac skinfolds) - (0.0001392 x age)
    Then
    % Body Fat = (495 / Body Density) – 450
    */

    var PECTORAL_FOLD = parseFloat($("#PECTORAL_FOLD").val());
    var ABD = parseFloat($("#ABD").val());
    var THIGH = parseFloat($("#THIGH").val());
    var TRICEPS = parseFloat($("#TRICEPS").val());
    var SUPRAILLIAC = parseFloat($("#SUPRAILLIAC").val());
    var AGE = parseFloat($("#AGE").val());
    var GENDER = $("#GENDER").val();
    var BODY_DENSITY = 0;
    var BODY_FAT_COMPOISITION = 0;

    if (GENDER == "M") {BODY_DENSITY = 1.10938 - (0.0008267 * (PECTORAL_FOLD + ABD + THIGH) ) + (0.0000016 * (PECTORAL_FOLD + ABD + THIGH) * (PECTORAL_FOLD + ABD + THIGH)) - (0.0002574 * AGE)}
    else {BODY_DENSITY = 1.0994921 - (0.0009929 * (PECTORAL_FOLD + ABD + THIGH) ) + (0.0000023 * (PECTORAL_FOLD + ABD + THIGH) * (PECTORAL_FOLD + ABD + THIGH)) - (0.0001392 * AGE)}

    BODY_FAT_COMPOISITION = (495 / BODY_DENSITY) - 450;

    if (BODY_FAT_COMPOISITION > 0) {$("#BODY_FAT_COMPOISITION").val(roundUp(BODY_FAT_COMPOISITION))}
    else {$("#BODY_FAT_COMPOISITION").val(0)};
}

function CAL_VO2_MAX(){
/*
Calculation of VO2 max based on 1.5miles performance
Time (in min) = time taken to finish 1.5 miles = 2.414016 km
Gender for male=1, female=0
VO2max = 88.02 – (0.1656 x body weight in kg) – (2.76 x time) + (3.716 x gender*)
Because HM participants did two times 1.5miles, we shall use the average of the two 1.5 times as the Time
*/
  var GENDER = 0;
  if ($("#GENDER").val() == "M"){GENDER = 1} else {GENDER = 0};
  var WEIGHT = parseFloat($("#WEIGHT").val());
  var VO2_MAX = 0;
  var TIME1 = parseFloat($("#WALK_TEST1_HH").val()) * 60 + parseFloat($("#WALK_TEST1_MM").val()) + parseFloat($("#WALK_TEST1_SS").val())/60;
  var TIME2 = parseFloat($("#WALK_TEST2_HH").val()) * 60 + parseFloat($("#WALK_TEST2_MM").val()) + parseFloat($("#WALK_TEST2_SS").val())/60;
  var TIME_IN_MIN = 0;
  if (TIME2 > 0) {TIME_IN_MIN = (TIME1 + TIME2)/2}
  else {TIME_IN_MIN = TIME1}
  VO2_MAX = 88.02 - (0.1656 * WEIGHT) - (2.76 * TIME_IN_MIN) + (3.716 * GENDER);

  if (VO2_MAX > 0){$("#VO2_MAX").val(roundUp(VO2_MAX))}
  else {$("#VO2_MAX").val(0)} ;
}

function calStartDate(){
   var raceDate = new Date($('#RACE_DATE').val());
   var startDate = new Date($('#RACE_DATE').val());
   startDate.setDate(raceDate.getDate() - 98);
   var yyyy = startDate.getFullYear();
   var dd = startDate.getDate();
   var mm = startDate.getMonth()+1; //January is 0!
   if(dd<10){
       dd='0'+dd;
   }
   if(mm<10){
       mm='0'+mm;
   }
   var fStartDate = yyyy+'-'+mm+'-'+dd;

   var today = new Date();
   yyyy = today.getFullYear();
   dd = today.getDate();
   mm = today.getMonth()+1; //January is 0!
   if(dd<10){
       dd='0'+dd;
   }
   if(mm<10){
       mm='0'+mm;
   }
   var fToday = yyyy+'-'+mm+'-'+dd;

   if(fToday < fStartDate) {
     if(confirm("Do you confirm to start new traning program?"))
     {
      $('#START_WITH').val(fStartDate);
      $.ajax({
      type: 'POST',
      url: contextRoot+'/fitness_profile.php',
      data: {
          'mode': 'resetPlanAndLog',
          'userName':userName
      },
      success: function(msg) {
          if (msg == 1){
            alert("Log & Plan successfully reset!");
          }else{
            alert("Log & Plan failed reset!"+msg);
          }

      }
      });
      saveFitnessProfile();
     }
     else
     {
       $('#START_WITH').val(pStartWith);
       $('#RACE_DATE').val(pRaceDate);
     }
   }
   else
   {
     alert("The date you choose should be at least 14 weeks later");
     $('#START_WITH').val(pStartWith);
     $('#RACE_DATE').val(pRaceDate);
   };
}
