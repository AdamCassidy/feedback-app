import Vue from "vue";
import App from "./App.vue";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import vuetify from "./plugins/vuetify";
import router from "./router";
import * as firebase from "firebase";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
  created() {
    var firebaseConfig = {};
    firebase.initializeApp(firebaseConfig);
  },
}).$mount("#app");
