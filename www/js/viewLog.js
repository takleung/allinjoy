function viewWorkout(){
  var htmlString = '';
    $.ajax({
      type: 'POST',
      url: contextRoot+'/view_log.php',
      data: {
          'userName': userName,
          'logMode':'NORMAL'
        },
      success: function(msg) {
        var result = JSON.parse(msg);

        jQuery.each(result, function(i, query) {
          if (query.TYPE != "INTERVAL"){

            var pace = (query.DURATION / 60) / query.MILEAGE  ;
            pace =  roundUp(pace);

            htmlString += '           <div style="clear: both;">'+langPack.view_log_table_name_0_table_name+' :'+query.WEEK+' Day:'+query.DAY+'</div>';
            htmlString += '            <section id="no-more-tables">';
            htmlString += '              <table class="table-bordered table-striped table-condensed cf" id = "normalLogTableMain">';
            htmlString += '                <thead class="cf">';
            htmlString += '                  <tr>';
            htmlString += '                    <th>Duration</th>';
            htmlString += '                    <th class="numeric">'+langPack.view_log_table_name_2_table_name+'</th>';
            htmlString += '                    <th class="numeric">'+langPack.view_log_table_name_3_table_name+'</th>';
            htmlString += '                  </tr>';
            htmlString += '                </thead>';
            htmlString += '                <tbody id = "normalLogTable">';
            htmlString += '                  <td class="tdheight_d" data-title="'+langPack.menu_table_name_view_log_2_table_name+'" id ="totalDuration">'+query.DURATION.toDurationHHMMSS()+'</td>';
            htmlString += '                  <td class="tdheight_d" data-title="'+langPack.view_log_table_name_2_table_name+'" class="numeric" id = "totalMileage">'+query.MILEAGE+'</td>';
            htmlString += '                  <td class="tdheight_d" data-title="'+langPack.view_log_table_name_3_table_name+'" class="numeric" id = "totalPace">'+pace+'</td>';
            htmlString += '                </tbody>  ';
            htmlString += '              </table>';
            htmlString += '            </section>';

          }else {

            htmlString+= '           <div style="clear: both;">Interval Week :'+query.WEEK+' Day:'+query.DAY+'</div>';
            htmlString+='            <section id="no-more-tables">';
            htmlString+='              <table class="table-bordered table-striped table-condensed cf" id = "intervalTableMain">';
            htmlString+='                <thead class="cf">';
            htmlString+='                  <tr>';
            htmlString+='                    <th class="numeric">'+langPack.menu_table_name_view_log_0_table_name+'</th>';
            htmlString+='                    <th class="numeric">'+langPack.view_log_table_name_2_table_name+'</th>';
            htmlString+='                    <th class="numeric">'+langPack.view_log_table_name_3_table_name+'</th>';
            htmlString+='                    <th class="numeric">'+langPack.menu_table_name_view_log_1_table_name+'</th>';
            htmlString+='                  </tr>';
            htmlString+='                </thead>';
            htmlString+='                <tbody id = "intervalTable">';


            var intervalQuery = JSON.parse(query.INTERVAL);
            jQuery.each(intervalQuery, function(i, intervalResult) {
              htmlString+= '<tr>';
              htmlString+= '<td class="tdheight_d" data-title="'+langPack.menu_table_name_view_log_0_table_name+'">'+intervalResult.ROUND+'</td>';
              htmlString+= '<td class="tdheight_d" data-title="'+langPack.view_log_table_name_2_table_name+'">'+intervalResult.MILEAGE+'</td>';
              htmlString+= '<td class="tdheight_d" data-title="'+langPack.view_log_table_name_12_table_name+'">'+intervalResult.PACE.toDurationHHMMSS()+'</td>';
              htmlString+= '<td class="tdheight_d" data-title="'+langPack.menu_table_name_view_log_1_table_name+'">'+intervalResult.REST.toDurationHHMMSS()+'</td>';
              htmlString+='</tr>';

            });

            htmlString+='                </tbody>';
            htmlString+='              </table>';
            htmlString+='            </section>'


        }

      });
      $('#mainLogTable').html(htmlString);



    }
    });
}
