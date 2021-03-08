<template>
    <div class="row">
        <div class="col-12 text-center" style="background-repeat: no-repeat; background-size: 100%!important;" :style="{ height: windowHeight + 'px', backgroundColor: randomColor(), backgroundImage: 'url(' + this.$store.state.fakeScreen + ')' }">
            <div class="clock">
                <div class="position-relative text-center">
                    <p class="time" style="margin-bottom: 4px;">{{ time }}</p>
                    <p class="date">{{ date }}</p>
                </div>
            </div>
            <div class="container py-0" style="position: absolute; z-index: 2!important;">
                <div class="row row-grid align-items-center">
                    <div class="col-11" style="margin-bottom: 5rem!important;" :style="{ marginTop: marginTop + 'rem'}" >
                        <div class="position-relative text-center">
                            <vue-audio
                                    :file-name="this.cardNameAndType(this.cardType, this.cardNumber)"
                                    :audio-source="this.$store.state.voiceData[this.cardType][this.cardNumber]"
                                    :width="windowWidth * 0.9"
                            ></vue-audio>
                        </div>
                    </div>
                </div>
            </div>
            <div style="position: absolute; background: #1F2020; z-index: 99; left: 0px; bottom: 0px; width: 100%; padding: 20px; display: inline-block!important;">
                <base-button style="" size="lg" type="white" @click="moveUp" outline>Move Up</base-button>
                <base-button style="" size="lg" type="white" @click="moveDown" outline>Move Down</base-button>
                <base-button style="" size="lg" type="white" @click="savePosition" outline>Save</base-button>
            </div>
        </div>
    </div>
</template>

<script>
const play = require('audio-play');
const load = require('audio-loader');
import VueAudio from "../components/vue-audio-better/src/VueAudio";
export default {
    name: "perform",
    components: {
        VueAudio,
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
            marginTop: 11,
            cardType: 'hearts',
            cardNumber: '1',
            step: 1,
            playback: null,
        }
    },
    methods: {
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
        moveUp () {
            if (this.marginTop > 0) {
                this.marginTop--;
            }
        },
        moveDown () {
            this.marginTop++;
        },
        savePosition () {
            let vm = this
            this.$store.commit('setMarginTop', this.marginTop)
            this.$swal({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                icon: 'success',
                title: 'Alignment Saved!',
            })
            vm.$router.go(-2)
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
        if (this.$store.state.marginTop !== '') {
            this.marginTop = this.$store.state.marginTop
        }
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
