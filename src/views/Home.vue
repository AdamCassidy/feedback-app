<template>
  <div class="my-4">
    <h1 class="my-4">Second Opinion</h1>
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