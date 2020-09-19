<template>
  <v-app id="app">
    <v-toolbar>
      <v-app-bar-nav-icon @click="openDrawer = !openDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="hidden-xs-and-down">
        <router-link to="/" tag="span" style="cursor: pointer">Second Opinion</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-for="item in toolbarItems" :key="item.key" :to="item.link">
          <v-icon>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn v-if="userIsAuthenticated" @click="onSignOut">
          <v-icon>exit_to_app</v-icon>Sign out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer v-model="openDrawer" temporary absolute>
      <v-container>
        <h1>
          <router-link to="/" tag="span" style="cursor: pointer">Second Opinion</router-link>
        </h1>
      </v-container>
      <v-list flat>
        <v-list-item-group>
          <v-list-item to="/">
            <v-list-item-content>
              <v-list-item-icon>
                <v-icon>dynamic_feed</v-icon>
              </v-list-item-icon>
              <v-list-item-title>All Posts</v-list-item-title>
              <v-divider></v-divider>
            </v-list-item-content>
          </v-list-item>
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
    <router-view />
  </v-app>
</template>

<script>
export default {
  data: () => {
    return {
      openDrawer: false,
      toolTip: true,
      drawerItems: [
        {
          icon: "house",
          title: "Home Projects",
          link: "/homeProjects",
        },
        {
          icon: "sports_basketball",
          title: "Sports",
          link: "/sports",
        },
        {
          icon: "restaurant",
          title: "Cooking",
          link: "/cooking",
        },
        {
          icon: "drive_eta",
          title: "Automotive",
          link: "/automotive",
        },
      ],
    };
  },
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    toolbarItems() {
      let toolbarItems = [
        {
          icon: "post_add",
          title: "Create Post",
          link: "/new",
        },
      ];
      if (!this.userIsAuthenticated) {
        toolbarItems = [
          {
            icon: "person_add",
            title: "Sign up",
            link: "/signup",
          },
          {
            icon: "lock_open",
            title: "Sign in",
            link: "/signin",
          },
        ];
      }
      return toolbarItems;
    },
  },
  methods: {
    onSignOut() {
      this.$store.dispatch("signOut");
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

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
