<template>
    <div>
        <section class="section section section-shaped my-0 overflow-hidden">
            <div class="shape shape-style-1 bg-gradient-success shape-skew">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="container py-0" style="margin-bottom: 6rem!important;">
                <tabs :fill="true" circle>
                    <card shadow style="padding: 0px!important;">
                        <tab-pane v-for="card in cardTypes" :key="card">
                            <span slot="title" class="nav-link-icon d-block"><img :src="'img/icons/'+ card +'.png'" style="width: 20px;" class="imgColor"></span>
                            <card
                                    no-body
                                    shadow-size="lg"
                                    v-for="x in 13" :key="x"
                                    style="padding: 20px 20px 20px 0px;"
                            >
                                <template v-if="$store.state.voiceData[card][x.toString()] !== ''">
                                    <div class="row">
                                        <div class="col-6" style="padding-left: 3rem;">
                                            <h3 class="text-primary text-uppercase" style="font-size: 1.8rem;">{{ cardName(x.toString()) }}</h3>
                                        </div>
                                        <div class="col-6 justify-content-md-center text-center">
                                            <slide-x-right-transition :duration="350" :delay="70">
                                                <template v-if="selectedForPlay !== x">
                                                    <base-button type="primary" icon="fa fa-play-circle" @click="selectForPlay(x)"></base-button>
                                                    <base-button type="primary" icon="fa fa-trash" @click="deleteRecording(card, x.toString())"></base-button>
                                                </template>
                                                <template v-else>
                                                    <base-button type="primary" icon="fa fa-stop-circle" @click="resetPlay()">Close</base-button>
                                                </template>
                                            </slide-x-right-transition>
                                        </div>
                                    </div>
                                    <slide-y-up-transition :duration="350" :delay="70">
                                        <div class="row" v-if="selectedForPlay === x" style="padding-left: 2rem;padding-top: 20px;">
                                            <audio-player :src="$store.state.voiceData[card][x.toString()]"></audio-player>
                                        </div>
                                    </slide-y-up-transition>
                                </template>
                                <template v-else>
                                    <div class="row">
                                        <div class="col-6" style="padding-left: 3rem;">
                                            <h3 class="text-primary text-uppercase" style="font-size: 1.8rem;">{{ cardName(x.toString()) }}</h3>
                                        </div>
                                        <div class="col-6 justify-content-md-center text-center">
                                            <base-button type="primary" icon="fa fa-microphone" @click="startRecorder(card, x.toString())"></base-button>
                                        </div>
                                    </div>
                                </template>
                            </card>
                        </tab-pane>
                    </card>
            </tabs>
            </div>
            <modal :show.sync="showRecorder"
                   body-classes="p-3"
                   modal-classes="modal-dialog-centered modal-sm"
            >
                <audio-recorder
                        v-if="showRecorder"
                        :fileName="selectedCardName"
                        :cardType="selectedCardType"
                        :cardNumber="selectedCardNumber"
                        :attempts="1"
                        :time="0.084"
                        :showDownloadButton="false"
                        :successful-upload="closeRecorder"/>
            </modal>
        </section>
    </div>
</template>

<script>
import Tabs from '../components/Tabs/Tabs'
import Modal from '../components/Modal'
import TabPane from '../components/Tabs/TabPane'
import { SlideYUpTransition } from 'vue2-transitions'
export default {
  name: "set-up",
  components: {
    Tabs,
    TabPane,
    Modal,
    SlideYUpTransition,
  },
    data: function() {
        return {
            showRecorder: false,
            selectedCardType: '',
            selectedCardNumber: '',
            selectedCardName: '',
            selectedForPlay: '',
            cardTypes: ['hearts', 'spades', 'clubs', 'diamonds'],
        };
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
    .tab-content .card .card-body {
        padding: 0px!important;
    }
    .modal-content {
        background-color: rgba(0,0,0,0)!important;
        box-shadow: none!important;;
        -webkit-box-shadow: none!important;
    }
</style>
