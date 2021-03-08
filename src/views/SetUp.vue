<template>
    <div>
        <section class="section section section-shaped my-0 overflow-hidden">
            <div class="container py-0" style="margin-bottom: 4.5rem!important;">
                <div class="row row-grid align-items-center">
                    <div class="col-11" style="text-align: center!important; padding: 0px!important; margin: 0.75rem!important; padding-top: 1.3rem;">
                        <h2 class="display-3 text-white">Set-Up</h2>
                    </div>
                    <div class="col-12" style="text-align: center!important; margin-top:0px!important;">
                        <card shadow class="shadow-lg--hover mt-2">
                            <div class="align-middle">
                                <div style="padding-top: 0.5rem; text-align: center;">
                                    <h3 class="title text-primary">Audio</h3>
                                    <span v-if="remFiles !== 0" class="text-warning">{{ remFiles }} of 52 files remaining.<br/></span>
                                    <span v-else class="text-success">Setup Complete.<br/></span>
                                    <router-link to="/set-up/voice" title="Audio Set-Up Page">
                                        <base-button style="min-width: 13rem!important; margin-top:0.5rem;" size="lg" type="primary" outline>Open</base-button>
                                    </router-link>
                                </div>
                            </div>
                        </card>
                        <card shadow class="shadow-lg--hover mt-2">
                            <div class="align-middle">
                                <div style="padding-top: 0.5rem;">
                                    <h3 class="title text-primary">Fake Screen</h3>
                                    <span v-if="$store.state.fakeScreen === ''" class="text-warning">Set-up not completed.<br/></span>
                                    <span v-else-if="$store.state.marginTop === ''" class="text-warning">Please align the player on the page below.<br/></span>
                                    <span v-else class="text-success">Setup Complete.<br/></span>
                                    <router-link to="/set-up/fake-screen" title="Fake Screen Page">
                                        <base-button style="min-width: 13rem!important; margin-top:0.5rem;" size="lg" type="primary" outline>Open</base-button>
                                    </router-link>
                                </div>
                            </div>
                        </card>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "contact",
        components: {},
        computed: {
            remFiles () {
                let count = 0
                Object.values(this.$store.state.voiceData.hearts).forEach((data) => {
                    if (data === null || data === '') {
                        count++
                    }
                })
                Object.values(this.$store.state.voiceData.clubs).forEach((data) => {
                    if (data === null || data === '') {
                        count++
                    }
                })
                Object.values(this.$store.state.voiceData.diamonds).forEach((data) => {
                    if (data === null || data === '') {
                        count++
                    }
                })
                Object.values(this.$store.state.voiceData.spades).forEach((data) => {
                    if (data === null || data === '') {
                        count++
                    }
                })
                return count
            }
        }
    };
</script>
