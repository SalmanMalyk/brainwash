import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from "vuex-persistedstate";
// import SecureLS from "secure-ls";
import VuexPersistence from 'vuex-persist'
import localforage from "localforage";
import axios from 'axios'
import VueAxios from 'vue-axios'

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex)
Vue.use(VueAxios, axios)
// const ls = new SecureLS({ isCompression: true });
const vuexLocal = new VuexPersistence({
  storage: localforage,
  asyncStorage: true,
})
// const vuexLocal = new VuexPersistence({
//   storage: window.localStorage,
//   // asyncStorage: true,
// })
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [
    vuexLocal.plugin
  ],
});
