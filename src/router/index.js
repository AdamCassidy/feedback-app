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
      title: "2nd Opinion",
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
      title: "Home Projects",
    },
  },
  {
    path: "/sports",
    name: "Sports",
    component: () => import("../views/Sports.vue"),
    meta: {
      title: "Sports",
    },
  },
  {
    path: "/cooking",
    name: "Cooking",
    component: () => import("../views/Cooking.vue"),
    meta: {
      title: "Cooking",
    },
  },
  {
    path: "/signup",
    name: "Sign-up",
    component: () => import("../views/User/Sign-up.vue"),
    meta: {
      title: "Sign Up",
    },
  },
  {
    path: "/signin",
    name: "Sign-in",
    component: () => import("../views/User/Sign-in.vue"),
    meta: {
      title: "Sign In",
    },
  },
  {
    path: "/automotive",
    name: "Automotive",
    component: () => import("../views/Automotive.vue"),
    meta: {
      title: "Automotive",
    },
  },
  {
    path: "/new",
    name: "createPost",
    component: () => import("../views/Post/CreatePost.vue"),
    meta: {
      title: "Create Post",
    },
  },
  {
    path: "/:id",
    name: "post",
    props: true,
    component: () => import("../views/Post/Post.vue"),
    meta: {
      title: "Post",
    },
  },
  {
    path: "/users/:id",
    name: "user",
    props: true,
    component: () => import("../views/User/User.vue"),
    meta: {
      title: "User Post",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
