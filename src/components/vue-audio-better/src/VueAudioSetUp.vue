<template>
  <div class="vueAudioBetter" style="width: 94.6vw;">
    <div
      class="row align-middle"
      style="width: auto!important; text-align: center!important; position: relative; margin: 14px 12px;"
    >
      <div
        class="col-1 align-middle"
        style="text-align: left; padding: 0px!important;"
      >
        <img
          style="height: 6rem; border-radius: 0.5rem;box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );"
          :src="require('../../../assets/album_art.png')"
        />
      </div>
      <div
        class="col-9 align-middle"
        style="line-height: 1.0rem; text-align: left; padding: 1.5rem 0 0 4.7rem !important; font-family: -apple-system, BlinkMacSystemFont, 'Open Sans', sans-serif;"
      >
        <span style="font-size: 13px; font-weight: bold; color:#C6C6C6;"
          >iPhone</span
        ><br />
        <!--        <span style="line-height: 1.6rem; color: #1F2020; font-weight: bold; font-size: 16px;">{{ fileName }}</span><br/>-->
        <div
          style="line-height: 1.6rem; color: #FFFFFF; font-weight: bold; font-size: 16px;"
        >
          Brainwash Recording
        </div>
        <br />
        <!--        <span style="color: #1F2020; font-size: 13px;">Brainwash</span>-->
      </div>
      <div
        class="col-1 align-middle"
        style="line-height: 1.0rem; padding: 1.2rem 0.7rem 0 2.1rem !important;text-align: right;"
      >
        <span>
          <img
            style="margin-top: 1rem!important; height: 1.4rem;"
            :src="require('../../../assets/AirPlay.png')"
          />
        </span>
      </div>
    </div>
    <div class="slider" ref="slider" @click="handleModifyProgress">
      <div class="progressInfo"></div>
      <div class="process" :style="{ width: pWidth }"></div>
      <div class="thunk" ref="trunk" :style="{ left }">
        <div class="block"></div>
      </div>
      <span
        style="font-weight: bold; font-size: 0.82rem; font-family: -apple-system, BlinkMacSystemFont, 'Open Sans', sans-serif; padding-top: 0.4rem; margin-top: 4px; position: absolute; left: 0px; color: #C6C6C6;"
        >{{ _sToMs(seek) }}</span
      >
      <span
        style="font-weight: bold; font-size: 0.82rem; font-family: -apple-system, BlinkMacSystemFont, 'Open Sans', sans-serif; padding-top: 0.4rem; margin-top: 4px; position: absolute; right: 0px; color: #C6C6C6;"
        >- {{ _sToMs(duration) }}</span
      >
    </div>
    <div
      class="operatorButton"
      style="margin-top: 2.5rem; margin-bottom: 1.8rem;"
    >
      <span class="iconfont">
        <img
          style="height: 1.6rem;"
          :src="require('../../../assets/Rewind.png')"
        />
      </span>
      <span class="iconfont" @click="togglePlayback" v-if="!playing">
        <img
          style="height: 2.1rem;"
          :src="require('../../../assets/Play.png')"
        />
      </span>
      <span class="iconfont" @click="togglePlayback" v-else>
        <img
          style="height: 2.1rem;"
          :src="require('../../../assets/Pause.png')"
        />
      </span>
      <span class="iconfont">
        <img
          style="height: 1.6rem;"
          :src="require('../../../assets/FastForward.png')"
        />
      </span>
    </div>
    <div
      class="align-items-center"
      style="width: 84.5%!important; text-align: center!important; position: relative; margin: 22px auto 26px auto;"
    >
      <div class="row">
        <div
          class="col-1"
          style="line-height: 1.4!important; padding: 0px!important;"
        >
          <span
            style="line-height: 1.4!important; padding: 0px!important;"
            class="iconfont"
            @click="handleSetVolume(false)"
          >
            <img
              style="height: 1rem; margin-top: 2px;"
              :src="require('../../../assets/AudioDec.png')"
            />
          </span>
        </div>
        <div class="col-10" style="padding: 0px 10px!important; ">
          <vue-slider
            v-model="curVolume"
            :min="0"
            :max="1"
            :interval="0.1"
            style="height: 5.5px!important;"
            v-bind="options"
            :silent="true"
            tooltip="none"
            :drag-on-click="true"
          />
        </div>
        <div
          class="col-1"
          style="line-height: 1.4!important; padding: 0px!important;"
        >
          <span
            style="line-height: 1.4!important; padding: 0px!important;"
            class="iconfont"
            @click="handleSetVolume(true)"
          >
            <img
              style="height: 1.1rem;"
              :src="require('../../../assets/AudioInc.png')"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Audio from "./audio.js";
import "./font/iconfont.css";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/antd.css";
export default {
  name: "VueAudio",
  mixins: [Audio],
  components: {
    VueSlider
  },
  props: ["width", "fileName"],
  data() {
    return {
      options: {
        dotSize: 15
      },
      muted: true,
      min: 0,
      max: 100,
      slider: null,
      sliderVol: 0.5,
      thunk: null,
      per: 0,
      rate: 1,
      isMute: true,
      curVolume: 0.5,
      // sliderVol:  0.5,
      totalWidth: 500
    };
  },
  watch: {
    curProgress(v) {
      // 避免拖拽未完成 进度发生变化
      if (!document.onmouseup) {
        this.per = v;
      }
    },
    sliderVol(v) {
      if (v !== undefined) {
        this.setVolume(v);
      }
    },
    curVolume(v) {
      if (v !== undefined) {
        this.sliderVol = v;
      }
    }
  },
  computed: {
    curProgress() {
      let curProgress = (Math.round(this.progress * 10000) / 100.0).toFixed(2);
      return curProgress;
    },
    // 设置一个百分比，提供计算slider进度width和trunk的left值
    scale() {
      let scale = (this.per - this.min) / (this.max - this.min);
      return scale;
    },
    pWidth() {
      if (this.slider) {
        return this.slider.offsetWidth * this.scale + "px";
      } else {
        return 0 + "px";
      }
    },
    left() {
      if (this.slider) {
        return (
          this.slider.offsetWidth * this.scale -
          this.thunk.offsetWidth / 2 +
          "px"
        );
      } else {
        return 0 + "px";
      }
    }
  },
  methods: {
    handleModifyProgress(e) {
      if (e.target.className === "slider" || e.target.className === "process") {
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
      this.isMute ? (this.isMute = false) : (this.isMute = true);
      this.toggleMute();
    },
    handleSetVolume(flag) {
      flag ? (this.curVolume += 0.1) : (this.curVolume -= 0.1);
      this.curVolume > 1
        ? (this.curVolume = 1)
        : this.curVolume < 0
        ? (this.curVolume = 0)
        : "";
      this.setVolume(this.curVolume);
    },
    _sToMs(s) {
      if (typeof s !== "number") return "00" + ":" + "00";
      s = parseInt(s);
      let h;
      h = Math.floor(s / 60);
      s = s % 60;
      h += "";
      s += "";
      h = h.length == 1 ? "0" + h : h;
      s = s.length == 1 ? "0" + s : s;
      return h + ":" + s;
    }
  },
  mounted() {
    if (this.width && typeof this.width === "number") {
      this.totalWidth = this.width + "px";
    }
    // 设置音量
    this.setVolume(this.curVolume);
    this.slider = this.$refs.slider;
    this.thunk = this.$refs.trunk;
    this.sliderVol = this.$refs.sliderVol;
    this.thunkVol = this.$refs.trunkVol;
  }
};
</script>
<style>
.vue-slider-dot-handle {
  border: 0px !important;
  font-size: 45px !important;
  width: 140%;
  height: 140%;
  margin-top: -20%;
}
.vue-slider:hover .vue-slider-process,
.vue-slider-process {
  background-color: #fff !important;
}
.vue-slider-rail {
  margin-top: 0.15rem;
  height: 3.5px !important;
  background-color: rgba(198, 198, 198, 0.9) !important;
}
</style>
<style scoped>
.vueAudioBetter {
  background: rgba(48, 48, 48, 0.6);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.22);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 10px;
  overflow: hidden;
  width: 500px;
  /*min-width: 500px;*/
  margin: 0 10px !important;
  /*background-color: rgba(235,235,277, 0.9);*/
  /*border-radius: 6.5px;*/
  /*box-shadow: 5px 5px 10px -4px #63645e;*/
  /*background-image: linear-gradient(to right, #9ca5f5, #7ff5ae);*/
}
.vueAudioBetter .total {
  margin: 14px 12px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: auto;
}
.vueAudioBetter .operatorButton {
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 78%;
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
/*.operatorButton span:hover {*/
/*  font-size: 30px;*/
/*}*/
/*.operatorButton span:last-child:hover {*/
/*  font-size: 36px;*/
/*}*/
.vueAudioBetter .slider {
  position: relative;
  margin: 18px 12.5px 28px 12.5px;
  width: auto;
  height: 4.5px;
  background: rgba(198, 198, 198, 0.9) !important;
  border-radius: 5px;
  cursor: pointer;
}
.slider .process {
  position: absolute;
  left: 0;
  top: 0;
  width: 112px;
  height: 4.5px;
  border-radius: 5px;
  background: #ffffff;
}
.slider .thunk {
  position: absolute;
  left: 100px;
  top: -3px;
  width: 10px !important;
  height: 10px !important;
}
.slider .block {
  width: 12px !important;
  height: 12px !important;
  border-radius: 50%;
  /*border: 2px solid #535150;*/
  background: rgba(255, 255, 255, 1);
  transition: 0.2s all;
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
