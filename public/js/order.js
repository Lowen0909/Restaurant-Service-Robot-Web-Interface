var socket = io.connect();
var orderlist=[];
function len(){
  var len = 15;
  $(".message").each(function(i){
    console.log("str");
    console.log($(this).text().length);
      if($(this).text().length>len){
          var text=$(this).text().substring(0,len-1)+"...";
          $(this).text(text);
      }
  });
};
$(document).ready(function() {   
    var page=parseInt($(".replace").attr('data-val'));
    $(document).on('click', '#feed',function(){
      var page1=parseInt($(this).attr('data-page'));
      page=page1;
      $(".replace").attr('data-val',parseInt(page1));
      $(".pre").attr('data-page',parseInt(page1-1));
      $(".next").attr('data-page',parseInt(page1+1));
      console.log('go');
      $.ajax({
        type: 'POST',
        url:  '/OrderSearch',
        datatype:'JSON',
        async : false,
        success: function(data) {
          $(".contact").empty();
          $(".contact").append("<tr><td>seat</td><td>price</td><td>orders</td><td colspan='2'>Moves</td></tr>");
          var end=Math.ceil(data.length/5);
          if(page1==1)
              $(".pre").css('display','none');
          else if(page1==end)
              $(".next").css('display','none');
          else{
             $(".pre").css('display','block');
             $(".next").css('display','block');
          }
          for(var i=(page1-1)*5;i<page1*5;i++){
            if(i<data.length&&i>=0){
              
              var orderStr="";
              for(var j=0;j<data[i].order.length;j++){
                  orderStr+=String(data[i].order[j]);
                  orderStr+=" ";
              }
              $(".contact").append("<tr><td>"+data[i].seat+"</td>"+"<td>"+data[i].price+"</td>"+"<td class='message'>"+orderStr+"</td>"+
              "<td><button class='CRUD' data-id-type='"+data[i].id+"'"+" name='del' data-model-type='orderDel'>del</button></a></td>"+
              "<td><button class='CRUD' data-id-type='"+data[i].id+"'"+" name='detail' data-model-type='orderDetail'>detail</button></a></td></tr>");
            }else{
              break;
            }
          }
          len();
        } ,
        error:function(data){
            alert("發生錯誤，請稍後並重新嘗試");
        }
      });


    }); 
      
      $(document).on('click', '.CRUD',function(){
        var id=$(this).attr('data-id-type');
        var action=$(this).attr('name');
        var model=$(this).attr('data-model-type');
        
        console.log("in");
        console.log('/'+model);
        $.ajax({
          type: 'POST',
          url:  '/'+model,
          data: { 
                  'id' : id,
                  'action' : action
                }, 
          datatype:'JSON',
          async : false,
          success: function(data) {
              if(action=='del')
                 refresh(page);
              else if(action=='detail'){
                 if(model=='Contacts'){
                 $("#review").text(data.message);
                 $("#reviewer").text(data.name);
                 $(".popup_back").css('display','block');
                 }
                 if(model=='orderDetail'){
                  console.log('show');
                  $("#review").text(data.order);
                  $("#reviewer").text(data.seat);
                  $(".popup_back").css('display','block');
                }
              }
              console.log(data);
          } ,
          error:function(data){
              alert("發生錯誤，請稍後並重新嘗試");
          }
        });
        return false;
      });
      $(".close").click(function(){
        $(".popup_back").css('display','none');
      });
      
      $.ajax({
        type: 'POST',
        url:  '/OrderSearch',
        datatype:'JSON',
        async : false,
        success: function(data) {
          var end=Math.ceil(data.length/5);
          if(page==1)
              $(".pre").css('display','none');
          else if(page==end)
              $(".next").css('display','none');
          else{
             $(".pre").css('display','block');
             $(".next").css('display','block');
          }
          for(var i=(page-1)*5;i<page*5;i++){
            if(i<data.length){
              var orderStr="";
              for(var j=0;j<data[i].order.length;j++){
                  orderStr+=String(data[i].order[j]);
                  orderStr+=" ";
              }
              $(".contact").append("<tr><td>"+data[i].seat+"</td>"+"<td>"+data[i].price+"</td>"+"<td class='message'>"+orderStr+"</td>"+
              "<td><button class='CRUD' data-id-type='"+data[i].id+"'"+" name='del' data-model-type='orderDel'>del</button></a></td>"+
              "<td><button class='CRUD' data-id-type='"+data[i].id+"'"+" name='detail' data-model-type='orderDetail'>detail</button></a></td></tr>");
            }else{
              break;
            }
          }
          len();
        } ,
        error:function(data){
            alert("發生錯誤，請稍後並重新嘗試");
        }
      });

      socket.on('table',function(data){
        $.ajax({
          type: 'POST',
          url:  '/OrderSearch',
          datatype:'JSON',
          async : false,
          success: function(data) {
            $(".contact").empty();
            $(".contact").append("<tr><td>seat</td><td>price</td><td>orders</td><td colspan='2'>Moves</td></tr>");
            for(var i=(page-1)*5;i<page*5;i++){
              if(i<data.length){
                var orderStr="";
                for(var j=0;j<data[i].order.length;j++){
                    orderStr+=String(data[i].order[j]);
                    orderStr+=" ";
                }
                $(".contact").append("<tr><td>"+data[i].seat+"</td>"+"<td>"+data[i].price+"</td>"+"<td class='message'>"+orderStr+"</td>"+
                "<td><button class='CRUD' data-id-type='"+data[i].id+"'"+" name='del' data-model-type='orderDel'>del</button></a></td>"+
                "<td><button class='CRUD' data-id-type='"+data[i].id+"'"+" name='detail' data-model-type='orderDetail'>detail</button></a></td></tr>");
              }else{
                break;
              }
            }
            len();
          } ,
          error:function(data){
              alert("發生錯誤，請稍後並重新嘗試");
          }
        });
    });
  });

  function refresh(page1){
    $.ajax({
      type: 'POST',
      url:  '/OrderSearch',
      datatype:'JSON',
      async : false,
      success: function(data) {
        $(".contact").empty();
        $(".contact").append("<tr><td>seat</td><td>price</td><td>orders</td><td colspan='2'>Moves</td></tr>");
        var end=Math.ceil(data.length/5);
        if(page1==1)
            $(".pre").css('display','none');
        else if(page1==end)
            $(".next").css('display','none');
        else{
           $(".pre").css('display','block');
           $(".next").css('display','block');
        }
        for(var i=(page1-1)*5;i<page1*5;i++){
          if(i<data.length&&i>=0){
            
            var orderStr="";
            for(var j=0;j<data[i].order.length;j++){
                orderStr+=String(data[i].order[j]);
                orderStr+=" ";
            }
            $(".contact").append("<tr><td>"+data[i].seat+"</td>"+"<td>"+data[i].price+"</td>"+"<td class='message'>"+orderStr+"</td>"+
            "<td><button class='CRUD' data-id-type='"+data[i].id+"'"+" name='del' data-model-type='orderDel'>del</button></a></td>"+
            "<td><button class='CRUD' data-id-type='"+data[i].id+"'"+" name='detail' data-model-type='orderDetail'>detail</button></a></td></tr>");
          }else{
            break;
          }
        }
        len();
      } ,
      error:function(data){
          alert("發生錯誤，請稍後並重新嘗試");
      }
    });
  }