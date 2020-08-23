<template>
  <div class="home">
    <h1>Second Opinion</h1>
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
