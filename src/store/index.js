import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from "vuex-persistedstate";
// import SecureLS from "secure-ls";
import VuexPersistence from 'vuex-persist'
import localforage from "localforage";

import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex)

// const ls = new SecureLS({ isCompression: true });
const vuexLocal = new VuexPersistence({
  storage: localforage,
  asyncStorage: true,
})
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [
    vuexLocal.plugin
  ],
});
