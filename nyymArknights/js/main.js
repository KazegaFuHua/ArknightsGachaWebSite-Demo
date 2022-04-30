
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
	let o = {
		"id": $(this).attr("id"),// 被点击的ID
		"id2": null,// 另一个ID
		"maxlength": "0",// textarea长度限制
		"maxlengthText": "&nbsp/&nbsp0",// 长度限制显示
		"textareaHeight": "0"// textarea高度
	}
	// 根据ID来写入
	if(o["id"] === "long-comment") {
		o["id2"] = "short-comment";
		o["maxlength"] = "500";
		o["maxlengthText"] = "&nbsp/&nbsp500";
		o["textareaHeight"] = "250";
	}else if (o["id"] === "short-comment"){
		o["id2"] = "long-comment";
		o["maxlength"] = "150";
		o["maxlengthText"] = "&nbsp/&nbsp150";
		o["textareaHeight"] = "150";
	}
	// 短评和长评相关元素的执行修改
	$("#comment-box .left>." + o["id2"]).css("display","none");
	$("#comment-box .left>." + o["id"]).css("display","block");
	$("#comment-box .comment-input textarea").attr("maxlength",o["maxlength"]).val("").css("height",o["textareaHeight"]);
	$("#comment-box .comment-input span:nth-child(1)").html("0");
	$("#comment-box .comment-input span:nth-child(2)").html(o["maxlengthText"]);
})
// 短评和长评切换监听 E N D

// 评论框输入长度显示 START
$('#comment-box .comment-input textarea').on("keyup",function () {
	// 获取textarea中文本长度
	let text_length = $(this).val().length;
	// 写入长度
	$('#comment-box .comment-input span:nth-child(1)').text(text_length);
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
	let cmt_last = $(this).parent().prev();
	// 评论数据模板
	let cmt_json = [
		// 第一个评论
		{
			// 用户头像链接
			"user-img": "https://rss.sfacg.com/web/account/images/avatars/upload/APP/1605/1463479732757.jpg",
			// 用户名
			"user-name": "不是轻小说",
			// 用户UID
			"user-uid": "1",
			// 用户个人空间
			"user-url": "#",
			// 用户标签（管理员等）
			"user-tag": [
				// 标签1
				{
					// 标签的class样式名
					"class": "user-tag-admin",
					// 标签的中文名
					"name": "管理员"
				},
				// 标签2
				{
					// 标签的class样式名
					"class": "user-tag-notice",
					// 标签的中文名
					"name": "公告"
				}
			],
			// 评论发布时间
			"cmt-time": "1145-01-04 19:19:10",
			// 评论内容
			"cmt-content": "评论系统...力竭了",
			// 评论点赞数
			"cmt-like": "001",
			// 评论的回复
			"cmt-comment": [
				// 评论1
				{
					// 用户头像链接
					"user-img": "https://rss.sfacg.com/web/account/images/avatars/upload/APP/1605/1463479732757.jpg",
					// 用户名
					"user-name": "SF轻小说1",
					// 用户UID
					"user-uid": "2",
					// 用户个人空间
					"user-url": "#",
					// 用户标签
					"user-tag": [
						// 标签1
						{
							// 标签的class样式名
							"class": "user-tag-admin",
							// 标签的中文名
							"name": "管理员"
						}
					],
					// 评论发布时间
					"cmt-time": "1145-01-04 19:19:11",
					// 评论内容
					"cmt-content": "永远维护中。。。"
				},
				// 评论2
				{
					// 用户头像链接
					"user-img": "https://rss.sfacg.com/web/account/images/avatars/upload/APP/1605/1463479732757.jpg",
					// 用户名
					"user-name": "SF轻小说2",
					// 用户UID
					"user-uid": "3",
					// 用户个人空间
					"user-url": "#",
					// 用户标签
					"user-tag": [
						// 标签1
						{
							// 标签的class样式名
							"class": "user-tag-admin",
							// 标签的中文名
							"name": "管理员"
						}
					],
					// 评论发布时间
					"cmt-time": "1145-01-04 19:19:50",
					// 评论内容
					"cmt-content": "哼嗯嗯啊啊啊"
				}
			]
		},
		{
			// 用户头像链接
			"user-img": "https://rss.sfacg.com/web/account/images/avatars/upload/APP/1605/1463479732757.jpg",
			// 用户名
			"user-name": "不是ACE",
			// 用户UID
			"user-uid": "1",
			// 用户个人空间
			"user-url": "#",
			// 用户标签（管理员等）
			"user-tag": [
				// 标签1
				{
					// 标签的class样式名
					"class": "user-tag-notice",
					// 标签的中文名
					"name": "公告"
				},
				// 标签2
				{
					// 标签的class样式名
					"class": "user-tag-notice",
					// 标签的中文名
					"name": "公告"
				}
			],
			// 评论发布时间
			"cmt-time": "1145-01-04 19:19:10",
			// 评论内容
			"cmt-content": "评论系统...啊..",
			// 评论点赞数
			"cmt-like": "0001",
			// 评论的回复
			"cmt-comment": [
				// 评论1
				{
					// 用户头像链接
					"user-img": "https://rss.sfacg.com/web/account/images/avatars/upload/APP/1605/1463479732757.jpg",
					// 用户名
					"user-name": "SF轻小说1",
					// 用户UID
					"user-uid": "2",
					// 用户个人空间
					"user-url": "#",
					// 用户标签
					"user-tag": [
						// 标签1
						{
							// 标签的class样式名
							"class": "user-tag-admin",
							// 标签的中文名
							"name": "管理员"
						}
					],
					// 评论发布时间
					"cmt-time": "1145-01-04 19:19:11",
					// 评论内容
					"cmt-content": "永远维护中。。。"
				},
				// 评论2
				{
					// 用户头像链接
					"user-img": "https://rss.sfacg.com/web/account/images/avatars/upload/APP/1605/1463479732757.jpg",
					// 用户名
					"user-name": "SF轻小说2",
					// 用户UID
					"user-uid": "3",
					// 用户个人空间
					"user-url": "#",
					// 用户标签
					"user-tag": [
						// 标签1
						{
							// 标签的class样式名
							"class": "user-tag-admin",
							// 标签的中文名
							"name": "管理员"
						}
					],
					// 评论发布时间
					"cmt-time": "1145-01-04 19:19:50",
					// 评论内容
					"cmt-content": "哼嗯嗯啊啊啊"
				}
			]
		}
	]
	setTimeout(function () {
		// 创建要插入的html字符串
		let html = "";
		// 遍历每一条评论
		for (let i = 0; i < cmt_json.length; i++) {
			// 创建user_tag的html字符串
			let user_tags = "";
			// 遍历json中的tag
			for (let ii = 0; ii < cmt_json[i]["user-tag"].length; ii++) {
				user_tags += '<span class="user-tag '+ cmt_json[i]["user-tag"][ii]["class"] +'">'+ cmt_json[i]["user-tag"][ii]["name"] +'</span>'
			}
			// 子评论
			let cmt_cmt = "";
			// 遍历子评论
			for (let ii = 0; ii < cmt_json[i]["cmt-comment"].length ; ii++) {
				// 子评论的tag
				let cmt_cmt_user_tags = "";
				// 遍历子评论的tag
				for (let iii = 0; iii < cmt_json[i]["cmt-comment"][ii]["user-tag"].length; iii++) {
					cmt_cmt_user_tags += '<span class="user-tag '+ cmt_json[i]["cmt-comment"][ii]["user-tag"][iii]["class"] +'">'+ cmt_json[i]["cmt-comment"][ii]["user-tag"][iii]["name"] +'</span>'
				}
				cmt_cmt += '<div class="cmt-cmt-box">' +
					'<div class="user-info-box">' +
					'<a href="' + cmt_json[i]["cmt-comment"][ii]["user-url"] + '">' +
					'<img class="user-img" src="' + cmt_json[i]["cmt-comment"][ii]["user-img"] + '" alt="评论用户头像">' +
					'</a>' +
					'<div class="user-info">' +
					'<p>' +
					'<a href="' + cmt_json[i]["cmt-comment"][ii]["user-url"] + '" class="user-name underline">' + cmt_json[i]["cmt-comment"][ii]["user-name"] + '</a>' +
					cmt_cmt_user_tags +
					'</p>' +
					'<span class="cmt-time">' + cmt_json[i]["cmt-comment"][ii]["cmt-time"] + '</span>' +
					'</div>' +
					'<i class="fa fa-ellipsis-v"></i>' +
					'<div class="option-list">' +
					'<span class="black-list">加入黑名单</span>' +
					'<span class="report">举报</span>' +
					'</div>' +
					'</div>' +
					'<div class="cmt-content">' + cmt_json[i]["cmt-comment"][ii]["cmt-content"] + '</div>' +
					'</div>'
			}
			// 要插入的html
			html += '<div class="cmt-box" user-uid="' + cmt_json[i]["user-uid"] + '">' +
				'<div class="user-info-box">' +
				'<a href="' + cmt_json[i]["user-url"] + '">' +
				'<img class="user-img" src="' + cmt_json[i]["user-img"] + '" alt="' + cmt_json[i]["user-name"] + "头像" + '">' +
				'</a>' +
				'<div class="user-info">' +
				'<p>' +
				'<a href="' + cmt_json[i]["user-url"] + '" class="user-name underline">' + cmt_json[i]["user-name"] + '</a>' +
				user_tags +
				'</p>' +
				'<span class="cmt-time">' + cmt_json[i]["cmt-time"] + '</span>' +
				'</div>' +
				'<i class="fa fa-ellipsis-v"></i>' +
				'<div class="option-list">' +
				'<span class="black-list">加入黑名单</span>' +
				'<span class="report">举报</span>' +
				'</div>' +
				'</div>' +
				'<div class="cmt-content">' +
				cmt_json[i]["cmt-content"] +
				'</div>' +
				'<div class="cmt-item">' +
				'<i class="fa fa-1p25x fa-thumbs-up" title="点赞">(' + cmt_json[i]["cmt-like"] + ')</i>' +
				'<i class="fa fa-1p25x fa-comment" title="回复">(' + cmt_json[i]["cmt-comment"].length + ')</i>' +
				'</div>' +
				cmt_cmt +
				'</div>';
		}
		// 执行显示更多评论
		cmt_last.after(html);
		// 成功显示后将按钮颜色改回
		$("#comment-box .cmt-more a").css("background-color","");
	},1000)
})
// 显示更多评论监听 E N D