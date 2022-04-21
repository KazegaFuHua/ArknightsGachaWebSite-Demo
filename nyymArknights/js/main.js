
$(function (){
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
		$("#comment-box .comment-input").fadeOut("slow");
	}else if (id === "short-comment"){
		id2 = "long-comment";
		$("#comment-box .comment-input").fadeIn("slow");
	}
	// 执行短评和长评相关元素的隐藏与显示
	$("#comment-box .left>." + id2).fadeOut("slow");
	$("#comment-box .left>." + id).fadeIn("slow");
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
$("#comment-box .user-info-box i").on("click",function () {
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
// 评论选项按钮监听 E N D