import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    posts: [{}],
    user: {
      id: 1,
      posts: [{}],
    },
  },
  mutations: {},
  actions: {},
  getters: {
    posts(state) {
      return state.posts.sort((postA, postB) => {
        return postA.date > postB.date;
      });
    },
    post(state) {
      return (postId) => {
        return state.posts.find((post) => {
          return post.id === postId;
        });
      };
    },
  },
});
