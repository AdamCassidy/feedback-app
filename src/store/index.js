import Vue from "vue";
import Vuex from "vuex";
import * as firebase from "firebase";
import createPersistedState from "vuex-persistedstate";
import * as Cookies from "js-cookie";

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) =>
        Cookies.set(key, state, { expires: 3, secure: true }),
    }),
  ],

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
    createReply(state, payload) {
      state.replies.push(payload);
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
      if (payload.tags) {
        post.tags = payload.tags;
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
    deletePost(state, payload) {
      const index = state.posts.findIndex((post) => {
        return payload.id === post.id;
      });

      state.posts.splice(index, 1);
    },
    deletePostComments(state, payload) {
      state.comments = state.comments.filter((comment) => {
        return comment.postId !== payload.id;
      });
    },
    deletePostReplies(state, payload) {
      state.replies = state.replies.filter((reply) => {
        return reply.postId !== payload.id;
      });
    },
    loadPosts(state, payload) {
      state.posts = [];
      let obj;
      for (obj of payload) {
        state.posts.push(obj);
      }
    },
    loadComments(state, payload) {
      state.comments = [];
      let obj;
      for (obj of payload) {
        state.comments.push(obj);
      }
    },
    loadReplies(state, payload) {
      state.replies = [];
      let obj;
      for (obj of payload) {
        state.replies.push(obj);
      }
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

    createPost({ commit, dispatch, getters }, payload) {
      commit("setLoading", true);
      return firebase
        .auth()
        .currentUser.getIdToken(true)
        .then((idToken) => {
          if (idToken !== null && idToken !== undefined) {
            const post = {
              title: payload.title,
              context: payload.context,
              date: payload.date.toISOString(),
              creatorId: getters.user.id,
              tags: payload.tags,
            };
            if (payload.image !== null && payload.image !== undefined) {
              post.image = payload.image;
            }
            let key;
            let imageURL;

            if (post.image !== null && post.image !== undefined) {
              return firebase
                .auth()
                .currentUser.getIdToken(true)
                .then((idToken) => {
                  return fetch(
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
                      post.imageURL = imageURL;
                      commit("createPost", {
                        ...post,
                        id: key,
                      });

                      commit("setLoading", false);
                      return key;
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
            } else {
              return firebase
                .auth()
                .currentUser.getIdToken(true)
                .then((idToken) => {
                  return fetch(
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
                      commit("createPost", {
                        ...post,
                        id: key,
                      });

                      commit("setLoading", false);
                      return key;
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
            }
          } else {
            dispatch("signOut");
            commit("setLoading", false);
            this.$router.push("/signin");
            return "";
          }
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
        userName: payload.userName,
      };

      if (payload.photoURL !== null && payload.photoURL !== undefined) {
        comment.photoURL = payload.photoURL;
      }

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
              commit("setLoading", false);
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
        reply: payload.comment,
        date: payload.date.toISOString(),
        creatorId: getters.user.id,
        postId: payload.postId,
        commentId: payload.commentId,
        userName: payload.userName,
        replyingTo: payload.replyingTo,
      };
      if (payload.photoURL !== null && payload.photoURL !== undefined) {
        reply.photoURL = payload.photoURL;
      }

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
              commit("setLoading", false);
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

      let key;
      let user;

      if (payload.image === null || payload.image === undefined) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password)
          .then((userCredential) => {
            user = userCredential.user;
            key = user.uid;
            user
              .updateProfile({
                displayName: payload.name,
              })
              .then(() => {
                const newUser = {
                  id: user.uid,
                  name: user.displayName,
                  posts: [],
                };
                commit("setUser", newUser);
                commit("setLoading", false);
              })
              .catch((error) => {
                commit("setLoading", false);
                commit("setAuthError", error);
                console.log(error);
              });
          })
          .catch((error) => {
            commit("setLoading", false);
            commit("setAuthError", error);
            console.log(error);
          });
      } else {
        firebase
          .auth()
          .createUserWithEmailAndPassword(payload.email, payload.password)
          .then((userCredential) => {
            const filename = payload.image.name;
            const ext = filename.slice(filename.lastIndexOf(".") + 1);

            user = userCredential.user;
            key = user.uid;

            return firebase
              .storage()
              .ref("users/" + key + "." + ext)
              .put(payload.image);
          })
          .then((fileData) => fileData.ref.getDownloadURL())
          .then((URL) => {
            user
              .updateProfile({
                displayName: payload.name,
                photoURL: URL,
              })
              .then(() => {
                const newUser = {
                  id: user.uid,
                  name: user.displayName,
                  photoURL: user.photoURL,
                  posts: [],
                };
                commit("setUser", newUser);
                commit("setLoading", false);
              })
              .catch((error) => {
                commit("setLoading", false);
                commit("setAuthError", error);
                console.log(error);
              });
          })
          .catch((error) => {
            commit("setLoading", false);
            commit("setAuthError", error);
            console.log(error);
          });
      }
    },
    signIn({ commit }, payload) {
      commit("setLoading", true);
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((userCredential) => {
          commit("setLoading", false);
          let user = userCredential.user;
          const newUser = {
            id: user.uid,
            name: user.displayName,
            photoURL: user.photoURL,
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
      commit("setLoading", true);
      firebase.auth().signOut();
      commit("clearUser");
      commit("setLoading", false);
    },
    deletePost({ commit }, payload) {
      if (payload.imageURL !== undefined && payload.imageURL !== null) {
        firebase
          .storage()
          .refFromURL(payload.imageURL)
          .delete()
          .then()
          .catch((error) => {
            console.log(error);
          });
      }

      firebase
        .database()
        .ref("replies")
        .once("value", (snap) => {
          snap.forEach((replyNode) => {
            if (replyNode.val().postId === payload.id) {
              firebase
                .database()
                .ref("replies")
                .child(replyNode.key)
                .remove();
            }
          });
        })
        .then(() => {
          commit("deletePostReplies", payload);
          firebase
            .database()
            .ref("comments")
            .once("value", (snap) => {
              snap.forEach((commentNode) => {
                if (commentNode.val().postId === payload.id) {
                  firebase
                    .database()
                    .ref("comments")
                    .child(commentNode.key)
                    .remove();
                }
              });
            });
        })
        .then(() => {
          commit("deletePostComments", payload);
          firebase
            .database()
            .ref("posts")
            .child(payload.id)
            .remove();
        })
        .then(() => {
          commit("deletePost", payload);
          commit("setLoading", false);
        })
        .catch((error) => {
          console.log(error);
          commit("setLoading", false);
        });
    },
    loadPosts({ commit }) {
      commit("setLoading", true);

      firebase
        .database()
        .ref("posts")
        .once("value")
        .then((data) => {
          let posts = [];
          let obj = data.val();
          let key;

          let newObj;

          for (key in obj) {
            newObj = {};
            if (obj[key].tags !== undefined && obj[key].tags !== null) {
              newObj.tags = obj[key].tags;
            }
            if (obj[key].imageURL !== undefined && obj[key].imageURL !== null) {
              newObj.imageURL = obj[key].imageURL;
            }
            posts.push({
              ...newObj,
              id: key,
              creatorId: obj[key].creatorId,
              date: obj[key].date,
              title: obj[key].title,
              context: obj[key].context,
            });
          }
          commit("loadPosts", posts);
          commit("setLoading", false);
        })
        .catch((error) => {
          commit("setLoading", false);
          console.log(error);
        });
    },
    loadComments({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("comments")
        .once("value")
        .then((data) => {
          let comments = [];
          let obj = data.val();
          let key;
          let newObj;

          for (key in obj) {
            newObj = {};

            if (obj[key].photoURL !== undefined && obj[key].photoURL !== null) {
              newObj.photoURL = obj[key].photoURL;
            }

            comments.push({
              ...newObj,
              id: key,
              creatorId: obj[key].creatorId,
              date: obj[key].date,
              userName: obj[key].userName,
              comment: obj[key].comment,
              postId: obj[key].postId,
            });
          }
          commit("loadComments", comments);
          commit("setLoading", false);
        })
        .catch((error) => {
          commit("setLoading", false);
          console.log(error);
        });
    },
    loadReplies({ commit }) {
      commit("setLoading", true);
      firebase
        .database()
        .ref("replies")
        .once("value")
        .then((data) => {
          let replies = [];
          let obj = data.val();
          let key;
          let newObj;

          for (key in obj) {
            newObj = {};

            if (obj[key].photoURL !== undefined && obj[key].photoURL !== null) {
              newObj.photoURL = obj[key].photoURL;
            }
            if (
              obj[key].replyingTo !== undefined &&
              obj[key].replyingTo !== null
            ) {
              newObj.replyingTo = obj[key].replyingTo;
            }

            replies.push({
              ...newObj,
              id: key,
              creatorId: obj[key].creatorId,
              date: obj[key].date,
              userName: obj[key].userName,
              commentId: obj[key].commentId,
              reply: obj[key].reply,
              postId: obj[key].postId,
            });
          }
          commit("loadReplies", replies);
          commit("setLoading", false);
        })
        .catch((error) => {
          commit("setLoading", false);
          console.log(error);
        });
    },
  },
  getters: {
    categorizedPosts(state) {
      return (tag) => {
        return state.posts
          .filter((post) => {
            if (post.tags !== null && post.tags !== undefined) {
              return post.tags.find((postTag) => {
                return postTag === tag;
              });
            }
          })
          .sort((postA, postB) => {
            return postA.date < postB.date;
          });
      };
    },
    posts(state) {
      return state.posts.sort((postA, postB) => {
        return postA.date < postB.date;
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
          .sort((commentA, commentB) => {
            return commentA.date < commentB.date;
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
    userPosts(state) {
      return state.posts
        .filter((post) => {
          return post.creatorId === state.user.id;
        })
        .sort((postA, postB) => {
          return postA.date < postB.date;
        });
    },
  },
});
