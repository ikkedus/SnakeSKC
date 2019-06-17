Window.Utils = {};

(function(utils){
    utils.createModal = function(title,content,btns)
    {
        $(".modal-title").html(title);
        $(".modal-body").html(content);
        $("#modal").modal();
        $("#modal .modal-footer").html(btns);
    };
    utils.createBtns =function(arr)
    {
        let btns = "";
        arr.forEach((item)=>{
            btns+='<button type="button" onclick="'+item.click+'" class="btn btn-'+item.type+'">'+item.text+'</button>';
        });
        return btns;
    }
    utils.dismissModal =function(){
        $("#modal").modal("hide");
    };

})(Window.Utils); 