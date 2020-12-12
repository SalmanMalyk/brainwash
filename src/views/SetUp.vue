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
                <div>
                    <tabs :fill="true" circle>
                        <card shadow>
                            <tab-pane>
                                <span slot="title" class="nav-link-icon d-block"><img src="img/icons/hearts.png" style="width: 20px;" class="imgColor"></span>
                                <p class="description">Raw denim you probably haven't heard of them jean shorts
                                    Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
                                    cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro
                                    keffiyeh dreamcatcher synth.</p>
                            </tab-pane>

                            <tab-pane title="Profile">
                                <span slot="title" class="nav-link-icon d-block"><img src="img/icons/spades.png" style="width: 20px;" class="imgColor"></span>
                                <p class="description">Cosby sweater eu banh mi, qui irure terry richardson ex
                                    squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan
                                    american apparel, butcher voluptate nisi qui.</p>
                            </tab-pane>

                            <tab-pane>
                                <span slot="title" class="nav-link-icon d-block"><img src="img/icons/clubs.png" style="width: 20px;" class="imgColor"></span>
                                <p class="description">Raw denim you probably haven't heard of them jean shorts
                                    Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache
                                    cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro
                                    keffiyeh dreamcatcher synth.</p>
                            </tab-pane>

                            <tab-pane title="Profile">
                                <span slot="title" class="nav-link-icon d-block"><img src="img/icons/diamonds.png" style="width: 20px;" class="imgColor"></span>
                                <p class="description">Cosby sweater eu banh mi, qui irure terry richardson ex
                                    squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan
                                    american apparel, butcher voluptate nisi qui.</p>
                            </tab-pane>
                        </card>
                    </tabs>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Tabs from '../components/Tabs/Tabs'
    import TabPane from '../components/Tabs/TabPane'
export default {
  name: "set-up",
  components: {
    Tabs,
    TabPane
  }
};
</script>

<style>
</style>
