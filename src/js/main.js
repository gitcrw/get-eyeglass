/* 
* @Author: Marte
* @Date:   2019-05-21 19:03:54
* @Last Modified by:   Marte
* @Last Modified time: 2019-05-21 21:03:46
*/
(function() {
        $('#ajax_top').load('modelhtml/top.html');
        $('#ajax_main_header').load('modelhtml/main_header.html');

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

            
})()