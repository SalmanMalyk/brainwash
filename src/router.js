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
import StarterFooter2 from "./layout/starter/StarterFooter2";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        // header: Header,
        default: Home,
        footer: Footer
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/register-device",
      name: "starter",
      components: {
        // header: Header,
        default: RegisterDevice,
        footer: StarterFooter2
      },
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/set-up",
      name: "setup",
      components: {
        header: Header,
        default: SetUp,
        footer: Footer
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/perform",
      name: "perform",
      components: {
        default: Perform,
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/tutorial",
      name: "tutorial",
      components: {
        header: Header,
        default: Tutorial,
        footer: Footer
      },
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/contact",
      name: "contact",
      components: {
        header: Header,
        default: Contact,
        footer: Footer
      },
      meta: {
        requiresAuth: false,
      },
    }
  ]
});

const middlewares = async (to, from, next) => {
  await store.restored
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.user.accessCode !== '') {
      next()
    } else {
      next('/register-device')
    }
  } else {
    next()
  }
}
router.beforeEach(middlewares)

export default router
