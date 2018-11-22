// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import "vuetify/dist/vuetify.min.css";
import colors from "vuetify/es5/util/colors";
import { routes } from "./routes";

const router = new VueRouter({
  routes,
  mode: "history"
});

Vue.use(VueRouter);
Vue.use(Vuetify, {
  theme: {
    primary: colors.amber.darken1,
    secondary: colors.amber.lighten1,
    accent: colors.lightGreen.darken3,
    error: colors.red.base,
    warning: colors.yellow.accent2,
    info: colors.teal.lighten1,
    success: colors.lightGreen.darken3
  }
});

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
