import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
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
  },
  {
    path: "/sports",
    name: "Sports",
    component: () => import("../views/Sports.vue"),
  },
  {
    path: "/cooking",
    name: "Cooking",
    component: () => import("../views/Cooking.vue"),
  },
  {
    path: "/post/new",
    name: "newPost",
    component: () => import("../views/Post/NewPost.vue"),
  },
  {
    path: "/post/:id",
    name: "post",
    props: true,
    component: () => import("../views/Post/Post.vue"),
  },
  {
    path: "/posts",
    name: "Posts",
    component: () => import("../views/Post/Posts.vue"),
  },
  {
    path: "/sign-up",
    name: "Sign-up",
    component: () => import("../views/User/Sign-up.vue"),
  },
  {
    path: "/sign-in",
    name: "Sign-in",
    component: () => import("../views/User/Sign-in.vue"),
  },
  {
    path: "/hairstyle",
    name: "Hairstyle",
    component: () => import("../views/Hairstyle.vue"),
  },
  {
    path: "/automotive",
    name: "Automotive",
    component: () => import("../views/Automotive.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
