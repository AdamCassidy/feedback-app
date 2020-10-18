import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Post/Home.vue";

Vue.use(VueRouter);

Vue.mixin({
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("clearAuthError");
    next();
  },
});
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      name: "2nd Opinion",
      content:
        "A social media forum that's focused on discussion of constructive feedback. It's a community where users can\
          gather opinions on whatever they share. If you're saying, \"I need a second opinion on this\", this is the\
          place to go.",
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/homeProjects",
    name: "Home Projects",
    component: () => import("../views/HomeProjects.vue"),
    meta: {
      name: "Home Projects",
      content:
        "A social media forum that's focused on discussion of constructive feedback. It's a community where users can\
          gather opinions on whatever they share. If you're saying, \"I need a second opinion on this home project/ shed I built/\
          color choice/ paint color\", this is the\
          place to go.",
    },
  },
  {
    path: "/sports",
    name: "Sports",
    component: () => import("../views/Sports.vue"),
    meta: {
      name: "Sports",
      content:
        "A social media forum that's focused on discussion of constructive feedback. It's a community where users can\
          gather opinions on whatever they share. If you're saying, \"I need a second opinion on my backswing/ dunk/ slapshot/\
          wristshot/ sprint\", this is the\
          place to go.",
    },
  },
  {
    path: "/cooking",
    name: "Cooking",
    component: () => import("../views/Cooking.vue"),
    meta: {
      name: "Cooking",
      content:
        "A social media forum that's focused on discussion of constructive feedback. It's a community where users can\
          gather opinions on whatever they share. If you're saying, \"I need a second opinion on this dish/ recipe/ meal prep idea\", this is the\
          place to go.",
    },
  },
  {
    path: "/signup",
    name: "Sign-up",
    component: () => import("../views/User/Sign-up.vue"),
    meta: {
      name: "Sign Up",
      content:
        "A social media forum that's focused on discussion of constructive feedback. It's a community where users can\
          gather opinions on whatever they share. If you're saying, \"I need a second opinion on this\", this is the\
          place to go.",
    },
  },
  {
    path: "/signin",
    name: "Sign-in",
    component: () => import("../views/User/Sign-in.vue"),
    meta: {
      name: "Sign In",
      content:
        "A social media forum that's focused on discussion of constructive feedback. It's a community where users can\
          gather opinions on whatever they share. If you're saying, \"I need a second opinion on this\", this is the\
          place to go.",
    },
  },
  {
    path: "/automotive",
    name: "Automotive",
    component: () => import("../views/Automotive.vue"),
    meta: {
      name: "Automotive",
      content:
        "A social media forum that's focused on discussion of constructive feedback. It's a community where users can\
          gather opinions on whatever they share. If you're saying, \"I need a second opinion on this car/ truck/ vehicle/ lease\", this is the\
          place to go.",
    },
  },
  {
    path: "/new",
    name: "createPost",
    component: () => import("../views/Post/CreatePost.vue"),
    meta: {
      name: "Create Post",
      content:
        "A social media forum that's focused on discussion of constructive feedback. It's a community where users can\
          gather opinions on whatever they share. If you're saying, \"I need a second opinion on this\", this is the\
          place to go.",
    },
  },
  {
    path: "/posts/:id",
    name: "post",
    props: true,
    component: () => import("../views/Post/Post.vue"),
    meta: {
      name: "Post",
      content:
        "A social media forum that's focused on discussion of constructive feedback. It's a community where users can\
          gather opinions on whatever they share. If you're saying, \"I need a second opinion on this\", this is the\
          place to go.",
    },
  },
  {
    path: "/users/:id",
    name: "user",
    props: true,
    component: () => import("../views/User/User.vue"),
    meta: {
      name: "User Post",
      content:
        "A social media forum that's focused on discussion of constructive feedback. It's a community where users can\
          gather opinions on whatever they share. If you're saying, \"I need a second opinion on this\", this is the\
          place to go.",
    },
  },
  {
    path: "*",
    name: "missing",
    component: () => import("../views/Missing.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
