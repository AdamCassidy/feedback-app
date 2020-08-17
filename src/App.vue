<template>
  <div id="app">
    <v-toolbar>
      <v-toolbar-title>Feedback</v-toolbar-title>
      <v-app-bar-nav-icon @click="sideNav = !sideNav"></v-app-bar-nav-icon>
    </v-toolbar>
    <v-navigation-drawer v-model="sideNav"></v-navigation-drawer>

    <main></main>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      sideNav: false
    };
  }
};
</script>

<style>
#app {
}
</style>
