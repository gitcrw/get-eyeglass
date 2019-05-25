/* 
* @Author: Marte
* @Date:   2019-05-21 19:03:54
* @Last Modified by:   Marte
* @Last Modified time: 2019-05-25 14:34:14
*/
(function() {
        $('#ajax_top').load('modelhtml/top.html');
        $('#ajax_main_header').load('modelhtml/main_header.html');
        $('#ajax_main_bottom').load('modelhtml/footer.html');

        // 轮播图背景颜色
        var bg_color = ['rgb(224, 216, 213)','rgb(254, 246, 249)','rgb(255, 255, 255)','rgb(255, 255, 255)','rgb(211, 231, 248)','rgb(235, 212, 246)','rgb(255, 255, 255)'];
        //轮播图
        var swiper = new Swiper('.swiper-container', {

          effect: 'fade',
          // grabCursor: true,
          speed:1000,
          loop: true,
          autoplay: {
            delay: 2000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
          },
          on:{
            slideChange: function(){
              // console.log(this.realIndex)
              $('#banner_bg').css('background',bg_color[this.realIndex]);//图片更换时拿到下标切换背景
            },
          },
        });
        var oBox = document.getElementsByClassName('swiper-container')[0];
        oBox.onmouseover = function() {
           swiper.autoplay.stop();
        }
        oBox.onmouseout = function() {
          swiper.autoplay.start();
        }
        // 促销活动切换选项卡
        $('#hot_title_l').hover(function() {
            $(this).attr('class','active').siblings().attr('class','');
            $('#info_list1').attr('class','show').siblings().attr('class','');
        })
        $('#hot_title_r').hover(function() {
            $(this).attr('class','active').siblings().attr('class','');
            $('#info_list2').attr('class','show').siblings().attr('class','');
        })
        //今日秒杀选项卡
        $('#sec_kill_box').hover(function() {
            $(this).css('background-position','0px 0px').siblings().css('background-position','0px -91px');
            $('#sec_kill_list').css('display','block').siblings().css('display','none');
        })
        $('#val_pay_box').hover(function() {
            $(this).css('background-position','0px -273px').siblings().css('background-position','0px -182px');
            $('#val_pay_list').css('display','block').siblings().css('display','none');
        })
        //自定义轮播图
        /*
    样式
    .twoF_content_l_banner{
        position: relative;
        height: 360px;
        width: 210px;
        overflow:hidden;
        float:left;
    }
    .twoF_content_l_banner ul{
        position: absolute;
        height: 243px;
     }
     .twoF_content_l_banner ul li{
        position:absolute;
        top: 0;
        left: 0;
     }
    .twoF_content_l_banner p{
        position: absolute;
        bottom: 5px;
    }
    .twoF_content_l_banner p span{
        display:inline-block;
        width: 40px;
        height: 5px;
        background:#666;
        margin-right: 5px;
    }
    .twoF_content_l_banner p span.show{
        background:#fff;
    }
         */ 
        function myLunBoTu(ele,time) {
            var nowpic = 0;//当前图片
            var banner = document.querySelector(ele);//轮播图
            var ul = banner.children[0];
            var jqul = $(ele).children().eq(0);
            var list = ul.getElementsByTagName('li');
            var iw = $(ele).css('width').slice(0, -2) - 0;//轮播图宽度
            var len = list.length;
            var points = document.createElement('p');
            for(var i = 0; i < len; i++) {
                list[i].style.left = iw*i + 'px';//排列位置
                var span = document.createElement('span');//生成页数
                // span.innerHTML = i + 1;
                points.appendChild(span);
                span.className ='point';
            }
            banner.appendChild(points);
            //页数居中
            points.style.left = (banner.clientWidth/2)-(points.clientWidth/2) + 'px';
            // 设置ul宽度，实现水平排列效果
            ul.style.width = banner.clientWidth * len + 'px';
            var direction = true;//定义方向
            function movepic() {
                if(direction) {
                    nowpic++;
                    jqul.animate({'left':-nowpic*iw},800);
                    if(nowpic >= len-1) {
                        direction = false;
                    }
                    
                }else {
                    nowpic--;
                    jqul.animate({'left':-nowpic*iw},800); 
                    if(nowpic <= 0) {
                        direction = true;
                    }
                    
                }
                pageshow();
            }
            //当前页数高亮
            var jqspan = $(ele).children().eq(1).children();
            jqspan.eq(0).attr('class','point show');
            function pageshow() {
                jqspan.eq(nowpic).attr('class','point show').siblings().attr('class','point');
            }
            // //鼠标滑过切换
            jqspan.hover(function() {
                nowpic = $(this).index();
                if(nowpic <= 0) {
                    direction = true;
                }else if(nowpic >= len - 1) {
                    direction = false;
                }
                jqul.stop(true).animate({'left':-nowpic*iw},800)
                pageshow();
            })
            
            //鼠标移进停止
            banner.onmouseover = function() {
                clearInterval(timer);
            }
            banner.onmouseout = function() {
                timer = setInterval(movepic,time);
            }
            var timer;
            timer = setInterval(movepic,time);
        }
        myLunBoTu('.oneF_banner_show',2000);
        myLunBoTu('.twoF_content_l_banner',2000);
        myLunBoTu('.twoF_content_r_banner',2000);
        myLunBoTu('.threeF_content_l_banner',2000);
        myLunBoTu('.threeF_content_r_banner',2000);
        myLunBoTu('.fourF_content_l_banner',2000);
        myLunBoTu('.fourF_content_r_banner',2000);
        myLunBoTu('.fiveF_banner_show',2000);

        //门店选项卡
        //第一个高亮
        var now_num = 0;
        $('.tab ul li').eq(0).css({'background':'#94c51b','color':'#fff'});
        $('.tit li').eq(0).css('display','block');
        $('.left_t').css('background-position','0px top');
        $('.center li').eq(0).css('display','block');
        $('.right li').eq(0).css('display','block').siblings().css('display','none');
        $('.right li').eq(0).children().eq(0).css('display','block').siblings().css('display','none');

        $('.tab ul li').hover(function() {
            $(this).css({'background':'#94c51b','color':'#fff'}).siblings().css({'background':'#fff','color':'#666666'});
            var index = $(this).index();
            now_num = index;
            $('.tit li').eq(index).css('display','block').siblings().css('display','none');
            $('.center li').eq(index).css('display','block').siblings().css('display','none');
            if($('.left_b').css('background-position') == '0px 100%') {
                cl(1)
                rlc(1);
            }else{
                cl(0);
                rlc(0);
            }
            rl();
        })
        $('.left_t').hover(function() {
            $(this).css('background-position','0px top').siblings().css('background-position','0px -136px');
             cl(0);
             rl();
             rlc(0);
        });
        $('.left_b').hover(function() {
            $(this).css('background-position','0px bottom').siblings().css('background-position','0px -274px');
            cl(1);
            rl();
            rlc(1);
        });
        function rl() {
            $('.right li').eq(now_num).css('display','block').siblings().css('display','none');
        }
        function rlc(index) {
            $('.right li').eq(now_num).children().eq(index).css('display','block').siblings().css('display','none');
        }
        function cl(index) {
            $('.center li').eq(now_num).children().eq(index).css('display','block').siblings().css('display','none');
        }
        //问题解答选项卡
        $('.comment .tab span').eq(0).css({'background':'#fff','color':'#666666'});
        $('.comment .tab span').hover(function() {
            $(this).css({'background':'#fff','color':'#666666'}).siblings().css({'background':'#94c51b','color':'#fff'})
            var index = $(this).index();
            $('.comment .info ul').eq(index).css('display','block').siblings().css('display','none');
        })
        //联系选项卡
        $('.weixin').hover(function() {
            $(this).parent().css('background-position','0px 0px');
            $('.weixinpic').css('display','block').siblings().css('display','none');
        })
        $('.weibo').hover(function() {
            $(this).parent().css('background-position','0px -50px');
            $('.weibopic').css('display','block').siblings().css('display','none');
        })
        //左侧菜单
        window.onscroll = function() {
            var y = window.scrollY;
            if(y >= 580) {
                $('.pf_left').fadeIn();
            }else{
                $('.pf_left').fadeOut();
            }
        }
})()