$(document).ready(function() { 
   $('#A').click(function(){
    $.ajax({
        type: 'POST',
        url:  '/flask1',
        data:{data:'A'},
        datatype:'JSON',
        async:false,
        success: function(data) {
            console.log(data);
            location.href='/processing?seat=A'; 
        } ,
        error:function(data){
            alert("發生錯誤，請稍後並重新嘗試");
        }
    });
   });
   $('#B').click(function(){
    $.ajax({
        type: 'POST',
        url:  '/flask1',
        data:{data:'B'},
        datatype:'JSON',
        async:false,
        success: function(data) {
            console.log(data);
            location.href='/processing?seat=B'; 
        } ,
        error:function(data){
            alert("發生錯誤，請稍後並重新嘗試");
        }
    });
   });
   $('#C').click(function(){
    $.ajax({
        type: 'POST',
        url:  '/flask1',
        data:{data:'C'},
        datatype:'JSON',
        async:false,
        success: function(data) {
            console.log(data);
            location.href='/processing?seat=C'; 
        } ,
        error:function(data){
            alert("發生錯誤，請稍後並重新嘗試");
        }
    });
   });
   $('#D').click(function(){
    $.ajax({
        type: 'POST',
        url:  '/flask1',
        data:{data:'D'},
        datatype:'JSON',
        async:false,
        success: function(data) {
            console.log(data);
            location.href='/processing?seat=D'; 
        } ,
        error:function(data){
            alert("發生錯誤，請稍後並重新嘗試");
        }
    });
   });
});