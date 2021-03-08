<template>
  <div class="vueAudioBetter" :style="{width: totalWidth}">
    <div class="total" style="width: 100%!important;">
      <span style="font-weight: 700; font-size: 1.5rem;text-align: left!important;">{{ fileName }}</span>
      <!--      <span style="font-weight: 500; font-size: 0.9rem; padding-top: 0.47rem;">{{ _sToMs(seek) }} / {{ _sToMs(duration) }}</span>-->
    </div>
    <div class="slider" ref="slider" @click="handleModifyProgress">
      <div class="progressInfo"></div>
      <div class="process" :style="{width: pWidth}"></div>
      <div class="thunk" ref="trunk" :style="{left}">
        <div class="block"></div>
      </div>
      <span style="font-weight: 500; font-size: 0.7rem; padding-top: 0.5rem; margin-top: 5px; margin-left:-15px; position: absolute; left: 0px;">{{ _sToMs(seek) }}</span>
      <span style="font-weight: 500; font-size: 0.75rem; padding-top: 0.5rem; margin-top: 5px; margin-right:-15px; position: absolute; right: 0px;">{{ _sToMs(duration) }}</span>
    </div>
    <div class="operatorButton">
      <span class="iconfont icon-notificationfill" @click="handleToggleMute" v-if="isMute"></span>
      <span class="iconfont icon-notificationforbidfill" @click="handleToggleMute" v-else></span>
      <span class="iconfont icon-playcircle-fill" @click="togglePlayback" v-if="!playing"></span>
      <span class="iconfont icon-pausecircle-fill" @click="togglePlayback" v-else></span>
      <span class="iconfont icon-stopcircle-fill" @click="stop"></span>
    </div>
    <div class="align-items-center" style="width: 80%!important; text-align: center!important; position: relative; margin: 22px auto;">
      <div class="row">
        <div class="col-2">
          <span style="line-height: 1.4!important;" class="iconfont icon-subtract_fill" @click="handleSetVolume(false)"></span>
        </div>
        <div class="col-8" style="padding: 0px!important;">
          <vue-slider v-model="curVolume2" :min="0" :max="1" :interval="0.1" style="height: 5.5px!important;" v-bind="options" />
        </div>
        <div class="col-2">
          <span style="line-height: 1.4!important;" class="iconfont icon-roundaddfill" @click="handleSetVolume(true)"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Audio from './audio.js';
  import './font/iconfont.css';
  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/antd.css'
  export default {
    name: 'VueAudioFake',
    mixins: [Audio],
    components: {
      VueSlider,
    },
    props: ['width', 'fileName'],
    data() {
      return {
        options: {
          dotSize: 15,
        },
        min: 0,
        max: 100,
        slider: null,
        sliderVol: 0.0,
        thunk: null,
        per: 0,
        rate: 1,
        isMute: true,
        curVolume: 0.0,
        curVolume2: 0.0,
        // sliderVol:  0.5,
        totalWidth: 500
      }
    },
    watch: {
      curProgress(v) {
        // 避免拖拽未完成 进度发生变化
        if (!document.onmouseup) {
          this.per = v;
        }
      },
      sliderVol(v) {
        this.setVolume(0.0);
      },
      curVolume2(v) {
        this.sliderVol = v;
      },
    },
    computed:{
      curProgress() {
        let curProgress = ((Math.round((this.progress * 10000)))/100.00).toFixed(2);
        return curProgress;
      },
      // 设置一个百分比，提供计算slider进度width和trunk的left值
      scale(){
        let scale = (this.per - this.min) / (this.max - this.min);
        return scale;
      },
      pWidth(){
        if(this.slider){
          return this.slider.offsetWidth * this.scale + 'px';
        }else{
          return 0 + 'px'
        }
      },
      left(){
        if(this.slider){
          return this.slider.offsetWidth * this.scale -  this.thunk.offsetWidth/2  + 'px';
        }else{
          return 0 + 'px'
        }
      },
    },
    methods: {
      handleModifyProgress(e) {
        if (e.target.className === 'slider' || e.target.className === 'process') {
          let scale = e.offsetX / this.slider.offsetWidth;
          this.setProgress(scale);
        }
      },
      handleSetRate() {
        if (this.rate === 1) {
          this.rate = 0.9;
          this.setRate(this.rate);
        } else if (this.rate === 0.9) {
          this.rate = 1.2;
          this.setRate(this.rate);
        } else {
          this.rate = 1;
          this.setRate(this.rate);
        }
      },
      handleToggleMute() {
        this.isMute ? this.isMute = false : this.isMute = true;
        this.toggleMute();
      },
      handleSetVolume(flag) {
        flag ? this.curVolume2 += 0.1 : this.curVolume2 -= 0.1;
        this.curVolume2 > 1 ? this.curVolume2 = 1 : this.curVolume2 < 0 ? this.curVolume2 = 0 : '';
        this.setVolume(0.0);
      },
      _sToMs(s) {
        if(typeof s !== 'number') return '00' + ':' + '00'
        s = parseInt(s);
        let h;
        h = Math.floor(s/60);
        s = s%60;
        h += '';
        s += '';
        h = (h.length == 1) ? '0' + h : h;
        s = (s.length == 1) ? '0' + s : s;
        return h+':'+s;
      }
    },
    mounted () {
      if(this.width && typeof this.width === 'number') {
        this.totalWidth = this.width + 'px';
      }
      // 设置音量
      this.setVolume(0.0);
      this.slider = this.$refs.slider;
      this.thunk = this.$refs.trunk;
      this.sliderVol = 0.0;
      this.thunkVol = 0.0;
    },
  }
</script>
<style>
  .vue-slider-dot-handle {
    border: 2px solid #535150!important;
  }
  .vue-slider:hover .vue-slider-process, .vue-slider-process {
    background-color: #535150!important;
  }
  .vue-slider-rail {
    background-color: #F9F6EF!important;
  }
</style>
<style scoped>
  .vueAudioBetter {
    overflow: hidden;
    width: 500px;
    margin: 0 auto;
    background-color: rgba(235,235,277, 0.9);
    border-radius: 6.5px;
    box-shadow: 5px 5px 10px -4px #63645e;
    /*background-image: linear-gradient(to right, #9ca5f5, #7ff5ae);*/
  }
  .vueAudioBetter .total {
    margin: 16px auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
  }
  .vueAudioBetter .operatorButton {
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    height: 28px;
  }
  .operatorButton .rate {
    font-size: 32px;
  }
  .operatorButton span {
    font-size: 24px;
    color: #0c0c0cb8;
    cursor: pointer;
  }
  .operatorButton span:first-child {
    color: #4a3535;
    font-size: 28px;
  }
  .operatorButton span:hover {
    font-size: 30px;
  }
  .operatorButton span:last-child:hover {
    font-size: 36px;
  }
  .vueAudioBetter .slider {
    position: relative;
    margin: 18px auto 28px auto;
    width: 80%;
    height: 6.5px;
    background: #F9F6EF;
    border-radius: 5px;
    cursor: pointer;
  }
  .slider .process {
    position: absolute;
    left: 0;
    top: 0;
    width: 112px;
    height: 6.5px;
    border-radius: 5px;
    background: #535150;
  }
  .slider .thunk {
    position: absolute;
    left: 100px;
    top: -5px;
    width: 17px;
    height: 17px;
  }
  .slider .block {
    width: 17px;
    height: 17px;
    border-radius: 50%;
    border: 2px solid #535150;
    background: rgba(255, 255, 255, 1);
    transition: 0.2s all;
  }
  .slider .block:hover {
    transform: scale(1.1);
    opacity: 0.6;
  }
  .slider .progressInfo {
    position: absolute;
    top: -28px;
    color: #117eeb;
    font-weight: 600;
  }
  .operatorButton .iconfont:active {
    position: relative;
    top: 2px;
    left: 2px;
  }
</style>
