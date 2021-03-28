<template>
    <div v-touch:swipe.bottom="swipeBottomHandler" style="width: 100vw">
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
            <div class="row">
<!--                <div class="col-12 text-center" :style="{ height: windowHeight + 'px', backgroundColor: randomColor() }">-->
<!--                    <img :src="$store.state.fakeScreen" style="width: 100%; height: auto"/>-->
<!--                </div>-->
                <div class="col-12 text-center" style="background-repeat: no-repeat; background-size: 100%!important;" :style="{ height: windowHeight + 'px', backgroundColor: randomColor(), backgroundImage: 'url(' + this.$store.state.fakeScreen + ')' }">
                    <!--                    <img :src="$store.state.fakeScreen" style="width: 100%; height: auto; z-index: 1; position: relative; left: 0px; top: 0px;"/>-->
                    <div class="clock">
                        <div class="position-relative text-center">
                            <p class="time" style="margin-bottom: 4px;">{{ time }}</p>
                            <p class="date">{{ date }}</p>
                        </div>
                    </div>
                    <div class="container py-0 px-0" style="position: absolute; z-index: 2!important;">
                        <div class="position-relative text-center"
                             :style="{ width: windowWidth+'px', top: this.$store.state.top + 'px!important'}">
                            <VueAudioFake
                                style="margin: 0 auto; position: relative"
                                :file-name="this.cardNameAndType(this.cardType, this.cardNumber)"
                                :audio-source="this.$store.state.voiceData[this.cardType][this.cardNumber]"
                                :loop="true"
                                :autoplay="true"
                                :width="windowWidth * 0.9"
                            ></VueAudioFake>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else-if="step === 3">
            <div class="row" v-for="row in [1, 4, 7, 10]" :key="row">
                <div @click="chooseCardNumber((row + col).toString())" v-for="col in range(3)" class="col-4" :style="{ height: windowHeight/4 + 'px' }" style="background-color: #000!important;" :key="col">
                </div>
            </div>
        </div>
        <div v-else>
            <div class="row">
                <div class="col-12 text-center" style="background-repeat: no-repeat; background-size: 100%!important;" :style="{ height: windowHeight + 'px', backgroundColor: randomColor(), backgroundImage: 'url(' + this.$store.state.fakeScreen + ')' }">
                    <div class="clock">
                        <div class="position-relative text-center">
                            <p class="time" style="margin-bottom: 4px;">{{ time }}</p>
                            <p class="date">{{ date }}</p>
                        </div>
                    </div>
                    <div class="container py-0 px-0" style="position: absolute; z-index: 2!important;">
                      <div class="position-relative text-center" :style="{ width: windowWidth + 'px', top: this.$store.state.top + 'px!important'}">
                            <vue-audio
                                style="margin: 0 auto; position: relative"
                                :file-name="this.cardNameAndType(this.cardType, this.cardNumber)"
                                :audio-source="this.$store.state.voiceData[this.cardType][this.cardNumber]"
                                :loop="true"
                                :autoplay="true"
                                :width="windowWidth * 0.9"
                            ></vue-audio>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const play = require('audio-play');
const load = require('audio-loader');
import VueAudio from "../components/vue-audio-better/src/VueAudio";
import VueAudioFake from "../components/vue-audio-better/src/VueAudioFake";
export default {
    name: "perform",
    components: {
        VueAudio,
        VueAudioFake,
    },
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
            let cd = new Date();
            this.time = this.zeroPadding(cd.getHours() === 0 ? 12 : cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2);
            this.date = this.week[cd.getDay()] + ', ' + this.zeroPadding(cd.getDate(), 2) + ' ' + this.months[cd.getMonth()+1];
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
            const audioBuffer = await load(this.$store.state.voiceData[this.cardType][this.cardNumber])
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

    beforeDestroy() {
        if (this.playback !== null) {
            this.playback.pause();
        }
        window.removeEventListener('resize', this.onResize);
    },


};
</script>

<style>
    .clock {
        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, sans-serif;
        font-weight: bold;
        color: #fff!important;
        position: absolute;
        top: 8%;
        margin-left: -1rem!important;
        width: 100% !important;
    }
    .time {
        /*font-weight: bold;*/
        color: #fff!important;
        font-size: 4rem!important;
        line-height: 1.2!important;
        text-shadow: 0px 0px 18px rgba(150, 150, 150, 0.6);
    }
    .date {
        /*font-weight: bold;*/
        color: #fff!important;
        font-size: 1.4rem!important;
        text-shadow: 0px 0px 18px rgba(150, 150, 150, 0.6);
    }
</style>
