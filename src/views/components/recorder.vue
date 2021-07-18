<style lang="scss">
.vue-audio-recorder {
  position: relative;
  //background-color: #4DB6AC;
  background-color: whitesmoke;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  display: inline-block;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(232, 76, 61, 0.7);
  &:hover {
    background-color: rgba(163, 51, 39, 0.5);
  }
  &.active {
    background-color: #A33327;
    -webkit-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
    -moz-animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
    animation: pulse 1.25s infinite cubic-bezier(0.66, 0, 0, 1);
  }
  &:before,
  &:after {
    content: '';
    position: absolute;
    background-color: #A33327;
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
      background-color: #A33327;
    }
    &:before {
      bottom: 50%;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border-radius: 50%;
      border: 0.125em solid #A33327;
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
svg {
  vertical-align: baseline!important;
}
  .ar {
    width: 420px;
    font-family: 'Roboto', sans-serif;
    border-radius: 16px;
    background-color: #FAFAFA;
    box-shadow: 0 4px 18px 0 rgba(0,0,0,0.17);
    position: relative;
    box-sizing: content-box;

    &-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    &-records {
      height: 138px;
      padding-top: 1px;
      overflow-y: auto;
      margin-bottom: 20px;

      &__record {
        width: 320px;
        height: 45px;
        padding: 0 10px;
        margin: 0 auto;
        line-height: 45px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #E8E8E8;
        position: relative;

        &--selected {
          border: 1px solid #E8E8E8;
          border-radius: 24px;
          background-color: #FFFFFF;
          margin-top: -1px;
          padding: 0 34px;
        }
      }
    }

    &-recorder {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      &__duration {
        color: #AEAEAE;
        font-size: 32px;
        font-weight: 500;
        margin-top: 20px;
        margin-bottom: 16px;
      }

      &__stop {
        position: absolute;
        top: 10px;
        right: -52px;
      }

      &__time-limit {
        position: absolute;
        color: #AEAEAE;
        font-size: 12px;
        top: 128px;
      }

      &__records-limit {
        position: absolute;
        color: #AEAEAE;
        font-size: 13px;
        top: 78px;
      }
    }

    &-spinner {
      display: flex;
      height: 30px;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      width: 144px;
      z-index: 10;

      &__dot {
        display: block;
        margin: 0 8px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        background: #05CBCD;
        animation-name: blink;
        animation-duration: 1.4s;
        animation-iteration-count: infinite;
        animation-fill-mode: both;

        &:nth-child(2) { animation-delay: .2s; }

        &:nth-child(3) { animation-delay: .4s; }

        @keyframes blink {
          0%    { opacity: .2; }
          20%   { opacity: 1;  }
          100%  { opacity: .2; }
        }
      }
    }

    &__text {
      color: rgba(84,84,84,0.5);
      font-size: 16px;
    }

    &__blur {
      filter: blur(2px);
      opacity: 0.7;
    }

    &__overlay {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 10;
    }

    &__upload-status {
      text-align: center;
      font-size: 10px;
      padding: 2px;
      letter-spacing: 1px;
      position: absolute;
      bottom: 0;

      &--success {
        color: green;
      }

      &--fail {
        color: red;
      }
    }

    &__rm {
      cursor: pointer;
      position: absolute;
      width: 6px;
      height: 6px;
      padding: 6px;
      line-height: 6px;
      margin: auto;
      left: 10px;
      bottom: 0;
      top: 0;
      color: rgb(244, 120, 90);
    }

    &__downloader,
    &__uploader {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto;
    }

    &__downloader {
      right: 115px;
    }

    &__uploader {
      right: 85px;
    }
  }

  @import 'scss/icons';
</style>

<template>
  <div
      class="vue-audio-recorder"
      :class="{
        'active': isRecording
      }"
      @click="toggleRecorder"
  ><br/>{{this.recording}}<br/>{{this.recorderState}}<br/>
    <span v-if="!isRecording"></span>
    <i v-else style="font-size: 1.5rem; color: #fff; padding: 1.1rem" :class="{
      'ni ni-button-pause': isRecording}"></i>
  </div>
</template>

<script>
  import { Mp3MediaRecorder } from 'mp3-mediarecorder'
  import mp3RecorderWorker from 'workerize-loader!./worker'
  import {initMp3MediaEncoder} from "mp3-mediarecorder/worker";
  // import { convertTimeMMSS }  from '../lib/utils'

  export default {
    name: "AudioRecorderMp3",
    props: {
      time     : { type: Number },
      cardType: { type: String, default: 'hearts'},
      cardNumber: { type: String, default: '1'},
    },
    data () {
      return {
        workerCurrent : mp3RecorderWorker(),
        isRecording   : false,
        recorder      : null,
        recording     : null,
        recorderState : "inactive",
      }
    },
    beforeDestroy () {
      this.onStop()
    },
    methods: {
      toggleRecorder () {
        if (this.recorderState === "inactive") {
          this.recorder = this._initRecorder()
          this.isRecording = true
        } else {
          this.onStop()
          this.isRecording = false
        }
      },
      async afterRecording (data) {
        function sleep(milliseconds) {
          const date = Date.now();
          let currentDate = null;
          do {
            currentDate = Date.now();
          } while (currentDate - date < milliseconds);
        }
        await sleep(300);
        data.cardType = this.cardType
        data.cardNumber = this.cardNumber
        this.selected = data
        const reader = new FileReader();
        let convertedBlobString = ''
        reader.readAsDataURL(this.selected.blob);
        const vm = this;
        reader.onloadend = await function() {
          convertedBlobString = reader.result;
          const saveData = {
            cardType: vm.cardType,
            cardNumber: vm.cardNumber,
            recordData: convertedBlobString
          }
          vm.$store.commit('setRecord', saveData)
        }
      },
      onStop () {
        this.recorder.stop();
      },
      onStart () {
        this.recorder.start();
      },
      onPause () {
        this.recorder.pause();
      },
      onResume () {
        this.recorder.resume();
      },
      _initRecorder () {
        const vm = this
        window.navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          const recorder = new Mp3MediaRecorder(stream, {worker: vm.worker})
          recorder.ondataavailable = (event) => {
            console.log('ondataavailable', event.data)
            vm.recording = URL.createObjectURL(event.data)
          }
          recorder.onstart = () => {
            console.log('onstart')
            vm.recorderState = 'recording'
          }
          recorder.onstop = () => {
            console.log('onstop')
            vm.recorderState = 'inactive'
          }
          recorder.onpause = () => {
            console.log('onpause')
            vm.recorderState = 'paused'
          }
          recorder.onresume = () => {
            console.log('onresume')
            vm.recorderState = 'recording'
          }
          recorder.start();
          return recorder
        }).catch((err) => {
          console.log(err)
          return null
        })
      }
    },
    computed: {
      // attemptsLeft () {
      //   return this.attempts - this.recordList.length
      // },
      // iconButtonType () {
      //   return this.isRecording && this.isPause ? 'mic' : this.isRecording ? 'pause' : 'mic'
      // },
      // isPause () {
      //   return this.recorder.isPause
      // },
      // recordedTime () {
      //   if (this.time && this.recorder.duration >= this.time * 60) {
      //     this.stopRecorder()
      //   }
      //   return convertTimeMMSS(this.recorder.duration)
      // },
      // volume () {
      //   return parseFloat(this.recorder.volume)
      // }
    }
  }
</script>

