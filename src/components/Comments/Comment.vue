<template>
  <v-container v-if="comment && !loading">
    <v-row>
      <v-avatar>
        <img v-if="comment.photoURL" :src="comment.photoURL" />
        <v-icon v-else>mdi-account-circle</v-icon>
      </v-avatar>

      <h5 class="ma-2">{{comment.userName}}</h5>
      <p class="ma-2">{{comment.date | date}}</p>
      <p class="ma-2">{{comment.comment}}</p>
    </v-row>
    <v-btn v-if="!replying && user" @click="replying = true">Reply</v-btn>
    <v-btn v-if="!loadReplies" @click="loadReplies = true">Load Replies</v-btn>
    <v-btn v-if="loadReplies" @click="loadReplies = false">Close Replies</v-btn>
    <comment-input
      v-if="replying"
      @send="(replyObj) => onSend(replyObj)"
      @cancel="replying = false"
      :post="post"
    ></comment-input>
    <div v-if="loadReplies" class="ml-4">
      <reply
        v-for="reply in replies"
        :key="reply.id"
        :id="reply.id"
        :post="post"
        :commentId="id"
        @send="(replyObj) => onSend(replyObj)"
      ></reply>
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
    loading() {
      return this.$store.getters.loading;
    },
    comment() {
      return this.$store.getters.comment(this.id);
    },
    replies() {
      return this.$store.getters.replies(this.id);
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    onSend(replyObj) {
      replyObj.commentId = this.comment.id;
      this.$emit("send", replyObj);
    },
  },
};
</script>
