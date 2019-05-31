(function() {
	$('#ajax_top').load('modelhtml/top.html');
	$('#ajax_header').load('modelhtml/header.html');
	$('#ajax_footer').load('modelhtml/footer.html');

	//同意协议
	$('.r_agree').on('click', 'i,span', function() {
		$('#r_select').toggle();
	})
	var codepic = new GVerify({
		id: "codepic",
		type: "blend"
	});

	$('#code').blur(function() {
		codePic();
	})
	//图形验证码
	function codePic() {
		// $('#code').focus();
		var code = $('#code').val();
		if(codepic.validate(code)) {
			$('#r_info').html('');
			return true;
		} else {
			$('#r_info').html('图形验证码错误');
			return false;
		}
	}
	//验证手机是否存在
	var reg = /^1[3-9]\d{9}$/;
	var userphone = document.getElementById('userphone');
	userphone.onblur = function() {
		var val = userphone.value;
		if($('#getcode').val() != '获取验证码') {
			$('#getcode').attr('class', '');
			return;
		}

		if(reg.test(val)) {

			$.ajax({
				type: 'post',
				url: '../api/register.php',
				data: {
					phone: val
				},
				success: function(str) {
					if(str == 'no') {
						$('#userphone').focus();
						$('#r_info').html('该手机号已注册');
						$('#getcode').attr('class', '');
						$('#userphone').attr('status', 'no');
					} else {
						$('#r_info').html('');
						$('#getcode').attr('class', 'active');
						$('#userphone').attr('status', 'yes');
					}
				}
			})

		} else {
			$('#r_info').html('请输入正确手机号');
			$('#getcode').attr('class', '');
			return false;
		}

	}
	var timer = null;
	$('#getcode').click(function() {
		// console.log(1)
		// loading();
		// function loading() {
		//     var mask_bg = document.createElement("div");
		//     mask_bg.id = "mask_bg";
		//     mask_bg.style.position = "absolute";
		//     mask_bg.style.top = "0px";
		//     mask_bg.style.left = "0px";
		//     mask_bg.style.width = "100%";
		//     mask_bg.style.height = "100%";
		//     mask_bg.style.backgroundColor = "#000";
		//     mask_bg.style.opacity = 0.5;
		//     mask_bg.style.zIndex = 10001;
		//     document.body.appendChild(mask_bg);

		//     var mask_msg = document.createElement("div");
		//     mask_msg.style.position = "absolute";
		//     mask_msg.style.opacity = 1;
		//     mask_msg.style.width = '450px';
		//     mask_msg.style.height = '100px';
		//     mask_msg.style.marginLeft = '-225px';
		//     mask_msg.style.marginTop = '-50px';
		//     mask_msg.style.top = "50%";
		//     mask_msg.style.left = "50%";
		//     mask_msg.style.backgroundColor = "#fff";
		//     mask_msg.style.border = "#336699 1px solid";
		//     mask_msg.style.textAlign = "center";
		//     mask_msg.style.fontSize = "1.1em";
		//     mask_msg.style.fontWeight = "bold";
		//     mask_msg.style.padding = "0.5em 3em 0.5em 3em";
		//     mask_msg.style.zIndex = 10002;
		//     document.body.appendChild(mask_msg);

		//     var mask_title = document.createElement("div");
		//     mask_title.innerText = "发送成功"
		//     mask_title.backgroundColor = '#ccc'
		//     mask_msg.appendChild(mask_title);
		//     // mask_bg.appendChild(mask_msg);
		// }

		if($('#getcode').attr('class')) {
			//弹窗遮罩

			//请求验证码
			var code = new Promise(function(resolve) {
				$.ajax({
					type: 'post',
					url: '../api/duanxin.php',
					data: {
						userphone: $('#userphone').val()
					},
					success: function(str) {
						resolve(str);
					}
				});
			})
			timer = setInterval(down, 1000); //验证码时间
			var time = 60;
			var html = '';

			function down() {
				time--;
				$('#getcode').val(time + 's后重新获取');
				$('#getcode').attr('class', '');
				if(time == 0) {
					clearInterval(timer);
					$('#getcode').val('获取验证码');
					if(reg.test($('#userphone').val())) {
						$('#getcode').attr('class', 'active');
					}
				}
			}
			//处理验证码
			code.then(function(data) {
				$('#register_btn').click(function() {
					if($('#userphone').attr('status') != 'no') {
						if($('#phonecode').val() == data) {
							// 验证码正确,锁定用户名
							$('#userphone').attr('disabled', true).css('background', '#fdf7e9');
							$('#r_info').html('');
							if(codePic()) {
								if(ispwd()) {
									if($('#r_select').css('display') != 'none') {
										$('#r_info').html('');
										$.ajax({ //写入数据库
											type: 'post',
											url: '../api/register.php',
											data: {
												phone: $('#userphone').val(),
												password: $('#r_password').val()
											},
											success: function(str) {
												window.location.href = "login.html"; //跳转
												$('#code').val('');
												$('#phonecode').val('');
												alert('注册成功!');
											}
										})

										// return;
									} else {
										$('#r_info').html('请同意注册协议');
										// return;
									}
								} else {
									// return;
								}
							} else {
								// return;
							}
						} else {
							$('#r_info').html('手机验证码错误');
						}
					} else {
						$('#r_info').html('该手机号已注册');
					}
				})
			})
		}

	})
	//判断密码
	// var regpwd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/um;
	function ispwd() {
		var val = $('#r_password').val();
		var len = $('#r_password').val().length;
		if(/\d/.test(val) && /[a-zA-Z]/.test(val) && 5 < len && 15 > len) {
			$('#r_info').html('');
			return true;
		} else {
			$('#r_info').html('密码由字母、数字或字符组成，长度6-15位。');
			return false;
		}
	}
	$('#r_password').blur(function() {
		ispwd();
	})
	$('#r_password').keyup(function() {
		if($(this).val()) {
			$('#eyes').css('display', 'block');
		} else {
			$('#eyes').css('display', 'none');
		}
	});
	//密码眼睛
	$('#eyes').mousedown(function() {
		$('#eyes').attr('class', 'look');
		$('#r_password').attr('type', 'text');
	}).mouseup(function() {
		$('#eyes').attr('class', '');
		$('#r_password').attr('type', 'password');
	});

})();