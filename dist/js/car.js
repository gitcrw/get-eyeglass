"use strict";!function(){function p(t){var n=document.cookie.split("; "),e=!0,o=!1,a=void 0;try{for(var i,r=n[Symbol.iterator]();!(e=(i=r.next()).done);e=!0){var l=i.value.split("=");if(t==l[0])return l[1]}}catch(t){o=!0,a=t}finally{try{!e&&r.return&&r.return()}finally{if(o)throw a}}}($("#ajax_top").load("modelhtml/top.html"),p("login"))?new Promise(function(n){$.ajax({type:"post",url:"../api/car.php",data:{userphone:p("login")},success:function(t){n(t)}})}).then(function(t){var n=JSON.parse(t).map(function(t){return'<div class="cart_goods_item">\n\t\t\t\t\t<ul gid="'+~~t.gid+'">\n\t\t\t\t\t\t<li><img src="../d_image/'+~~t.gid+'/1.jpg" alt="" /><a href="detail.html?'+~~t.gid+'" target="_blank"><span>'+t.name+'</span></a></li>\n\t\t\t\t\t\t<li>\n\t\t\t\t\t\t\t<div class="count">-</div>\n\t\t\t\t\t\t\t<input type="text" value="1" class="goods_num_input"/>\n\t\t\t\t\t\t\t<div class="add">+</div>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t\t<li>￥<span class="price">'+(t.now_price-0).toFixed(2)+'</span></li>\n\t\t\t\t\t\t<li>￥<span class="xiaoji">'+(t.now_price-0).toFixed(2)+'</span></li>\n\t\t\t\t\t\t<li class="delbtn">删除</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>'}).join("");document.querySelector(".car_goods_info").innerHTML=n,new Promise(function(n){$.ajax({type:"post",url:"../api/carnum.php",data:{userphone:p("login")},success:function(t){n(t)}})}).then(function(t){for(var n=JSON.parse(t),e=document.querySelectorAll(".goods_num_input"),o=0;o<e.length;o++)e[o].value=n[o];var a=0;function i(){$(".cart_goods_item").size()<=0&&($(".car_goods").css("display","none"),$(".car_null").css("display","block"))}function r(t){for(var n=document.querySelectorAll(".cart_goods_item"),e=0;e<n.length;e++){var o=n[e].querySelector(".goods_num_input").value-0,a=n[e].querySelector(".price").innerHTML;n[e].querySelector(".xiaoji").innerHTML=((o+t)*a).toFixed(2)}}function l(){var e=0;return $(".xiaoji").each(function(t,n){e+=+$(this).html()}),e.toFixed(2)}function c(t){var e=0;return $(".goods_num_input").each(function(t,n){e+=+$(this).val()}),e+t}$(".add").on("click",function(){a++;var n=$(this),t=n.parent().parent().attr("gid");$.ajax({type:"post",url:"../api/addcar.php",data:{userphone:p("login"),gid:t,num:a,one:"one"},success:function(t){n.prev().val(t)}}),a=0;var e=n.parent().parent().find(".price").html(),o=n.parent().parent().find(".goods_num_input").val()-0;n.parent().parent().find(".xiaoji").html((e*(o+1)).toFixed(2)),$("#total_money").html(l()),$("#end_price").html(l()),$("#goods_num").html(c(1))}),$(".count").on("click",function(){a--;var n=$(this),t=n.parent().parent().attr("gid");n.next().val()<=1&&(confirm("你确定要删除吗")&&(n.parent().parent().parent().remove(),$.ajax({type:"post",url:"../api/addcar.php",data:{userphone:p("login"),gid:t,num:"",one:"one",delete:"delete"},success:function(t){i(),$("#total_money").html(l()),$("#end_price").html(l()),$("#goods_num").html(c(0))}})));$.ajax({type:"post",url:"../api/addcar.php",data:{userphone:p("login"),gid:t,num:a,one:"one"},success:function(t){n.next().val(t)}}),a=0;var e=n.parent().parent().find(".price").html(),o=n.parent().parent().find(".goods_num_input").val()-0;n.parent().parent().find(".xiaoji").html((e*(o-1)).toFixed(2)),$("#total_money").html(l()),$("#end_price").html(l()),$("#goods_num").html(c(-1))}),$(".goods_num_input").keyup(function(){var t=$(this);now_val=t.val()-0,now_val<=0&&(now_val=1,t.val(1),alert("请输入正确商品数量"));var n=t.parent().parent().attr("gid");$.ajax({type:"post",url:"../api/addcar.php",data:{userphone:p("login"),gid:n,num:now_val,one:"one",upnum:"upnum"}}),r(0),$("#total_money").html(l()),$("#end_price").html(l()),$("#goods_num").html(c(0))}),$(".delbtn").click(function(){var t=$(this),n=t.parent().attr("gid");confirm("你确定要删除吗？")&&(t.parent().parent().remove(),$.ajax({type:"post",url:"../api/addcar.php",data:{userphone:p("login"),gid:n,num:"",one:"one",delete:"delete"}}),i()),$("#total_money").html(l()),$("#end_price").html(l()),$("#goods_num").html(c(0))}),$("#banner_btn").click(function(){if(1<=$(".cart_goods_item").size()){console.log($(".cart_goods_item"));var o=confirm("是否结算？")}if(o){$("#total_money").html((0).toFixed(2)),$("#end_price").html((0).toFixed(2)),$("#goods_num").html(0),alert("结算成功!")}$(".cart_goods_item").each(function(t,n){var e=$(this).find("ul").attr("gid");o&&($.ajax({type:"post",url:"../api/addcar.php",data:{userphone:p("login"),gid:e,num:"",one:"one",delete:"delete"}}),$(".cart_goods_item").each(function(t,n){n.remove()}),i())})}),console.log($(".cart_goods_item").size()),i(),r(0),$("#total_money").html(l()),$("#end_price").html(l()),$("#goods_num").html(c(0))})}):($(".car_goods").css("display","none"),$(".car_null").css("display","block"),alert("你还没有登录！"))}();