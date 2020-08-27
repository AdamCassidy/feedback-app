import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    posts: null,
    user: null,
  },
  mutations: {
    createPost(state, payload) {
      state.posts.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    createPost({ commit }, payload) {
      const post = {
        title: payload.title,
        context: payload.context,
        image: payload.image,
        date: payload.date,
        id: "qtertwmrtymrd453",
      };

      commit("createPost", post);
    },

    addUser({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          const newUser = {
            id: userCredential.user.uid,
            posts: [],
          };
          commit("setUser", newUser);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
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
    user(state) {
      return state.user;
    },
  },
});
