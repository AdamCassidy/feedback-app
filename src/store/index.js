import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    comments: [],
    replies: [],
    posts: [],
    user: null,
    loading: false,
    authError: null,
  },

  mutations: {
    createPost(state, payload) {
      state.posts.push(payload);
    },
    createComment(state, payload) {
      state.comments.push(payload);
    },
    createReplies(state, payload) {
      state.posts.push(payload);
    },
    updatePost(state, payload) {
      const post = state.posts.find((post) => {
        return payload.id === post.id;
      });

      if (payload.title) {
        post.title = payload.title;
      }
      if (payload.context) {
        post.context = payload.context;
      }
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
    updatePost({ commit }, payload) {
      commit("setLoading", true);
      var updateObj = {};
      if (payload.title) {
        updateObj.title = payload.title;
      }
      if (payload.context) {
        updateObj.context = payload.context;
      }

      firebase
        .database()
        .ref("posts")
        .child(payload.id)
        .update(updateObj)
        .then(() => {
          commit("setLoading", false);
          commit("updatePost", payload);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },

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
              if (!res.ok) {
                throw new Error("Error: Can't post to database.");
              }
              return res.json();
            })
            .then((data) => {
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
          commit("setLoading", false);
        });
    },

    createComment({ commit, getters }, payload) {
      commit("setLoading", true);
      const comment = {
        // Add the new single comment to be posted
        comment: payload.comment,
        date: payload.date.toISOString(),
        creatorId: getters.user.id,
        postId: payload.postId,
      };
      let key;
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          fetch(
            "https://feedback-project-20f04.firebaseio.com/comments.json?auth=" +
              idToken,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(comment),
            }
          )
            .then((res) => {
              if (!res.ok) {
                throw new Error("Error: Can't post to database.");
              }
              return res.json();
            })
            .then((data) => {
              key = data.name;
              comment.id = key;
              commit("createComment", comment);
              commit("setLoading", false);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    createReply({ commit, getters }, payload) {
      commit("setLoading", true);
      const reply = {
        // Add the new single reply to be posted
        reply: payload.reply,
        date: payload.date.toISOString(),
        creatorId: getters.user.id,
        postId: payload.postId,
        commentId: payload.commentId,
      };
      let key;
      firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          fetch(
            "https://feedback-project-20f04.firebaseio.com/replies.json?auth=" +
              idToken,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(reply),
            }
          )
            .then((res) => {
              if (!res.ok) {
                throw new Error("Error: Can't post to database.");
              }
              return res.json();
            })
            .then((data) => {
              key = data.name;
              reply.id = key;
              commit("createReply", reply);
              commit("setLoading", false);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
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
    comments(state) {
      return (postId) => {
        return state.comments
          .filter((comment) => {
            return comment.postId === postId;
          })
          .sort((replyA, commentB) => {
            return replyA.date > commentB.date;
          });
      };
    },
    comment(state) {
      return (commentId) => {
        return state.comments.find((comment) => {
          return comment.id === commentId;
        });
      };
    },
    replies(state) {
      return (commentId) => {
        return state.replies
          .filter((reply) => {
            return reply.commentId === commentId;
          })
          .sort((replyA, replyB) => {
            return replyA.date > replyB.date;
          });
      };
    },
    reply(state) {
      return (replyId) => {
        return state.replies.find((reply) => {
          return reply.id === replyId;
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
