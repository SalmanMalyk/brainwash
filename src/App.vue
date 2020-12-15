<template>
    <div id="app">
        <base-alert type="info" dismissible class="text-center" style="margin: 0px!important; border-radius: 0px!important;" v-if="updateExists" @click="refreshApp">
            <span class="alert-inner--text" style="margin-right: 1rem;"><strong>New version available!</strong></span>
            <base-button type="secondary" outline size="sm">Update</base-button>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </base-alert>
        <router-view name="header"></router-view>
        <main>
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view style="height: 100%!important;"/>
            </fade-transition>
        </main>
        <router-view name="footer"></router-view>
    </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    FadeTransition
  },
    data() {
        return {
            refreshing: false,
            registration: null,
            updateExists: false,
        };
    },
    created () {
        document.addEventListener(
            'swUpdated', this.showRefreshUI, { once: true }
        );
        if (navigator.serviceWorker) {
            navigator.serviceWorker.addEventListener(
                'controllerchange', () => {
                    if (this.refreshing) return;
                    this.refreshing = true;
                    window.location.reload();
                }
            );
        }
    },
    methods: {
        showRefreshUI (e) {
            this.registration = e.detail;
            this.updateExists = true;
        },
        refreshApp () {
            this.updateExists = false;
            if (!this.registration || !this.registration.waiting) { return; }
            this.registration.waiting.postMessage('skipWaiting');
        },
    },
};
</script>
