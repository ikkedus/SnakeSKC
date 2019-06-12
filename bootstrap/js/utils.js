Window.Utils = {};

(function(utils){
    utils.createModal = function(title,content)
    {
        $(".modal-title").html(title);
        $(".modal-body").html(content);
        $("#modal").modal();
    };
    utils.dissmissModal =function(){
        $("#modal").modal("hide");
    };

})(Window.Utils);