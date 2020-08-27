<template>
  <div id="app">
    <v-toolbar>
      <v-app-bar-nav-icon @click="openDrawer = !openDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Second Opinion</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-for="item in toolbarItems" :key="item.key" :to="item.link">
          <v-icon>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer v-model="openDrawer" temporary absolute>
      <v-list flat>
        <v-list-item-group>
          <v-list-item v-for="item in drawerItems" :key="item.key" :to="item.link">
            <v-list-item-content>
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      openDrawer: false,
      toolTip: true,
      drawerItems: [
        { icon: "house", title: "Home Projects", link: "/homeProjects" },
        { icon: "sports_basketball", title: "Sports", link: "/sports" },
        { icon: "restaurant", title: "Cooking", link: "/cooking" },
        { icon: "content_cut", title: "Style", link: "/style" },
        { icon: "drive_eta", title: "Automotive", link: "/automotive" },
      ],
    };
  },
  computed: {
    userIsAuth() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    toolbarItems() {
      let toolbarItems = [
        { icon: "dynamic_feed", title: "Posts", link: "/posts" },
        { icon: "post_add", title: "Create Posts", link: "/posts/new" },
      ];
      if (!this.userIsAuth) {
        toolbarItems = [
          { icon: "dynamic_feed", title: "Posts", link: "/posts" },
          { icon: "person_add", title: "Sign up", link: "/signup" },
          { icon: "lock_open", title: "Sign in", link: "/signin" },
        ];
      }
      return toolbarItems;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>