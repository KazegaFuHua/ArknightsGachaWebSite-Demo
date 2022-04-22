
$(function (){
	// 设置动画默认为开启
	if (!localStorage["animate"]){
		// 如果不存在animate参数则设置为true
		localStorage["animate"] = "true";
	}
	// 大图自动滚动 START
	let auto_scroll_option = {
		"0": 0,// 第一张图的位置
		"1": 500,// 第二张图的位置
		"2": 1000// 第三张图的位置
	}
	let num = 0;// 计次变量
	setInterval(function (){
		num++;
		let rn = num % 3;// 求余
		$('#fullSlide').animate({
				scrollTop: auto_scroll_option[rn]
			},{
				easing: 'easeInOutQuad',
				duration: 750,
			});
	},5000)// 5秒切换一次
	// 大图自动滚动 E N D
	
	// 一键填充大图，便于一键更换所有使用此模板的大图 START
	// let fullSlide_img_option = {
	// 	"0": "https://web.hycdn.cn/arknights/official/pic/20210329/4ef06dd53fabeeaed63b51e04abb317f.png",
	// 	"1": "https://web.hycdn.cn/arknights/official/pic/20210401/ca8ef0b4307c4be7cc52c20c59eec1c7.png",
	// 	"2": "https://web.hycdn.cn/arknights/official/pic/20210401/d9d7ec6e8b67df2967f9a59fc5ba9bf9.png"
	// }
	// // let fullSlide = ;
	// for (let i = 0; i < fullSlide_img_option.length; i++){
	// 	$('#fullSlide').html('<a href="#"><img src="' + fullSlide_img_option[i] +'" alt="图1"><img src="' + fullSlide_img_option[i] +'" alt="图1"></a>');
	// }
	// 一键填充大图，便于一键更换所有使用此模板的大图 END
})

// 推荐作品页面切换按钮监听 START
$("input:radio[name='pages']").change(function(){
	// 判断点击的是第几页
	if($(this).val() === "1"){
		$('#recommend-overflowHidden').animate({scrollLeft: 0},{easing: 'easeInOutQuad',duration: 500})
	}else {
		$('#recommend-overflowHidden').animate({scrollLeft: 1200},{easing: 'easeInOutQuad',duration: 500})
	}
})
// 推荐作品页面切换按钮监听 E N D

// 短评和长评切换监听 START
$('input:radio[name="comment-type"]').change(function () {
	let id = $(this).attr("id");// 被点击的ID
	let id2 = null;// 另一个ID
	// 根据ID来写入ID2
	if(id === "long-comment") {
		id2 = "short-comment";
		$("#comment-box .comment-input").css("display","none");
	}else if (id === "short-comment"){
		id2 = "long-comment";
		$("#comment-box .comment-input").css("display","block");
	}
	// 执行短评和长评相关元素的隐藏与显示
	$("#comment-box .left>." + id2).css("display","none");
	$("#comment-box .left>." + id).css("display","block");
})
// 短评和长评切换监听 E N D

// 评论框输入长度显示 START
$('#comment-box .comment-input textarea').on("keyup",function () {
	// 获取textarea中文本长度
	let text_length = $(this).val().length;
	// 写入长度
	$('#comment-box .comment-input span').text(text_length + " / 150");
})
// 评论框输入长度显示 E N D

// 评论选项按钮监听 START
$("#comment-box").on("click",".user-info-box i",function () {
	// 选中所有show=on的元素，淡出隐藏
	$("#comment-box div[show='on']").fadeOut("fast",function () {
		// 动画完成后删除show参数
		$(this).removeAttr("show").css({
			// 因fadeOut()动画淡出后不会将opacity设为0，所以手动设置
			"opacity": "0"
		});
	})
	// 判断是否有show参数
	if ($(this).next().attr("show") === undefined){
		// 没有show则调用显示动画
		$(this).next().animate({
			// 淡入动画
			"opacity": "1"
		},"fast").css({
			// 同时display设为flex
			"display": "flex"
		}).attr({
			// 同时添加show参数
			"show": "on"
		});
	}else {
		// 有show则淡出隐藏
		$(this).next().fadeOut("fast",function () {
			$(this).css({
				// 因fadeOut()动画淡出后不会将opacity设为0，所以手动设置
				"opacity": "0"
			})
		});
	}
})
// 评论选项点击后监听执行
$("#comment-box .option-list span").on("click", function () {
	// 获取被点击的span是什么
	let this_class = $(this).attr("class");
	//  功能分别判断
	if (this_class === "report") {
		// 举报
		alert("已举办（功能尚未实现）");
	}else if (this_class === "black-list") {
		// 黑名单
		alert("已加入黑名单（功能尚未实现）");
	}
	// 点击后将父元素隐藏
	$(this).parent().fadeOut("fast");
})
// 评论选项按钮监听 E N D
// 显示更多评论监听 START
$("#comment-box .cmt-more a").on("click",function () {
	// 将按钮改为灰色
	$(this).css("background-color", "#898989");
	// 找到最后一个评论元素
	let cmt_content = $(this).parent().prev();
	let cmt_json = {
		"user-img": "https://rss.sfacg.com/web/account/images/avatars/upload/APP/1605/1463479732757.jpg",
		"user-name": "不是轻小说",
		"user-uid": "1",
		"user-tag": [
			{
				"class": "user-tag-admin",
				"name": "管理员"
			},
			{
				"class": "user-tag-notice",
				"name": "公告"
			}
		],
		"cmt-time": "1145-01-04 19:19:10",
		"cmt-content": "评论系统...力竭了",
		"cmt-like": "0001",
		"cmt-comment": {
			"count": "0002",
			"comment": [
				{
					"user-img": "https://rss.sfacg.com/web/account/images/avatars/upload/APP/1605/1463479732757.jpg",
					"user-name": "SF轻小说1",
					"user-uid": "2",
					"user-tag": [
						{
							"class": "user-tag-admin",
							"name": "管理员"

						}
					],
					"cmt-time": "1145-01-04 19:19:11",
					"cmt-content": "永远维护中。。。",
				},
				{
					"user-img": "https://rss.sfacg.com/web/account/images/avatars/upload/APP/1605/1463479732757.jpg",
					"user-name": "SF轻小说2",
					"user-uid": "3",
					"user-tag": [
						{
							"class": "user-tag-admin",
							"name": "管理员"

						}
					],
					"cmt-time": "1145-01-04 19:19:50",
					"cmt-content": "哼嗯嗯啊啊啊",
				}
			]
		}
	}
	setTimeout(function () {
		// 创建user_tag的html字符串
		let user_tags = "";
		// 遍历json中的tag
		for (let i = 0; i < cmt_json["user-tag"].length; i++) {
			user_tags += '<span class="user-tag '+ cmt_json["user-tag"][i]["class"] +'">'+ cmt_json["user-tag"][i]["name"] +'</span>'
		}
		// 要插入的html
		let html = '<div class="cmt-box" user-uid="'+ cmt_json["user-uid"] + '">' +
				'<div class="user-info-box">' +
					'<img class="user-img" src="'+ cmt_json["user-img"] +'" alt="'+ cmt_json["user-name"] + "头像" +'">' +
					'<div class="user-info">' +
						'<p>' +
							'<span class="user-name">'+ cmt_json["user-name"] +'</span>' +
							user_tags +
						'</p>' +
						'<span class="cmt-time">'+ cmt_json["cmt-time"] +'</span>' +
					'</div>' +
					'<i class="fa fa-ellipsis-v"></i>' +
					'<div class="option-list">' +
						'<span class="black-list">加入黑名单</span>' +
						'<span class="report">举报</span>' +
					'</div>' +
				'</div>' +
				'<div class="cmt-content">' +
					cmt_json["cmt-content"] +
				'</div>' +
				'<div class="cmt-item">' +
					'<i class="fa fa-1p25x fa-thumbs-up" title="点赞">('+ cmt_json["cmt-like"] +')</i>' +
					'<i class="fa fa-1p25x fa-comment" title="回复">('+ cmt_json["cmt-comment"]["count"] +')</i>' +
				'</div>' +
			'</div>'
		// 执行显示更多评论
		cmt_content.after(
			// 要显示的评论
			html
		);
		// 成功显示后将按钮颜色改回
		$("#comment-box .cmt-more a").css("background-color","");
	},1000)
})
// 显示更多评论监听 E N D