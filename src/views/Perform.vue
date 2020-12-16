<template>
    <div>
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
                <div class="col-12 text-center" @click="skipScreen" :style="{ height: windowHeight + 'px', backgroundColor: randomColor() }">
                    FAKE SCREEN<br/>
                    (Tap to choose card)
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
                <div class="col-12 text-center" :style="{ height: windowHeight + 'px', backgroundColor: randomColor() }">
                    FAKE SCREEN<br/>
                    (Sound playing)<br/>
                    (Press Back to Exit)
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const play = require('audio-play');
const load = require('audio-loader');
    export default {
    name: "perform",
    components: {},
    data() {
        return {
            windowHeight: window.innerHeight,
            txt: '',
            cardType: 'hearts',
            cardNumber: '1',
            step: 1,
            playback: null,
        }
    },
    methods: {
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
            this.playSound()
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
        },
        randomColor() {
            let x = Math.round(0xffffff * Math.random()).toString(16)
            let y = (6-x.length)
            let z = '000000'
            let z1 = z.substring(0,y)
            let color = '#' + z1 + x
            return color
        }
    },

    watch: {
        windowHeight(newHeight, oldHeight) {
            this.txt = `it changed to ${newHeight} from ${oldHeight}`;
        }
    },

    mounted() {
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
