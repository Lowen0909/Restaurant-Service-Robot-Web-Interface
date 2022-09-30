var content = new Map();
$(document).ready(function () {
    var submit = $(".submit");
    var clear = $(".clear");
    submit.on('click', function () {
        for (var num = 1; num <= 26; num++) {
            var which = $('.f' + num).data('item');
            var item = $('.f' + num).val();
            var quantity = $('.q' + num).val();
            if (item === '') {
                $(".alert").css("opacity", "0.7");
                content.clear();
                return;
            }
            else {
                if (content.has(which) === false) {
                    content.set(which, [item + "/" + quantity]);
                }
                else {
                    var cur = content.get(which);
                    cur.push(item + "/" + quantity);
                    content.set(which, cur);
                }
            }
        }
        Json_data = JSON.stringify(Object.fromEntries(content));
        console.log(typeof Json_data);
        content.clear();
        for (var num = 1; num <= 26; num++) {
            if ($('.f' + num).data('zero') === "Yes") {
                continue;
            }
            $('.f' + num).val('');
            $('.q' + num).val('0');
        }
        $(".good").css("opacity", "0.7");
        setTimeout(() => {
            $(".good").css("opacity", "0");
        }, 1100);
         $.ajax({
             type: 'POST',
             url:  '/inventory',
             data: {a:Json_data}, 
             datatype:'JSON',
             async : false,
            success: function(data) {
                console.log(data);
            } ,
            error:function(data){
                alert("發生錯誤，請稍後並重新嘗試");
            }
          });
    });
    
});