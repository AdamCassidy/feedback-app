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
    var firebaseConfig = {
      apiKey: "AIzaSyBSsZg6JeXjGmv7RUfCbGGEqTeZ79Cefvs",
      authDomain: "feedback-app-c65f1.firebaseapp.com",
      databaseURL: "https://feedback-app-c65f1.firebaseio.com",
      projectId: "feedback-app-c65f1",
      storageBucket: "feedback-app-c65f1.appspot.com",
      messagingSenderId: "736695479450",
      appId: "1:736695479450:web:d314fed4c3a7dc7614c323",
    };
    firebase.initializeApp(firebaseConfig);
  },
}).$mount("#app");
