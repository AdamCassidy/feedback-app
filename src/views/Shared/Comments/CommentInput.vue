<template>
  <div>
    <v-text-field v-model="comment" label="Comment"></v-text-field>
    <v-btn v-if="$listeners['cancel']" @click="$emit('cancel')">Cancel</v-btn>
    <v-btn @click="$emit('submit', comment)">Submit</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comment: "",
    };
  },
};
</script>