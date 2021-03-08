<template>
    <header class="header-global" style="z-index: 4!important;">
        <div class="navbar navbar-main navbar-light navbar-transparent" style="padding-top: 1rem;">
            <div class="container ct-example-row" style="width: 100%!important;">
                <div class="alignleft">
                    <router-link class="navbar-brand mr-xs-5" to="/">
                        <img class="logo" src="img/brand/brainwash.png" style="width: 100px;height: auto"/>
                    </router-link>
                </div>
                <div class="alignright" style="text-align: right;">
                    <base-button size="sm" type="white" outline icon="ni ni-bold-left" @click="goBack">Back</base-button>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import CloseButton from "@/components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton
  },
    methods: {
        goBack() {
            this.$router.go(-1)
        }
    }
};
</script>
<style>
    .logo {
        user-select: none!important;
    }
    .alignleft {
        float: left;
    }
    .alignright {
        float: right;
    }
</style>
