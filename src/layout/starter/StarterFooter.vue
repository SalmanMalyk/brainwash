<template>
    <div class="container" style="background-color: rgba(0,0,0,0.9); color: rgba(255,255,255,0.8); padding: 0.8rem 0.6rem 0.8rem 0px;">
        <div class="row align-items-right" style="text-align: right!important;">
          <div class="col-6">
            <div class="copyright" style="color: #8A8A8B;">
              Version : {{ appVersion() }}
            </div>
          </div>
          <div class="col-6">
            <div class="copyright" style="color: #8A8A8B;">
              &copy; {{year}}
              Brainwash
            </div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'starter-footer',
  data() {
    return {
      year: new Date().getFullYear()
    }
  },
  methods: {
    appVersion() {
      return process.env.PACKAGE_VERSION || '0'
    },
  },
};
</script>
<style>
</style>
