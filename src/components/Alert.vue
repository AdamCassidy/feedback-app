<template>
  <v-container>
    <v-alert prominent type="error" dismissible @input="onClose" :value="true">{{ text }}</v-alert>
  </v-container>
</template>

<script>
export default {
  props: ["text"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    },
  },
};
</script>
