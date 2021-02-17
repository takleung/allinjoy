        function contentSwaper(destination){
            $('.content').css('padding-left', '20px');
            $('.content').css('padding-right', '20px');
            $("#fitnessProfileMainSave").hide();

            if (dualSnapper != undefined){
                dualSnapper.close();
            }
            $('body').scrollTop(0);
            console.log("Content Swaper :"+destination);
            currentDestination = destination;
            var page = "home.html";
            if (destination == "HOME"){
                page = "home.html";
                $('.content').load("template/"+page, function(data){
                    getHomePic();
                    getSponsor();
                    $('.content').css('padding-left', '0px');
                    $('.content').css('padding-right', '0px');

                    document.getElementById("copyRightId").innerHTML = langPack.menu_footer_copyright_setting;
                    document.getElementById("homeTopPicWords").innerHTML = langPack.home_scontent;

                });

            }else if (destination == "ENTER_LOG" ){
                page = "enter_log.html";
              $.get('template/enter_log.html', function(templateData){
                   var result =  $(".content").html(_.template(templateData,{langPack:langPack}));
                    $('#noRecordFindBanner').hide();
                    durationDropdown();
                    $("#selectEnterMode").change(function() {
                        if ($("#selectEnterMode").val() == "NORMAL"){
                            $('#noRecordFindBanner').hide();
                            $('#buttonFindLog').show();
                            $('#intervalPanel').show();
                            $('#lSDTempoPanel').show();
                            $("#buttonSubmitLog").hide();
                            $("#confirmLogTableMain").hide();
                            $("#buttonUploadLog").hide();
                            $("#buttonCancelLog").hide();
                            $('#intervalPanel').hide();
                            $('#lSDTempoPanel').hide();
                        }else if ($("#selectEnterMode").val() == "LSDTEMPO"){
                            $('#noRecordFindBanner').hide();
                            $('#buttonFindLog').hide();
                            $("#enterLogPanel").hide();
                            $("#buttonSubmitLog").hide();
                            $("#confirmLogTableMain").hide();
                            $("#buttonUploadLog").hide();
                            $("#buttonCancelLog").hide();
                            $('#intervalPanel').hide();
                            $('#lSDTempoPanel').show();
                        }
                        else{
                            $('#noRecordFindBanner').hide();
                            $('#buttonFindLog').hide();
                            $("#enterLogPanel").hide();
                            $("#buttonSubmitLog").hide();
                            $("#confirmLogTableMain").hide();
                            $("#buttonUploadLog").hide();
                            $("#buttonCancelLog").hide();
                            $('#lSDTempoPanel').hide();
                            $('#intervalPanel').show();
                        }
                    });

/* from Tim
            }else if (destination == "ENTER_LOG" ){
                page = "enter_log.html";
                $('.content').load("template/"+page, function(data){
                    $('#noRecordFindBanner').hide();

                    $("#selectEnterMode").change(function() {
                        if ($("#selectEnterMode").val() == "NORMAL"){
                            $('#noRecordFindBanner').hide();
                            $('#buttonFindLog').show();
                            $('#intervalPanel').show();
                            $("#buttonSubmitLog").hide();
                            $("#confirmLogTableMain").hide();
                            $("#buttonUploadLog").hide();
                            $("#buttonCancelLog").hide();
                            $('#intervalPanel').hide();

                        }else {
                            $('#noRecordFindBanner').hide();
                            $('#buttonFindLog').hide();
                            $("#enterLogPanel").hide();
                            $("#buttonSubmitLog").hide();
                            $("#confirmLogTableMain").hide();
                            $("#buttonUploadLog").hide();
                            $("#buttonCancelLog").hide();
                            $('#intervalPanel').show();

                        }
                    });
end of from Tim*/





                    var currentTime = new Date();

                    // $("#selectYearField").val(currentTime.getFullYear());
                    var month = currentTime.getMonth() + 1;
                    var zero = "";
                    if (month.length != 2){
                        month = "0"+month;
                    }


                    var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth()+1; //January is 0!

                    var yyyy = today.getFullYear();
                    if(dd<10){dd='0'+dd}
                    if(mm<10){mm='0'+mm}
                    var todayString = yyyy+"-"+mm+"-"+dd;

                    $("#selectionWeekField").val(month);
                    $("#selectionDayField").val(todayString);
                    $('#selectionDayField').attr('value', todayString);

                    // renderDay("INIT");

                    // $("#selectionDayField").val(currentTime.getDate());
                    // $( "#selectionWeekField" ).change(function() {
                    //     renderDay("NORMAL");
                    // });

                    // $( "#selectYearField" ).change(function() {
                    //     renderDay("NORMAL");
                    // });


                    cancelUpload();
                    $('#enterLogPanel').hide();
                    $("#buttonSubmitLog").hide();

                    getWorkout();


                });
                // getWorkout();

            }else if (destination == "VIEW_LOG"){
              $.get('template/view_log.html', function(templateData){
                   var result =  $(".content").html(_.template(templateData,{langPack:langPack}));
                   // changed, view running profile on view log
                   getRunningProfile();
                   viewWorkout();
                });
            }else if (destination == "TRANNING_PLAN"){
              $.get('template/tranning_plan.html', function(templateData){
                   var result =  $(".content").html(_.template(templateData,{langPack:langPack}));
                    getTranningPlan();

                });

            }else if (destination == "FITNESS_PROFILE"){

              $.get('template/fitness_profile.html', function(templateData){
               var result =  $(".content").html(_.template(templateData,{langPack:langPack}));
               durationDropdown();
               getFitnessProfile();
               $("#fitnessProfileMainSave").show();

              });


                // $('.content').load("template/fitness_profile.html", function(data){
                //     getFitnessProfile();
                //     $("#fitnessProfileMainSave").show();


                // });
/*
            }else if (destination == "RUNNING_PROFILE"){
              $.get('template/running_profile.html', function(templateData){
                   var result =  $(".content").html(_.template(templateData,{langPack:langPack}));
                    getRunningProfile();

                });
*/
            }else if (destination == "TIPS"){
              $.get('template/tips.html', function(templateData){
                   var result =  $(".content").html(_.template(templateData,{langPack:langPack}));
                    getTips();

                });
            }else if (destination == "MESSAGE_BOARD"){
              $.get('template/message_board.html', function(templateData){
                   var result =  $(".content").html(_.template(templateData,{langPack:langPack}));
                    getMessageBoard();

                });
            }else if (destination == "USER_PROFILE"){
                page = "user_profile.html";
                $('.content').load("template/"+page, function(data){


                });
            }else if (destination == "NEW_LISTING"){
              $.get('template/new_listing.html', function(templateData){
                   var result =  $(".content").html(_.template(templateData,{langPack:langPack}));
                    getNewListing();

                });
            }else if (destination == "ABOUT_US"){
              $.get('template/about_us.html', function(templateData){
                   var result =  $(".content").html(_.template(templateData,{langPack:langPack}));

                });
            }else if (destination == "VIEW_LOG2"){
              $.get('template/view_log2.html', function(templateData){
                   var result =  $(".content").html(_.template(templateData,{langPack:langPack}));
                });
            }else if (destination == "QUESTIONAIRE"){
              $.get('template/questionaire.html', function(templateData){
                   var result =  $(".content").html(_.template(templateData,{langPack:langPack}));
                   $('#OTHER').hide();
                   $('#Q02A').hide();
                   $('#Q06A').hide();
                });
            }



        }
