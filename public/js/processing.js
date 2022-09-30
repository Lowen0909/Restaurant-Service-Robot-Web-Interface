var t = 2;
var i=0;
function gif(){
    if(i%4==0)
        $('.anime').text("");
    else{
        let text=$('.anime').text();
        text+='.';
        $('.anime').text(text);
    }  
    i++;
}
$(document).ready(function(){
    setInterval("gif()",200);
    $('.finish').click(function(){
        $.ajax({
            type: 'POST',
            url:  '/flask1',
            data:{data:'O'},
            datatype:'JSON',
            async:false,
            success: function(data) {
                console.log(data);
                location.href='/'; 
            } ,
            error:function(data){
                alert("發生錯誤，請稍後並重新嘗試");
            }
        });
    })
});