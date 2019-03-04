	$(document).ready(function(){
		var verifycode;
		var mobile;
		var vopenId; 
		var button;
		var count = 0;
		// 手机屏幕的初始化
		// 计算底部高度，处理未加载情况
		window.hfooter=$(".footer").height();
        window.hfooter<300?window.hfooter:370

     // 单屏滚的版署信息
	 window.mySwiper = new Swiper('.swiper-container', {
            direction : 'vertical',
            mousewheelControl : true,
            // 当所有的内嵌图像（img标签）加载完成后Swiper会重新初始化。（版权那块需要使用到）
            updateOnImagesReady: true,         
			on:{
				init: function(){
					window.vswiperh=this.height;
					window.voffset=-(vswiperh+hfooter+80);
				},
				// 回调函数，滑块释放时如果触发slider向前(右、下)切换则执行。
				slideNextTransitionStart: function(){
				  if(this.activeIndex==2){
				  	// 手动设置wrapper的位移
				  	mySwiper.setTranslate(voffset);
				  	mySwiper.allowSlideNext= false;				  	
				   }
				},
				// 回调函数，slider向后(左、上)切换结束时执行
				slidePrevTransitionEnd: function(){
					mySwiper.allowSlideNext= true;
				},	     
	    	},
        });

  
		getCookie("openid",function(openid){

				$.ajax({
				url:baseURL+"sys/getBaseInfo?openId="+openid,
				method:'get',
	   			contentType: 'application/json;charset=UTF-8',
				success:function(result){
					console.log(result);
					if(result.code == 0){
						$.ajax({
							url:baseURL+'sys/getBaseInfo?openId='+openid,
							method:'get',
							success:function(result){
								console.log(result);
								// alert(result.phone);
								$('#username').show();
								$('#username').html("账号名："+result.phone);
								console.log(getNowFormatDate());
								console.log(result.bonus_count);
								// 一个账号在领取完奖励之后再次登录的效果，即第二个领取奖励变为已领取
								if(result.last_bonus != null){
									if(getNowFormatDate() == result.last_bonus.substring(0,10) || result.bonus_count==7){
									$('.get').show();
									$('#getprize').hide();
									}
								}
							},
							error:function(result){
								console.log(result);
							}
						})

						$('.beforelogin').hide();
						$('.button').hide();
						$('#lognin').hide();
						$('.logoff').show();
						$('#prize').show();
						$('#memory').show();
						$('.memory').show();
						$('#login').hide();
					}

				},
				error:function(result){
					console.log(result);
				}

			});

		})
			
		$('#lognin').click(function(){
		$('.mobile').val('');
		$('.verifycode').val('');
		$("#login").show();
		
	});
	// 登录取消按钮
	$('.logincacel').click(function(){
		$('#login').hide();
	});

	
	// 登录界面弹窗按钮事件
	$('.ensure').click(function(){
		// console.log(openId,"openid");
		if($('.verifycode').val().length == 0 || $(".mobile").val().length == 0){
			alert("手机号或验证码为空");			
		}else if($('.verifycode').val().length != 0 && $(".mobile").val().length != 0){
			if(!(/(^1(3|4|5|7|8|9)\d{9}$)/.test($(".mobile").val()))){
				alert("手机号含有非法字符");
			}else if((/(^1(3|4|5|7|8|9)\d{9}$)/.test($(".mobile").val()))){
				if(!(/(^\d{6}$)/.test($(".verifycode").val()))){
					alert('验证码含有非法字符');
				}
				else if((/(^\d{6}$)/.test($(".verifycode").val()))){
					verifycode = String($('.verifycode').val());
					mobile = String($('.mobile').val());
					getCookie("openid",function(openid){
						// console.log("loginopenid",openid)
						var sysLoginForm = {
						"account":mobile,
						"verifyCode":verifycode,
						"openId":openid,
						};
						$.ajax({
							url:baseURL+'sys/login',
							method:'post',
							contentType: 'application/json;charset=UTF-8',	
							dataType:"json",
							data:JSON.stringify(sysLoginForm),		
							success:function(result){
								console.log(result);
								if(result.code == 0){
									$.ajax({
										url:baseURL+'sys/getBaseInfo?openId='+openid,
										method:'get',
										success:function(result){
											console.log(result);
											// alert(result.phone);
											$('#username').show();
											$('#username').html("账号名："+result.phone);
											console.log(getNowFormatDate());
											if(result.last_bonus != null){
												if(getNowFormatDate() == result.last_bonus.substring(0,10) || result.bonus_count==7){
												$('.get').show();
												$('#getprize').hide();
												}
											}
										},
										error:function(result){
											console.log(result);
										}
									})

									$('.beforelogin').hide();
									$('.button').hide();
									$('#lognin').hide();
									$('.logoff').show();
									$('#prize').show();
									$('#memory').show();
									$('.memory').show();
									$('#login').hide();
								}else{
									alert(result.msg);
								}
							},
							error:function(result){
								console.log(result);
								alert('登录失败');
							}
						})
					});
					
				}
			}
			
		}

		
	});
	// 解决登录输入框后页面错位
	$('input').blur(function(){
		if(window.pageYOffset!=0){
			$('html,body').scrollTop(0);
			$('.orientation').removeClass("hide");
		}
	});
	//解决手机的无故横屏
	$('input').focus(function(){
		$('.orientation').addClass("hide");
	})
	//获取事件的按钮
    var verify_busy = 0;
	$('.got').click(function(){		
		if(verify_busy == 0){
            verify_busy = 1;           
			mobile = $('.mobile').val();
			//登录界面的输入值    
			if($(".mobile").val().length == 0){
				alert("手机号不能为空");
                verify_busy = 0;                
			}else if($(".mobile").val().length != 0){
				if(!(/(^1(3|4|5|7|8|9)\d{9}$)/.test($(".mobile").val()))){
					alert("手机号格式不正确");
                	verify_busy = 0;                
				}else if((/(^1(3|4|5|7|8|9)\d{9}$)/.test($(".mobile").val()))){
                        var boom = 61;
                        var boomloop = setInterval(function(){
                            boom = boom - 1;
                            if (boom == 0) {
                                verify_busy = 0;
                                $(".got").text("获取验证码")
                                clearInterval(boomloop)
                            }else{
                                $(".got").text(boom+"s")
                            }

                        },1000)
					$.ajax({
						url:baseURL+"sys/verifyCode",
						method:"post",
						data:mobile,
						// 解决请求数据类型不正确，因为ajax默认发送位查询字符串，而后台希望收到json字符串，所以需要重新定义请求头
						headers:{
							'Content-Type': 'application/json',
						},
						success:function(result){						
							if(result.code == 0){
								// alert('发送成功');	
							}else{
								alert(result.msg);
							}
						},
						error:function(data){
							console.log(data)
							alert('请求失败！')
						}
					}) 
				}
			}
		}
	
	});

	// var verify_busy = 0;
	// function codenumber(){
	//     if(data.error_code == 0){
	//             if (verify_busy == 0) {
	//                 verify_busy = 1;
	//                 var boom = 61;
	//                 var boomloop = setInterval(function(){
	//                     boom = boom - 1;
	//                     if (boom == 0) {
	//                         verify_busy = 0;
	//                         $(".got").html("重新发送")
	//                         clearInterval(boomloop)
	//                     }else{
	//                         $(".got").html(boom+"s")
	//                     }
	//                 },1000)
	//             }
	//         }
	// }

   // 领取奖励事件
   $('#prize').click(function(){
   	  //切换屏幕
   	    mySwiper.slideTo(1, 1000);
		// $('#prize').hide();

   });
   //开始追忆事件
   $('#memory').click(function(){
   		count++;
   		$('.swiper-container').hide();
   		$('.remember').show();	
   });
   $('.back').click(function(){
   		$('.remember').hide();
   		$('.swiper-container').show();
   		mySwiper.update();

   })
   //活动规则事件
   $('.rules').click(function(){
   		$('#rule').show();
   });
   //活动规则关闭事件
   $('.rulecacel').click(function(){
   		$('#rule').hide();
   });
   //我的奖励事件
   $('#myprize').click(function(){
   		button = $('.button');
   		openId = getCookie("openid");
   		if(button.is(":hidden")){
   			$('#getgift').show();
   			reward();
   		}else{
   			
   	   	  mySwiper.slideTo(0, 1000);
   		}
   	});
   //我的奖励关闭事件
   $('#getgiftcacel').click(function(){
   		$('#getgift').hide();
   });
   //领取事件
   $('#getprize').click(function(){
	  	getCookie("openid",function(openid){
			button = $('.button');
	   		if(button.is(":hidden")){
	   			$.ajax({
	   				url:baseURL+'dailyBonusList?openId='+openid,
		   			method:'get',
		   			contentType: 'application/json;charset=UTF-8',
		   			success:function(result){
		   				if(count != 0 || result.dailyBonusList != null){
		   					$.ajax({
				   				url:baseURL+"dailyBonus",
				   				method:'post',
				   				contentType: 'application/json;charset=UTF-8',
				   				data:openid,
				   				success:function(result){
				   					console.log(result);
				   					if(result.code == 506){
				   						$('#gift').hide();
				   						$('#reward').show();
				   						$('.get').show();

				   					}else if(result.code == 0){
				   						$('.giftnumber').html(result.activationCode);
				   						$('#gift').show();
				   						
				   					}else if(result.code){
				   						alert(result.msg);
				   					}	
				   					
				   				},
				   				error:function(result){
				   					console.log(result);
				   				}
		   					});
	   					}
		   				else{
		   					alert('请先阅读开始追忆页面')
		   				}
		   			},
		   			error:function(result){
		   				console.log('请求失败！');
		   			}
	   			});		
	   		}
			else{
	   			
	   	   	  mySwiper.slideTo(0, 1000);
	   		}
		})
   		
   });
   $('.giftcacel').click(function(){
   		$('.get').show();
   		$('#gift').hide();

   });
   //返回事件
   $('#backdiv').click(function(){
   	    mySwiper.slideTo(0, 1000);

   });
   //领取完毕事件弹窗
   $('.closephoto').click(function(){
   		$('#reward').hide();
   });
   $('.look').click(function(){
   		$('#reward').hide();
   		reward();
   		$('#getgift').show();
   })
   //注销事件
   $('#withdraw').click(function(){
   		getCookie("openid",function(openid){
   			$.ajax({
	   			url:baseURL+'sys/logout',
	   			method:'post',
	   			contentType: 'application/json;charset=UTF-8',
	   			data:openid,
	   			success:function(result){
	   				if(result.code == 0){
	   					// alert('退出成功');
	   					$('.logoff').hide();
						$('#prize').hide();
						$('#memory').hide();
						$('.memory').hide();
						$('#username').hide();
						$('.get').hide();
						$('#getprize').show();
				   		$('.beforelogin').show();
						$('.button').show();
						$('#lognin').show();

	   				}
	   			},
	   			error:function(result){
	   				alert('退出失败')
	   			}
   			});
   		});
   		
   		var count = 0;		
   });

// 时间函数的格式
   function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    }
//取微信内的openid
   function getCookie(c_name,callback){
		if (document.cookie.length>0){
			c_start=document.cookie.indexOf(c_name + "=")
			if (c_start!=-1){
				c_start=c_start + c_name.length+1
				c_end=document.cookie.indexOf(";",c_start)
				if (c_end==-1) c_end=document.cookie.length
				var openid= unescape(document.cookie.substring(c_start,c_end))
			    if(!openid){
			    	alert("系统获取信息繁忙，请重试")
			    }
				else if(openid&&callback && typeof(callback) === "function"){
					callback(openid);
					return openid;
				}
				else{
					return openid;
				}
				
			}
		}
		return ""
	}
//查看我的奖励
	function reward(){
		 getCookie('openid',function(openid){
			$.ajax({
	   			url:baseURL+'dailyBonusList?openId='+getCookie('openid'),
	   			method:'get',
	   			contentType: 'application/json;charset=UTF-8',
	   			success:function(result){
	   				if(result.dailyBonusList != null){
	   					console.log(result.dailyBonusList.length);
	   					// console.log(result.dailyBonusList.length == 1)
	   					switch(result.dailyBonusList.length>0){
	   						case (result.dailyBonusList.length == 1):
	   							$('#codeone').html(result.dailyBonusList[0].code);
	   							break;
	   						
	   						case (result.dailyBonusList.length == 2):
	   							$('#codeone').html(result.dailyBonusList[0].code);
	   							$('#codetwo').html(result.dailyBonusList[1].code);
	   							break;
	   						
	   						case (result.dailyBonusList.length == 3):
	   							$('#codeone').html(result.dailyBonusList[0].code);
	   							$('#codetwo').html(result.dailyBonusList[1].code);
	   							$('#codethree').html(result.dailyBonusList[2].code);
	   							break;
	   						
	   						case (result.dailyBonusList.length == 4):
	   							$('#codeone').html(result.dailyBonusList[0].code);
	   							$('#codetwo').html(result.dailyBonusList[1].code);
	   							$('#codethree').html(result.dailyBonusList[2].code);
	   							$('#codefour').html(result.dailyBonusList[3].code);
	   							break;
	   						
	   						case (result.dailyBonusList.length == 5):
	   							$('#codeone').html(result.dailyBonusList[0].code);
	   							$('#codetwo').html(result.dailyBonusList[1].code);
	   							$('#codethree').html(result.dailyBonusList[2].code);
	   							$('#codefour').html(result.dailyBonusList[3].code);
	   							$('#codefive').html(result.dailyBonusList[4].code);
	   							break;
	   						
	   						case (result.dailyBonusList.length == 6):
	   							$('#codeone').html(result.dailyBonusList[0].code);
	   							$('#codetwo').html(result.dailyBonusList[1].code);
	   							$('#codethree').html(result.dailyBonusList[2].code);
	   							$('#codefour').html(result.dailyBonusList[3].code);
	   							$('#codefive').html(result.dailyBonusList[4].code);
	   							$('#codesix').html(result.dailyBonusList[5].code);
	   							break;
	   								   						
	   						case (result.dailyBonusList.length == 7):
	   							$('#codeone').html(result.dailyBonusList[0].code);
	   							$('#codetwo').html(result.dailyBonusList[1].code);
	   							$('#codethree').html(result.dailyBonusList[2].code);
	   							$('#codefour').html(result.dailyBonusList[3].code);
	   							$('#codefive').html(result.dailyBonusList[4].code);
	   							$('#codesix').html(result.dailyBonusList[5].code);
	   							$('#codeseven').html(result.dailyBonusList[6].code);
	   							break;
	   						
	   					}
	   				}
	   			},
	   			error:function(result){
	   				alert('请求失败');
	   				console.log(result);
	   			}
   			});
		})
		
	}

//


})