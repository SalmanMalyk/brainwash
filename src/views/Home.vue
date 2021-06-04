<template>
  <div>
    <section class="section section section-shaped my-0 overflow-hidden">
      <div class="container py-0" style="margin-bottom: 4.5rem!important;">
        <div class="row row-grid align-items-center">
          <div class="col-12" style="text-align: center!important; margin-top:0px!important;">
            <card style="background-color: rgba(0,0,0,0)">
              <div class="align-middle">
                <div style="text-align: center;">
                  <img src="img/brand/brainwash.png" style="width: 200px;" class="img-fluid floating logo" alt="logo">
                </div>
              </div>
            </card>
            <card style="background-color: rgba(0,0,0,0)">
              <div class="align-middle">
                <div style="text-align: center;">
                  <router-link to="/set-up" title="Set-Up Page">
                    <base-button style="min-width: 13rem!important; margin-top:2.2rem;" size="lg" type="primary">SET-UP</base-button>
                  </router-link>
                  <br/>
                  <a>
                    <base-button style="min-width: 13rem!important; margin-top:1.4rem;" size="lg" type="primary" @click="perform">PERFORM</base-button>
                  </a>
                  <br/>
                  <router-link to="/tutorial" title="Tutorial Page">
                    <base-button style="min-width: 13rem!important; margin-top:1.4rem;" size="lg" type="primary">TUTORIAL</base-button>
                  </router-link>
                  <br/>
                  <router-link to="/contact" title="Contact Page">
                    <base-button style="min-width: 13rem!important; margin-top:1.4rem;" size="lg" type="primary">CONTACT</base-button>
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
  name: "home",
  components: {},
    methods: {
      perform () {
          const isEmptyHearts = Object.values(this.$store.state.voiceData.hearts).some(x => (x === null || x === ''));
          const isEmptyClubs = Object.values(this.$store.state.voiceData.clubs).some(x => (x === null || x === ''));
          const isEmptySpades = Object.values(this.$store.state.voiceData.spades).some(x => (x === null || x === ''));
          const isEmptyDiamonds = Object.values(this.$store.state.voiceData.diamonds).some(x => (x === null || x === ''));
          // if ((isEmptyHearts || isEmptyClubs || isEmptyDiamonds || isEmptySpades || this.$store.state.fakeScreen === null || this.$store.state.fakeScreen === '')) {
          //     this.$swal.fire({
          //         icon: 'error',
          //         title: 'Warning',
          //         text: 'Please complete the set-up first!',
          //         timer: 2500,
          //         timerProgressBar: true,
          //     })
          // }
          // else if(this.$store.state.marginTop === '')
          if(this.$store.state.marginTop === '')
          {
              this.$swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Please align the player on the fake screen!',
                  timer: 2500,
                  timerProgressBar: true,
              })
          }
          else {
              this.$router.push({
                  path: '/perform'
              })
          }
      },
    },
};
</script>
<style>
    .logo {
        user-select: none!important;
    }
</style>
