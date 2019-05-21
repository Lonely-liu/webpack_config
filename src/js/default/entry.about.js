import '../common/common'
import '../../css/about.scss'

$(function () {


  /**
   * @description 拖拽进度条
   * @param {Element} bar 拖动按钮
   * @param {Element} text 百分比显示
   * @param {Element} percentage 拖动条
   * @method percent 手动调整进度条到指定百分比 (int)
   */
  class DragProgress {
    constructor(percentLine, bar, text) {
      this.bar = bar
      this.text = text
      this.percentLine = percentLine

      // 进度条总宽度
      let width = $('.js_progress_box').width()
      this.width = width

      let percentageLeft = this.percentLine.get(0).getBoundingClientRect().left // 进度条的左偏移量

      // 拖动bar进度条
      this.bar.on('touchmove', (e) => {
        let moveLeft = e.touches[0] // bar的移动参数
        let move = parseInt(moveLeft.pageX - percentageLeft) // 移动的距离
        let percent = Number((move / width).toFixed(3)) // 百分比

        console.log(percent)
        if (move >= width) {
          this.text.text('100%')
          wavelProgress.conctrl(percent)
          return
        }

        if (move <= 0) {
          this.text.text('0%')
          this.percentLine.width(0)
          this.bar.css('left', 0 + 'px')
          wavelProgress.conctrl(percent)
          return
        }

        this.percent(percent)
        wavelProgress.conctrl(percent)
      })
    }

    /**
     * @description 手动调整进度条到指定百分比 (int)
     * @param {[Number | String]} percent 调整的进度
     */
    percent(percent) {
      let move = this.width*percent // 移动的位置
      this.text.text((percent*100).toFixed(1) + '%')
      this.percentLine.width(move)
      this.bar.css('left', move + 'px')
    }
  }


  /**
   * @description 水纹进度条
   * @param {Element} wave 水纹
   * @method conctrl 调整进度条百分比 (int)
   */
  class WavelProgress {
    constructor(wave) {
      this.wave = wave

      this.top = 206
      this.bottom = 106

      this.lower = '#67c23a'
      this.middle = '#e6a23c'
      this.high = '#f56c6c'
    }

    /**
     * @description 手动跳转指定百分比
     * @param {[Element | String]} percent 百分比
     */
    conctrl(percent) {

      if (0.8 > percent >= 0.5) {
        this._changeColor(this.middle)
      }

      if (percent >= 0.8) {
        this._changeColor(this.high)
      }

      if (percent < 0.5) {
        this._changeColor(this.lower)
      }

      $('.js_wave_mask').css('top', -(this.bottom + percent*100) + 'px')
    }

    /**
     * @description 调整水纹进度条颜色
     * @param {string} color 颜色
     * @private
     */
    _changeColor(color) {
      $('.js_wave').css('background-color', color)
      $('.js_wave_wrap').css('border-color', color)
    }
  }

  let wavelProgress = new WavelProgress($('.js_wave_mask'))
  let dragProgress = new DragProgress($('.js_progress_line'), $('.js_bar'), $('.js_percentage'))

  dragProgress.percent(0.2)
  wavelProgress.conctrl(0.2)
})
