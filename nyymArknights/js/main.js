
$(function (){
	
	// 大图自动滚动 START
	let option = {
		"0": 0,// 第一张图的位置
		"1": 500,// 第二张图的位置
		"2": 1000// 第三张图的位置
	}
	let num = 0;// 计次变量
	setInterval(function (){
		num++;
		let rn = num % 3;// 求余
		$('#fullSlide').animate({
				scrollTop: option[rn]
			},{
				easing: 'easeInOutQuad',
				duration: 750,
			});
	},5000)// 5秒切换一次
	// 大图自动滚动 END
	
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
	if($(this).val() == 1){
		$('#recommend-overflowHiddin').animate({scrollLeft: 0},{easing: 'easeInOutQuad',duration: 500})
	}else {
		$('#recommend-overflowHiddin').animate({scrollLeft: 1200},{easing: 'easeInOutQuad',duration: 500})
	}
})
// 推荐作品页面切换按钮监听 END