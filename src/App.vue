<template>
  <v-app>
    <v-toolbar>
      <v-app-bar-nav-icon @click="sideNav = !sideNav"></v-app-bar-nav-icon>
      <v-toolbar-title>Feedback</v-toolbar-title>
    </v-toolbar>
    <v-navigation-drawer v-model="sideNav"></v-navigation-drawer>

    <main></main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => {
    return {
      sideNav: false
    };
  }
};
</script>