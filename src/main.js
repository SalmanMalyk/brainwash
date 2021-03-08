/*!

=========================================================
* Vue Argon Design System - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system/blob/master/LICENSE.md)

* Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker'
import VueYouTubeEmbed from 'vue-youtube-embed'
import AudioRecorder from './components/vue-audio-recorder'
import VueSweetalert2 from 'vue-sweetalert2';
import Particles from "particles.vue";
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import Vuelidate from 'vuelidate'
import FileSelector from 'vue-file-selector';

import 'sweetalert2/dist/sweetalert2.min.css';
import Vue2TouchEvents from 'vue2-touch-events'
import VueRecord from './components/vue-record-master/src/components/index'
// import VueRecord from '@codekraft-studio/vue-record'
import AudioRecorder2 from 'audio-recorder-polyfill'
if (!window.MediaRecorder) {
  window.MediaRecorder = AudioRecorder2
}
// window.MediaRecorder = AudioRecorder2
Vue.use(VueRecord)
Vue.use(FileSelector);
Vue.use(Vue2TouchEvents, {
  touchHoldTolerance: 130,
})
Vue.use(Vuelidate);
Vue.use(PerfectScrollbar)
Vue.use(Particles);
Vue.use(VueSweetalert2)
Vue.use(AudioRecorder)
Vue.use(VueYouTubeEmbed, { global: true, componentId: "youtube-media" })
Vue.config.productionTip = false;
Vue.use(Argon);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
