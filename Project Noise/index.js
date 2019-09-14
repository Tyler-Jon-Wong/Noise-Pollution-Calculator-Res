
$(function(){
    $("input.help-button").click(function(){

      if($("#help-content").height() > 0){
        $("#help-content").css("height","0px");
        $("input.help-button").css("padding-bottom","20px");

        $("input.help-button").val("Instructions                                                                               +");


      } else{
        $("#help-content").css("height","100px");
        $("input.help-button").css("padding-bottom","120px");
        $("input.help-button").val("Instructions                                                                               -");
      }

    });
  });

$(function(){
  
})
