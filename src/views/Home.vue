<template>
  <div>
    <v-container>
      <v-container>
        <h1>Second Opinion</h1>
      </v-container>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
  },
};
</script>

<style lang="">
</style>
