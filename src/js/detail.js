/* 
 * @Author: Marte
 * @Date:   2019-05-27 16:57:43
 * @Last Modified by:   Marte
 * @Last Modified time: 2019-05-29 17:13:41
 */
(function() {
	$('#ajax_top').load('modelhtml/top.html');
	$('#ajax_header').load('modelhtml/main_header.html');

	function big(ele) {
		var fdj = document.getElementById(ele);
		var pic = fdj.firstElementChild;
		var bigpic = fdj.lastElementChild;
		var box = pic.lastElementChild;
		var bimg = bigpic.lastElementChild;
		pic.onmouseenter = function() {
			box.style.display = 'block';
			bigpic.style.display = 'block';
		}
		pic.onmouseleave = function() {
			box.style.display = 'none';
			bigpic.style.display = 'none';
		}
		pic.onmousemove = function(ev) {
			var x = ev.clientX; //鼠标
			var y = ev.clientY;
			var l = pic.offsetLeft; //pic相对视口
			var t = pic.offsetTop;
			var left = x - l - box.offsetWidth / 2; //小方块的距离
			var top = y - t - box.offsetHeight / 2;
			if(left <= 0) {
				left = 0;
			} else if(left >= pic.offsetWidth - box.offsetWidth) { //最大滑动距离
				left = pic.offsetWidth - box.offsetWidth;
			}
			if(top <= 0) {
				top = 0;
			} else if(top >= pic.offsetHeight - box.offsetHeight) {
				top = pic.offsetHeight - box.offsetHeight;
			}
			box.style.left = left + 'px';
			box.style.top = top + 'px';
			// 滑动比例
			var w = left / (pic.offsetWidth - box.offsetWidth);
			var h = top / (pic.offsetHeight - box.offsetHeight);
			// 最大滑动距离 大图片-图片展示
			var b_l = bimg.offsetWidth - bigpic.offsetWidth;
			var b_t = bimg.offsetHeight - bigpic.offsetHeight;
			bimg.style.left = -b_l * w + 'px';
			bimg.style.top = -b_t * h + 'px';
		}
	}
	big('fdj');
	var picimg = document.getElementById('picimg');
	var bigimg = document.getElementById('bigimg');
	var picul = document.getElementsByClassName('picul')[0];
	var piclis = picul.children;
	picul.onmouseover = function(ev) {
		var imgurl = ev.target.src;
		picimg.src = imgurl;
		bigimg.src = imgurl;
	}
	//选择颜色
	//根据id查询数据渲染
	var data = decodeURI(location.search);
	var gid = data.slice(1);
	var imgurl = document.getElementsByClassName('picul')[0];
	var picimg = document.getElementById('picimg');
	var bigimg = document.getElementById('bigimg');
	var goods_name = document.getElementById('goods_name');
	var now_price = document.querySelector('.now_price');
	var prev_price = document.querySelector('.prev_price');
	var fhd_where = document.querySelector('.fhd_where');
	var goods_id = document.querySelector('#goods_id');
	var kc_num = document.querySelector('#kc_num');
	var js_price = document.querySelector('.js_price');
	var xr = new Promise(function(resolve) {
		$.ajax({
			type: 'get',
			url: '../api/detail.php',
			data: {
				gid: gid
			},
			success: function(str) {
				resolve(str);
			}
		})
	});
	xr.then(function(str) {
		var obj = JSON.parse(str)[0];
		console.log(obj)
		goods_name.innerHTML = obj.name;
		now_price.innerHTML = '¥' + (obj.now_price * 1).toFixed(2);
		prev_price.innerHTML = '¥' + (obj.prev_price * 1).toFixed(2);
		fhd_where.innerHTML = obj.place;
		goods_id.innerHTML = obj.gcode;
		kc_num.innerHTML = obj.num;
		js_price.innerHTML = '¥' + (obj.prev_price - obj.now_price).toFixed(2);
		var imgarr = obj.imgUrl.split(',');
		//渲染
		var html = imgarr.map(function(item) {
			return `<img src="../d_image/${~~obj.gid}/${item}">`
		}).join('');
		picimg.src = '../d_image/' + ~~obj.gid + '/' + imgarr[0];
		bigimg.src = '../d_image/' + ~~obj.gid + '/' + imgarr[0];
		imgurl.innerHTML = html;
		//ajax渲染后才能执行
		$('.picul img').eq(0).attr('class', 'active');
		$('.picul img').on('mouseenter', function() {
			$(this).attr('class', 'active').siblings().attr('class', '');
		})
		//页面加载刷新购物车渲染
		var carnum = 0; //购物车所有商品总量
		var car_goods_num = 0; //购物车当前商品数量
		var ajax2 = new Promise(function(resolve) {
//			if(getCookie('login')) {
				$.ajax({
					type: 'post',
					url: '../api/addcar.php',
					data: {
						userphone: getCookie('login'),
						gid: gid,
						num: ''
					},
					success: function(str) {
						if(str == '') {
							// $('#car_num').html(0);
						} else {
							$('#car_num').html(str);
							carnum = str - 0;
						}
					}
				})
				$.ajax({
					type: 'post',
					url: '../api/kucun.php',
					data: {
						userphone: getCookie('login'),
						gid: gid
					},
					success: function(str) {
						car_goods_num = str - 0;
						resolve(str);
					}
				})
//			}else{
//				alert('你还没有登录呢');
//			}
		})
		ajax2.then(function(str) {
			//页面库存量 = 数据库存量 - 当前商品在购物车里的数量
			if(getCookie('login')){
				
				var now_kun_num = obj.num - car_goods_num;
				if(now_kun_num <= 0) {
					kc_num.innerHTML = 0;
				} else {
					kc_num.innerHTML = now_kun_num;
				}
			}
			//数量选择
			//加
			$('.select_num').on('click', '.add', function() {
				var kuncun = $('#kc_num').html();
				var num = $(this).prev().val();
				num++;
				if(num >= kuncun) {
					if(kuncun > 0) {
						num = kuncun;
					} else {
						num = 1;
					}
				}
				$(this).prev().val(num);
			})
			//减
			$('.select_num').on('click', '.minus', function() {
				var kuncun = $('#kc_num').html();
				var num = $(this).next().val();
				num--;
				if(num <= 1) {
					num = 1;
				}
				$(this).next().val(num);
			})
			//手动输入
			$('.select_num').on('input click', 'input', function() {
				var kuncun = $('#kc_num').html();
				var num = $(this).val() - 0;
				if(num <= 1) {
					num = 1;
				} else if(num >= kuncun) {
					if(kuncun > 0) {
						num = kuncun;
					} else {
						num = 1;
					}
				}
				$(this).val(num);
			})
			//购物车动画
			var buyok = true;
			$('#add_car').on('click', function() {
				kuncun = $('#kc_num').html() - 0;
				if(getCookie('login')) {
					if(buyok) {
						buyok = false;
						var buy_num = $('.select_num input').val();
						if(buy_num > kuncun) {
							$('.select_num input').val(1);
							alert('库存不足');
							buyok = true;
						} else {
							$('#kc_num').html(kuncun - buy_num);
							carnum += buy_num - 0;
							var img = document.createElement('img');
							img.className = 'car_img';
							img.src = $('#picimg').attr('src');
							document.body.appendChild(img);
							$('.car_img').animate({
								marginLeft: 570,
								marginTop: 270
							}, 600, function() {
								buyok = true;
								$('.car_img').animate({
									marginTop: 320,
									opacity: 0
								}, 400, function() {
									$(this).remove()
								})
							});
							$('#car_num').html(carnum)
							//添加到数据库购物车
							$.ajax({
								type: 'post',
								url: '../api/addcar.php',
								data: {
									userphone: getCookie('login'),
									gid: gid,
									num: buy_num
								},
								success: function(str) {
									// $('#car_num').html(str);
								}
							})
						}
					}
				} else {
					alert('你还没有登录呢');
				}
			})
		})
	})

	function getCookie(key) {
		var str = document.cookie;
		var arr = str.split('; ');
		for(var i of arr) {
			var arr2 = i.split('=');
			if(key == arr2[0]) {
				return arr2[1];
			}
		}
	}
	// Promise.all([ajax2,xr]).then(function(str) {
	//     //
	// })
})()