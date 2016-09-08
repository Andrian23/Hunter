$(document).ready(function () {
    var speed = 10000; //скорість з якою будуть мінятись швидкість
    var level = 1;  //рівень
    var score = 0;
    var per = 5000; //інтервал для створення нової качки
    var timer = 59; //час ігри

    setInterval(function () {  //працюсе сам таймер
            setLvl();
            if (timer == 0) {
                finish();
            }
            timer--;
            $("#time").html(timer)
        }, 1000)

    function setLvl() {                        //провіряє який лвл
        $("#score").html(score)
        if (score > 5500) {
            speed = 3000;
            per = 1000;
            level = 5;
        }else if (score > 4000) {
            speed = 5000;
            per = 2000;
            level = 4;
        } else if (score > 2500) {
            speed = 7000;
            per = 3000;
            level = 3;
        } else if (score > 1000) {
            speed = 9000;
            per = 4000;
            level = 2;
        }
        $("#level").html(level)
    }

    function finish() {                           // закінчення ігри
        $(".header").css("display", "none");
        $("body").append("<div class='finish'><p>YOUR SCORE: " + score + "</p></div>")

    }

    function createNew() {                              //створює нову качку
        var h = Math.round(Math.random() * 300) + 45;
        var c = Math.round(Math.random()) + 1;
        var pos = "left"
        if (c > 1)
            pos = "right"
        $("body").append("<div style='top: " + h + "px' class='new " + pos + "'></div>")
        $(".left").animate({
            left: 105 + "%"
        }, speed);

        $(".right").animate({
            left: -5 + "%"
        }, speed);
        $(".new").mousedown(function () {
            score += 100;
            setLvl();
            $(this).stop();
            $(this).animate({
                top: 100 + '%'
            }, 2000)
        })


    }

    $(document).mousemove(function (e) {                  //при русі курсора рухається сіра сосиска (ствол) і приціл
        moveGun(e);
        setPric(e);
    });


    function setPric(e) {                                // забезпечує рух прицілу на місці курсора
        var p = document.getElementById('pricel');
        p.style.left = e.pageX - p.offsetWidth / 2 + 'px';
        p.style.top = e.pageY - p.offsetHeight / 2 + 'px';
    }

    loop();                                             //функція яка забезпечує інтервал між створеням качки
    function loop() {
        var time = Math.round(Math.random() * per);
        setTimeout(function () {
            createNew();
            loop();
        }, time);
    };


    function moveGun(e) {                                    // рух  ствола (функція просто ппц)
        var x1 = $('#gun').offset().left;
        var y1 = $('#gun').offset().top;
        var x2 = e.pageX;
        var y2 = e.pageY;
        var x3 = x2;
        var y3 = y1;
        var cos = (((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)) + ((x1 - x3) * (x1 - x3)) + ((y1 - y3) * (y1 - y3)) - ((x2 - x3) * (x2 - x3)) - ((y2 - y3) * (y2 - y3))) / (2 * Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2))) * Math.sqrt(((x1 - x3) * (x1 - x3)) + ((y1 - y3) * (y1 - y3))));
        var rad = Math.acos(cos)
        var degree = rad * 180 / Math.PI;
        if (x1 > x2) {
            degree += 180;
        }
        if (x1 < x2) {
            degree = -degree;
        }
        $('#gun').css({
            "transform": "rotate(" + degree + "deg)"
        });

    }
})
