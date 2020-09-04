import Vue from "vue";
import App from "./App.vue";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import vuetify from "./plugins/vuetify";
import router from "./router";
import * as firebase from "firebase";
import { store } from "./store";
import AlertCmp from "./views/Shared/Alert.vue";
import EditPost from "./views/Post/Edit/EditPost.vue";
import DateFilter from "./views/filters/date.js";

Vue.config.productionTip = false;
Vue.filter("date", DateFilter);

Vue.component("authError-alert", AlertCmp);
Vue.component("edit-post-dialog", EditPost);

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
