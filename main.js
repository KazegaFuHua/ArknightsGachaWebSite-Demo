var OutPutGachaData = null;
var LocalStorage = window.localStorage;
// 全局音量
if (!LocalStorage['globalVolume'] || !LocalStorage['globalVolumeStatus']){
    LocalStorage['globalVolume'] = '0.05';
    LocalStorage['globalVolumeStatus'] = 'on'

}
// 分析抽卡数据
function analysisData(data,pool) {
    function eachGachaHistory(rarity,pool){
        let List = $('#'+rarity+'List');
        List.empty();
        for (let i = 0;i < data[pool][rarity+'History'].length;i++){
            let gachaHistoryName = data[pool][rarity+'History'][i]['name'];
            let gachaLastNum = data[pool][rarity+'History'][i]['gachaNum'];
            let gachaTime = timestampToTime(data[pool][rarity+'History'][i]['time']);
            List.append('<img src="'+ 'img/tx/头像_' + gachaHistoryName + '.png' +'" alt="头像_'+ gachaHistoryName +'" title="' + gachaTime + '，' + data[pool][rarity+'History'][i]['pool'] + '">' + gachaHistoryName + '[' + gachaLastNum + ']&emsp;');
        }
    }
    switch (pool){
        case '所有卡池':
            $(':root').css('--poolcolor','#dadada');
            break;
        case '常驻标准寻访':
            $(':root').css('--poolcolor','#00b7cb');
            break;
        case '浊酒澄心':
            $(':root').css('--poolcolor','#75b2e6');
            break;
        case '火花绽放':
            $(':root').css('--poolcolor','#fa96af');
            break;
        case '炽焰无霾':
            $(':root').css('--poolcolor','#e02f1a');
            break;
    }
    $('#nickname').text(data['nickName']).append('<span id="uid">UID: ' + data['uid'] + '</span>');
    LocalStorage['UID'] = data['uid'];
    $('#time').text(timestampToTime(data[pool]['firstGacha']) + ' - ' + timestampToTime(data[pool]['lastGacha']));
    $('#r3num').text(data[pool]['r3Num']);
    $('#r4num').text(data[pool]['r4Num']);
    $('#r5num').text(data[pool]['r5Num']);
    $('#r6num').text(data[pool]['r6Num']);
    $('#r3percent').text(Math.round(data[pool]['r3Num'] / data[pool]['gachaNum'] * 10000) / 100 + '%');
    $('#r4percent').text(Math.round(data[pool]['r4Num'] / data[pool]['gachaNum'] * 10000) / 100 + '%');
    $('#r5percent').text(Math.round(data[pool]['r5Num'] / data[pool]['gachaNum'] * 10000) / 100 + '%');
    $('#r6percent').text(Math.round(data[pool]['r6Num'] / data[pool]['gachaNum'] * 10000) / 100 + '%');
    $('.pool').text(data[pool]['poolName']);
    $('#gachaNum').text(data[pool]['gachaNum']);
    $('#gachaLastR6Num').text(data[pool]['gachaLastR6Num']);
    $('#avg_r5').text(data[pool]['r5avg']);
    $('#avg_r6').text(data[pool]['r6avg']);
    eachGachaHistory('r5',pool);
    eachGachaHistory('r6',pool);
    // 显示图表的函数
    function charts_main(d,p) {
        // 清空#chart
        $('#chart').empty().removeAttr('_echarts_instance_');
        // 图表显示
        let chartDom = document.getElementById('chart');
        let myChart = echarts.init(chartDom);
        let option;
        // 图表选项
        option = {
            tooltip: {
                trigger: 'item'
            },
            legend: {
                top: '5%',
                left: 'center'
            },
            series: [
                {
                    name: '抽卡统计',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 5,
                        borderColor: '#ffffff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    color: [
                        "#00b3fd",
                        "#c790c7",
                        "#eecd40",
                        "#ff7a19"
                    ],
                    data: [
                        { value: d[p]['r3Num'], name: '三星' },
                        { value: d[p]['r4Num'], name: '四星' },
                        { value: d[p]['r5Num'], name: '五星' },
                        { value: d[p]['r6Num'], name: '六星' }
                    ]
                }
            ]
        };
        option && myChart.setOption(option);
    }
    charts_main(data,pool);
}
$('#pool').click(function (){
    $('#poolList').slideToggle(300);
});
$('#poolList').click(function (){
    $(this).slideUp(300);
})
// 时间戳转时间
function timestampToTime(timestamp) {
    let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '.';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '.';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
    return Y+M+D+h+m+s;
}
// 获取浏览器Url参数
function getUrlParam (name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");// 构造一个含有目标参数的正则表达式对象
    let r = window.location.search.substr(1).match(reg);// 匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

// 用户输入则将提交按钮改为可用，且修改样式
$input = $('#token');
$input.on('input',function (){
    if ($input.val() !== "" && $input.val().length >= 24){// 不为空且大于等于24位
        $('#token_submit-group>button').attr('disabled',false);
        $('#get_token_input-group>span').css({'color': '#57e37d'}).html('&#10004');
        $('#get_token_input-group input').css({'border-bottom': '#57e37d solid 3px'});
    }else {
        $('#token_submit-group>button').attr('disabled',true);
        $('#get_token_input-group>span').css({'color': '#e04857'}).html('&#10006');
        $('#get_token_input-group input').css({'border-bottom': '#a0a0a0 solid 3px'});
    }
})

// 监听窗口大小变化
let delay = null;
$(window).resize(function (){
    // 窗口变化设置500ms延迟
    clearTimeout(delay);
    delay = setTimeout(function (){
        $('body').animate({
            'height': window.innerHeight,
            'width': window.innerWidth,
        },100);
        // 设置start按钮的高度和start字体大小
        $('#loading-start-cover').css('width', $('#loading-start-cover').innerHeight()/52*50 + 'px');
        if(innerWidth/1280 > 1){
            $('#loading-start>p').css('transform', 'scale('+innerWidth/1280+')');
        }else {
            $('#loading-start>p').css('transform', 'scale(1)');
        }
    },500);
})

// 当网页加载完毕时执行
$(document).ready(function (){

    if (!localStorage['demo']){
        toggle_info('#demo-tipsBox','show');
    }else {
        toggle_info('#demo-tipsBox','show');
        let noRepeat = 8;
        nRepeat();
        function nRepeat() {
            setTimeout(function (){
                $('#demo-tipsBox button').text('将在 '+noRepeat+' 秒后自动关闭');
                if (noRepeat===0){
                    toggle_info('#demo-tipsBox','close');
                }else {
                    noRepeat--;
                    nRepeat();
                }
            },1000)
        }
    }
    // 设置body为窗口的高度
    $('body').css({
        'height': window.innerHeight,
        'width': window.innerWidth,
    });

    // 设置背景图
    setBackground();
    // 设置start按钮的高度和start字体大小
    $('#loading-start-cover').css('width', $('#loading-start-cover').innerHeight()/52*50 + 'px');
    if(innerWidth/1280 > 1){
        $('#loading-start>p').css('transform', 'scale('+innerWidth/1280+')');
    }else {
        $('#loading-start>p').css('transform', 'scale(1)');
    }    // loading动画部分
    // loading条动画
    $('#loading-line-left,#loading-line-right').animate({width: '50%'},2000,function (){
        // 完成后，start按钮变色
        $('#loading-start-bg').animate({backgroundColor: 'rgb(255,216,2)'}, 300);
        $('#loading-start-bg2').animate({backgroundColor: 'rgb(255,216,2)'}, 300);
        $('#loading-start>p').animate({color: 'rgb(255,216,2)'}, 300, function () {
            // 完成后，设置无限循环动画
            $('#loading-start-bg2').css('animation', 'start ease-out 1500ms infinite');
            $('#loading-start-cover').attr('status',true);
        });
    });
    // 设置静音状态
    $('#float-voice>img').attr({'src': 'img/voice-'+ LocalStorage['globalVolumeStatus'] + '.png', 'status': LocalStorage['globalVolumeStatus']});
    // $('#loading').remove();// 调试用


})

// 退出loding
let loading_out = $('#loading-start');

// 鼠标松开触发
loading_out.mouseup(function (){
    // 获取loading条部分的高度
    let line_height = $('#loading-line').innerHeight();
    // 加载完毕才可以退出loading
    if ($('#loading-start-cover').attr('status')) {
        // 播放标题语音
        playVoice('voice-title');
        // 退出loading条
        $('#loading-line').animate({top: '+='+line_height},1000)
        // 同时过度loading界面图片到全屏
        $('#loading-front').animate({height: '100%','top': '0'},800,function (){
            // 过度完成后消失
            $('#loading').fadeOut('slow',function (){
                // loading消失后删除DOM节点
                $('#loading').remove();
                // 判断是否有token
                let token = getUrlParam('token');
                if(token) {
                    // 有就调出抽卡数据页面
                    toggle_info('#get_token','show',function (){
                        // 存在token则开始获取数据
                        $('#get_token_input-group>input').val(token);
                        outputGacha(token);
                    });
                }else {
                    // 没有就调出登录按钮
                    toggle_info('#login','show')
                }
            });
        });
    }
})

// 退出窗口
$('#global-cover').click(function () {
    $('body>div[status=true]').animate({top: $(window).innerHeight(), opacity: '0'},'slow',function () {
        $('body>div[status=true]').css('display', 'none');
    });
    $('#global-cover').fadeOut('slow',function (){
        toggle_info('#login','show');
    });
    // 关闭浮动组件
    toggle_float_item('close');
})

// 点击登录事件
function login() {
    $('#login').fadeOut('slow', function () {
        $('#global-cover').fadeIn('slow');
        toggle_info('#get_token','show');
    })
}

// 显示、关闭信息
function toggle_info(name,toggle,callback) {
    let top = '50%';
    // 显示更多浮动组件
    if (name === '#info_box' && toggle === 'show'){
        // 显示浮动组件
        toggle_float_item('show');
    }
    if (toggle==='show') {
        if (name !== '#login'){
            $('#global-cover').fadeIn('slow');
        }else {
            top = '80%';
        }
        $(name).attr('status',true);
        $(name).css({'transform': 'translate(-50%,-50%)','display': 'block'})
        $(name).css('display', 'block').animate({top: top, opacity: '1'}, 'slow',function () {
            if (typeof(callback)==='function'){
                callback();
            }
        });
    }else {
        $(name).animate({top: $(window).innerHeight(), opacity: '0'},'slow',function (){
            $(name).removeAttr('status');
            $(name).css({'display': 'none','transform': 'unset'})
            // 关闭浮动组件
            toggle_float_item('close');
            if (typeof(callback)==='function'){
                callback();
            }
        });
    }
}

// 显示、关闭loading_data
function toggle_loadData(toggle,callback) {
    let loadBox = $('#loading-data');// loading-data的选择
    if (toggle === 'show') {
        // 显示动画
        loadBox.css({display: 'block', bottom: '-' + loadBox.height() + 'px'});
        // 设置loding-data的高度
        $('#loading-data-cover').css('width', $('#loading-data-cover').innerHeight()/52*50 + 'px');
        loadBox.animate({bottom: '0'}, 300, function (){
            if (typeof(callback)==='function'){
                callback();
            }
        });
    }else {
        // 退出动画
        loadBox.animate({bottom: '-' + loadBox.height() + 'px'}, 300, function (){
            loadBox.css({display: 'none'});
            if (typeof(callback)==='function'){
                callback();
            }
        });
    }
}

// 显示、关闭error
function toggle_error(toggle,callback) {
    let errorBox = $('#error');
    let errorTop = $('#error-bgTop');
    let errorTopImg = $('#error-bgTop>img');
    let errorBottom = $('#error-bgBottom');
    $('#get_token_input-group>span').css({'color': '#e04857'}).html('&#10006');
    $('#get_token_input-group input').css({'border-bottom': '#e04857 solid 3px'});
    if (toggle === "show") {
        errorBox.css({display: 'flex', opacity: '0'});
        errorBox.animate({opacity: '1'}, 300);
        $('#error-msg>button').css('width',$('#error-msg>button').height()*1.5);
        $(':root').css('--errorBgMove', $('#error-bg').height()/100*800 + 'px');
        errorTop.animate({top: '0px'}, 300);
        errorTopImg.animate({top: '0'},300);
        errorBottom.animate({bottom: '0px'}, 300,function (){
            if (typeof(callback)==='function'){
                callback();
            }
        });
    }else {
        errorTop.animate({top: '-20%'}, 300);
        errorTopImg.animate({top: '-100%'},300);
        errorBottom.animate({bottom: '-20%'},300,function (){
            errorBox.fadeOut(300, function (){
                if (typeof(callback)==='function'){
                    callback();
                }
            })

        })
    }
}

// 显示、关闭浮动组件
function toggle_float_item (toggle,callback) {
    let display = null;
    // 判断是关闭还是打开
    if (toggle==="show") {
        display = "block";
        // 如果三个都为display: block则无需继续
        if ($('#float-gachaExplain').css('display') === 'block' && $('#float-download').css('display') === 'block' && $('#float-share').css('display') === 'block'){
            return;
        }
    }else {
        display = "none";
        // 如果三个都为display: none则无需继续
        if ($('#float-gachaExplain').css('display') === 'none' && $('#float-download').css('display') === 'none' && $('#float-share').css('display') === 'none'){
            return;
        }
    }

    // 隐藏整个浮动组件
    $('#float-item').fadeOut('200',function (){
        //显示、关闭子组件
        $('#float-gachaExplain').css('display',display);
        $('#float-download').css('display',display);
        $('#float-share').css('display',display);
        // 显示整个浮动组件
        $('#float-item').fadeIn('200',function (){
            // 回调函数
            if (typeof(callback)==='function'){
                callback();
            }
        });
    })
}
// 图片点击放大缩小
function imgZoom(name,toggle,callback){
    // 需要传入$(this)
    let imgUrl = name.attr('src');
    console.log(imgUrl);
    let imgAlt = name.attr('alt');
    let imgZoom = $('#imgZoom');
    let imgZoomImg = $('#imgZoom>img');
    if (toggle === 'show'){
        imgZoomImg.attr({src: imgUrl, alt: imgAlt});
        imgZoom.fadeIn('fast');
        imgZoomImg.css('display', 'block');
        imgZoomImg.animate({'top': '0','opacity': '1'}, 500, function (){
            if (typeof(callback)==='function'){
                callback();
            }
        })
    }else {
        imgZoomImg.animate({'top': '100%', 'opacity': '0'}, 500, function (){
            imgZoomImg.css({'display': 'none'})
            imgZoom.fadeOut('fast');
            imgZoomImg.removeAttr('src alt');
        })
    }
}

// 通过ajax获取抽卡数据
function outputGacha(token) {
    // 替换token中的+号避免后台将加号识别为空格
    token = token.replace(/\+/g,'%2B');
    // 会话存储token
    sessionStorage['token'] = token;
    // 限制间隔10秒
    $('#token_submit-group>button').attr('disabled',true);// 点击后改为true，不能再次点击
    let noRepeat = 10;
    nRepeat();
    function nRepeat() {
        setTimeout(function (){
            $('#token_submit-group>button').text(noRepeat+'秒后可再次提交');
            if (noRepeat===0){
                $('#token_submit-group>button').attr('disabled', false).text('提交');
            }else {
                noRepeat--;
                nRepeat();
            }
        },1000)
    }
    // 显示loading_data
    toggle_loadData('show');
    $.ajax({
        url: '/data.json',
        type: 'GET',
        dataType: 'json',
        timeout: '10000',
        success: function (res) {
            // 关闭loading_data
            toggle_loadData('close',function () {
                // 抽卡获取成功则播放登入语音
                playVoice('voice-hello');
                // 关闭get_token
                toggle_info('#get_token','close',function (){
                    // 显示info
                    toggle_info('#info_box','show');
                    OutPutGachaData = res;
                    // 写入卡池列表
                    $('#poolList').empty();// 先清空
                    for (let i = 0;i < res['pool'].length;i++){
                        $('#poolList').append('<p onclick=analysisData(OutPutGachaData,'+'"'+ res['pool'][i] +'"'+')>'+ res['pool'][i] +'</p>');
                    }
                    // 处理抽卡数据
                    analysisData(res,'常驻标准寻访');
                });
            });
        },
        error: function (res) {
            if (res){
                // 关闭loading_data
                toggle_loadData('close',function (){
                    console.error('服务器响应超时');
                    // 显示报错信息
                    $('#error-msg>span').text('服务器响应超时');
                    toggle_error('show');
                });
            }
            else {
                // 关闭loading_data
                toggle_loadData('close',function (){
                    res = $.parseJSON(res.responseText);
                    console.error(res['msg']);
                    // 显示报错信息
                    $('#error-msg>span').text(res['msg']);
                    toggle_error('show');
                });
            }
        }
    })
}

// 播放语音
function playVoice(id,volume,playbackRate,delay) {
    // 设置参数的默认值
    id = id ? id : console.error("playVoice函数没有设置id");
    volume = volume ? volume : volume = LocalStorage['globalVolume'];
    playbackRate = playbackRate ? playbackRate : '1';
    delay = delay ? delay : 500;
    setTimeout(function (){
        let voice = document.getElementById(id);
        voice.volume = volume;
        voice.playbackRate = playbackRate;
        voice.play();
    },delay)
}

// 随机背景
function setBackground() {
    let bg = $('#bg,#loading-front');
    let min = 1;
    let max = 18;
    let random = parseInt(Math.random() * (max - min + 1) + min);
    let url = "picture-" + random + ".png";
    bg.css('background-image','url("img/' + url + '")');
    bg.fadeIn('1000');
}
// 监听悬浮静音按钮
$('#float-voice>img').click(function (){
    if ($(this).attr('status') === 'on') {
        $(this).attr({'status': 'off','src': 'img/voice-off.png'});
        LocalStorage['globalVolume'] = '0';
        LocalStorage['globalVolumeStatus'] = 'off'
    }else {
        $(this).attr({'status': 'on','src': 'img/voice-on.png'});
        LocalStorage['globalVolume'] = '0.05';
        LocalStorage['globalVolumeStatus'] = 'on'
    }
})

// 监听悬浮下载按钮
// $('#float-download').click(function (){
//     let token = sessionStorage['token'].replace(/\+/g,'%2B');
//     window.location.href = 'download.php?token=' + token;
// })