<template>
  <v-container v-if="comment && !loading">
    <v-row class="ms-2">
      <v-avatar>
        <img v-if="comment.photoURL" :src="comment.photoURL" />
        <img
          v-if="!creator.photoURL && webpSupported"
          src="../../logo/logo.webp"
        />
        <img
          v-if="!creator.photoURL && !webpSupported"
          src="../../logo/logo.png"
        />
      </v-avatar>
      <v-col>
        <h5 v-if="creator !== null && creator !== undefined">
          {{ creator.userName }}
        </h5>
        <p style="font-size: 9px">{{ comment.date | date }}</p>
      </v-col>
    </v-row>
    <v-row class="ms-4">
      <p>{{ comment.comment }}</p>
    </v-row>
    <v-btn v-if="!replying && user && !userIsCreator" @click="replying = true"
      >Reply</v-btn
    >
    <v-btn
      v-if="
        !loadReplies &&
        replies !== null &&
        replies !== undefined &&
        replies.length !== 0
      "
      @click="loadReplies = true"
      >Load Replies</v-btn
    >
    <v-btn v-if="loadReplies" @click="loadReplies = false">Close Replies</v-btn>
    <template v-if="userIsCreator">
      <EditCommentDialog :comment="comment"></EditCommentDialog>
    </template>
    <CommentInput
      v-if="replying"
      @send="(replyObj) => onSend(replyObj)"
      @cancel="replying = false"
      :post="post"
      messageType="Reply"
    ></CommentInput>
    <div v-if="loadReplies" class="ml-4">
      <Reply
        v-for="reply in replies"
        :key="reply.id"
        :id="reply.id"
        :post="post"
        :comment="comment"
        :reply="reply"
        :commentId="id"
        @send="(replyObj) => onSend(replyObj)"
      ></Reply>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "AsyncComment",
  props: {
    post: {
      type: Object,
      required: true,
    },
    comment: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      replying: false,
      loadReplies: false,
    };
  },
  computed: {
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }

      return this.$store.getters.user.id === this.comment.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    },
    replies() {
      return this.$store.getters.replies(this.id);
    },
    user() {
      return this.$store.getters.user;
    },
    creator() {
      if (this.userIsCreator) {
        return this.user;
      } else {
        return this.$store.getters.creator(this.comment.creatorId);
      }
    },
  },
  methods: {
    onSend(replyObj) {
      replyObj.commentId = this.comment.id;
      this.$emit("send", replyObj);
    },
  },

  components: {
    Reply: () => import(/* webpackChunkName: "Reply" */ "./Reply.vue"),
    CommentInput: () =>
      import(/* webpackChunkName: "CommentInput" */ "./CommentInput.vue"),
    EditCommentDialog: () =>
      import(
        /* webpackChunkName: "EditCommentDialog" */
        "../Edit/EditComment.vue"
      ),
  },
  created() {
    async () => {
      if (!self.createImageBitmap) {
        this.webpSupported = false;
        return false;
      }

      const webpData =
        "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=";
      const blob = await fetch(webpData).then((r) => r.blob());
      this.webpSupported = await createImageBitmap(blob).then(
        () => true,
        () => false
      );
    };
  },
};
</script>
