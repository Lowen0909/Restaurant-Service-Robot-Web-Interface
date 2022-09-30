var index = new Map();
var JsonGet = new Map();
var seat;
var total=0;
var foodInventories;
var coupon_code="uuuuuuuuuu";
var discount=1;
var namecheck=new Map([["Macaron","showornot1"],["Mile layer","showornot2"],["Souffle","showornot3"],["lemon tart","showornot4"],["Saint Honoré","showornot5"],["cheese cake","showornot6"],["cream puff","showornot7"],["Tiramisù","showornot8"],["Panna cotta","showornot9"],["chocolate cake","showornot10"],["Canelés","showornot11"],["boston pie","showornot12"]]);
var price = new Map([
    ['Macaron', 45],
    ['Mile layer', 80],
    ['Souffle', 100],
    ['lemon tart', 120],
    ['Saint Honoré', 180],
    ['cheese cake', 70],
    ['cream puff', 50],
    ['Tiramisù', 70],
    ['Panna cotta', 80],
    ['chocolate cake', 100],
    ['Canelés', 50],
    ['boston pie', 80],
    ['tea latte', 80],
    ['black abyss', 100],
    ['coffee', 80],
    ['Matcha latte', 90],
    ['smoothie', 120],
    ['black coffee', 70],
    ['black tea', 40],
    ['green tea', 40],
]);
function display_info() {
    var output = "";
    var K = 0;
    console.log(JsonGet);
    for (var [A, B] of JsonGet) {
        var key_A = A.split('/');
        if (key_A.length == 2) {
            output += ("<tr class=" + key_A[0] + key_A[1] + ">" + "<td" + " class=" + "item1 " + key_A[0] + "/" + key_A[1] + ">" + key_A[0] + "<span class='types'>(" + key_A[1] + ")</span>" + "</td>" + "<td" + " class=" + "many" + ">" + B + "</td>\
        "+ "<td class='cal'><button type='button' class='cart capl' data-item='" + A + "'>Add</button>\
        <button type='button' class='cart cami'data-item='"+ A + "'>Remove</button></td>+ " + "</tr>");
        }
        else {
            output += ("<tr class=" + key_A[0] + key_A[1] + key_A[2] + ">" + "<td" + " class=" + "item1 " + key_A[0] + "/" + key_A[1] + "/" + key_A[2] + ">" + key_A[0] + "<span class='types'>" + "&ensp;" + "(" + key_A[1] + "&ensp;" + "ice)" + "&ensp;" + "(" + key_A[2] + "&ensp;" + "sugar)</span>" + "</td>" + "<td" + " class=" + "many" + ">" + B + "</td>\
        "+ "<td class='cal'><button type='button' class='cart capl' data-item='" + A + "'>Add</button>\
        <button type='button' class='cart cami'data-item='"+ A + "'>Remove</button></td>+ " + "</tr>");
        }
        K += price.get(key_A[0]) * parseInt(B);
    }
    total=K*discount;
    $(".money").val(total);
    $(".list_").html(output);
}
function display_info1() {
    var output = "";
    var K = 0;
    console.log(JsonGet);
    for (var [A, B] of JsonGet) {
        var key_A = A.split('/');
        if (key_A.length == 2) {
            output += ("<tr class=" + key_A[0] + key_A[1] + ">" + "<td" + " class=" + "item1 " + key_A[0] + "/" + key_A[1] + ">" + key_A[0] + "<span class='types'>(" + key_A[1] + ")</span>" + "</td>" + "<td" + " class=" + "many" + ">" + B + "</td>\
        "+ "<td class='cal'><button type='button' class='cart capl' data-item='" + A + "'>Add</button>\
        <button type='button' class='cart cami'data-item='"+ A + "'>Remove</button></td>+ " + "</tr>");
        }
        else {
            output += ("<tr class=" + key_A[0] + key_A[1] + key_A[2] + ">" + "<td" + " class=" + "item1 " + key_A[0] + "/" + key_A[1] + "/" + key_A[2] + ">" + key_A[0] + "<span class='types'>" + "&ensp;" + "(" + key_A[1] + "&ensp;" + "ice)" + "&ensp;" + "(" + key_A[2] + "&ensp;" + "sugar)</span>" + "</td>" + "<td" + " class=" + "many" + ">" + B + "</td>\
        "+ "<td class='cal'><button type='button' class='cart capl' data-item='" + A + "'>Add</button>\
        <button type='button' class='cart cami'data-item='"+ A + "'>Remove</button></td>+ " + "</tr>");
        }
        K += price.get(key_A[0]) * parseInt(B);
    }
    total=Math.round(K*discount);
    $(".money").val(K);
    $(".list_1").html(output);
}
//get 
$.ajax({
    type: 'POST',
    url:  '/food',
    datatype:'JSON',
    async:false,
    success: function(data) {
        foodInventories=new Map(Object.entries(JSON.parse(data)));
    } ,
    error:function(data){
        alert("發生錯誤，請稍後並重新嘗試");
    }
});
console.log(foodInventories);
var idleTime=0;
function timerIncrement(){
    idleTime=idleTime+1;
    if(idleTime>0){
        window.location.href="/";
    }
}
$(document).ready(function () {
    var idleInterval=setInterval(timerIncrement,60000);
    $(this).mousemove(function(e){
        idleTime=0;
     });
     $(this).keypress(function(e){
         idleTime=0;
      });
    var minus = $(".mi");
    var plus = $(".pl");
    var recipe = $(".confirm");
    var crecipe = $(".back");
    var reset = $(".res");
    var flavor = $(".Get");
    var Adjustment = $(".Get1");
    var close = $(".close");
    var ice = "noc";
    var sugar = "noc";
    var option = $(".option");
    var submit = $(".submit");
    var Jdata ;
    var get_json;
    
    //socket
    var socket = io.connect();
    //
    $.ajax({
        type: 'POST',
        url:  '/flavor',
        datatype:'JSON',
        success: function(data) {
            Jdata=data;
            get_json = JSON.parse(Jdata);
        } ,
        error:function(data){
            alert("發生錯誤，請稍後並重新嘗試");
        }
      });
    for( [A,B] of foodInventories)
    {
        console.log("decision");
        var sum=B[1].reduce(function(a,b){return a+b},0);
        if(sum==0)
        {
            $("."+namecheck.get(A)).css("display","block");   
        }
    }
    minus.on('click', function () {
        var need = $(this).data('content');
        var need1 = $(this).data('quantity');
        var change = $("." + need);
        var field = change.val();
        if (field > 0 && !isNaN(field)) {
            change.val(--field);
            index.set(need1, field);
        }
        else {
            change.val(0);
        }
        if (field == 0) {
            index.delete(need1);
        }
    });
    $(".use_coupon").on('click',function(){
        var get_coupon=$(".coupon").val();
        $.ajax({
            type: 'POST',
            url:  '/discount',
            data: {serial:get_coupon},
            datatype:'JSON',
            async:false,
            success: function(data) {
                if(data=='not found'){
                    $(".question_mark").addClass("remove");
                    $(".tick_mark").addClass("remove");
                    $(".cross_mark").removeClass("remove");
                }else{
                    discount=parseFloat(data.discount);
                    $(".question_mark").addClass("remove");
                    $(".tick_mark").removeClass("remove");
                    $(".cross_mark").addClass("remove");
                    var str="";
                    display_info();
                    var diff=100-discount*100;
                    $(".money").css("color","blue");
                    str+=total.toString();
                    str+="      (-";
                    str+=diff.toString();
                    str+="%)";
                    $(".money").val(str);
                }
            } ,
            error:function(data){
                alert("發生錯誤，請稍後並重新嘗試");
            }
          });
        // if(coupon_code===get_coupon){
        //     $(".question_mark").addClass("remove");
        //     $(".tick_mark").removeClass("remove");
        //     $(".cross_mark").addClass("remove");
        // }
        // else
        // {
        //     $(".question_mark").addClass("remove");
        //     $(".tick_mark").addClass("remove");
        //     $(".cross_mark").removeClass("remove");
        // }
    });
    //edit
    flavor.on('click', function () {
        var item = $(this).data('choosen');
        var number = $(this).data('number');
        var flavors = get_json[item];
        var len = flavors.length;
        $('.item').html(item);
        for (var i = 0; i < len; i++) {
            var element1 = $("<div class='contorl_fla'><div class='soldcon_background showornot"+number+"-"+i+"'><div class='soldcons'><div class='co'></div><h1 class='spaces'>sold out</h1></div></div>\
            <h1 class='flavor_name'>" + flavors[i] + "</h1><input type='text' name='quantity20' id='qt' value='0' class='qt qty"+ i + "'data-item='" + item + "'data-flavor='" + flavors[i] + "' readonly />\
            <div class='form'><input type='button' value='-' class='mi minus"+ i + "' field='quantity" + i + "'data-content='qty" + i + "' data-item=" + item + "data-flavor=" + flavors[i] + "/>\
            <input type='button' value='+' class='pl plus"+ i + "' field='quantity" + i + "' data-content='qty" + i + "'data-item='" + item + "'data-number=" +i+"data-flavor=" + flavors[i] + "/></div>");
            $('.flavor_select').append(element1);
            if(foodInventories.get(item)[1][i]==0)
            {
                $(".showornot"+number+"-"+i).css("display","block");
            }

        }
        $('.flavor').css("display", "inline-flex");
    });
    close.on('click', function () {
        $('.flavor').css("display", "none");
        $('.adjust').css("display", "none");
        $('.item').empty();
        $('.item_b').empty();
        $('.flavor_select').empty();
        $('.option').removeClass('check');
        $('.ncs').css("display", "none");
        ice = "noc";
        sugar = "noc";
        index.clear();
    });
    option.on('click', function () {
        $(this).siblings().removeClass('check');
        $(this).addClass('check');
        if ($(this).data('adjust') === 'sugar') {
            sugar = $(this).data('sugar');
        }
        else {
            ice = $(this).data('ice');
        }
    });
    $(document).on('click', '.Add', function () {
        var item = $("#qt").data('item');
        var flavors = get_json[item];
        var len = flavors.length;
        for (var i = 0; i < len; i++) {
            var flavor = $(".qty" + i);
            if (flavor.val() != 0) {

                if (JsonGet.has(item + "/" + flavors[i]) === false) {
                    JsonGet.set(item + "/" + flavors[i], flavor.val());
                }
                else {
                    var k = parseInt(flavor.val()) + parseInt(JsonGet.get(item + "/" + flavors[i]));
                    JsonGet.set(item + "/" + flavors[i], k);
                }
            }
        }
        $('.flavor').css("display", "none");
        $('.item').empty();
        $('.flavor_select').empty();
        index.clear();
    });
    $(document).on('click', '.Add1', function () {
        var item = $(".item_b").text();
        console.log(item);
        if (ice === 'noc') {
            $('.no_ice').css("display", "inline");
        }
        else if (sugar === 'noc') {
            $('.no_ice').css("display", "none");
            $('.no_sugar').css("display", "inline");
        }
        else {
            if (JsonGet.has(item + "/" + ice + "/" + sugar) === false) {
                JsonGet.set(item + "/" + ice + "/" + sugar, 1);
            }
            else {
                var k = parseInt(JsonGet.get(item + "/" + ice + "/" + sugar)) + 1;
                JsonGet.set(item + "/" + ice + "/" + sugar, k);
            }
            $('.adjust').css("display", "none");
            $('.no_ice').css("display", "none");
            $('.no_sugar').css("display", "none");
            $('.option').removeClass('check');
            sugar = 'noc';
            ice = 'noc';
            $('.item_b').empty();
        }
    });
    Adjustment.on('click', function () {
        var bav = $(this).data('choosen');
        $('.item_b').html(bav);
        $('.adjust').css('display', 'inline-flex');
    });
    socket.on('table',function(data){
        data_want=Object.entries(JSON.parse(data.text));
        foodInventories= new Map(data_want);
        var j=1 ;
        for( [A,B] of foodInventories)
        {
            j++;
            var sum=0;
            for(var i=0;i<B[1].length;i++)
            {
                if(B[1][i]==0)
                {
                    $("."+"showornot"+j+"-"+i).css("display","block");
                }
                sum+=B[1][i];
            }
            if(sum==0)
            {
                $("."+namecheck.get(A)).css("display","block");   
            }
        }
    });
    $(document).on('click', '.pl', function () {
        var need = $(this).data('content');
        var need1 = $(this).data('item');
        var need2 = $(this).data('number');
        var change = $("." + need);
        var field = change.val();
        if (field < foodInventories.get(need1)[1][parseInt(need2)] && !isNaN(field)) {
            change.val(++field);
        }
        else {
            change.val(field);
            //need plus
        }
    });
    $(document).on('click', '.mi', function () {
        var need = $(this).data('content');
        var change = $("." + need);
        var field = change.val();
        if (field > 0 && !isNaN(field)) {
            change.val(--field);
        }
        else {
            change.val(0);
        }
    });
    $(document).on('click', '.capl', function () {
        var A = $(this).data('item');
        JsonGet.set(A, parseInt(JsonGet.get(A)) + 1);
        display_info();
    });
    $(document).on('click', '.cami', function () {
        var A = $(this).data('item');
        if (parseInt(JsonGet.get(A)) === 1) {
            JsonGet.delete(A);
        }
        else {
            JsonGet.set(A, parseInt(JsonGet.get(A)) - 1);
        }
        display_info();
    });
    recipe.on('click', function () {
        display_info();
        seat=$("input[name*='seat']:checked").val();
        if ($("input[name*='seat']:checked").val() == null) {
        }
        else { $(".p_c").text('"' + $("input[name*='seat']:checked").val() + '"'); };
        $(".pop_up_back").css("display", "inline-flex");
    });
    crecipe.on('click', function () {
        $(".pop_up_back").css("display", "none");
        $('.ncs').css("display", "none");
        $(".list_").empty();
        $(".p_c").empty();
        $(".pop_up_back1").css("display", "none");
        $('.ncs').css("display", "none");
        $(".list_1").empty();
        $(".p_c").empty();
    });
    reset.on('click', function () {
        JsonGet.clear();
    });
    submit.on('click', function () {
        if ($("input[name*='seat']:checked").val() == null) {
            $('.ncs').css("display", "inline");
            return;
        }
        else {
            var decide_exc=0;
            for (var [A, B] of JsonGet) 
            {
                        var tempA=A.split("/");
                        var INDEX_ORDER=foodInventories.get(tempA[0])[0].indexOf(tempA[1]);
                        if(foodInventories.get(tempA[0])[1][INDEX_ORDER]<parseInt(B))
                        {
                            JsonGet.set(A,foodInventories.get(tempA[0])[1][INDEX_ORDER]);
                            decide_exc=1;
                        }
            }
            if(!decide_exc){
                $.ajax({
                    type: 'POST',
                    url:  '/menu',
                    data: {seat:seat,data1:JSON.stringify(Object.fromEntries(JsonGet)),price:total},
                    datatype:'JSON',
                    async:false,
                    success: function(data) {
                        for (var [A, B] of JsonGet) 
                        {   
                            var tempA=A.split("/");
                            var INDEX_ORDER=foodInventories.get(tempA[0])[0].indexOf(tempA[1]);
                            foodInventories.get(tempA[0])[1][INDEX_ORDER]-=parseInt(B);
                        }
                        temp=JSON.stringify(Object.fromEntries(foodInventories));
                        socket.emit('Sold_order', {
                            text: temp
                        });
                        location.href='/transition';
                    } ,
                    error:function(data){
                        alert("發生錯誤，請稍後並重新嘗試");
                    }
                });
            }
            else{
                $(".pop_up_back").css("display", "none");
                $('.ncs').css("display", "none");
                $(".list_").empty();
                $(".p_c").empty();
                $(".pop_up_back1").css("display", "none");
                $('.ncs').css("display", "none");
                $(".list_1").empty();
                $(".p_c").empty();
                display_info1(); 
                seat=$("input[name*='seat']:checked").val();
                if ($("input[name*='seat']:checked").val() == null) {
                }
                else { $(".p_c").text('"' + $("input[name*='seat']:checked").val() + '"'); };
                $(".pop_up_back1").css("display", "inline-flex");
            }
        };
    });
});
function change() {
    if (document.getElementById("menuu").style.display != "none") {
        var me1 = document.getElementById("trivial");
        me1.style.fill = "white";
        var me2 = document.getElementById("ice1");
        me2.style.transform = "rotate(95deg)";
        var me2 = document.getElementById("ice2");
        me2.style.transform = "rotate(105deg)";
        var me2 = document.querySelector(".ice3");
        me2.style.transform = "rotate(85deg)";
    }
}
function change1() {
    if (document.getElementById("menuu").style.display != "none") {
        var me1 = document.getElementById("trivial");
        me1.style.fill = "transparent";
        var me2 = document.getElementById("ice1");
        me2.style.transform = "rotate(-95deg)";
        var me2 = document.getElementById("ice2");
        me2.style.transform = "rotate(-105deg)";
        var me2 = document.getElementById("ice3");
        me2.style.transform = "rotate(-85deg)";
    }
}
function change_m() {
    if (document.getElementById("menuu").style.display == "none") {
        var me1 = document.getElementById("plate");
        me1.style.fill = "white";
        var me2 = document.getElementById("fork");
        me2.style.transform = "rotate(10deg)";
        var me2 = document.getElementById("spoon");
        me2.style.transform = "rotate(-10deg)";
    }
}
function change_m1() {
    if (document.getElementById("menuu").style.display == "none") {
        var me1 = document.getElementById("plate");
        me1.style.fill = "transparent";
        var me2 = document.getElementById("fork");
        me2.style.transform = "rotate(0deg)";
        var me2 = document.getElementById("spoon");
        me2.style.transform = "rotate(0deg)";
    }
}
function change_m2() {
    var me1 = document.getElementById("menuu");
    me1.style.display = "block";
    var me2 = document.getElementById("drinkk");
    me2.style.display = "none";
    var me1 = document.getElementById("trivial");
    me1.style.fill = "transparent";
    var me2 = document.getElementById("ice1");
    me2.style.transform = "rotate(-95deg)";
    var me2 = document.getElementById("ice2");
    me2.style.transform = "rotate(-105deg)";
    var me2 = document.getElementById("ice3");
    me2.style.transform = "rotate(-85deg)";
}
function change2() {
    var me1 = document.getElementById("menuu");
    me1.style.display = "none";
    var me2 = document.getElementById("drinkk");
    me2.style.display = "block";
    var me1 = document.getElementById("plate");
    me1.style.fill = "transparent";
    var me2 = document.getElementById("fork");
    me2.style.transform = "rotate(0deg)";
    var me2 = document.getElementById("spoon");
    me2.style.transform = "rotate(0deg)";
}

