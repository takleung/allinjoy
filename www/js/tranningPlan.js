var questionaireResult;

function getTranningPlan(){
    $.ajax({
      type: 'POST',
      url: contextRoot+'/tranning_plan.php',
      data: {
          'userName':userName
       },
      success: function(msg) {
        var query = JSON.parse(msg);
        var htmlString = "";
        jQuery.each(query, function(i, result) {
                htmlString +='            <div>'+langPack.fitness_profile_table_name_0_table_name+' : '+result.week+', '+result.weekDate+'</div> ';
                htmlString +='            <section id="no-more-tables"> ';
                htmlString +='              <table class="table-bordered table-striped table-condensed cf" id="intervalTableMain"> ';
                htmlString +='                <thead class="cf"> ';
                htmlString +='                  <tr> ';
                htmlString +='                    <th class="numeric"></th> ';
                htmlString +='                    <th class="numeric"></th> ';
                htmlString +='                    <th class="numeric"></th> ';
                htmlString +='                    <th class="numeric"></th></tr> ';
                htmlString +='                </thead> ';
                htmlString +='                <tbody id="intervalTable"> ';
                htmlString +='                  <tr> ';
                htmlString +='                  <td class="tdheight_d" data-title="'+langPack.fitness_profile_table_name_1_table_name+'">'+roundUp(result.totalMileage)+'</td> ';
                htmlString +='                  </tr> ';
                htmlString +='                  <tr> ';
                htmlString +='                  <td class="tdheight_d tdh" data-title="'+langPack.fitness_profile_table_name_7_table_name+result.lsdDay+' '+result.lsdDate+'"></td> ';
                htmlString +='                  <td class="tdheight_d" data-title="'+langPack.fitness_profile_table_name_2_table_name+'"><i class="fa fa-tag lsdd" aria-hidden="true"></i>'+roundUp(result.lsdMileage)+'</td> ';
                htmlString +='                  <td class="tdheight_d" data-title="'+langPack.fitness_profile_table_name_3_table_name+'"><i class="fa fa-tag lsdd" aria-hidden="true"></i>'+roundUp(result.lsdPace)+'</td> ';
                htmlString +='                  </tr> ';
                htmlString +='                  <tr> ';
                htmlString +='                  <td class="tdheight_d tdh" data-title="'+langPack.fitness_profile_table_name_7_table_name+result.tempoDay+' '+result.tempoDate+'"></td> ';
                htmlString +='                  <td class="tdheight_d" data-title="'+langPack.fitness_profile_table_name_2_table_name+'"><i class="fa fa-tag temd" aria-hidden="true"></i>'+roundUp(result.tempoMileage)+'</td> ';
                htmlString +='                  <td class="tdheight_d" data-title="'+langPack.fitness_profile_table_name_3_table_name+'"><i class="fa fa-tag temd" aria-hidden="true"></i>'+roundUp(result.tempoPace)+'</td> ';
                htmlString +='                  </tr> ';
                if (result.mode == "THREE"){
                  htmlString +='                  <tr> ';
                  htmlString +='                  <td class="tdheight_d tdh" data-title="'+langPack.fitness_profile_table_name_7_table_name+result.intervalDay+' '+result.intervalDate+'"></td> ';
                  htmlString +='                  <td class="tdheight_d" data-title="'+langPack.fitness_profile_table_name_2_table_name+'"><i class="fa fa-tag intd" aria-hidden="true"></i>'+roundUp(result.intervalMileage)+'</td> ';
                  htmlString +='                  <td class="tdheight_d" data-title="'+langPack.fitness_profile_table_name_3_table_name+'"><i class="fa fa-tag intd" aria-hidden="true"></i>'+roundUp(result.intervalPace)+'</td> ';
                  htmlString +='                  <td class="tdheight_d" data-title="'+langPack.fitness_profile_table_name_4_table_name+'"><i class="fa fa-tag intd" aria-hidden="true"></i>'+roundUp(result.interval1Km)+'</td> ';
                  htmlString +='                  <td class="tdheight_d" data-title="'+langPack.fitness_profile_table_name_5_table_name+'"><i class="fa fa-tag intd" aria-hidden="true"></i>'+roundUp(result.intervalRest)+'</td> ';
                  htmlString +='                  <td class="tdheight_d" data-title="'+langPack.fitness_profile_table_name_6_table_name+'"><i class="fa fa-tag intd" aria-hidden="true"></i>'+roundUp(result.intervalRepeat)+'</td> ';
                  htmlString +='                  </tr> ';
                }

                htmlString +='                </tbody> ';
                htmlString +='                </table> ';
                htmlString +='            </section> ';


          });

        $('#tranningPlanAccordion').html(htmlString, function(data){
        });

        // $( "#tranningPlanAccordion" ).accordion();


      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }


    });

}

function updateTrainingPlan(){
      $.ajax({
      type: 'POST',
      url: contextRoot+'/planParameters.php',
      data: {
          'userName':userName
      },
      success: function(msg) {
            alert("Update training plan successfully!");
            contentSwaper("TRANNING_PLAN");
      }
    });
}
