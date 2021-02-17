      var callback = function (msg) {
        // wrapping in a timeout because of a possbile native UI element blocking the webview
        setTimeout(function () {
          alert(JSON.stringify(msg))
        }, 0);
      };


        function getWorkout(){
            $('#noRecordFindBanner').hide();
            cancelUpload();
            $('#buttonSubmitLog').hide();

            var options = {};
            // options.startDate = "2016-04-19";
            // options.endDate = "2016-04-19";

            // options.startDate = $("#selectYearField").val()+"-"+$("#selectionWeekField").val()+"-"+$("#selectionDayField").val();
            // options.endDate = $("#selectYearField").val()+"-"+$("#selectionWeekField").val()+"-"+$("#selectionDayField").val();

            // alert($("#selectionDayField").val());

            options.startDate = $("#selectionDayField").val();
            options.endDate = $("#selectionDayField").val();


            if (device.platform.toUpperCase() == "ANDROID"){
                    navigator.googlefit.query(options,function(query) {
                        resultSet = query;

                        dataMassageInAndroid(resultSet);
                    }, function(error) {
                        console.warn('Query failed:', error);
                    });

                // navigator.googlefit.query(options,function(query) {
                //     resultSet = query;
                //     dataMassageInAndroid(resultSet);
                // });


            }else {
                window.plugins.healthkit.findWorkouts({},
                    function(query){
                        // alert("Workouts Result :"+query);
                        // alert(JSON.stringify(query));
                        // document.getElementById("p1").innerHTML = "Workouts:"+JSON.stringify(query);
                        // $('#dateResult').html(JSON.stringify(query));

                        // var jsonString = '[{"endDate":"2016-04-19T13:54:02+08:00","startDate":"2016-04-19T13:45:05+08:00","miles":"10","sourceBundleId":"RunKeeperPro","calories":"184.518KJ","duration":"536.999999999999","activeType":"HKWorkoutActivityTypeRunning","sourceName":"RunKeeper","UUID":"C9A3F0C3-6619-4863-B4B6-3427EE075B6A"},{"endDate":"2016-04-18T13:54:02+08:00","startDate":"2016-04-18T13:45:05+08:00","miles":"10","sourceBundleId":"RunKeeperPro","calories":"184.518KJ","duration":"536.999999999999","activeType":"HKWorkoutActivityTypeRunning","sourceName":"RunKeeper","UUID":"C8A3F0C3-6619-4863-B4B6-3427EE075B6A"}]';
                        // resultSet = JSON.parse(jsonString);
                        // dataMassageInIos(resultSet);

                        // var jsonString = '[{"UUID":"46b953a7-ed69-4f21-9a45-9a043e5be2f2","startDate":"2016.05.07 00:00:00","distance":"null","duration":"40231385","endDate":"2016.05.07 23:59:59","activity":"4"},{"UUID":"76222212-cdaf-49a5-9b2c-6b2635023820","startDate":"2016.05.07 08:32:57","distance":"null","duration":"27099513","endDate":"2016.05.07 22:22:51","activity":"3"},{"UUID":"6f4dbd2c-0e20-4f11-a571-25ceb98851a0","startDate":"2016.05.07 10:12:32","distance":"null","duration":"3202258","endDate":"2016.05.07 22:10:51","activity":"0"},{"UUID":"38d6887c-146e-405e-9d46-84b211868cef","startDate":"2016.05.07 10:36:36","distance":"290.0","duration":"9019844","endDate":"2016.05.07 22:24:54","activity":"7"},{"UUID":"ab3243af-2309-4287-94ee-ce401160ba0e","startDate":"2016.05.07 15:31:55","distance":"3478.3","duration":"6846000","endDate":"2016.05.07 17:26:01","activity":"8"}]';
                        // var query = JSON.parse(jsonString);
                        // resultSet = query;
                        // dataMassageInAndroid(resultSet);


                        resultSet = [];

                        jQuery.each(query, function(i, result) {
                            console.log(options.startDate);
                            console.log(result.startDate);
                            console.log(result.startDate.indexOf(options.startDate));
                            console.log(result.distance);
                            if (result.startDate.indexOf(options.startDate) > -1){
                                resultSet.push(result);
                            }
                        });

                        dataMassageInIos(resultSet);
                    }, function(error){
                        alert(error);
                        console.warn('Query failed:', error);
                    }
                );

            }

        }

        function dataMassageInIos(query){
            $('#enterLogTable').empty();
            var htmlString = "";


            if (query.length != 0){
                jQuery.each(query, function(i, result) {
                    // alert(result
                    htmlString += "<tr id = \""+result.UUID+"\" onclick = 'onDataSelection(\""+result.UUID+"\")'>";
                    htmlString += '<td class="tdheight_d" data-title="'+langPack.menu_table_name_enter_log_0_table_name+'">'+dateFormatter(result.startDate)+'</td>';
                    htmlString += '<td class="tdheight_d" data-title="'+langPack.menu_table_name_enter_log_1_table_name+'" class="numeric">'+dateFormatter(result.endDate)+'</td>';
                    htmlString += '<td class="tdheight_d" data-title="'+langPack.enter_log_table_name_4_table_name +'" class="numeric">'+result.duration.toString().toDurationHHMMSS()+'</td>';
                    htmlString += '<td class="tdheight_d" data-title="'+langPack.enter_log_table_name_3_table_name +'" class="numeric">'+(roundUp(result.miles * 1.6))+'</td>';
                    htmlString += '<td class="tdheight_d"><a href="#" class="unchoosebtn"><i class="fa fa-check-circle-o"></i>'+langPack.menu_table_name_enter_log_3_table_name+'</a></td>';
                    htmlString += "</tr>";

                });

                $('#enterLogTable').html(htmlString);
                $('#enterLogPanel').show();
                $('#buttonSubmitLog').show();
                $('#intervalPanel').hide();
                $('#lSDTempoPanel').hide();

            }else{
                // alert("No record found!");
                $('#noRecordFindBanner').show();
            }

        }

        function dataMassageInAndroid(query){
            $('#enterLogTable').empty();
            var htmlString = "";

            if (query.length != 0){
                jQuery.each(query, function(i, result) {
                    if (result.activity == "8"){
                        htmlString += "<tr id = \""+result.UUID+"\" onclick = 'onDataSelection(\""+result.UUID+"\")'>";
                        htmlString += '<td class="tdheight_d" data-title="'+langPack.menu_table_name_enter_log_0_table_name+'">'+dateFormatter(result.startDate)+'</td>';
                        htmlString += '<td class="tdheight_d" data-title="'+langPack.menu_table_name_enter_log_1_table_name+'" class="numeric">'+dateFormatter(result.endDate)+'</td>';
                        var duration = (parseInt(result.duration) / 1000).toString();
                        htmlString += '<td class="tdheight_d" data-title="'+ langPack.enter_log_table_name_4_table_name +'" class="numeric">'+duration.toDurationHHMMSS()+'</td>';
                        htmlString += '<td class="tdheight_d" data-title="'+ langPack.enter_log_table_name_3_table_name +'" class="numeric">'+roundUp(result.distance / 1000)+'</td>';
                        htmlString += '<td class="tdheight_d"><a href="#" class="unchoosebtn"><i class="fa fa-check-circle-o"></i>'+langPack.menu_table_name_enter_log_3_table_name+'</a></td>';
                        htmlString += "</tr>";
                    }
                });

                $('#enterLogTable').html(htmlString);
                $('#enterLogPanel').show();
                $('#buttonSubmitLog').show();
                $('#intervalPanel').hide();
                $('#lSDTempoPanel').hide();
            }else{
                // alert("No record found!");
                $('#noRecordFindBanner').show();
            }


        }

        function onDataSelection(id){
            var found = $.inArray(id, selectedId) > -1;
            if (!found){
                $('#'+id+' > td ').addClass("nuc");
                selectedId.push(id);

            }else {
                $('#'+id+' > td ').removeClass("nuc");
                var index = selectedId.indexOf(id);    // <-- Not supported in <IE9
                if (index != -1) {
                    selectedId.splice(index, 1);
                }
            }

        }

        function logCheck(logMileage, logPace, runningType, callback){
            var message = "NULL";
              var requestData = {
              'userName': userName,
              'logMileage' : logMileage,
              'logPace' : logPace,
              'runningType' : runningType
              };

                $.ajax({
                  type: 'GET',
                  url: contextRoot+'/logCheck.php',
                  data: requestData,
                  success: function(msg) {
                    // alert(msg);
                    var result = JSON.parse(msg);
                    if (result.messageId != 0){
                        message = result.messageBody;
                        // alert(message);

                    }

                    callback(message);

                  }
                });

        }

        function submitWorkout(){
            if (selectedId.length < 0){
                alert("You need to select atleast one record!");
            }else {
                  finalResult.miles = 0;
                  finalResult.distance = 0;
                  finalResult.duration = 0;
                    for (var i = 0; i < selectedId.length; i++) {
                            jQuery.each(resultSet, function(v, result) {
                                if (result.UUID == selectedId[i]){

                                    if (device.platform.toUpperCase() == "ANDROID"){
                                        finalResult.distance = parseFloat(finalResult.distance) + parseFloat(result.distance);

                                    }else {
                                        finalResult.miles = parseFloat(finalResult.miles) + parseFloat(result.miles);

                                    }

                                    finalResult.duration = parseInt(finalResult.duration) + parseInt(result.duration);
                                }
                            });
                        }




                    var page = 0;
                    var mileage = 0;
                    if (device.platform.toUpperCase() == "ANDROID"){
                        var duration = finalResult.duration / 1000;
                        duration = roundUp(duration);

                        $('#totalDuration').html(duration.toString().toDurationHHMMSS());

                        $('#totalMileage').html(roundUp(finalResult.distance / 1000));
                        pace = (finalResult.duration / 1000 / 60) / roundUp(finalResult.distance / 1000) ;
                        pace =  roundUp(pace);
                        mileage = roundUp(finalResult.distance / 1000);

                        $('#totalPace').html(pace);
                    }else{
                        // var duration = finalResult.duration / 60;
                        // duration = roundUp(duration);
                        $('#totalDuration').html(finalResult.duration.toString().toDurationHHMMSS());
                        $('#totalMileage').html(roundUp(finalResult.miles * 1.6));
                        pace = (finalResult.duration / 60 ) / (finalResult.miles* 1.6);
                        pace =  roundUp(pace);

                        mileage = finalResult.miles * 1.6;
                        $('#totalPace').html(pace);

                    }




                    logCheck(mileage, pace, "TEMPO", function (message){
                        if (message != "NULL"){
                            alert(message);
                        }else{
                             $("#enterLogPanel").hide();
                             $("#buttonSubmitLog").hide();
                             $("#confirmLogTableMain").show();
                             $("#buttonUploadLog").show();
                             $("#buttonCancelLog").show();

                        }

                    });
                }

            }


        function uploadWorkout(){
            var queryString = JSON.stringify(finalResult);

                $.ajax({
                    type: 'POST',
                    url: contextRoot+'enter_log.php',
                    data: { 'workoutResult': queryString,
                            'mode': device.platform.toUpperCase(),
                            // 'week':$("#selectionWeekField").val(),
                            'day':$("#selectionDayField").val(),
                      'userName': userName,
                      'logMode':'NORMAL'},
                    success: function(msg) {
                        if (msg == 1){
                            alert("Submit Success!");
                            cancelUpload();
                        }else {
                            alert("Submit Fail!");

                        }

                    },
                      error: function (xhr, ajaxOptions, thrownError) {
                        alert(xhr.status);
                        alert(thrownError);
                      }
                });

        }

        function addNewInterval(){
            var mileage = $("#intervalMileage").val();
            var pace = parseInt($("#intervalPace_HH").val()) * 3600 + parseInt($("#intervalPace_MM").val()) * 60 + parseInt($("#intervalPace_SS").val());
            var rest = parseInt($("#intervalRest_HH").val()) * 3600 + parseInt($("#intervalRest_MM").val()) * 60 + parseInt($("#intervalRest_SS").val());

            var paceInMin = parseInt(pace) / 60;
            var mileagePace = (paceInMin / mileage);

            var uuid = generateUUID();
            var htmlString = "<tr id = '"+uuid+"' >";
                htmlString+= '<td class="tdheight_d" data-title="'+ langPack.enter_log_table_name_7_table_name +'">'+roundUp(mileage)+'</td>';
                htmlString+= '<td class="tdheight_d" data-title="'+ langPack.enter_log_table_name_5_table_name +'" class="numeric">'+pace.toString().toDurationHHMMSS()+'</td>';
                htmlString+= '<td class="tdheight_d" data-title="'+ langPack.enter_log_table_name_9_table_name +'" class="numeric">'+rest.toString().toDurationHHMMSS()+'</td>';
                htmlString+= '<td class="tdheight_d" data-title="" class="numeric"><button onclick = "deleteInterval(\''+uuid+'\')">Delete</button></td>';
                htmlString+= '</tr>';

            var interval = {};
            interval.UUID = uuid;
            interval.mileage = mileage;

            var pace = $("#intervalPace_HH").val() + ":" + $("#intervalPace_MM").val() + ":" + $("#intervalPace_SS").val();
            var rest = $("#intervalRest_HH").val() + ":" + $("#intervalRest_MM").val() + ":" + $("#intervalRest_SS").val();

            interval.pace = pace;
            interval.rest = rest;

            intervalResult.push(interval);


            var queryString = JSON.stringify(intervalResult);

            logCheck(mileage, mileagePace, "INTERVAL", function (message){
                if (message != "NULL"){
                    alert(message);
                }else{
                    $('#intervalTable').append(htmlString);
                    $("#intervalMileage").val(0);
                    $("#intervalPaceMin").val(0);
                    $("#intervalPaceSec").val(0);
                    $("#intervalRestMin").val(0);
                    $("#intervalRestSec").val(0);

                }

            });

        }

        function deleteInterval(id){
            $('#'+id).empty();
            $('#'+id).remove();

            for (var i = 0; i < intervalResult.length; i ++){
                if (intervalResult[i].UUID == id){
                    intervalResult.splice(i, 1);
                }
            }
            var queryString = JSON.stringify(intervalResult);
            // alert(queryString);

        }

        function submitLSDTempo(){
        	var finalResult = {};
            finalResult.distance = $("#lSDTempoMileage").val();
            // all table should be stored in seconds
            // finalResult.duration = parseFloat($("#lSDTempoDurationHr").val()) * 3600 + parseFloat($("#lSDTempoDurationMin").val()) * 60;
            finalResult.duration = parseFloat($("#lSDTempoDuration_HH").val()) * 3600 + parseFloat($("#lSDTempoDuration_MM").val()) * 60  + parseFloat($("#lSDTempoDuration_SS").val());

			var mileage = finalResult.distance;
			var pace = finalResult.duration/60/mileage;

			logCheck(mileage, pace, "TEMPO", function (message){
				if (message != "NULL"){
					alert(message);
				}else{

				var queryString = JSON.stringify(finalResult);
					$.ajax({
						type: 'POST',
						url: contextRoot+'enter_log.php',
						data: { 'workoutResult': queryString,
								'mode': "NORMAL",
								//'week':$("#selectionWeekField").val(),
								'day':$("#selectionDayField").val(),
						  'userName': userName,
						  'logMode':'LSDTEMPO'},
						success: function(msg) {
							if (msg == 1){
								alert("Submit Success!");
								cancelUpload();
							}else {
								alert("Submit Fail!");

							}

						},
						  error: function (xhr, ajaxOptions, thrownError) {
							alert(xhr.status);
							alert(thrownError);
						  }
					});

				}

			});

        }

        function submitInterval(){
            for (var i = 0; i < intervalResult.length; i ++){
                    intervalResult[i].round = (i+1);
            }

            var queryString = JSON.stringify(intervalResult);
            // alert(queryString);

            $.ajax({
                type: 'POST',
                url: contextRoot+'/enter_log.php',
                data: { 'workoutResult': queryString,
                        'mode': device.platform.toUpperCase(),
                        // 'week':$("#selectionWeekField").val(),
                        'day':$("#selectionDayField").val(),
                  'userName':userName,
                  'logMode':'INTERVAL'},
                success: function(msg) {
                    if (msg == 1){
                        alert("Submit Success!");
                        // cancelUpload();
                        intervalResult = [];
                        $('#intervalTable').empty();


                    }else {
                        alert("Submit Fail!");

                    }

                },
                  error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                  }
            });

        }

        function cancelUpload(){
             if ($("#selectEnterMode").val() == "NORMAL"){
                 $("#enterLogPanel").show();
                $('#intervalPanel').hide();
                $('#lSDTempoPanel').hide();

             }else if ($("#selectEnterMode").val() == "LSDTEMPO"){
                $('#lSDTempoPanel').show();
                $('#intervalPanel').hide();
                $("#enterLogPanel").hide();

             }else{
                $('#intervalPanel').show();
                $('#lSDTempoPanel').hide();
                $("#enterLogPanel").hide();

             }
             $("#buttonSubmitLog").hide();
             $("#confirmLogTableMain").hide();
             $("#buttonUploadLog").hide();
             $("#buttonCancelLog").hide();

             if (selectedId.length > 0 || intervalResult.length > 0){
                $("#buttonSubmitLog").show();

             }


        }

/* from Tim
        function cancelUpload(){
             if ($("#selectEnterMode").val() == "NORMAL"){
                 $("#enterLogPanel").show();
                $('#intervalPanel').hide();
             }else{
                $('#intervalPanel').show();
                $("#enterLogPanel").hode();

             }
             $("#buttonSubmitLog").show();
             $("#confirmLogTableMain").hide();
             $("#buttonUploadLog").hide();
             $("#buttonCancelLog").hide();

        }

*/

		function checkInvalidDate(){
			var today, someday;
			today = new Date();
			selectionDay = new Date();
			selectionDay.setFullYear(new Date($("#selectionDayField").val()).getFullYear(),new Date($("#selectionDayField").val()).getMonth(),new Date($("#selectionDayField").val()).getDate());

			if (selectionDay > today) {
				alert("cannot future date");

				var today = new Date();
			    var dd = today.getDate();
			    var mm = today.getMonth()+1; //January is 0!

			    var yyyy = today.getFullYear();
			    if(dd<10){
			        dd='0'+dd
			    }
			    if(mm<10){
			        mm='0'+mm
			    }
			    var today = yyyy+'-'+mm+'-'+dd;
				$("#selectionDayField").val(today);
			}
		}
