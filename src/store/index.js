import Vue from "vue";
import VueX from "vuex";

Vue.use(VueX);

export const store = new Vuex.Store({
  state: {
    posts: {},
    user: {
      id: 1,
      posts: {},
    },
  },
  mutations: {},
  actions: {},
  getters: {
    getPosts(state) {
      return this.state.posts.sort((postA, postB) => {
        return postA.date > postB.date;
      });
    },
    getPost(state) {
      return (postId) => {
        return this.state.posts.find((postId) => {
          return post.id === postId;
        });
      };
    },
  },
});
