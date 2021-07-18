<template>
  <v-touch @swipedown="swipeBottomHandler" :swipe-options="{ threshold: 200 }">
<!--    <div v-touch:swipe.bottom="swipeBottomHandler" style="width: 100vw">-->
    <div style="width: 100vw">
      <div v-if="step === 1">
          <div class="row">
              <div class="col-6" @click="chooseCardType('hearts')" :style="{ height: windowHeight/2 + 'px' }" style="background-color: #000!important;">
              </div>
              <div class="col-6" @click="chooseCardType('spades')" :style="{ height: windowHeight/2 + 'px'}" style="background-color: #000!important;">
              </div>
          </div>
          <div class="row">
              <div class="col-6" @click="chooseCardType('clubs')" :style="{ height: windowHeight/2 + 'px' }" style="background-color: #000!important;">
              </div>
              <div class="col-6" @click="chooseCardType('diamonds')" :style="{ height: windowHeight/2 + 'px' }" style="background-color: #000!important;">
              </div>
          </div>
      </div>
      <div v-else-if="step === 2">
        <div v-if="mode === 'ios'" class="row">
          <div class="col-12 text-center" style="background-repeat: no-repeat; background-size: 100%!important; background-color: #000;" :style="{ height: windowHeight + 'px', backgroundImage: 'url(' + ($store.state.fakeScreen === '' ? $store.state.fakeScreenDefaultIOS : $store.state.fakeScreen) + ')' }">
            <div class="clock">
              <div class="position-relative text-center">
                <img style="margin: 1rem auto 1.3rem auto!important; height: 2.3rem;" :src="require('../assets/ios_padlock.png')"/>
                <p class="time">{{ time }}</p>
                <p class="date">{{ date }}</p>
              </div>
            </div>
            <div class="container py-0 px-0" style="position: absolute; z-index: 2!important;">
              <div class="position-relative text-center"
                   :style="{ width: windowWidth+'px', top: $store.state.top + 'px!important'}">
                <VueAudioFake
                    style="margin: 0 auto; position: relative"
                    :file-name="cardNameAndType(cardType, cardNumber)"
                    :audio-source="voiceData[cardType][cardNumber]"
                    :loop="true"
                    :autoplay="true"
                    :width="windowWidth * 0.9"
                ></VueAudioFake>
              </div>
            </div>
            <div class="row" style="margin: 0!important; position: absolute; bottom: 0; width: 100vw;">
              <div class="col-6" style="text-align: left!important;">
                <div style="padding-left: 2.6rem; padding-bottom: 2.8rem;">
                  <img style="margin: 1.1rem auto!important; height: 3.4rem; background-color: #1A1A1D; border-radius: 3.4rem; background: rgba( 48, 48, 48, 0.60 ); box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.15 ); backdrop-filter: blur( 20px ); -webkit-backdrop-filter: blur( 20px );" :src="require('../assets/torch.png')"/>
                </div>
              </div>
              <div class="col-6" style="text-align: right!important;">
                <div style="padding-right: 2.6rem; padding-bottom: 2.8rem;">
                  <img style="margin: 1.1rem auto!important; height: 3.4rem; background-color: #1A1A1D; border-radius: 3.4rem; background: rgba( 48, 48, 48, 0.60 ); box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.15 ); backdrop-filter: blur( 20px ); -webkit-backdrop-filter: blur( 20px );" :src="require('../assets/camera.png')"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="row">
          <div class="col-12 text-center">
            <div class="clock" style="z-index: 2!important;">
              <div class="position-relative text-center">
                <img style="margin: 1rem auto 1.3rem auto!important; height: 2.3rem;" :src="require('../assets/android_padlock.png')"/>
                <p class="time" style="margin-top: 4rem;">{{ time }}</p>
                <p class="date" style="font-weight: normal!important;">{{ date }}&nbsp;<img style="width: 35px;" :src="require('../assets/sunny-icon.jpg')"/>&nbsp;76°F</p>
              </div>
            </div>
            <div class="container py-0 px-0" style="z-index: 2!important; position: absolute; z-index: 2!important;">
              <div class="position-relative text-center"
                   :style="{ width: windowWidth+'px', top: $store.state.top + 'px!important'}">
                <VueAudioFakeAndroid
                    style="margin: 0 auto; position: relative; z-index: 999;"
                    :file-name="cardNameAndType(cardType, cardNumber)"
                    :audio-source="voiceData[cardType][cardNumber]"
                    :loop="true"
                    :autoplay="true"
                    :width="windowWidth * 0.9"
                ></VueAudioFakeAndroid>
              </div>
            </div>
            <div class="text-center" style="z-index: 1!important; filter: blur(10px); -webkit-filter: blur(10px);background-repeat: no-repeat; background-size: 100%!important; background-color: #000;" :style="{ height: windowHeight + 'px', backgroundImage: 'url(' + ($store.state.fakeScreen === '' ? $store.state.fakeScreenDefaultAndroid : $store.state.fakeScreen) + ')' }">
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="step === 3">
        <v-touch @swipe="chooseCardNumber((13).toString())" :swipe-options="{ threshold: 150, pointers: 2 }">
          <div class="row" v-for="row in [1, 4, 7, 10]" :key="row">
              <div @click="chooseCardNumber((row + col).toString())" v-for="col in range(3)" class="col-4" :style="{ height: windowHeight/4 + 'px' }" style="background-color: #000!important;" :key="col">
              </div>
          </div>
        </v-touch>
      </div>
      <div v-else>
        <div class="row" v-if="mode === 'ios'">
          <div class="col-12 text-center" style="background-repeat: no-repeat; background-size: 100%!important; background-color: #000;" :style="{ height: windowHeight + 'px', backgroundImage: 'url(' + ($store.state.fakeScreen === '' ? $store.state.fakeScreenDefaultIOS : $store.state.fakeScreen) + ')' }">
            <div class="clock">
              <div class="position-relative text-center">
                <img style="margin: 1rem auto 1.3rem auto!important; height: 2.3rem;" :src="require('../assets/ios_padlock.png')"/>
                <p class="time">{{ time }}</p>
                <p class="date">{{ date }}</p>
              </div>
            </div>
            <div class="container py-0 px-0" style="position: absolute; z-index: 2!important;">
              <div class="position-relative text-center"
                   :style="{ width: windowWidth+'px', top: $store.state.top + 'px!important'}">
                <vue-audio
                    style="margin: 0 auto; position: relative"
                    :file-name="cardNameAndType(cardType, cardNumber)"
                    :audio-source="voiceData[cardType][cardNumber]"
                    :loop="true"
                    :autoplay="true"
                    :width="windowWidth * 0.9"
                ></vue-audio>
              </div>
            </div>
            <div class="row" style="margin: 0!important; position: absolute; bottom: 0; width: 100vw;">
              <div class="col-6" style="text-align: left!important;">
                <div style="padding-left: 2.6rem; padding-bottom: 2.8rem;">
                  <img style="margin: 1.1rem auto!important; height: 3.4rem; background-color: #1A1A1D; border-radius: 3.4rem; background: rgba( 48, 48, 48, 0.60 ); box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.15 ); backdrop-filter: blur( 20px ); -webkit-backdrop-filter: blur( 20px );" :src="require('../assets/torch.png')"/>
                </div>
              </div>
              <div class="col-6" style="text-align: right!important;">
                <div style="padding-right: 2.6rem; padding-bottom: 2.8rem;">
                  <img style="margin: 1.1rem auto!important; height: 3.4rem; background-color: #1A1A1D; border-radius: 3.4rem; background: rgba( 48, 48, 48, 0.60 ); box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.15 ); backdrop-filter: blur( 20px ); -webkit-backdrop-filter: blur( 20px );" :src="require('../assets/camera.png')"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row" v-else>
          <div class="col-12 text-center">
            <div class="clock" style="z-index: 2!important;">
              <div class="position-relative text-center">
                <img style="margin: 1rem auto 1.3rem auto!important; height: 2.3rem;" :src="require('../assets/android_padlock.png')"/>
                <p class="time" style="margin-top: 4rem;">{{ time }}</p>
                <p class="date" style="font-weight: normal!important;">{{ date }}&nbsp;<img style="width: 35px;" :src="require('../assets/sunny-icon.jpg')"/>&nbsp;76°F</p>
              </div>
            </div>
            <div class="container py-0 px-0" style="z-index: 2!important; position: absolute; z-index: 2!important;">
              <div class="position-relative text-center"
                   :style="{ width: windowWidth+'px', top: $store.state.top + 'px!important'}">
                <VueAudioAndroid
                    style="margin: 0 auto; position: relative; z-index: 999;"
                    :file-name="cardNameAndType(cardType, cardNumber)"
                    :audio-source="voiceData[cardType][cardNumber]"
                    :loop="true"
                    :autoplay="true"
                    :width="windowWidth * 0.9"
                ></VueAudioAndroid>
              </div>
            </div>
            <div class="text-center" style="z-index: 1!important; filter: blur(10px); -webkit-filter: blur(10px);background-repeat: no-repeat; background-size: 100%!important; background-color: #000;" :style="{ height: windowHeight + 'px', backgroundImage: 'url(' + ($store.state.fakeScreen === '' ? $store.state.fakeScreenDefaultAndroid : $store.state.fakeScreen) + ')' }">
            </div>
          </div>
        </div>
      </div>
</div>
  </v-touch>
</template>

<script>
import { mapState } from 'vuex'

const play = require('audio-play');
const load = require('audio-loader');
import VueAudio from "../components/vue-audio-better/src/VueAudio";
import VueAudioFake from "../components/vue-audio-better/src/VueAudioFake";
import VueAudioAndroid from "../components/vue-audio-better/src/VueAudio_Android";
import VueAudioFakeAndroid from "../components/vue-audio-better/src/VueAudioFake_Android";
export default {
    name: "perform",
    components: {
        VueAudio,
        VueAudioFake,
        VueAudioAndroid,
        VueAudioFakeAndroid,
    },
  computed: {
    ...mapState(['mode', 'voiceData']),
  },
    // metaInfo() {
    //   return {
    //     title: "Performance Mode",
    //     meta: [
    //       { name: 'apple-mobile-web-app-status-bar-style', content:  'black'},
    //     ],
    //   }
    // },
  data() {
        return {
            time: '',
            date: '',
            week: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            months: ["January","February","March","April","May","June","July","August","September","October","November","December"],
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            txt: '',
            cardType: 'hearts',
            cardNumber: '1',
            step: 1,
            playback: null,
        }
    },
    methods: {
        swipeBottomHandler() {
          this.$router.go(-1)
        },
        updateTime() {
          if (this.mode === 'ios') {
            let cd = new Date();
            this.time = cd.getHours() === 0 ? 12 : cd.getHours() + ':' + this.zeroPadding(cd.getMinutes(), 2);
            this.date = this.week[cd.getDay()] + ', ' + cd.getDate() + '. ' + this.months[cd.getMonth()];
          } else {
            let cd = new Date();
            this.time = cd.getHours() === 0 ? 12 : cd.getHours() + ':' + this.zeroPadding(cd.getMinutes(), 2);
            this.date = this.week[cd.getDay()].slice(0, 3) + ', '  + this.months[cd.getMonth()].slice(0, 3) + " " + cd.getDate();
          }
        },
        zeroPadding(num, digit) {
            let zero = '';
            for(let i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        range(size, startAt = 0) {
            return [...Array(size).keys()].map(i => i + startAt);
        },
        chooseCardType(val) {
            this.cardType = val
            this.step++
        },
        skipScreen() {
            this.step++
        },
        chooseCardNumber(val) {
            this.cardNumber = val
            this.step++
            // this.playSound()
        },
        async playSound() {
            const audioBuffer = await load(this.voiceData[this.cardType][this.cardNumber])
            this.playback = play(audioBuffer, {
                loop: true,
                volume: 1,
                rate: 1,
                autoplay: true,
            })
        },
        onResize() {
            this.windowHeight = window.innerHeight
            this.windowWidth = window.innerWidth
        },
        randomColor() {
            let x = Math.round(0xffffff * Math.random()).toString(16)
            let y = (6-x.length)
            let z = '000000'
            let z1 = z.substring(0,y)
            let color = '#' + z1 + x
            return color
        },
        cardName(cardNumber) {
            if (cardNumber === '1') {
                return 'Ace'
            }
            else if (cardNumber === '2') {
                return 'Two'
            }
            else if (cardNumber === '3') {
                return 'Three'
            }
            else if (cardNumber === '4') {
                return 'Four'
            }
            else if (cardNumber === '5') {
                return 'Five'
            }
            else if (cardNumber === '6') {
                return 'Six'
            }
            else if (cardNumber === '7') {
                return 'Seven'
            }
            else if (cardNumber === '8') {
                return 'Eight'
            }
            else if (cardNumber === '9') {
                return 'Nine'
            }
            else if (cardNumber === '10') {
                return 'Ten'
            }
            else if (cardNumber === '11') {
                return 'Jack'
            }
            else if (cardNumber === '12') {
                return 'Queen'
            }
            else if (cardNumber === '13') {
                return 'King'
            } else {
                return cardNumber
            }
        },
        cardNameAndType (cardType, cardNumber) {
            if (cardType === '') {
                return ''
            } else {
                let res = this.cardName(cardNumber)
                res += ' of ' + cardType.charAt(0).toUpperCase() + cardType.slice(1)
                return res
            }
        },
    },

    watch: {
        windowHeight(newHeight, oldHeight) {
            this.txt = `it changed to ${newHeight} from ${oldHeight}`;
        },
        windowWidth(newWidth, oldWidth) {
            this.txt = `it changed to ${newWidth} from ${oldWidth}`;
        },
        step(newValue, oldValue) {
            if (newValue === 2) {
                let vm = this
                setTimeout(() => {
                    vm.step = 3;
                }, 6000)
            }
        },
    },

    mounted() {
        let timerID = setInterval(this.updateTime, 1000);
        this.updateTime();
        this.$nextTick(() => {
            window.addEventListener('resize', this.onResize);
        })
    },
    // beforeCreate() {
    //   document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]').setAttribute("content", "black");
    // },
    beforeDestroy() {
        if (this.playback !== null) {
            this.playback.pause();
        }
        window.removeEventListener('resize', this.onResize);
      // document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]').setAttribute("content", "black-translucent");
    },


};
</script>

<style>
    .clock {
        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, sans-serif;
        font-weight: bold;
        color: #fff!important;
        position: absolute;
        top: 6%;
        margin-left: -1rem!important;
        width: 100% !important;
    }
    .time {
        /*font-weight: bold;*/
        color: #fff!important;
        font-size: 5rem!important;
        line-height: 0.85!important;
        text-shadow: 0 0 18px rgba(150, 150, 150, 0.6);
    }
    .date {
        /*font-weight: bold;*/
        color: #fff!important;
        font-size: 1.5rem!important;
        font-weight: bold;
        text-shadow: 0 0 18px rgba(150, 150, 150, 0.6);
    }
</style>
