<template>
  <v-container
    v-if="post !== undefined && post !== null && !loading"
    class="text-start"
  >
    <CommentInput
      @send="(commentObj) => onSend(commentObj)"
      :post="post"
      messageType="Comment"
    ></CommentInput>
    <v-divider class="my-4"></v-divider>
    <div v-if="comments">
      <Comment
        v-for="comment in comments"
        :key="comment.id"
        :id="comment.id"
        :post="post"
        :comment="comment"
        @send="(replyObj) => onReplySend(replyObj)"
      ></Comment>
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
  components: {
    Comment: () => import(/* webpackChunkName: "Comment" */ "./Comment.vue"),
    CommentInput: () =>
      import(/* webpackChunkName: "Comment" */ "./CommentInput.vue"),
  },
};
</script>
