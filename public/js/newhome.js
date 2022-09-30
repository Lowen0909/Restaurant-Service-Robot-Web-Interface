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
    var po = $('.slide');
    var ch = $('.allslide');
    var chr = $('.allslide1');
    var chr1 = $('.dallslide1');
    var order = $('.reception');
    var tr = ".traing";
    var obs = $('')
    var check = false;
    var check_finish = true;
    var click_cal = false;
    var k = 0;
    var d = 0;
    var f = 0;
    var g = 0;
    var calender_button = $(".date_icon1");
    po.on("click", function () {
        $(document).off("click");
        if (check != true) {
            var whone = $(this).data('content');
            var whone1 = po.data('content');
            if (whone === whone1) {
                $(document).on("click");
                return false;
            }

            var tar = $(".content").eq(whone);
            var tar2 = $(".content").eq(whone1);
            tar2.addClass('content--hidden')
                .removeClass('content--active');
            tar.addClass('content--active');
            check = true;
            tar2.on('transitionend', function () {
                $(this).removeClass('content--hidden');
                tar2.off('transitionend webkitTransitionend');
                check = false;
            });
            po = $(this);
            $(document).on("click");
        }
        $(document).on("click");
        return false;
    });
    order.on({
        mouseenter: function () {
            $(".text1").addClass('text-sha');
        },
        mouseleave: function () {
            $(".text1").removeClass('text-sha');
        }
    });

    chr.on('click', function () {
        if (check_finish) {
            check_finish = false;
            var C = $(this).data('slide');
            var C1 = chr.data('slide');
            $("." + C1).removeClass('obst');
            $("." + C).addClass('obst');
            for (j = 1; j <= 13; j++) {
                var c = $(tr + j);
                c.addClass('cover');
            }
            var target = [$('.p3'), $('.p2'), $('.p1'), $('.p0')];
            var all = [chr.data('price'), chr.data('flavor'), chr.data('calories'), chr.data('which')];
            var allnow = [$(this).data('price'), $(this).data('flavor'), $(this).data('calories'), $(this).data('which')];
            var counter = 0;
            var num = true;
            function type() {
                if (num) {
                    if (counter < 4) {
                        var item = target[counter];
                        item.addClass("blink");
                        all[counter] = all[counter].slice(0, -1);
                        item.html(all[counter]);
                        if (all[counter].length == 0) {
                            counter++;
                            item.removeClass("blink");
                        }
                        setTimeout(type, 20);
                    }
                    else {
                        counter = 3;
                        num = false;
                        setTimeout(type, 20);
                    }
                }
                else {
                    if (counter >= 0) {
                        var item = target[counter];
                        item.addClass("blink");
                        item.text(item.text() + allnow[counter].charAt(k));
                        k++;
                        if (k == allnow[counter].length) {
                            item.removeClass("blink");
                            k = 0;
                            counter--;
                        }
                        setTimeout(type, 20);
                    }
                    else {
                        counter = 0;
                        num = true;
                    }
                }
            }
            type();
            setTimeout(() => {
                for (j = 13; j > 0; j--) {
                    var c = $(tr + j);
                    c.removeClass('cover');
                }
            }, 1100);
            setTimeout(() => {
                var T = $(this).data('change');
                var T1 = chr.data('change');
                $("." + T1).removeClass('up1');
                $("." + T).addClass('up1');

            }, 1050);
            setTimeout(() => {
                chr = $(this);
                check_finish = true;
            }, 2000);
        }
    });
    chr1.on('click', function () {
        if (check_finish) {
            check_finish = false;
            var C = $(this).data('slide');
            var C1 = chr1.data('slide');
            $("." + C1).removeClass('obst');
            $("." + C).addClass('obst');
            for (j = 14; j <= 26; j++) {
                var c = $(tr + j);
                c.addClass('cover');
            }
            var target = [$('.dp3'), $('.dp2'), $('.dp1'), $('.dp0')];
            var all = [chr1.data('price'), chr1.data('flavor'), chr1.data('calories'), chr1.data('which')];
            var allnow = [$(this).data('price'), $(this).data('flavor'), $(this).data('calories'), $(this).data('which')];
            var counter = 0;
            var num = true;
            function type() {
                if (num) {
                    if (counter < 4) {
                        var item = target[counter];
                        item.addClass("blink");
                        all[counter] = all[counter].slice(0, -1);
                        item.html(all[counter]);
                        if (all[counter].length == 0) {
                            counter++;
                            item.removeClass("blink");
                        }
                        setTimeout(type, 20);
                    }
                    else {
                        counter = 3;
                        num = false;
                        setTimeout(type, 20);
                    }
                }
                else {
                    if (counter >= 0) {
                        var item = target[counter];
                        item.addClass("blink");
                        item.text(item.text() + allnow[counter].charAt(k));
                        k++;
                        if (k == allnow[counter].length) {
                            item.removeClass("blink");
                            k = 0;
                            counter--;
                        }
                        setTimeout(type, 20);
                    }
                    else {
                        counter = 0;
                        num = true;
                    }
                }
            }
            type();
            setTimeout(() => {
                for (j = 26; j > 13; j--) {
                    var c = $(tr + j);
                    c.removeClass('cover');
                }
            }, 1100);
            setTimeout(() => {
                var T = $(this).data('change');
                var T1 = chr1.data('change');
                $("." + T1).removeClass('up1');
                $("." + T).addClass('up1');

            }, 1050);
            setTimeout(() => {
                chr1 = $(this);
                check_finish = true;
            }, 2000);
        }
    });
    var month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    var weekday = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    var weekdayShort = [
        "sun",
        "mon",
        "tue",
        "wed",
        "thu",
        "fri",
        "sat"
    ];
    const numbermonth = new Map([
        ["January", 1],
        ["February", 2],
        ["March", 3],
        ["April", 4],
        ["May", 5],
        ["June", 6],
        ["July", 7],
        ["August", 8],
        ["September", 9],
        ["October", 10],
        ["November", 11],
        ["December", 12]
    ]);
    var monthDirection = 0;
    var confirmD = "";
    var confirmM = "";
    function getNextMonth() {
        monthDirection++;
        var current;
        var now = new Date();
        current = new Date(now.getFullYear(), now.getMonth() + monthDirection, 1);
        initCalender(getMonth(current));
    }

    function getPrevMonth() {
        monthDirection--;
        var current;
        var now = new Date();
        if (now.getMonth() == 11) {
            current = new Date(now.getFullYear() + monthDirection, 0, 1);
        } else {
            current = new Date(now.getFullYear(), now.getMonth() + monthDirection, 1);
        }
        initCalender(getMonth(current));
    }
    Date.prototype.isSameDateAs = function (pDate) {
        return (
            this.getFullYear() === pDate.getFullYear() &&
            this.getMonth() === pDate.getMonth() &&
            this.getDate() === pDate.getDate()
        );
    };

    function getMonth(currentDay) {
        var now = new Date();
        var currentMonth = month[currentDay.getMonth()];
        var monthArr = [];
        for (i = 1 - currentDay.getDate(); i < 31; i++) {
            var tomorrow = new Date(currentDay);
            tomorrow.setDate(currentDay.getDate() + i);
            var reserve = false;
            if (currentMonth !== month[tomorrow.getMonth()]) {
                break;
            } else {
                if (0 < (tomorrow - now) / 1000 / 60 / 60 / 24 && (tomorrow - now) / 1000 / 60 / 60 / 24 <= 5) {
                    reserve = true;
                }
                monthArr.push({
                    date: {
                        weekday: weekday[tomorrow.getDay()],
                        weekday_short: weekdayShort[tomorrow.getDay()],
                        day: tomorrow.getDate(),
                        month: month[tomorrow.getMonth()],
                        year: tomorrow.getFullYear(),
                        current_day: now.isSameDateAs(tomorrow) ? true : false,
                        date_info: tomorrow,
                        check: reserve
                    }
                });
            }
        }
        return monthArr;
    }

    function clearCalender() {
        $("table tbody tr").each(function () {
            $(this).find("td").removeClass("active selectable noreach currentDay between hover").html("");
        });
        $("td").each(function () {
            $(this).unbind('mouseenter').unbind('mouseleave');
        });
        $("td").each(function () {
            $(this).unbind('click');
        });
        clickCounter = 0;
    }

    function initCalender(monthData) {
        var row = 0;
        var classToAdd = "";
        var currentDay = "";
        var today = new Date();
        var month = "empty";
        clearCalender();
        $.each(monthData,
            function (i, value) {//i:monthData[i] ,value:monthData->info
                if (i === 0) {
                    month = value.date.month;
                }
                var weekday = value.date.weekday_short;//sun mon tue....
                var day = value.date.day;//可刪
                var can = value.date.check;
                var column = 0;
                $(".left-wrapper .header .month").html(value.date.month);
                $(".left-wrapper .header .year").html(value.date.year);
                if (value.date.current_day) {
                    currentDay = "currentDay";
                    classToAdd = "selectable";
                }
                if (today.getTime() < value.date.date_info.getTime()) {
                    classToAdd = "selectable";
                    if (can == false) {
                        classToAdd = "noreach";
                    }

                }
                $("tr.weedays th").each(function () {
                    var row = $(this);
                    if (row.data("weekday") === weekday) {
                        column = row.data("column");
                        return;
                    }
                });
                if (value.date.day == confirmD && value.date.month == confirmM) {
                    $($($($("tr.days").get(row)).find("td").get(column)).addClass("active" + " " + currentDay).html(day));
                }
                else {
                    $($($($("tr.days").get(row)).find("td").get(column)).addClass(classToAdd + " " + currentDay).html(day));
                }
                currentDay = "";
                if (column == 6) {
                    row++;
                }
            });
        $("td.selectable").click(function () {
            dateClickHandler($(this), month);
        });
        $("td.active").click(function () {
            dateClickHandler($(this), month);
        });
    }
    initCalender(getMonth(new Date()));

    var clickCounter = 0;
    $(".fa-angle-double-right").click(function () {
        $(".right-wrapper").toggleClass("is-active");
        $(this).toggleClass("is-active");
    });

    function dateClickHandler(elem, month) {

        $("td").each(function () {
            if ($(this).hasClass("active")) {
                $(this).toggleClass("active");
                $(this).toggleClass("selectable");
            }
        });
        if (confirmD == $(elem).html() && confirmM == month) {
            confirmD = "";
            confirmM = "";
            $(".date_choose p").html("date");
        }
        else {
            $(elem).toggleClass("active");
            $(elem).toggleClass("selectable");
            confirmD = $(elem).html();
            confirmM = month;
            $(".date_choose p").html(numbermonth.get(confirmM) + "/" + confirmD);
        }
    }
    $(".fa-angle-left").click(function () {
        getPrevMonth();
        $(".content-wrapper").addClass("is-rotated-left");
        setTimeout(function () {
            $(".content-wrapper").removeClass("is-rotated-left");
        }, 195);
    });

    $(".fa-angle-right").click(function () {
        getNextMonth();
        $(".content-wrapper").addClass("is-rotated-right");
        setTimeout(function () {
            $(".content-wrapper").removeClass("is-rotated-right");
        }, 195);
    });
    calender_button.on('click', function () {
        if (click_cal == false) {
            $(".left-wrapper").css("display", "flex");
            click_cal = true;
        }
        else {
            $(".left-wrapper").css("display", "none");
            click_cal = false;
        }
    });
    var time_click = $(".time_icon1");
    var time_click_times = true;
    var reserve_data;
    var reserve_time = "";
    time_click.on('click', function () {
        var changepage = $(".time-wrapper");
        changepage.toggleClass("time-wrapper-change");
        if (time_click_times) {
            setTimeout(function () {
                $(".time-wrapper li p").css("left", "0");
                $(".time-wrapper li").css("color", "black");
                if (reserve_time != "") {
                    var temp = ("." + reserve_time);
                    $(temp).css("background", "black").css("color", "white");
                }
            }, 300);

            time_click_times = false;
        }
        else {
            setTimeout(function () {
                $(".time-wrapper li").css("color", "transparent");
                $(".time-wrapper li p").css("left", "-100%");
                $(".time-wrapper li").css("background", "white");
            }, 0);
            time_click_times = true;
        }
        $(".time-wrapper li").on({
            click: function () {
                $(this).siblings().css("background", "white").css("color", "black");
                $(this).css("background", "black").css("color", "white");
                reserve_time = $(this).data("i");
                $(".time_choose p").html($(this).data("time"));
            }
        });
    });
    $(".reserve_sub").on("click", function () {
        var data = new Map();
        if ($('.fill-name').val() == "" || $('.fill-tele').val() == "" || $('.fill-tele').val().match(/^09[0-9]{8}$/) == null || $(".date_choose p").html() == "date" || $(".time_choose p").html() == "time" || $('select[name="child"]').val() == "") {
            $(".fail").css("display", "block");
            return;
        }
        data.set("name", $('.fill-name').val());
        data.set("phone", $('.fill-tele').val());
        data.set("people", $('select[name="people"]').val());
        data.set("child", $('select[name="child"]').val());
        data.set("date", $(".date_choose p").html());
        data.set("time", $(".time_choose p").html());
        $(".fail").css("display", "none");
        $(".success").css("display", "block");
        reserve_data = JSON.stringify(Object.fromEntries(data));
        //ajax =>輸出完直接跳轉?
        $.ajax({
            type: 'POST',
            url:  '/reserve',
            data: {data1:reserve_data},
            datatype:'JSON',
            async:false,
            success: function(data) {
                location.href='/transition';
            } ,
            error:function(data){
                alert("發生錯誤，請稍後並重新嘗試");
            }
          });
    });
    $(".xx").on("click", function () {
        $(".fill_back").toggleClass("fillshow");
        $('.fill-name').val(""); 
        $('.fill-tele').val(""); 
        $('.fill-tele').val(""); 
        $(".date_choose p").html("date");
        $(".time_choose p").html("time");
        $('select[name="child"]').val("");
        
    });
    $(".re1").on("click", function () {
        $(".fill_back").toggleClass("fillshow");
    });
    var can_implement = false;
    var confirm_data_title = [$(".show_name"), $(".show_phone"), $(".show_people"), $(".show_child"), $(".show_time")];
    var confirm_data_data = [];
    var k_c = -1;
    var counter1 = 0;
    $(".return p,.confrim_return").on("click", function () {
        $(".confirm-name").val("");
        $(".confirm-tele").val("");
        can_implement = false;
        // change 9/16
        $("#confirm_route").attr("href", "javascript:void(0)");
        $(".confrim_fail").css("display", "none");
        $(".confrim_correct").css("display", "none");
        $(".fill_back1").toggleClass("fillshow");
    });
    function type1() {
        if (counter1 <= 4) {
            var itemc = confirm_data_title[counter1];
            var datac = confirm_data_data[counter1];
            itemc.addClass("blink");
            k_c++;
            if (datac.length == k_c) {
                counter1++;
                console.log(counter1);
                k_c = -1;
                itemc.removeClass("blink");
                setTimeout(type1, 20);
            }
            else {
                var TC = itemc.html() + datac[k_c];
                itemc.html(TC);
                setTimeout(type1, 20);
            }
        }
        else {
            counter1 = 0;
            clickfast = false;
        }
    }
    var clickfast = false;
    function changep(){
        location.href="/transition";
    }
    $(".re2").on("click", function () {
        if (!can_implement) {
            $(".implement").css("color", "rgb(159,159,159)")
            //change 9/16
            $("#confirm_route").attr("href", "javascript:void(0)");
            $(".implement p").css("cursor", "default");
        }
        else {
            $(".implement").css("color", "rgb(255,255,255)").css("cursor", "pointer");
            $("#confirm_route").attr("href", "/flask");
        }
        $(".fill_back1").toggleClass("fillshow");
        for (var i = 0; i <= 4; i++) {
            confirm_data_title[i].html("");
        }
        $(".text-wrap").unbind('click');
        $(".text-wrap").on("click", function () {
            if (clickfast) {
                return;
            }
            clickfast = true;
            for (var i = 0; i <= 4; i++) {
                confirm_data_title[i].html("");
            }
            var sname=$(".confirm-name").val();
            var stel=$(".confirm-tele").val();
            $.ajax({
                type: 'POST',
                url:  '/reservecheck',
                data: {"sname":sname,"stel":stel},
                datatype:'JSON',
                async:false,
                success: function(data) {
                    if(data=="fail") {
                        $(".confrim_fail").css("display", "block");
                        $(".confrim_correct").css("display", "none");
                        $(".implement").css("color", "rgb(159,159,159)")
                        $(".implement p").css("cursor", "default");
                        //change 9/16
                        $("#confirm_route").attr("href", "javascript:void(0)");
                        can_implement = false;
                        clickfast=false;
                        console.log("?");
                    }else{
                        var result=JSON.parse(data);
                        const dateObject = new Date();
                        const date = dateObject.getDate();
                        const month = dateObject.getMonth()+1;
                        console.log(result);
                        $(".confrim_fail").css("display", "none");
                        $(".confrim_correct").css("display", "block");
                        const dateStart= new Date();
                        const dateEnd= new Date();
                        var D=result.date.split("/");
                        dateStart.setFullYear(dateStart.getFullYear(), parseInt(D[0])-1, parseInt(D[1]));
                        dateEnd.setFullYear(dateStart.getFullYear(), parseInt(D[0])-1, parseInt(D[1]));
                        var DT=result.time.split(":");
                        dateStart.setHours(parseInt(DT[0]));
                        dateStart.setMinutes(parseInt(DT[1]));
                        dateStart.setSeconds(0);
                        dateEnd.setHours(parseInt(DT[0])+2);
                        dateEnd.setMinutes(parseInt(DT[1]));
                        dateEnd.setSeconds(0);
                        const nowDate= new Date();
                        console.log(typeof dateStart.getTime());
                        if((result.date==month+"/"+date) && dateStart.getTime()<=nowDate.getTime()&&nowDate.getTime()<dateEnd.getTime()){
                            $(".implement").css("color", "rgb(255,255,255)");
                            $(".implement p").css("cursor", "pointer");
                            $("#confirm_route").attr("href", "/flask");
                        }
                        else
                        {
                            if(nowDate.getTime()<dateStart.getTime())
                            {
                                $(".tooearly").removeClass("showornot"); 
                                setTimeout(changep,1500);
                            }
                            else if(nowDate.getTime()>dateEnd.getTime())
                            {                     
                                $(".overtime").removeClass("showornot"); 
                                setTimeout(changep,1500);
                            }
                        }
                        confirm_data_data.length=0;
                        confirm_data_data = [result.name, result.phone, result.people, result.child, result.date + " " + result.time];
                        can_implement = true;
                        setTimeout(type1, 100);
                        //資料呈現還沒用
                    }
                } ,
                error:function(data){
                    alert("發生錯誤，請稍後並重新嘗試");
                }
              });
        });
    });
    $(".maze_game").click(function(){
          location.href="/maze";
    });
    $(".catch_game").click(function(){
        location.href="handGame";
    });

});