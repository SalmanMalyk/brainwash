import Vue from "vue";
import Router from "vue-router";
import Header from "./layout/starter/StarterHeader";
import Footer from "./layout/starter/StarterFooter";
import RegisterDevice from "./views/Register.vue";
import Home from "./views/Home.vue";
import SetUp from "./views/SetUp.vue";
import Tutorial from "./views/Tutorial.vue";
import Contact from "./views/Contact.vue";
import Perform from "./views/Perform.vue";
import Starter from "./views/Starter.vue";
import store from "./store";
Vue.use(Router);

const router = new Router({
  routes: [
    // {
    //   path: "/",
    //   name: "auth-check-redirect",
    //   components: {
    //     // header: Header,
    //     default: Starter,
    //     footer: Footer
    //   }
    // },
    {
      path: "/",
      name: "home",
      components: {
        // header: Header,
        default: Home,
        footer: Footer
      }
    },
    {
      path: "/register-device",
      name: "starter",
      components: {
        // header: Header,
        default: RegisterDevice,
        footer: Footer
      }
    },
    {
      path: "/set-up",
      name: "setup",
      components: {
        header: Header,
        default: SetUp,
        footer: Footer
      }
    },
    {
      path: "/perform",
      name: "perform",
      components: {
        // header: Header,
        default: Perform,
        // footer: Footer
      }
    },
    {
      path: "/tutorial",
      name: "tutorial",
      components: {
        header: Header,
        default: Tutorial,
        footer: Footer
      }
    },
    {
      path: "/contact",
      name: "contact",
      components: {
        header: Header,
        default: Contact,
        footer: Footer
      }
    }
  ]
});

const waitForStorageToBeReady = async (to, from, next) => {
  await store.restored
  next()
}
router.beforeEach(waitForStorageToBeReady)

export default router
