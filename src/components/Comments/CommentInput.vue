<template>
  <v-container v-if="post && !loading">
    <v-text-field v-model="comment" :label="messageType"></v-text-field>
    <v-btn v-if="$listeners['cancel']" @click="$emit('cancel')">Cancel</v-btn>
    <v-btn v-if="user" @click="onSubmit">Submit</v-btn>
  </v-container>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    messageType: {
      type: String,
      requuired: true,
    },
  },
  data() {
    return {
      comment: "",
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    onSubmit() {
      if (this.comment === "") {
        return;
      }
      const date = new Date();
      const commentObj = {
        date: date,
        comment: this.comment,
        postId: this.post.id,
        photoURL: this.$store.getters.user.photoURL,
        userName: this.$store.getters.user.name,
      };

      if (this.user !== null && this.user !== undefined) {
        this.$emit("send", commentObj);
      } else {
        this.$router.push("/signin");
      }
    },
  },
};
</script>
