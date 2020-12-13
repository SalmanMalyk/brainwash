<template>
    <div class="container">
        <div class="row align-items-right" style="text-align: right!important;">
            <div class="col-md-6">
                <div class="copyright">
                    &copy; {{year}}
                    <a href="#" target="_blank" rel="noopener">Brainwash</a>
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
  }
};
</script>
<style>
</style>
