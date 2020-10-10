import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#701487",
        secondary: "#AE1556",
        tertiary: "#431D8C",
        complement: "#BBC919",
      },
    },
  },
});
