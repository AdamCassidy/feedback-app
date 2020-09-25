<template>
  <v-container v-if="reply && !loading" class="ml-4">
    <v-row>
      <v-avatar>
        <img v-if="reply.photoURL" :src="reply.photoURL" />
        <v-icon v-else>mdi-account-circle</v-icon>
      </v-avatar>

      <h5 class="ma-2">{{reply.userName}}</h5>
      <p class="ma-2">{{reply.date | date}}</p>
      <p class="ma-2">({{comment.userName}}) {{reply.reply}}</p>
    </v-row>
    <v-btn v-if="!replying && user" @click="replying = true">Reply</v-btn>
    <comment-input
      v-if="replying"
      @send="(replyObj) => onSend(replyObj)"
      @cancel="replying = false"
      :post="post"
    ></comment-input>
  </v-container>
</template>

<script>
export default {
  props: {
    post: {
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
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
    comment() {
      return this.$store.getters.comment(this.commentId);
    },
    reply() {
      return this.$store.getters.reply(this.id);
    },
    user() {
      return this.$store.getters.user;
    },
  },
  data() {
    return {
      replying: false,
    };
  },
  methods: {
    onSend(replyObj) {
      replyObj.commentId = this.commentId;
      this.$emit("send", replyObj);
    },
  },
};
</script>
