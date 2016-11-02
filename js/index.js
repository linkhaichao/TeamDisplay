var scrollPic = function () {
    var slider = $('#slider').get(0);
    var width = slider.offsetWidth;
    console.log(width);
    var imgBox = slider.children[0];
    var index = 1;
    var timer = null;
    var $ul = $('#slider').find('ul');
    /*li的个数*/
    var imgLength=$('#slider').children('ul').children('li').length;
    var isScroll = 1;
    //width=Math.ceil(width/3);
    imgBox.style.transform = "translateX(" + index * width * (-1) + "px)";
    imgBox.style.webkitTransform = "translateX(" + index * width * (-1) + "px)";

//    加过渡
    function addTransition() {
        imgBox.style.transition = "all 1.5s ease 0s";
        imgBox.style.webkitTransition = "all 1.5s ease 0s";
    }

//    除去过渡
    function removeTransition() {
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";

    }

    //图片移动
    function setTransform(t) {

        imgBox.style.transform = "translateX(" + t + "px)";
        imgBox.style.webkitTransform = "translateX(" + t + "px)";

    }


    function autoPlay() {
        index++;
        addTransition();
        setTransform(-index * width);
    }

    //定时器
    //timer = setInterval(autoPlay,3000);

    //添加每张图片过渡完成时的事件
    imgBox.addEventListener("transitionEnd", function () {
        if (index >=(imgLength-1)) {
            index = 1;
        } else if (index <= 0) {
            index = imgLength-2;
        }
        removeTransition();
        setTransform(-index * width);
    }, false);

    imgBox.addEventListener('webkitTransitionEnd', function () {
        console.log(index);
        isScroll = 1;
        if (index <= 0) {
            index = 3;
        }
        if (index >= 4) {
            index = 1;
        }
        removeTransition();
        setTransform(-index * width);
    }, false);
    var startX = 0;
    var endX = 0;
    //    触摸开始
    slider.addEventListener('touchstart', function (e) {
        e.stopPropagation();
        e.preventDefault();
        //开始的坐标
        startX = e.touches[0].clientX;
        console.log(startX);
    }, false);
    //触摸移动
    imgBox.addEventListener("touchmove", function (e) {
        e.preventDefault();
        clearInterval(timer);
        //移动的坐标
        endX = e.touches[0].clientX;
        var result = startX - endX;
        removeTransition();
        //移动的距离
        setTransform(-index * width - result);
    }, false);
    //触摸结束
    imgBox.addEventListener("touchend", function (e) {
        e.preventDefault();
        var result = startX - endX;
        //移动的距离大于屏幕的三分之一时，就滚动到下一张图片，否则滚动到原来的位置
        if (Math.abs(result) > width / 3) {
            result > 0 ? index++ : index--;
        }
        addTransition();
        setTransform(-index * width); //吸附效果
        //滚动式圆点也跟着改变
        var i = index;
        if (i >= 4) {
            i = 1;
        } else if (i <= 0) {
            i = 3;
        }
        //清除定时器
        clearInterval(timer);
        startX = 0;
        endX = 0;
        //开始定时器
        timer = setInterval(autoPlay, 5000);

    }, false);

    var old = new Date().getTime();
    /*前一张*/
    $('.qian').on('click', function (e) {
        if (isScroll) {
            index++;
            addTransition();
            setTransform(-index * width); //吸附效果
        }
        isScroll = 0;
    });
    /*下一张*/
    $('.xia').on('click', function (e) {
        if (isScroll) {
            index--;
            addTransition();
            setTransform(-index * width);
        }
        isScroll = 0;
    });
    $('#teamIntroduce .container >span').hover(function () {
        //清除定时器
        clearInterval(timer);
    }, function () {
        //开始定时器
        timer = setInterval(autoPlay, 5000);
    })
    $('#slider').hover(function () {
        //清除定时器
        clearInterval(timer);
    }, function () {
        //开始定时器
        //timer = setInterval(autoPlay, 3000);
    })
};
$(function () {
    /*关于我们*/
    $(window).on('load', function () {
        $('#teamIndex .container>div:nth-of-type(2)').animate(
            {
                opacity: 1
            }
            ,1000, function () {
                $('.wel1').fadeIn(700, function () {
                    $('.wel2').fadeIn(700);
                })
            })
    });
    /*团队介绍*/
    $('.all  .fr span.active').siblings().hover(function () {
        $(this).css({
            'border-bottom': "3px solid #1da9eb"
        });
    }, function () {
        $(this).css({
            'border-bottom': "none"
        });
    });


    /*轮播图*/
    scrollPic();

    /*鼠标放在图片上浮现双箭头*/

    /*滚动事件*/
    $('.panel').css({'height': $(window).height()});
    function scrollPage() {
        $.scrollify({
            section: '.panel',
            before: function (e) {
                if (e == 2) {
                    $('#teamAbout .row>div:nth-of-type(1)').addClass('durationOneAbout');
                    $('#teamAbout .row>div:nth-of-type(2)').addClass('durationTwoAbout');
                    $('#teamAbout .row>div:nth-of-type(3)').addClass('durationThreeAbout');
                }
                //alert('将要滚动');
            },
            after: function (e) {
                //alert('滚动完成');
            }
        });
    }

    scrollPage();

    /*关于我们模块*/
    $('.aboutAll').hover(function () {
        $(this).find('.inner').css({
            'backgroundColor': 'rgba(9,106,153,.8)'
        }).children('span').css('color', '#fff');
        $(this).find('.txtCon').show();
    }, function () {
        $(this).find('.inner').css({
            'backgroundColor': 'transparent'
        }).children('span').css('color', '#1da9eb');
        $(this).find('.txtCon').css("display", 'none');
    })

    $('.conImg').on('click', function () {

        //禁止滚动条
        $.scrollify({
            section: '#teamIntroduce',
            before: function (e) {

            },
            after: function (e) {
                //alert('滚动完成');
            }
        });

    });
    /*弹出模态框*/
    $('#personDetail').on('hidden.bs.modal', function (e) {
        scrollPage();
    });
    $('#personDetail').on('show.bs.modal', function (e) {
        //启用滚动条
        $(document.body).css({
            'overflow': 'hidden'
        });
    });

    /*点击主要成就*/
    $('.achiveName').on('click', function () {
        if ($(this).children('span').hasClass("icon-comiisjiahao")) {
            $(this).children('span').removeClass('icon-comiisjiahao').addClass('icon-asmkticon0224');
            $(this).siblings('.achiveCon').slideDown();
        } else {
            $(this).children('span').removeClass('icon-asmkticon0224').addClass('icon-comiisjiahao');
            $(this).siblings('.achiveCon').slideUp();
        }

    })

    /*绑定滚轮事件*/
    $('#personDetail').bind('mousewheel', function (event) {
        event.preventDefault();
        var scrollTop = this.scrollTop;
        this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -1));
        //console.log(event.deltaY, event.deltaFactor, event.originalEvent.deltaMode, event.originalEvent.wheelDelta);
    });

    $('.suoyin').on('click', 'span', function () {
        var num = $(this).data('id');
        num = num - 0;
        var hight = $(document.body).height() / 5;
        $(document.body).animate({
            'scrollTop': (hight * num) + 'px'
        }, 800);
    });

    $('.welcome').on('click', function () {
        var hight = $(document.body).height() / 5;
        $(document.body).animate({
            'scrollTop': (hight * 1) + 'px'
        }, 800);
    });
    $('.all .fl').on('click', function () {
        $(document.body).animate({
            'scrollTop': 0 + 'px'
        }, 800);
    })
});