<template>
  <div class="row">
    <!-- IOS -->
    <div
      class="col-12 text-center"
      v-if="$store.state.mode === 'ios'"
      style="background-repeat: no-repeat; background-size: cover !important; background-color: #000;"
      :style="{
        height: windowHeight + 'px',
        backgroundImage:
          'url(' +
          (this.$store.state.fakeScreen === ''
            ? this.$store.state.fakeScreenDefaultIOS
            : this.$store.state.fakeScreen) +
          ')',
      }"
    >
      <div class="clock">
        <div class="position-relative text-center">
          <img
            style="margin: 1rem auto 1.3rem auto!important; height: 2.3rem;"
            :src="require('../assets/ios_padlock.png')"
          />
          <p class="time" style="font-weight:100;">{{ time }}</p>
          <p class="date" style="font-weight:100;">{{ date }}</p>
        </div>
      </div>
      <div
        class="container py-0 px-0"
        style="position: absolute; z-index: 2!important; width:0%;"
      >
        <vue-drag-resize
          style="margin: 0 auto; position: relative"
          :isActive="false"
          :y="top"
          axis="y"
          :is-resizable="false"
          :w="windowWidth"
          :h="playerHeight"
          v-on:dragging="resize"
          :parentW="windowWidth"
          :parentH="windowHeight"
          :parent-limitation="true"
        >
          <div class="position-relative text-center">
            <vue-audio
              id="audioPlayer"
              :file-name="this.cardNameAndType(this.cardType, this.cardNumber)"
              :audio-source="
                this.$store.state.voiceData[this.cardType][this.cardNumber]
              "
              :loop="false"
              :autoplay="false"
              :width="windowWidth * 0.9"
              ref="vueAudio"
            ></vue-audio>
          </div>
        </vue-drag-resize>
      </div>
      <div
        style="position: absolute; background: rgba(31, 32, 32, 0.6); z-index: 99; left: 0px; bottom: 40px; width: 100%; padding: 20px; display: inline-block !important;"
      >
        <!--                <base-button style="" size="lg" type="white" @click="moveUp" outline>Move Up</base-button>-->
        <!--                <base-button style="" size="lg" type="white" @click="moveDown" outline>Move Down</base-button>-->
        <base-button
          style=""
          size="lg"
          type="white"
          @click="savePosition"
          outline
          >Save</base-button
        >
      </div>
      <div
        class="row"
        style="margin: 0!important; position: absolute; bottom: 0; width: 100vw;"
      >
        <div class="col-6" style="text-align: left!important;">
          <div style="padding-left: 2.6rem; padding-bottom: 2.8rem;">
            <img
              style="margin: 1.1rem auto!important; height: 3.4rem; background-color: #1A1A1D; border-radius: 3.4rem; background: rgba( 48, 48, 48, 0.60 ); box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.15 ); backdrop-filter: blur( 20px ); -webkit-backdrop-filter: blur( 20px );"
              :src="require('../assets/torch.png')"
            />
          </div>
        </div>
        <div class="col-6" style="text-align: right!important;">
          <div style="padding-right: 2.6rem; padding-bottom: 2.8rem;">
            <img
              style="margin: 1.1rem auto!important; height: 3.4rem; background-color: #1A1A1D; border-radius: 3.4rem; background: rgba( 48, 48, 48, 0.60 ); box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.15 ); backdrop-filter: blur( 20px ); -webkit-backdrop-filter: blur( 20px );"
              :src="require('../assets/camera.png')"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- ANDROID  -->
    <div
      class="col-12 text-center"
      v-else
      style="background-repeat: no-repeat; background-size: 100%!important; background-color: #000;"
      :style="{
        height: windowHeight + 'px',
        backgroundImage:
          'url(' +
          (this.$store.state.fakeScreen === ''
            ? this.$store.state.fakeScreenDefaultAndroid
            : this.$store.state.fakeScreen) +
          ')',
      }"
    >
      <div class="clock" style="z-index: 2!important;">
        <div class="position-relative text-center">
          <img
            style="margin: 1rem auto 1.3rem auto!important; height: 2.3rem;"
            :src="require('../assets/android_padlock.png')"
          />
          <p class="time" style="margin-top: 4rem;">{{ time }}</p>
          <p class="date" style="font-weight: normal!important;">
            {{ date }}&nbsp;<img
              style="width: 35px;"
              :src="require('../assets/sunny-icon.jpg')"
            />&nbsp;76°F
          </p>
        </div>
      </div>
      <div
        class="container py-0 px-0"
        style="position: absolute; z-index: 2!important; width:0%;"
      >
        <vue-drag-resize
          style="margin: 0 auto; position: relative"
          :isActive="false"
          :y="top"
          axis="y"
          :is-resizable="false"
          :w="windowWidth"
          :h="playerHeight"
          v-on:dragging="resize"
          :parentW="windowWidth"
          :parentH="windowHeight"
          :drag-on-click="true"
          :parent-limitation="true"
        >
          <div class="position-relative text-center">
            <VueAudioAndroid
              id="audioPlayer"
              :file-name="this.cardNameAndType(this.cardType, this.cardNumber)"
              :autoplay="false"
              :audio-source="
                this.$store.state.voiceData[this.cardType][this.cardNumber]
              "
              :muted="true"
              :width="windowWidth * 0.9"
            ></VueAudioAndroid>
          </div>
        </vue-drag-resize>
      </div>
      <div
        style="position: absolute; background: rgba(31, 32, 32, 0.6); z-index: 99; left: 0px; bottom: 40px; width: 100%; padding: 20px; display: inline-block !important;"
      >
        <base-button
          style=""
          size="lg"
          type="white"
          @click="savePosition"
          outline
          >Save</base-button
        >
      </div>
    </div>
  </div>
</template>

<script>
const play = require("audio-play");
const load = require("audio-loader");
import VueAudio from "../components/vue-audio-better/src/VueAudioSetUp";
import VueAudioAndroid from "../components/vue-audio-better/src/VueAudioSetUp_Android";
export default {
  name: "perform",
  components: {
    VueAudio,
    VueAudioAndroid,
  },
  data() {
    return {
      playerHeight: 253,
      top: 0,
      left: 0,
      time: "",
      date: "",
      week: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      windowHeight: window.innerHeight + 50,
      windowWidth: window.innerWidth,
      width: window.screen.width,
      txt: "",
      marginTop: 11,
      cardType: "hearts",
      cardNumber: "1",
      step: 1,
      playback: null,
    };
  },
  methods: {
    getAudioPlayerHeight() {
      this.playerHeight = document.getElementById("audioPlayer").clientHeight;
    },
    resize(newRect) {
      this.getAudioPlayerHeight();
      this.top = newRect.top;
      this.left = newRect.left;
    },
    updateTime() {
      if (this.$store.state.mode === "ios") {
        let cd = new Date();
        this.time =
          cd.getHours() === 0
            ? 12
            : cd.getHours() + ":" + this.zeroPadding(cd.getMinutes(), 2);
        this.date =
          this.week[cd.getDay()] +
          ", " +
          cd.getDate() +
          " " +
          this.months[cd.getMonth()];
      } else {
        let cd = new Date();
        this.time =
          cd.getHours() === 0
            ? 12
            : cd.getHours() + ":" + this.zeroPadding(cd.getMinutes(), 2);
        this.date =
          this.week[cd.getDay()].slice(0, 3) +
          ", " +
          this.months[cd.getMonth()].slice(0, 3) +
          " " +
          cd.getDate();
      }
    },
    zeroPadding(num, digit) {
      let zero = "";
      for (let i = 0; i < digit; i++) {
        zero += "0";
      }
      return (zero + num).slice(-digit);
    },
    savePosition() {
      let vm = this;
      this.$store.commit("setTop", this.top);
      this.$store.commit("setLeft", this.left);
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        icon: "success",
        title: "Alignment Saved!",
      });
      vm.$router.go(-2);
    },
    onResize() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
      this.width = window.screen.width;
    },
    randomColor() {
      let x = Math.round(0xffffff * Math.random()).toString(16);
      let y = 6 - x.length;
      let z = "000000";
      let z1 = z.substring(0, y);
      let color = "#" + z1 + x;
      return color;
    },
    cardName(cardNumber) {
      if (cardNumber === "1") {
        return "Ace";
      } else if (cardNumber === "2") {
        return "Two";
      } else if (cardNumber === "3") {
        return "Three";
      } else if (cardNumber === "4") {
        return "Four";
      } else if (cardNumber === "5") {
        return "Five";
      } else if (cardNumber === "6") {
        return "Six";
      } else if (cardNumber === "7") {
        return "Seven";
      } else if (cardNumber === "8") {
        return "Eight";
      } else if (cardNumber === "9") {
        return "Nine";
      } else if (cardNumber === "10") {
        return "Ten";
      } else if (cardNumber === "11") {
        return "Jack";
      } else if (cardNumber === "12") {
        return "Queen";
      } else if (cardNumber === "13") {
        return "King";
      } else {
        return cardNumber;
      }
    },
    cardNameAndType(cardType, cardNumber) {
      if (cardType === "") {
        return "";
      } else {
        let res = this.cardName(cardNumber);
        res += " of " + cardType.charAt(0).toUpperCase() + cardType.slice(1);
        return res;
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
        let vm = this;
        setTimeout(() => {
          vm.step = 3;
        }, 6000);
      }
    },
  },

  mounted() {
    this.top = this.$store.state.top;
    this.left = this.$store.state.left;
    let timerID = setInterval(this.updateTime, 1000);
    this.updateTime();
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
    if (this.$store.state.marginTop !== "") {
      this.marginTop = this.$store.state.marginTop;
    }
    this.$refs.vueAudio.curVolume = 0.0;
  },

  beforeDestroy() {
    if (this.playback !== null) {
      this.playback.pause();
    }
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style>
div.vdr.active {
  height: 0px !important;
  width: 0px !important;
}
.vdr-stick {
  display: none;
}
.vdr::before {
  display: none;
}
</style>
