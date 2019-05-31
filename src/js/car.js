(function() {
	$('#ajax_top').load('modelhtml/top.html');

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

	if(getCookie('login')) {

		var car_goods = new Promise(function(resolve) { //用户购物车所有商品
			$.ajax({
				type: "post",
				url: "../api/car.php",
				data: {
					userphone: getCookie('login')
				},
				success: function(str) {
					resolve(str);
				}
			});
		})

		car_goods.then(function(data) {
			var obj = JSON.parse(data);

			var html = obj.map(function(item) {
				const gid = ~~item.gid;
				return `<div class="cart_goods_item">
					<ul gid="${gid}">
						<li><img src="../d_image/${~~item.gid}/1.jpg" alt="" /><a href="detail.html?${~~item.gid}" target="_blank"><span>${item.name}</span></a></li>
						<li>
							<div class="count">-</div>
							<input type="text" value="1" class="goods_num_input"/>
							<div class="add">+</div>
						</li>
						<li>￥<span class="price">${(item.now_price -0).toFixed(2)}</span></li>
						<li>￥<span class="xiaoji">${(item.now_price -0).toFixed(2)}</span></li>
						<li class="delbtn">删除</li>
					</ul>
				</div>`
			}).join('');

			var car_goods_info = document.querySelector('.car_goods_info');
			car_goods_info.innerHTML = html;

			var goods_num = new Promise(function(resolve) { //商品数量
				$.ajax({
					type: "post",
					url: "../api/carnum.php",
					data: {
						userphone: getCookie('login')
					},
					success: function(str) {
						resolve(str);
					}
				});
			})
			goods_num.then(function(data) {
				var obj = JSON.parse(data);
				var goods_num = document.querySelectorAll('.goods_num_input');
				for(var i = 0; i < goods_num.length; i++) {
					goods_num[i].value = obj[i];
				}

				//数量修改
				var num = 0;
				$('.add').on('click', function() { //单个商品数量
					num++;
					var now = $(this);
					var gid = now.parent().parent().attr('gid');
					$.ajax({
						type: 'post',
						url: '../api/addcar.php',
						data: {
							userphone: getCookie('login'),
							gid: gid,
							num: num,
							one: 'one'
						},
						success: function(str) {
							now.prev().val(str);
						}
					})
					num = 0;
					//价格计算
					var price = now.parent().parent().find('.price').html();
					var item_num = now.parent().parent().find('.goods_num_input').val() - 0;
					now.parent().parent().find('.xiaoji').html((price * (item_num + 1)).toFixed(2));
					$('#total_money').html(total());
					$('#end_price').html(total());
					$('#goods_num').html(allnum(1));
				})
				$('.count').on('click', function() {
					num--;
					var now = $(this);
					var gid = now.parent().parent().attr('gid');
					if(now.next().val() <= 1) {
						var ok = confirm('你确定要删除吗');
						if(ok) {
							(now.parent().parent().parent()).remove();
							$.ajax({
								type: 'post',
								url: '../api/addcar.php',
								data: {
									userphone: getCookie('login'),
									gid: gid,
									num: '',
									one: 'one',
									delete: 'delete'
								},
								success: function(str) {

								}
							})
						}
					} else {
						//					return;
					}
					$.ajax({
						type: 'post',
						url: '../api/addcar.php',
						data: {
							userphone: getCookie('login'),
							gid: gid,
							num: num,
							one: 'one'
						},
						success: function(str) {
							if(str <= 0) {

							}
							now.next().val(str);
						}
					})
					num = 0;
					//价格计算
					var price = now.parent().parent().find('.price').html();
					var item_num = now.parent().parent().find('.goods_num_input').val() - 0;
					now.parent().parent().find('.xiaoji').html((price * (item_num - 1)).toFixed(2));
					$('#total_money').html(total());
					$('#end_price').html(total());
					$('#goods_num').html(allnum(-1));
				})
				//手动输入
				$('.goods_num_input').keyup(function() {
					var now = $(this);
					now_val = now.val() - 0;
					if(now_val <= 0) {
						now_val = 1;
						now.val(1)
						alert('请输入正确商品数量')
					}
					var gid = now.parent().parent().attr('gid');
					$.ajax({
						type: 'post',
						url: '../api/addcar.php',
						data: {
							userphone: getCookie('login'),
							gid: gid,
							num: now_val,
							one: 'one',
							upnum: 'upnum'
						},
					})
					xiaoji(0);
					$('#total_money').html(total());
					$('#end_price').html(total());
					$('#goods_num').html(allnum(0));
				})

				//删除
				$('.delbtn').click(function() {
					var now = $(this);
					var gid = now.parent().attr('gid');
					var ok = confirm('你确定要删除吗？')
					if(ok) {
						(now.parent().parent()).remove();
						$.ajax({
							type: "post",
							url: "../api/addcar.php",
							data: {
								userphone: getCookie('login'),
								gid: gid,
								num: '',
								one: 'one',
								delete: 'delete'
							},
						});
						checkgoods();
					}
					$('#total_money').html(total());
					$('#end_price').html(total());
					$('#goods_num').html(allnum(0));
				})

				//点击结算
				$('#banner_btn').click(function() {
					if($('.cart_goods_item').size() >= 1) {
						console.log($('.cart_goods_item'))
						var ok = confirm('是否结算？');
					}
					if(ok) {
						var number = 0
						$('#total_money').html(number.toFixed(2));
						$('#end_price').html(number.toFixed(2));
						$('#goods_num').html(0);
						alert('结算成功!');
					}
					$('.cart_goods_item').each(function(i, item) {
						var gid = $(this).find('ul').attr('gid');

						if(ok) {
							$.ajax({
								type: "post",
								url: "../api/addcar.php",
								data: {
									userphone: getCookie('login'),
									gid: gid,
									num: '',
									one: 'one',
									delete: 'delete'
								},
							});

							$('.cart_goods_item').each(function(i, item) {
								item.remove();
							})
							checkgoods();
						}
					})

				})
				//检查是否有商品
				console.log($('.cart_goods_item').size())

				function checkgoods() {
					if($('.cart_goods_item').size() <= 0) {
						$('.car_goods').css('display', 'none');
						$('.car_null').css('display', 'block');
					}
				}
				checkgoods();

				function xiaoji(num) {
					var cart_goods_item = document.querySelectorAll('.cart_goods_item');
					for(let i = 0; i < cart_goods_item.length; i++) {
						var item_num = cart_goods_item[i].querySelector('.goods_num_input').value - 0;
						var price = cart_goods_item[i].querySelector('.price').innerHTML;
						cart_goods_item[i].querySelector('.xiaoji').innerHTML = ((item_num + num) * price).toFixed(2);
					}
				}

				function total() {
					var total = 0;
					$('.xiaoji').each(function(i, item) {
						total += +$(this).html();
					})
					return total.toFixed(2);
				}

				function allnum(n) {
					var allnum = 0;
					$('.goods_num_input').each(function(i, item) {
						allnum += +$(this).val();
					})
					return allnum + n;
				}
				xiaoji(0);
				$('#total_money').html(total());
				$('#end_price').html(total());
				$('#goods_num').html(allnum(0));
			})

		})

	} else {
		$('.car_goods').css('display', 'none');
		$('.car_null').css('display', 'block');
		alert('你还没有登录！')

	}

})()