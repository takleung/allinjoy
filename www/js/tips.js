function getTips(){
    $.ajax({
      type: 'POST',
      url: contextRoot+'/tips.php',
      data: {
       },
      success: function(msg) {
        var query = JSON.parse(msg);
        var htmlString = "";
        jQuery.each(query, function(i, result) {
            // htmlString += '<a href="https://www.youtube.com/watch?v="'+result.meta_value+' target="_blank">';
            // htmlString += '<img class="responsive-image" src="https://i.ytimg.com/vi/'+result.meta_value+'/hqdefault.jpg" alt="">';
            // htmlString += '<p class="center-text mt5 mb20">';

            //   if (lang == 'CHI'){
            //       htmlString += result.chiHeader;
            //   }else {
            //       htmlString += result.engHeader;
            //   }


            // htmlString += '</p>';
            // htmlString += '</a>';


                    // <object width="100%" height="250px" data="http://www.youtube.com/embed/XGSy3_Czz8k"></object>
                    // <p class="center-text mb20">
                    //     正確跑姿要點_t
                    // </p>

              htmlString += '<object width="100%" height="250px" data="http://www.youtube.com/embed/'+result.meta_value+'"></object>';
              htmlString +='<p class="center-text mb20">'
              if (lang == 'CHI'){
                  htmlString += result.chiHeader;
              }else {
                  htmlString += result.engHeader;
              }

              htmlString +='</p>';



          });

        $('#tipArea').html(htmlString);

      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }


    });

}



function getNewListing(){
    $.ajax({
      type: 'POST',
      url: contextRoot+'/news.php',
      data: {
       },
      success: function(msg) {
        var query = JSON.parse(msg);
        var htmlString = "";
        var detailHtmlString = "";
        jQuery.each(query, function(i, result) {
            htmlString +='                     <div class="news-column" onclick = "switchToNewsDetails('+result.ID+')"> ';
            htmlString +='                        <a ><img src="'+imageContextRoot+result.thumbnail_path+'" alt="img"></a> ';
            htmlString +='                        <h4><a >'+result.post_title+'</a></h4> ';
            // if (lang == 'CHI'){
            // htmlString +='                        <p><a >'+result.header_t+'</a></p> ';
            // }else{
            // htmlString +='                        <p><a >'+result.header_e+'</a></p> ';

            // }
            htmlString +='                        <strong><a >'+result.post_date+'</a></strong> ';
            htmlString +='                    </div> ';


            detailHtmlString +='          <div class="page-news-article mt10" id = "newsDetail'+result.ID+'" style="display:none"> ';
            detailHtmlString +='                    <img src="'+imageContextRoot+result.thumbnail_path+'" alt="img" class="responsive-image"> ';
            detailHtmlString +='                    <h3 class="page-news-article-title mb10">'+result.post_title+'</h3> ';
            detailHtmlString +='                    <div class="page-news-article-content"> ';

            if (lang == 'CHI'){

            detailHtmlString +='                        <p>'+result.header_t+'</p>';
            detailHtmlString +='                        <p>'+result.content_t+'</p> ';

            }else{

            detailHtmlString +='                        <p>'+result.header_e+'</p>';
            detailHtmlString +='                        <p>'+result.content_e+'</p> ';

            }
            detailHtmlString +='                        <div class="clear"></div>                         ';
            detailHtmlString +='                        <div class="decoration"></div> ';
            detailHtmlString +='                    </div> ';
            detailHtmlString +='                  </div> ';




          });

        $('#newListing').html(htmlString);

        detailHtmlString +='          <div class="container"> ';
        detailHtmlString +='                    <div class="clear"></div>                ';
        detailHtmlString +='                      <input type="button" class="buttonst" value="More Articles" onclick = "switchBackToNewsListing()"> ';
        detailHtmlString +='                    </div> ';




        $('#newsDetails').html(detailHtmlString);
        $('#newsDetails').hide();

      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }


    });

}


function switchBackToNewsListing(){
        $('#newListing').show();
        $('#newsDetails').hide();
        $('.page-news-article').hide();

}


function switchToNewsDetails(postID){
  $('#newListing').hide();
  $('#newsDetails').show();
  $('.page-news-article').hide();
  $('#newsDetail'+postID).show();



}
