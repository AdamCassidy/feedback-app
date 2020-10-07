<template>
  <v-container v-if="post && !loading" class="text-start">
    <comment-input
      @send="(commentObj) => onSend(commentObj)"
      :post="post"
      messageType="Comment"
    ></comment-input>
    <v-divider class="my-4"></v-divider>
    <div v-if="comments">
      <comment
        v-for="comment in comments"
        :key="comment.id"
        :id="comment.id"
        :post="post"
        :comment="comment"
        @send="(replyObj) => onReplySend(replyObj)"
      ></comment>
    </div>
  </v-container>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    comments() {
      return this.$store.getters.comments(this.post.id);
    },
  },
  methods: {
    onSend(commentObj) {
      this.$store.dispatch("createComment", commentObj);
    },
    onReplySend(replyObj) {
      replyObj.postId = this.post.id;
      this.$store.dispatch("createReply", replyObj);
    },
  },
};
</script>
