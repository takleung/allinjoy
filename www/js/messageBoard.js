function getMessageBoard(){
    $.ajax({
      type: 'POST',
      url: contextRoot+'/message_board.php',
      data: { 
          'userName':userName
       },
      success: function(msg) {
        var query = JSON.parse(msg);
        var htmlString = "";
        jQuery.each(query, function(i, result) {


            htmlString +='<div>'+result.LOG_DATE+'</div>';
            htmlString += '            <section id="no-more-tables">';
            htmlString +='                <table class="table-bordered table-striped table-condensed cf"> ';
            htmlString +='                  <thead class="cf"> ';
            htmlString +='                    <tr> ';
            // htmlString +='                      <th>Log Date</th> ';
            htmlString +='                      <th>'+langPack.message_table_name_2_table_name+'</th> ';
            htmlString +='                      <th>'+langPack.message_table_name_3_table_name+'</th> ';
            htmlString +='                    </tr> ';
            htmlString +='                  </thead> ';
            htmlString +='                  <tbody id = "messageBoardTable"> ';
            htmlString += "<tr>";
            // htmlString +='<td class="tdheight_d" data-title="Log Date" >'+result.LOG_DATE+'</td>';
            htmlString +='<td class="tdheight_ds" data-title="'+langPack.message_table_name_2_table_name+'" >'+result.MESSAGE_TITLE+'</td>';
            htmlString +='<td class="tdheight_ds" data-title="'+langPack.message_table_name_3_table_name+'" >'+result.MESSAGE_BODY+'</td>';
            htmlString +="</td>";

            htmlString +='                  </tbody>   ';
            htmlString +='                </table> ';
            htmlString+='            </section>';


          });
        
        $('#messageBoardPanel').html(htmlString);

      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }


    });

}