<template>
  <div style="height: 100% !important" class="not-selectable">
    <section
      class="section section section-shaped my-0 overflow-hidden"
      style="height: 100% !important"
    >
      <div class="container py-0" style="height: 100% !important">
        <tabs :fill="true" circle style="height: 100% !important" ref="tabs">
          <perfect-scrollbar style="height: 87.5% !important">
            <card
              shadow
              style="
                padding: 0px !important;
                height: auto;
                background-color: rgba(0, 0, 0, 0) !important;
              "
            >
              <tab-pane v-for="card in cardTypes" :key="card" class="card-bg">
                <span
                  slot="title"
                  class="nav-link-icon d-block"
                  style="border-radius: 50% !important"
                >
                  <img
                    :src="'img/icons/' + card + '.png'"
                    style="width: 20px"
                    class="imgColor"
                  />
                </span>
                <card
                  shadow-size="lg"
                  v-for="x in 13"
                  :key="x"
                  class="card-bg"
                  style="padding: 20px 20px 20px 0px; margin: 0px 0px 8px 0px"
                >
                  <template
                    v-if="$store.state.voiceData[card][x.toString()] !== ''"
                  >
                    <div class="row">
                      <div
                        class="col-6"
                        style="
                          padding-left: 3rem;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        <h3
                          class="text-uppercase"
                          style="font-size: 1.8rem; color: white !important"
                        >
                          {{ cardName(x.toString()) }}
                        </h3>
                      </div>
                      <div
                        class="col-6 justify-content-md-center text-center"
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        <template v-if="!checkSelectedForPlay(card, x)">
                          <base-button
                            type="primary"
                            icon="fa fa-play-circle"
                            :class="{
                              'pointer-event':
                                recording.card != `${card}.${x.toString()}` &&
                                recording.state
                                  ? true
                                  : false,
                            }"
                            @click="selectForPlay(card, x)"
                          ></base-button>
                          <base-button
                            type="primary"
                            icon="fa fa-trash"
                            @click="deleteRecording(card, x.toString())"
                          ></base-button>
                        </template>
                        <template v-else>
                          <base-button
                            type="primary"
                            icon="fa fa-stop-circle"
                            @click="resetPlay()"
                            >Close</base-button
                          >
                        </template>
                      </div>
                    </div>
                    <div v-if="checkSelectedForPlay(card, x)">
                      <audio autoplay @ended="resetPlay()">
                        <source
                          :src="$store.state.voiceData[card][x.toString()]"
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </div>
                  </template>
                  <template v-else>
                    <div class="row not-selectable">
                      <div
                        class="col-6"
                        style="
                          padding-left: 3rem;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                      >
                        <h3
                          class="text-uppercase"
                          style="font-size: 1.8rem; color: white !important"
                        >
                          {{ cardName(x.toString()) }}
                        </h3>
                      </div>
                      <div
                        class="col-6 justify-content-md-center text-center"
                        style="
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        "
                        @click="setRecordState(card, x.toString())"
                        :data-card="card"
                        :data-number="x.toString()"
                        :class="{
                          'pointer-event':
                            recording.card != `${card}.${x.toString()}` &&
                            recording.state
                              ? true
                              : false,
                        }"
                      >
                        <audio-recorder
                          :attempts="1"
                          :time="3"
                          :card-number="x.toString()"
                          :card-type="card"
                        />
                      </div>
                    </div>
                  </template>
                </card>
              </tab-pane>
            </card>
          </perfect-scrollbar>
        </tabs>
      </div>
    </section>
  </div>
</template>

<script>
import Tabs from "../components/Tabs/Tabs";
import Modal from "../components/Modal";
import TabPane from "../components/Tabs/TabPane";
import AudioRecorderHold from "./components/audio-recorder";
import AudioRecorderMp3 from "./components/recorder";
import AudioRecorder from "../components/vue-audio-recorder/components/recorder";
import { SlideYUpTransition, SlideXRightTransition } from "vue2-transitions";
import Bowser from "bowser";
import AudioPlayer from "@liripeng/vue-audio-player";
export default {
  name: "set-up",
  components: {
    AudioRecorderMp3,
    Tabs,
    TabPane,
    Modal,
    SlideYUpTransition,
    SlideXRightTransition,
    AudioRecorderHold,
    AudioPlayer,
  },
  data: function() {
    return {
      mimeType: "audio/wav",
      showRecorder: false,
      selectedCardType: "",
      selectedCardNumber: "",
      selectedCardName: "",
      selectedForPlay: "",
      cardTypes: ["hearts", "spades", "clubs", "diamonds"],
      activeTab: 0,
      intervalID: "",
      recording: {
        state: false,
        card: "",
        number: "",
      },
    };
  },
  mounted() {
    const browser = Bowser.getParser(window.navigator.userAgent);
    const vm = this;
    // console.log(browser.getBrowserName().toLowerCase())
    switch (browser.getBrowserName().toLowerCase()) {
      case "safari":
        vm.mimeType = "";
        break;
      default:
        vm.mimeType = "audio/webm";
    }
    vm.intervalID = setInterval(() => {
      vm.activeTab = vm.$refs.tabs.slotData.activeTabIndex;
    }, 600);
  },
  beforeDestroy() {
    clearInterval(this.intervalID);
  },
  watch: {
    activeTab: function(newVal, oldVal) {
      if (newVal !== oldVal) {
        if (this.selectedForPlay !== "") {
          this.resetPlay();
        }
      }
    },
  },
  methods: {
    setRecordState(card, number) {
      this.recording.card = `${card}.${number}`;
      this.recording.state = !this.recording.state;
    },
    swipeBottomHandler() {
      this.$router.go(-1);
    },
    selectForPlay(suit, card) {
      console.log(this.$refs.tabs.slotData.activeTabIndex);

      this.setRecordState(card, suit);

      this.selectedForPlay = {
        suit: suit,
        card: card,
      };
    },
    resetPlay() {
      this.selectedForPlay = "";
      this.setRecordState(null, null);
    },
    checkSelectedForPlay(suit, card) {
      if (this.selectedForPlay === "") {
        return false;
      }
      if (
        this.selectedForPlay.suit === suit &&
        this.selectedForPlay.card === card
      ) {
        return true;
      }
      return false;
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
    closeRecorder() {
      this.selectedCardType = "";
      this.selectedCardNumber = "";
      this.selectedCardName = "";
      this.showRecorder = false;
    },
    startRecorder(selectedCardType, selectedCardNumber) {
      this.selectedCardType = selectedCardType;
      this.selectedCardNumber = selectedCardNumber;
      this.selectedCardName = this.cardNameAndType(
        selectedCardType,
        selectedCardNumber
      );
      this.showRecorder = true;
    },
    deleteRecording(cardType, cardNumber) {
      const recordData = "";
      this.$store.commit("setRecord", { cardType, cardNumber, recordData });
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        icon: "success",
        title: "Deleted!",
      });
    },

    checkForCurrentRecording(card, number) {
      if (
        this.recording.card != card &&
        this.recording.number != number &&
        this.recording.state
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
.not-selectable {
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Likely future */
}
.tab-content .card .card-body {
  padding: 0px !important;
}
.tab-content {
  height: 100% !important;
}
.modal-content {
  background-color: rgba(0, 0, 0, 0) !important;
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
}
.nav-item .active {
  background: #a33327 !important;
  background-image: linear-gradient(87deg, #a33327, #a33327 100%) !important;
  background-position-x: initial !important;
  background-position-y: initial !important;
  background-size: initial !important;
  background-repeat-x: initial !important;
  background-repeat-y: initial !important;
  background-attachment: initial !important;
  background-origin: initial !important;
  background-clip: initial !important;
  background-color: initial !important;
}
.nav-pills .nav-link {
  background: rgba(0, 0, 0, 0.7) !important;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
a.nav-link.active {
  background: #a33327 !important;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.2);
  backdrop-filter: blur(4.5px);
  -webkit-backdrop-filter: blur(4.5px);
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
.pointer-event {
  pointer-events: none;
}
</style>
