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
        url:  '/ContactsData',
        datatype:'JSON',
        async : false,
        success: function(data) {
          $(".contact").empty();
          $(".contact").append("<tr><td>name</td><td>tel</td><td colspan='2'>Moves</td></tr>");
          var end=Math.ceil(data.length/5);
          if(page1==1){
              $(".pre").css('display','none');
              $(".next").css('display','block');
          }else if(page1==end){
              $(".pre").css('display','block');
              $(".next").css('display','none');
          }else{
             $(".pre").css('display','block');
             $(".next").css('display','block');
          }
          for(var i=(page1-1)*5;i<page1*5;i++){
            if(i<data.length&&i>=0){
              $(".contact").append("<tr><td>"+data[i].name+"</td>"+"<td>"+data[i].tel+"</td>"+
              "<td><button class='CRUD' data-id-type='"+data[i]._id+"'"+" name='del' data-model-type='Contacts'>del</button></a></td>"+
              "<td><button class='CRUD' data-id-type='"+data[i]._id+"'"+" name='detail' data-model-type='Contacts'>detail</button></a></td></tr>");
            }else{
              break;
            }
          }
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
                 $("#reviewer").text(data.name);
                 $("#email").text(data.email);
                 $("#employSatis").text(data.employSatis);
                 $("#mealSatis").text(data.mealSatis);
                 $("#message").text(data.message);
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
        url:  '/ContactsData',
        datatype:'JSON',
        async : false,
        success: function(data) {
            console.log(data);
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
              $(".contact").append("<tr><td>"+data[i].name+"</td>"+"<td>"+data[i].tel+"</td>"+
              "<td><button class='CRUD' data-id-type='"+data[i]._id+"'"+" name='del' data-model-type='Contacts'>del</button></a></td>"+
              "<td><button class='CRUD' data-id-type='"+data[i]._id+"'"+" name='detail' data-model-type='Contacts'>detail</button></a></td></tr>");
            }else{
              break;
            }
          }
        } ,
        error:function(data){
            alert("發生錯誤，請稍後並重新嘗試");
        }
      });
});

function refresh(page1){
  $.ajax({
    type: 'POST',
    url:  '/ContactsData',
    datatype:'JSON',
    async : false,
    success: function(data) {
      $(".contact").empty();
      $(".contact").append("<tr><td>name</td><td>tel</td><td colspan='2'>Moves</td></tr>");
      var end=Math.ceil(data.length/5);
      if(page1==1){
          $(".pre").css('display','none');
          $(".next").css('display','block');
      }else if(page1==end){
          $(".pre").css('display','block');
          $(".next").css('display','none');
      }else{
         $(".pre").css('display','block');
         $(".next").css('display','block');
      }
      for(var i=(page1-1)*5;i<page1*5;i++){
        if(i<data.length&&i>=0){
          $(".contact").append("<tr><td>"+data[i].name+"</td>"+"<td>"+data[i].tel+"</td>"+
          "<td><button class='CRUD' data-id-type='"+data[i]._id+"'"+" name='del' data-model-type='Contacts'>del</button></a></td>"+
          "<td><button class='CRUD' data-id-type='"+data[i]._id+"'"+" name='detail' data-model-type='Contacts'>detail</button></a></td></tr>");
        }else{
          break;
        }
      }
    } ,
    error:function(data){
        alert("發生錯誤，請稍後並重新嘗試");
    }
  });
}