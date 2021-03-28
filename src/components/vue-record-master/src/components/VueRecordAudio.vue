<template lang="html">
<!--  <div-->
<!--      class="vue-audio-recorder"-->
<!--      :class="{-->
<!--      'active': isRecording,-->
<!--      'paused': isPaused-->
<!--    }"-->
<!--      v-touch:touchhold="startRecording"-->
<!--      v-touch:end="stopRecording"-->
<!--  >-->
<!--    <span></span>-->
<!--  </div>-->
<!--  <div-->
<!--      class="vue-audio-recorder"-->
<!--      :class="{-->
<!--      'active': isRecording,-->
<!--      'paused': isPaused-->
<!--    }"-->
<!--      @mousedown="startRecording"-->
<!--      @mouseleave="stopRecording"-->
<!--      @mouseup="stopRecording"-->
<!--      @touchstart="startRecording"-->
<!--      @touchend="stopRecording"-->
<!--      @touchcancel="stopRecording"-->
<!--  >-->
  <div
      class="vue-audio-recorder"
      :class="{
    'active': isRecording,
    'paused': isPaused
  }"
      @mousedown="switchRecording"
      @touchstart="switchRecording"
  >
    <i style="font-size: 1.5rem; color: #fff; padding: 1.1rem" :class="{
      'ni ni-button-pause': isRecording}"></i>
    <span v-if="!isRecording"></span>
  </div>
</template>

<script>
import ElementMixin from './ElementMixin'

export default {
  name: 'VueRecordAudio',
  mixins: [ElementMixin],
  props: {
    mimeType: {
      type: String,
      default: 'audio/webm',
    }
  },
  data () {
    return {
      constraints: {
        audio: true,
        video: false
      }
    }
  },
  mounted() {
    // console.log(this.mimeType)
  },
  methods: {
    switchRecording() {
      if (this.isRecording) {
        this.stopRecording()
      } else {
        this.startRecording()
      }
    }
  },
}
</script>
<style>
.active::after, .active::before {
  display: none!important;
}
</style>
<style lang="scss">
  .vue-audio-recorder {
    position: relative;
    background-color: #4DB6AC;
    border-radius: 50%;
    width: 64px;
    height: 64px;
    display: inline-block;
    cursor: pointer;
    box-shadow: 0 0 0 0 rgba(232, 76, 61, 0.7);
    &:hover {
      background-color: #26A69A;
    }
    &.active {
      background-color: #ef5350;
      -webkit-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
      -moz-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
      animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
    }
    &:before,
    &:after {
      content: '';
      position: absolute;
      background-color: #fff;
    }
    &:after {
      top: 30%;
      left: 43%;
      height: 15%;
      width: 14%;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
    }
    &:before {
      top: 40%;
      left: 43%;
      height: 15%;
      width: 14%;
      border-bottom-left-radius: 50%;
      border-bottom-right-radius: 50%;
    }
    span {
      position: absolute;
      top: 50%;
      left: 36%;
      height: 24%;
      width: 28%;
      overflow: hidden;
      &:before,
      &:after {
        content: '';
        position: absolute;
        background-color: #fff;
      }
      &:before {
        bottom: 50%;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-radius: 50%;
        border: 0.125em solid #fff;
        background: none;
        left: 0;
      }
      &:after {
        top: 50%;
        left: 40%;
        width: 20%;
        height: 25%;
      }
    }
  }
  @keyframes pulse {
    to {
      box-shadow: 0 0 0 10px rgba(239, 83, 80, 0.1);
      background-color: #E53935;
      transform: scale(0.9);
    }
  }
</style>
