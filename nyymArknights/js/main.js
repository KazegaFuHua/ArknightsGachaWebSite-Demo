// 大图自动滚动 START
$(function (){
	let option = {
		"0": 0,// 第一张图的位置
		"1": 400,// 第二张图的位置
		"2": 800// 第三张图的位置
	}
	let num = 0;// 计次变量
	setInterval(function (){
		num++;
		let rn = num % 3;// 求余
		$('#fullSlide').animate({scrollTop: option[rn]},"easy","swing");
	},5000)// 5秒切换一次
})
// 大图自动滚动 END
// 推荐作品页面切换按钮监听 START
$("input:radio[name='pages']").change(function(){
	if($(this).val() == 1){
		$('#recommend-overflowHiddin').animate({scrollLeft: 0},"easy","swing")
	}else {
		$('#recommend-overflowHiddin').animate({scrollLeft: 1200},"easy","swing")
	}
})
// 推荐作品页面切换按钮监听 END