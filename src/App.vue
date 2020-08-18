<template>
  <v-app>
    <v-toolbar>
      <v-app-bar-nav-icon @click="openDrawer = !openDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Feedback</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="openDrawer">
      <v-list flat>
        <v-list-item-group>
          <v-list-item v-for="item in drawerItems" :key="item.key">
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

    <main></main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => {
    return {
      openDrawer: false,
      drawerItems: [
        { icon: "house", title: "Home Projects" },
        { icon: "sports_basketball", title: "Sports" },
        { icon: "restaurant", title: "Meal" }
      ]
    };
  }
};
</script>