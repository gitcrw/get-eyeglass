(function() {
			$('#ajax_top').load('modelhtml/top.html');
			$('#ajax_header').load('modelhtml/header.html');
			$('#ajax_footer').load('modelhtml/footer.html');
			//鼠标移进移除
			$('.l_title').on('mouseover','span',function() {
				if(!$(this).attr('class')) {
					$(this).css('color','#FF6347');
				}
			}).on('mouseout','span',function() {
				if(!$(this).attr('class')) {
					$(this).css('color','#666');
				}
			})
			//点击切换
			$('.l_title').on('click','span',function() {
				$(this).css('color','').attr('class','active').siblings().attr('class','');
				if($(this).attr('id')=='smdl') {
					$('.l_content_l').css('display','block');
					$('.l_content_r').css('display','none');
				}else{
					//切换登录模式刷新动画
					$('.twocode').css({'margin':'40px auto 0','float':'none'});
					$('.saoapp').fadeOut();

					$('.l_content_r').css('display','block');
					$('.l_content_l').css('display','none');
				}
			})
			//鼠标移动显示动画
			load();
			function load() {
				$('#down_app,#down_app_h').hover(function() {
					$('#down_app,#down_app_h').toggle();
				})
				$('.twocode img').mouseover(function() {
					// $('.twocode').css('margin','40px 0 0 30px','float','left');
					// width: "50%", height: "50%"
					$('.twocode').animate({margin:"40px 0 0 30px"},300,function() {
						$('.saoapp').fadeIn();
					}).css('float','left');
					
				});
			}
			

			var btn = document.getElementsByClassName('remeber')[0];
			var remeberuser = document.getElementById('remeberuser');
	

			btn.onclick = function(ev) {//记住账户
				if(ev.target.tagName == 'I') {
					if(ev.target.status) {
						ev.target.className = '';
						ev.target.status = 0;
						if(ev.target.id == 'remeberuser') {
							removeCookie('user');
						}
						
					}else {
						ev.target.className = 'select';
						ev.target.status = 1;
					} 
					if(ev.target.id == 'remeberauto') {
						if(ev.target.className) {
							remeberuser.className = 'select';
							remeberuser.status = 1;
						}
					}
				}
				// if(remeberuser.status = 0) {
				// 	removeCookie('user');
				// 	console.log(1)
				// }else {
				// 	setCookie('user',$('#username').val(),7);
				// }
			}
			//是否有cookie
			if(getCookie('user')) {
				$('#username').val(getCookie('user'));
				$('#remeberuser').attr('class','select');
				remeberuser.status = 1;
			}
			//登录
			$('#loginbtn').click(function() {
				if($('#username').val() != '') {
					if($('#password').val() != '') {
						// if()
						$.ajax({
							type : 'post',
							url : '../api/login.php',
							data : {
								user : $('#username').val(),
								password : $('#password').val()
							},
							success : function(str) {
								if(getCookie('login')) {
									alert('请不要重复登录');
									return;
								}
								if(str=='yes') {
									if($('#remeberuser').attr('class') == 'select') {
										//创建cookie
										setCookie('user',$('#username').val(),7);
									}
									alert('登录成功');
									setCookie('login',$('#username').val(),1);
									// $('#welcome').html($('#username').val().split(0,5) + '...' + '您好，欢迎来可得!');
									window.location.href = 'main.html';
								}else {
									$('#l_info').html('账户或密码错误');
								}
							}
						})
					}else {
						$('#l_info').html('请输入您的密码');
					}
				}else {
					$('#l_info').html('请输入您的手机、邮箱、用户名');
				}
			})
			//设置cookie
			function setCookie(key,val,iday) {
				var now = new Date();
				now.setDate(now.getDate() + iday);
				document.cookie = key + '=' +val + ';expires=' + now + ';path=/';
			}
			function getCookie(key) {
				var str = document.cookie;
				var arr = str.split('; ');
				for(var i of arr) {
					var arr2 = i.split('=');
					if (key == arr2 [0]) {
						return arr2[1];
					}
				}
			}
			function removeCookie(key) {
				setCookie(key,'',-1);
			}
		})();