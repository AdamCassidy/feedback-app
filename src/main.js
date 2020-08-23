import Vue from "vue";
import App from "./App.vue";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import vuetify from "./plugins/vuetify";
import router from "./router";
import * as firebase from "firebase";
import { store } from "./store";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyDFQWaigSu1k-T2RVc7oOfKTJ4EmsLlwws",
      authDomain: "feedback-project-20f04.firebaseapp.com",
      databaseURL: "https://feedback-project-20f04.firebaseio.com",
      projectId: "feedback-project-20f04",
      storageBucket: "feedback-project-20f04.appspot.com",
      messagingSenderId: "624112482142",
      appId: "1:624112482142:web:776f42503fa6f7d41d01cf",
    };
    firebase.initializeApp(firebaseConfig);
  },
}).$mount("#app");
