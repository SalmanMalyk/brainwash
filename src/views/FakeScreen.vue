<template>
    <div>
        <section class="section section section-shaped my-0 overflow-hidden">
            <div class="container py-0" style="margin-bottom: 4.5rem!important;">
                <div class="row row-grid align-items-center">
                    <div class="col-12" style="text-align: center!important; padding: 0px!important; margin: 0.75rem!important; padding-top: 1.3rem;">
                        <h2 class="display-3 text-white">Fake Screen Set-up</h2>
                        <p class="lead text-white" style="padding: 0px 10px 10px 10px;" v-if="$store.state.fakeScreen === null || $store.state.fakeScreen === ''">Please upload your wallpaper below!</p>
                    </div>
                    <div class="col-12" style="text-align: center!important; margin-top:0px!important;">
                        <card shadow class="shadow-lg--hover mt-2" v-if="$store.state.fakeScreen === null || $store.state.fakeScreen === ''">
                            <file-selector
                                    accept-extensions=".jpg,.png"
                                    :multiple="false"
                                    @validated="handleFilesValidated"
                            >
                                <base-button type="primary">Select wallpaper</base-button>
                            </file-selector>
                            <base-button type="primary" @click="useDefault" style="margin-top:20px;">Use Default</base-button>
                        </card>

                        <card shadow class="shadow-lg--hover mt-2" v-else>
                            <perfect-scrollbar style="height: 25rem!important;">
                                <base-button type="primary" @click="alignAudioPlayer" class="mb-3">Align Audio Player</base-button>
                                <base-button type="primary" @click="deleteFakeScreen" class="mb-3">Delete screenshot</base-button><br/>
                                <img :src="$store.state.fakeScreen" style="width: auto; height: 22rem;"/>
                            </perfect-scrollbar>
                        </card>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "fake-screen",
        components: {},
        data: function() {
            return {
                fakeScreen: '',
            };
        },
        methods: {
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
    };
</script>
