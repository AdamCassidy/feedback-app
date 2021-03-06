<template>
  <v-container v-if="reply && !loading" class="ml-4">
    <v-row class="ms-2">
      <v-avatar>
        <img v-if="reply.photoURL" :src="reply.photoURL" />
        <img
          v-if="!reply.photoURL && webpSupported"
          src="../../logo/logo.webp"
        />
        <img
          v-if="!reply.photoURL && !webpSupported"
          src="../../logo/logo.png"
        />
      </v-avatar>

      <v-col>
        <h5 v-if="creator !== null && creator !== undefined">
          {{ creator.userName }}
        </h5>
        <p style="font-size: 9px">{{ reply.date | date }}</p>
      </v-col>
    </v-row>

    <v-row
      v-if="reply.replyingTo !== null && reply.replyingTo !== undefined"
      class="ms-4"
    >
      <p>({{ reply.replyingTo }}) {{ reply.reply }}</p>
    </v-row>
    <v-row v-else class="ms-4">
      <p>({{ commentCreator.userName }}) {{ reply.reply }}</p>
    </v-row>

    <v-btn v-if="!replying && user && !userIsCreator" @click="replying = true"
      >Reply</v-btn
    >
    <template v-if="userIsCreator">
      <EditReplyDialog :reply="reply"></EditReplyDialog>
    </template>
    <CommentInput
      v-if="replying"
      @send="(replyObj) => onSend(replyObj)"
      @cancel="replying = false"
      :reply="reply"
      :post="post"
      messageType="Reply"
    ></CommentInput>
  </v-container>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    comment: {
      type: Object,
      required: true,
    },
    reply: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    commentId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      replying: false,
    };
  },
  computed: {
    creator() {
      if (this.userIsCreator) {
        return this.user;
      } else {
        return this.$store.getters.creator(this.reply.creatorId);
      }
    },
    commentCreator() {
      return this.$store.getters.creator(this.comment.creatorId);
    },
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
      return this.$store.getters.user.id === this.reply.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    },
    user() {
      return this.$store.getters.user;
    },
  },

  methods: {
    onSend(replyObj) {
      replyObj.commentId = this.commentId;
      replyObj.replyingTo = this.creator.userName;
      this.$emit("send", replyObj);
    },
  },
  components: {
    CommentInput: () =>
      import(/* webpackChunkName: "CommentInput" */ "./CommentInput.vue"),
    EditReplyDialog: () =>
      import(
        /* webpackChunkName: "EditReplyDialog" */
        "../Edit/EditReply.vue"
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
