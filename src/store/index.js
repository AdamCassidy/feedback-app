import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
    authError: null,
  },
  mutations: {
    createPost(state, payload) {
      state.posts.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setAuthError(state, payload) {
      state.authError = payload;
    },
    clearAuthError(state) {
      state.authError = null;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  actions: {
    createPost({ commit, getters }, payload) {
      commit("setLoading", true);
      const post = {
        title: payload.title,
        context: payload.context,
        image: payload.image,
        date: payload.date.toISOString(),
        creatorId: getters.user.id,
      };
      let key;
      let imageURL;

      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          fetch(
            "https://feedback-project-20f04.firebaseio.com/posts.json?auth=" +
              idToken,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(post),
            }
          )
            .then((res) => {
              for (let k in res) {
                console.log(k + " " + res.k);
              }
              return res.json();
            })
            .then((data) => {
              for (let k in data) {
                console.log(k + " " + data.k);
              }
              key = data.name;
              return key;
            })
            .then((key) => {
              const filename = payload.image.name;
              const ext = filename.slice(filename.lastIndexOf(".") + 1);
              return firebase
                .storage()
                .ref("posts/" + key + "." + ext)
                .put(payload.image);
            })
            .then((fileData) => fileData.ref.getDownloadURL())
            .then((URL) => {
              console.log(key);
              imageURL = URL;
              firebase
                .database()
                .ref()
                .child("posts/" + key)
                .update({ imageURL: imageURL });
            })
            .then(() => {
              commit("createPost", {
                ...post,
                imageURL: imageURL,
                id: key,
              });
              commit("setLoading", false);
            })
            .catch((error) => {
              commit("setLoading", false);
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    createUser({ commit }, payload) {
      commit("setLoading", true);
      commit("clearAuthError");

      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          commit("setLoading", false);
          const newUser = {
            id: userCredential.user.uid,
            posts: [],
          };
          commit("setUser", newUser);
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setAuthError", error);
          console.log(error);
        });
    },
    signIn({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          commit("setLoading", false);

          const newUser = {
            id: userCredential.user.uid,
            posts: [],
          };
          commit("setUser", newUser);
        })
        .catch((error) => {
          commit("setLoading", false);
          commit("setAuthError", error);
          console.log(error);
        });
    },
    clearAuthError({ commit }) {
      commit("clearAuthError");
    },
    signOut({ commit }) {
      firebase.auth().signOut();
      commit("clearUser");
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
    loading(state) {
      return state.loading;
    },
    authError(state) {
      return state.authError;
    },
  },
});
