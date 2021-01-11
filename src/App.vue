<template>
  <v-app id="app">
    <v-app-bar app>
      <v-app-bar-nav-icon
        @click="openDrawer = !openDrawer"
      ></v-app-bar-nav-icon>
      <!-- Keep this so users can always intuitively navigate to homepage. -->
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer; color: #701487">
          <v-avatar>
            <img src="./logo/logo.png" />
          </v-avatar>
        </router-link>
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
    </v-app-bar>
    <v-navigation-drawer v-model="openDrawer" temporary app>
      <h1 style="font-size: 27px">
        <v-avatar class="mb-2"> <img src="./logo/logo.png" /> </v-avatar>nd
        Opinion
      </h1>
      <v-list flat>
        <v-list-item-group>
          <v-list-item to="/">
            <v-list-item-content class="text-start">
              <v-list-item-icon>
                <v-icon color="primary">pages</v-icon>
                <v-list-item-title class="ms-6">All Posts</v-list-item-title>
              </v-list-item-icon>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="userIsAuthenticated" :to="'/users/' + user.id">
            <v-list-item-content class="text-start">
              <v-list-item-icon>
                <v-icon color="primary">account_box</v-icon>
                <v-list-item-title class="ms-6">Your Posts</v-list-item-title>
              </v-list-item-icon>
            </v-list-item-content>
          </v-list-item>
          <v-list-item to="/about">
            <v-list-item-content class="text-start">
              <v-list-item-icon>
                <v-icon color="primary">subject</v-icon>
                <v-list-item-title class="ms-6">About</v-list-item-title>
              </v-list-item-icon>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item
            v-for="item in drawerItems"
            :key="item.key"
            :to="item.link"
          >
            <v-list-item-content class="text-start">
              <v-list-item-icon>
                <v-icon v-text="item.icon" color="primary"></v-icon>
                <v-list-item-title class="ms-6">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-icon>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer></Footer>
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
          color: "#ff4d4d",
        },
        {
          icon: "drive_eta",
          title: "Automotive",
          link: "/automotive",
          color: "#4d4dff",
        },
        {
          icon: "sports_basketball",
          title: "Sports",
          link: "/sports",
          color: "#ffad33",
        },
        {
          icon: "restaurant",
          title: "Cooking",
          link: "/cooking",
          color: "silver",
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
    user() {
      return this.$store.getters.user;
    },
  },
  watch: {
    $route(to) {
      document.title = to.meta.title || "2nd Opinion";
    },
  },
  methods: {
    onSignOut() {
      this.$store.dispatch("signOut");
    },
  },
  components: {
    Footer: () =>
      import(
        /* webpackChunkName: "Footer" */
        "./components/Footer.vue"
      ),
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #701487;
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
