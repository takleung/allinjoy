        function roundUp(number){
            return Math.round(number * 100) / 100;
        }



         function fun_AllowOnlyAmountAndDot(txt)
            {
            if(event.keyCode > 47 && event.keyCode < 58 || event.keyCode == 46)
            {
               var txtbx=document.getElementById(txt);
               var amount = document.getElementById(txt).value;
               var present=0;
               var count=0;

               if(amount.indexOf(".",present)||amount.indexOf(".",present+1));
               {
              // alert('0');
               }

              /*if(amount.length==2)
              {
                if(event.keyCode != 46)
                return false;
              }*/
               do
               {
               present=amount.indexOf(".",present);
               if(present!=-1)
                {
                 count++;
                 present++;
                 }
               }
               while(present!=-1);
               if(present==-1 && amount.length==0 && event.keyCode == 46)
               {
                    event.keyCode=0;
                    //alert("Wrong position of decimal point not  allowed !!");
                    return false;
               }

               if(count>=1 && event.keyCode == 46)
               {

                    event.keyCode=0;
                    //alert("Only one decimal point is allowed !!");
                    return false;
               }
               if(count==1)
               {
                var lastdigits=amount.substring(amount.indexOf(".")+1,amount.length);
                if(lastdigits.length>=2)
                            {
                              //alert("Two decimal places only allowed");
                              event.keyCode=0;
                              return false;
                              }
               }
                    return true;
            }
            else
            {
                    event.keyCode=0;
                    //alert("Only Numbers with dot allowed !!");
                    return false;
            }

        }

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}


        function renderDay(mode){
            // alert(mode);
            var currentTime = new Date()

            var days = Math.round(((new Date($("#selectYearField").val(), $("#selectionWeekField").val()))-(new Date($("#selectYearField").val(), $("#selectionWeekField").val() -1)))/86400000);
            var dayHtmlString = "";

            for (var i = 1; i <= days; i ++){
                var zero = "";
                if (i < 10){
                    zero = "0";
                }

                dayHtmlString +="<option value='"+zero+i+"'>"+i+"</option>";
            }

            if (mode == "INIT"){
                $('#selectionDayField').html(dayHtmlString, function(data){

                  $("#selectionDayField").val(currentTime.getDate());

                });
            }else {
                $('#selectionDayField').html(dayHtmlString);
            }

        }

        function dateFormatter(dateString){
            dateString = dateString.replace(".","-").replace(".","-").replace(" ","T");
            if (dateString.indexOf("+08:00") == -1){
              dateString = dateString + "+08:00";
            }

            var date = new Date(dateString);
            var result = date.getFullYear() +"-"+ (date.getMonth() + 1) +"-"+ date.getDate() +" "+date.getHours() +":"+date.getMinutes()+":"+date.getSeconds();
            return result;
        }

        String.prototype.toDurationHHMMSS = function () {
            var sec_num = parseInt(this, 10); // don't forget the second param
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            var time    = hours+':'+minutes+':'+seconds;
            return time;
        }

        function checkStringEmpty(s){
          if (s.length ==0){
            return "-";
          }else {
            return s;
          }
        }

        function durationDropdown(){
          var select = '';
          for (i=0;i<=5;i++){
            select += '<option val=' + i + '>' + i + '</option>';
          }
          $("select").each(function() {
            if($(this).attr('id').indexOf("_HH") >= 0) {$(this).html(select);};
          });
          select = '';
          for (i=0;i<=59;i++){
            select += '<option val=' + i + '>' + i + '</option>';
          }
          $("select").each(function() {
            if($(this).attr('id').indexOf("_MM") >= 0) {$(this).html(select);};
          });
          select = '';
          for (i=0;i<=59;i++){
            select += '<option val=' + i + '>' + i + '</option>';
          }
          $("select").each(function() {
            if($(this).attr('id').indexOf("_SS") >= 0) {$(this).html(select);};
          });
        }
