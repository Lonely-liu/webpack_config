import '../../css/index.scss'

// import Vue from 'vue/dist/vue.js'
// import '../common/common'

$(function () {


  // 奖号dom元素
  let $frameList = $('[data-role]');
  let $input = $('#gift-num');

  // 定时器的值
  let k = null;

  // 奖号dom元素 总长度
  let len = null;

  // 初始化 闪动间隔时间 毫秒数
  let initDelayTime = 50;

  // 抽奖号数
  let times = 0;

  // 抽圈数
  let circleCount = 0;

  // 是不是在抽奖
  let isBusy = false;

  // 抽奖初始 号数
  let oldTimes = null;

  // 抽奖号数 dom元素 做个排序， 分个大小
  let frameList = Array.from($frameList).sort((a, b) => {
    return $(a).data('role') - $(b).data('role')
  });
  len = frameList.length;

  // 抽奖开始效果
  function startGiftAm() {
    // 抽奖第一帧时，给oldTimes 赋值起始抽号数
    k || (oldTimes = times);

    // 当前应激活的元素
    let $curItem = $(frameList[(times++) % len]);

    //抽奖圈数
    circleCount = parseInt((times - oldTimes) / len);

    // 根据圈数 改变 闪动间隔时间
    switch (circleCount) {
      case 0:
        break;
      case 1:
        break;
      case 2:
        break;
      case 3:
        initDelayTime = 100;
        break;
      default:
        initDelayTime = 200
    }

    //
    $frameList.removeClass('active');
    $curItem.addClass('active');

    // 如果够四圈 并且 当前抽奖号数等于 结束抽奖号数 终止抽奖， 并初始化抽奖 状态
    if (circleCount === 4 && Number($input.val()) === $curItem.data('role')) {
      circleCount = 0;
      k = null;
      isBusy = false;
      initDelayTime = 50;
    } else {
      k = setTimeout(startGiftAm, initDelayTime);
    }
  };

  //
  $('.get-gift-btn').on('click', function () {
    if (!isBusy) {
      console.log(isBusy);
      isBusy = true;
      startGiftAm();
    }
  })
})
