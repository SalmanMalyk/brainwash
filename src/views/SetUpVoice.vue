<template>
    <div style="height: 100%!important;" class="not-selectable">
        <section class="section section section-shaped my-0 overflow-hidden" style="height: 100%!important;">
<!--            <div class="shape shape-style-1 bg-gradient-success shape-skew">-->
<!--                <span></span>-->
<!--                <span></span>-->
<!--                <span></span>-->
<!--                <span></span>-->
<!--                <span></span>-->
<!--                <span></span>-->
<!--            </div>-->
            <div class="container py-0" style="height: 100%!important;">
                <tabs :fill="true" circle style="height: 100%!important;">
                    <perfect-scrollbar style="height: 80%!important;">
                        <card shadow style="padding: 0px!important; height: auto;">
                        <tab-pane v-for="card in cardTypes" :key="card" >
                            <span slot="title" class="nav-link-icon d-block">
                                <img :src="'img/icons/'+ card +'.png'" style="width: 20px;" class="imgColor">
                            </span>
                            <card
                                    shadow-size="lg"
                                    v-for="x in 13" :key="x"
                                    style="padding: 20px 20px 20px 0px;"
                            >
                                <template v-if="$store.state.voiceData[card][x.toString()] !== ''">
                                    <div class="row">
                                        <div class="col-6" style="padding-left: 3rem;">
                                            <h3 class="text-uppercase" style="font-size: 1.8rem; color: #1A1A1D!important;">{{ cardName(x.toString()) }}</h3>
                                        </div>
                                        <div class="col-6 justify-content-md-center text-center">
<!--                                            <slide-x-right-transition :duration="350" :delay="70" group>-->
                                                <template v-if="selectedForPlay !== x">
                                                    <base-button type="primary" icon="fa fa-play-circle" @click="selectForPlay(x)" class=" bg-gradient-primary "></base-button>
                                                    <base-button type="primary" icon="fa fa-trash" @click="deleteRecording(card, x.toString())" class="bg-gradient-primary"></base-button>
                                                </template>
                                                <template v-else>
                                                    <base-button type="primary" icon="fa fa-stop-circle" @click="resetPlay()" class="bg-gradient-primary">Close</base-button>
                                                </template>
<!--                                            </slide-x-right-transition>-->
                                        </div>
                                    </div>
                                    <slide-y-up-transition :duration="350" :delay="70">
                                        <div class="row" v-if="selectedForPlay === x" style="padding-left: 2rem;padding-top: 20px;">
                                            <audio-player :src="$store.state.voiceData[card][x.toString()]"></audio-player>
                                        </div>
                                    </slide-y-up-transition>
                                </template>
                                <template v-else>
                                    <div class="row not-selectable">
                                        <div class="col-6 not-selectable" style="padding-left: 3rem;">
                                            <h3 class="text-primary text-uppercase not-selectable" style="font-size: 1.8rem; color: #1A1A1D!important;">{{ cardName(x.toString()) }}</h3>
                                        </div>
                                        <div class="col-6 justify-content-md-center text-center not-selectable">
                                            <audio-recorder-hold :card-type="card" :card-number="x.toString()" :mime-type="mimeType"/>
<!--                                            <audio-recorder-->
<!--                                                    :fileName="cardNameAndType(card, x.toString())"-->
<!--                                                    :cardType="card"-->
<!--                                                    :cardNumber="x.toString()"-->
<!--                                                    :attempts="1"-->
<!--                                                    :time="0.1"-->
<!--                                                    :showDownloadButton="false"-->
<!--                                                    :successful-upload="closeRecorder"/>-->
<!--                                            <base-button type="primary" icon="fa fa-microphone" @click="startRecorder(card, x.toString())" class="bg-gradient-primary"></base-button>-->
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
    },
    computed: {
    },
    methods: {
        selectForPlay(x) {
            this.selectedForPlay = x
        },
        resetPlay() {
            this.selectedForPlay = ''
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
            let vm = this
            this.$swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const recordData = ''
                    vm.$store.commit('setRecord', { cardType, cardNumber, recordData})
                    vm.$swal.fire(
                        'Deleted!',
                        'Your recording has been deleted.',
                        'success'
                    )
                }
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
        background: linear-gradient(87deg, #A33327 0, #a36727 100%) !important;
        background-image: linear-gradient(87deg, rgb(163, 51, 39) 0px, rgb(163, 103, 39) 100%) !important;
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
</style>
