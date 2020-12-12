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
                <div class="row row-grid align-items-center">
                    <div class="col-sm-6" style="margin-bottom: 6rem!important;">
                        <div class="position-relative text-center pl-sm-5">
                            <img src="img/brand/white.png" style="width: 200px;" class="img-fluid floating">
                        </div>
                    </div>
                    <div class="col-sm-6" style="text-align: center!important; padding: 0px!important; margin: 0.75rem!important;">
                        <router-link to="/set-up" title="Set-Up Page">
                            <base-button style="min-width: 13rem!important;" size="lg" type="primary">SET-UP</base-button>
                        </router-link>
                    </div>
                    <div class="col-sm-6" style="text-align: center!important; padding: 0px!important; margin: 0.75rem!important;">
                        <router-link to="/perform" title="Perform Page">
                            <base-button style="min-width: 13rem!important;" size="lg" type="primary">PERFORM</base-button>
                        </router-link>
                    </div>
                    <div class="col-sm-6" style="text-align: center!important; padding: 0px!important; margin: 0.75rem!important;">
                        <router-link to="/tutorial" title="Tutorial Page">
                            <base-button style="min-width: 13rem!important;" size="lg" type="primary">TUTORIAL</base-button>
                        </router-link>
                    </div>
                    <div class="col-sm-6" style="text-align: center!important; padding: 0px!important; margin: 0.75rem!important;">
                        <router-link to="/contact" title="Contact Page">
                            <base-button style="min-width: 13rem!important;" size="lg" type="primary">CONTACT</base-button>
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: "home",
  components: {}
};
</script>
