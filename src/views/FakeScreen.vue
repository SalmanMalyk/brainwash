<template>
    <div v-touch:swipe.bottom="swipeBottomHandler">
        <section class="section section section-shaped my-0 overflow-hidden">
            <div class="container py-0" style="margin-bottom: 4.5rem!important;">
                <div class="row row-grid align-items-center">
                    <div class="col-12" style="text-align: center!important; padding: 0px!important; margin: 0.75rem!important; padding-top: 1.3rem;">
                        <h2 class="display-3 text-white">Fake Screen Set-up</h2>
                        <p class="lead text-white" style="padding: 0px 10px 10px 10px;" v-if="$store.state.fakeScreen === null || $store.state.fakeScreen === ''">Please upload your wallpaper below</p>
                        <p class="lead text-white" style="padding: 0px 10px 10px 10px;" v-else>Custom Wallpaper loaded</p>
                    </div>
                    <div class="col-12" style="text-align: center!important; margin-top:0px!important;">
                        <card shadow class="card-bg shadow-lg--hover mt-2" v-if="$store.state.fakeScreen === null || $store.state.fakeScreen === ''">
                          <base-button type="primary" @click="changeMode" class="mb-3" style="min-width: 13rem!important; margin-left: 8px;">Switch to {{ this.$store.state.mode === 'ios' ? 'Android' : 'IOS' }} Mode</base-button>
                          <file-selector
                                    accept-extensions=".jpg,.png"
                                    :multiple="false"
                                    @validated="handleFilesValidated"
                                    class="mb-3"
                            >
                                <base-button type="primary" style="min-width: 13rem!important;">Select wallpaper</base-button>
                            </file-selector>
<!--                          <base-button block type="primary" class=" mb-3" @click="modal = true">-->
<!--                            Default-->
<!--                          </base-button>-->
                            <base-button type="primary" @click="alignAudioPlayer" class="mb-3" style="min-width: 13rem!important; margin-left: 8px;">Align Player</base-button>
<!--                            <img v-if="$store.state.mode === 'ios'" :src="$store.state.fakeScreenDefaultIOS" style="width: auto; height: 22rem;"/>-->
<!--                            <img v-else :src="$store.state.fakeScreenDefaultAndroid" style="width: auto; height: 22rem;"/>-->
                        </card>

                        <card shadow class="card-bg shadow-lg--hover mt-2" v-else>
<!--                            <perfect-scrollbar style="height: 25rem!important;">-->
                          <base-button type="primary" @click="changeMode" class="mb-3" style="min-width: 13rem!important; margin-left: 8px;">Switch to {{ this.$store.state.mode === 'ios' ? 'Android' : 'IOS' }} Mode</base-button>
                          <base-button type="primary" @click="alignAudioPlayer" class="mb-3">Align Audio Player</base-button>
                            <base-button type="primary" @click="deleteFakeScreen" class="mb-3">Delete wallpaper</base-button><br/>
<!--                                <img :src="$store.state.fakeScreen" style="width: auto; height: 22rem;"/>-->
<!--                            </perfect-scrollbar>-->
                        </card>
                    </div>
                </div>
            </div>
        </section>
<!--      <modal :show.sync="modal" style="background-color: white!important">-->
<!--        <clipper-fixed :src="$store.state.fakeScreen" :ratio="4/3"  />-->
<!--      </modal>-->
    </div>
</template>

<script>
import modal from '../components/Modal'
import { clipperFixed } from 'vuejs-clipper'

    export default {
        name: "fake-screen",
        components: {
          modal,
          clipperFixed,
        },
        data: function() {
            return {
                fakeScreen: '',
                mode: true,
                modal: false,
            };
        },
        methods: {
            changeMode() {
              const newVal = this.$store.state.mode === 'ios' ? 'android' : 'ios'
              this.$store.commit('setMode', newVal)
              if (this.$store.state.mode === 'ios') {
                this.$store.commit('setTop', 300)
              } else {
                this.$store.commit('setTop', 350)
              }
            },
            swipeBottomHandler() {
              this.$router.go(-1)
            },
            deleteFakeScreen () {
                this.$store.commit('setFakeScreen', '')
                this.$store.commit('setMarginTop', '')
            },
            alignAudioPlayer () {
                this.$router.push({
                    path: '/set-up/audio-player'
                })
            },
            saveFile (data) {
                this.$store.commit('setFakeScreen', data)
            },
            useDefault () {
                this.$store.commit('setFakeScreen', this.$store.state.fakeScreenDefault)
            },
            handleFilesValidated(result, files) {
                if (FileReader && files && files.length) {
                    const fr = new FileReader();
                    fr.onload = () => this.saveFile(fr.result);
                    fr.readAsDataURL(files[0]);
                }
            },
        },
        mounted() {
          this.mode = this.$store.state.mode !== 'ios'
        },
    };
</script>

<style>
.modal-dialog {
  margin: 0!important;
}
</style>
