var socket = io.connect();
var seatStatus=[];
function check(){
    if(seatStatus[0]=="occupied"){
        $('.statusA').text('(occupied)');
        $('#A').css('background-color','red');
    }else{
        $('.statusA').text('(empty)');
        $('#A').css('background-color','greenyellow');
    }

    if(seatStatus[1]=="occupied"){
        $('.statusB').text('(occupied)');
        $('#B').css('background-color','red');
    }else{
        $('.statusB').text('(empty)');
        $('#B').css('background-color','greenyellow');
    }
    
    if(seatStatus[2]=="occupied"){
        $('.statusC').text('(occupied)');
        $('#C').css('background-color','red');
    }else{
        $('.statusC').text('(empty)');
        $('#C').css('background-color','greenyellow');
    }

    if(seatStatus[3]=="occupied"){
        $('.statusD').text('(occupied)');
        $('#D').css('background-color','red');
    }else{
        $('.statusD').text('(empty)');
        $('#D').css('background-color','greenyellow');
    }
}

$(document).ready(function() { 
    $.ajax({
        type: 'POST',
        url:  '/seatStatus',
        datatype:'JSON',
        async:false,
        success: function(data) {
            seatStatus=data.seat;
            console.log(seatStatus);
        } ,
        error:function(data){
            alert("發生錯誤，請稍後並重新嘗試");
        }
    });
    if(seatStatus[0]=="occupied"){
        $('.statusA').text('(occupied)');
        $('#A').css('background-color','red');
    }else{
        $('.statusA').text('(empty)');
        $('#A').css('background-color','greenyellow');
    }

    if(seatStatus[1]=="occupied"){
        $('.statusB').text('(occupied)');
        $('#B').css('background-color','red');
    }else{
        $('.statusB').text('(empty)');
        $('#B').css('background-color','greenyellow');
    }
    
    if(seatStatus[2]=="occupied"){
        $('.statusC').text('(occupied)');
        $('#C').css('background-color','red');
    }else{
        $('.statusC').text('(empty)');
        $('#C').css('background-color','greenyellow');
    }

    if(seatStatus[3]=="occupied"){
        $('.statusD').text('(occupied)');
        $('#D').css('background-color','red');
    }else{
        $('.statusD').text('(empty)');
        $('#D').css('background-color','greenyellow');
    }
    socket.on('change',function(data){
       var s=Object.fromEntries(JSON.parse(data.seatchange));
       if(s[0]=='A'){
         seatStatus[0]=s[1];
       }else if(s[0]=='B'){
        seatStatus[1]=s[1];
       }else if(s[0]=='C'){
        seatStatus[2]=s[1];
       }else if(s[0]=='D'){
        seatStatus[3]=s[1];
       }
       check();
    });

    $('.cleanA').click(function(){
        if($('.statusA').text()=='(occupied)'){
            $('.statusA').text('(empty)');
            $('#A').css('background-color','greenyellow');
            seatStatus[0]='empty';
            var change=['A','empty'];
            var temp=JSON.stringify(Object.entries(change));
            socket.emit('use',{tmp:temp})
        }
    })

    $('.cleanB').click(function(){
        if($('.statusB').text()=='(occupied)'){
            $('.statusB').text('(empty)');
            $('#B').css('background-color','greenyellow');
            seatStatus[1]='empty';
            var change=['B','empty'];
            var temp=JSON.stringify(Object.entries(change));
            socket.emit('use',{tmp:temp})
        }
    })

    $('.cleanC').click(function(){
        if($('.statusC').text()=='(occupied)'){
            $('.statusC').text('(empty)');
            $('#C').css('background-color','greenyellow');
            seatStatus[2]='empty';
            var change=['C','empty'];
            var temp=JSON.stringify(Object.entries(change));
            socket.emit('use',{tmp:temp})
        }
    })

    $('.cleanD').click(function(){
        if($('.statusD').text()=='(occupied)'){
            $('.statusD').text('(empty)');
            $('#D').css('background-color','greenyellow');
            seatStatus[3]='empty';
            var change=['D','empty'];
            var temp=JSON.stringify(Object.entries(change));
            socket.emit('use',{tmp:temp})
        }
    })


});