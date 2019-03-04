// JavaScript Document
LCM.wxJsConfig(function (data) {
    let wxConfigData = data.data;
    //以下是微信官方文档中的方法
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: wxConfigData.appId, // 必填，公众号的唯一标识
        timestamp: wxConfigData.timestamp, // 必填，生成签名的时间戳
        nonceStr: wxConfigData.noncestr, // 必填，生成签名的随机串
        signature: wxConfigData.signature,// 必填，签名，见附录1
        jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareWeibo",
			'onMenuShareQZone'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });
    wx.ready(function () {
        wx.onMenuShareAppMessage({
            title: "【炼金1周年】每日登录献礼~ 限定「克罗伊派对礼裙皮肤」免费放送！", // 分享标题
            desc: "【炼金1周年】每日登录献礼~ 限定「克罗伊派对礼裙皮肤」免费放送！", // 分享描述
            link: 'http://h5.mobage.cn/fwg/happy1st/index.html', // 分享链接
            imgUrl: 'http://h5-cdn.mobage.cn/fwg/static/H5/image/head.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                console.log("成功")
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
		
	wx.onMenuShareQZone({
    	title: "【炼金1周年】每日登录献礼~ 限定「克罗伊派对礼裙皮肤」免费放送！", // 分享标题
        desc: "【炼金1周年】每日登录献礼~ 限定「克罗伊派对礼裙皮肤」免费放送！", // 分享描述
        link: 'http://h5.mobage.cn/fwg/happy1st/index.html', // 分享链接
        imgUrl: 'http://h5-cdn.mobage.cn/fwg/static/H5/image/head.png', // 分享图标
    	success: function () { 
       		// 用户确认分享后执行的回调函数
    	},
    	cancel: function () { 
        	// 用户取消分享后执行的回调函数
    	}
	});
	
        wx.onMenuShareQQ({
            title: "【炼金1周年】每日登录献礼~ 限定「克罗伊派对礼裙皮肤」免费放送！", // 分享标题
            desc: "【炼金1周年】每日登录献礼~ 限定「克罗伊派对礼裙皮肤」免费放送！", // 分享描述
            link: 'http://h5.mobage.cn/fwg/happy1st/index.html', // 分享链接
            imgUrl: 'http://h5-cdn.mobage.cn/fwg/static/H5/image/head.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
        wx.onMenuShareTimeline({
            title: "【炼金1周年】每日登录献礼~ 限定「克罗伊派对礼裙皮肤」免费放送！", // 分享标题
            desc: "【炼金1周年】每日登录献礼~ 限定「克罗伊派对礼裙皮肤」免费放送！", // 分享描述
            link: 'http://h5.mobage.cn/fwg/happy1st/index.html', // 分享链接
            imgUrl: 'http://h5-cdn.mobage.cn/fwg/static/H5/image/head.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
                console.log("成功")
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
});