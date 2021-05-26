<template>
    <div style="height: 100%!important;" class="not-selectable">
        <section class="section section section-shaped my-0 overflow-hidden" style="height: 100%!important;">
            <div class="container py-0" style="height: 100%!important;">
                <tabs :fill="true" circle style="height: 100%!important;" ref="tabs">
                    <perfect-scrollbar style="height: 87.5%!important;">
                        <card shadow style="padding: 0px!important; height: auto;background-color: rgba(0,0,0,0)!important;">
                        <tab-pane v-for="card in cardTypes" :key="card" class="card-bg">
                            <span slot="title" class="nav-link-icon d-block" style="border-radius: 50%!important">
                                <img :src="'img/icons/'+ card +'.png'" style="width: 20px;" class="imgColor">
                            </span>
                            <card
                                    shadow-size="lg"
                                    v-for="x in 13" :key="x"
                                    class="card-bg"
                                    style="padding: 20px 20px 20px 0px; margin: 0px 0px 8px 0px;"
                            >
                                <template v-if="$store.state.voiceData[card][x.toString()] !== ''">
                                    <div class="row">
                                        <div class="col-6" style="padding-left: 3rem;display: flex; align-items: center; justify-content: center;">
                                            <h3 class="text-uppercase" style="font-size: 1.8rem; color: white!important;">{{ cardName(x.toString()) }}</h3>
                                        </div>
                                        <div class="col-6 justify-content-md-center text-center" style="display: flex; align-items: center; justify-content: center;">
                                            <template v-if="!checkSelectedForPlay(card, x)">
                                                <base-button type="primary" icon="fa fa-play-circle" @click="selectForPlay(card, x)"></base-button>
                                                <base-button type="primary" icon="fa fa-trash" @click="deleteRecording(card, x.toString())"></base-button>
                                            </template>
                                            <template v-else>
                                                <base-button type="primary" icon="fa fa-stop-circle" @click="resetPlay()">Close</base-button>
                                            </template>
                                        </div>
                                    </div>
                                    <slide-y-up-transition :duration="350" :delay="70">
                                        <div class="row" v-if="checkSelectedForPlay(card, x)" style="padding-left: 2rem;padding-top: 20px;">
                                            <audio-player :src="$store.state.voiceData[card][x.toString()]"></audio-player>
                                        </div>
                                    </slide-y-up-transition>
                                </template>
                                <template v-else>
                                    <div class="row not-selectable">
                                      <div class="col-6" style="padding-left: 3rem;display: flex; align-items: center; justify-content: center;">
                                        <h3 class="text-uppercase" style="font-size: 1.8rem; color: white!important;">{{ cardName(x.toString()) }}</h3>
                                      </div>
                                      <div class="col-6 justify-content-md-center text-center" style="display: flex; align-items: center; justify-content: center;">
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
import Tabs from '../components/Tabs/Tabs'
import Modal from '../components/Modal'
import TabPane from '../components/Tabs/TabPane'
import AudioRecorderHold from './components/audio-recorder'
import AudioRecorder from '../components/vue-audio-recorder/components/recorder'
import { SlideYUpTransition, SlideXRightTransition } from 'vue2-transitions'
import Bowser from "bowser";
export default {
  name: "set-up",
  components: {
    Tabs,
    TabPane,
    Modal,
    SlideYUpTransition,
      SlideXRightTransition,
      AudioRecorderHold,
  },
    data: function() {
        return {
            mimeType: 'audio/wav',
            showRecorder: false,
            selectedCardType: '',
            selectedCardNumber: '',
            selectedCardName: '',
            selectedForPlay: '',
            cardTypes: ['hearts', 'spades', 'clubs', 'diamonds'],
            activeTab: 0,
            intervalID: '',
        };
    },
    mounted() {
        const browser = Bowser.getParser(window.navigator.userAgent);
        const vm = this
        // console.log(browser.getBrowserName().toLowerCase())
        switch(browser.getBrowserName().toLowerCase()) {
            case 'safari':
                vm.mimeType = ''
            break
            default:
                vm.mimeType = 'audio/webm'
        }
        vm.intervalID = setInterval(() => {
          vm.activeTab = vm.$refs.tabs.slotData.activeTabIndex
        }, 600)
    },
    beforeDestroy() {
      clearInterval(this.intervalID)
    },
    watch: {
      activeTab: function(newVal, oldVal) {
        if (newVal !== oldVal) {
          if (this.selectedForPlay !== '') {
            this.resetPlay()
          }
        }
      },
    },
    methods: {
        selectForPlay(suit, card) {
          console.log(this.$refs.tabs.slotData.activeTabIndex)
            this.selectedForPlay = {
              suit: suit,
              card: card,
            }
        },
        resetPlay() {
            this.selectedForPlay = ''
        },
        checkSelectedForPlay(suit, card) {
          if (this.selectedForPlay === '') {
            return false
          }
          if (this.selectedForPlay.suit === suit && this.selectedForPlay.card === card) {
            return true
          }
          return false
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
        closeRecorder () {
            this.selectedCardType = ''
            this.selectedCardNumber = ''
            this.selectedCardName = ''
            this.showRecorder = false
        },
        startRecorder (selectedCardType, selectedCardNumber) {
            this.selectedCardType = selectedCardType
            this.selectedCardNumber = selectedCardNumber
            this.selectedCardName = this.cardNameAndType(selectedCardType, selectedCardNumber)
            this.showRecorder = true
        },
        deleteRecording (cardType, cardNumber) {
            const recordData = ''
            this.$store.commit('setRecord', { cardType, cardNumber, recordData})
            this.$swal({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 1500,
              icon: 'success',
              title: 'Deleted!',
            })
        },
    }
};
</script>

<style>
.not-selectable{
  -webkit-user-select: none;  /* Chrome all / Safari all */
  -moz-user-select: none;     /* Firefox all */
  -ms-user-select: none;      /* IE 10+ */
  user-select: none;          /* Likely future */
}
    .tab-content .card .card-body {
        padding: 0px!important;
    }
    .tab-content {
        height: 100%!important;
    }
    .modal-content {
        background-color: rgba(0,0,0,0)!important;
        box-shadow: none!important;;
        -webkit-box-shadow: none!important;
    }
.nav-item .active {
  background: #A33327 !important;
  background-image: linear-gradient(87deg, #A33327, #A33327 100%) !important;
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
  background: rgba( 0, 0, 0, 0.70 )!important;
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.2 );
  backdrop-filter: blur( 4.5px );
  -webkit-backdrop-filter: blur( 4.5px );
  border-radius: 50%;
  border: 1px solid rgba( 255, 255, 255, 0.08 );
}
a.nav-link.active {
  background: #A33327!important;
  box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.2 );
  backdrop-filter: blur( 4.5px );
  -webkit-backdrop-filter: blur( 4.5px );
  border-radius: 50%;
  border: 1px solid rgba( 255, 255, 255, 0.08 );
}
</style>
