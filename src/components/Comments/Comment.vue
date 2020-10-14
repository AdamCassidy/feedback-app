<template>
<v-container v-if="comment && !loading">
    <v-row class="ms-2">
        <v-avatar>
            <img v-if="comment.photoURL" :src="comment.photoURL" />
            <img v-else src="../../logo/logo.png" />
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
    <v-btn v-if="!replying && user && !userIsCreator" @click="replying = true">Reply</v-btn>
    <v-btn v-if="
        !loadReplies &&
        replies !== null &&
        replies !== undefined &&
        replies.length !== 0
      " @click="loadReplies = true">Load Replies</v-btn>
    <v-btn v-if="loadReplies" @click="loadReplies = false">Close Replies</v-btn>
    <template v-if="userIsCreator">
        <edit-comment-dialog :comment="comment"></edit-comment-dialog>
    </template>
    <comment-input v-if="replying" @send="(replyObj) => onSend(replyObj)" @cancel="replying = false" :post="post" messageType="Reply"></comment-input>
    <div v-if="loadReplies" class="ml-4">
        <reply v-for="reply in replies" :key="reply.id" :id="reply.id" :post="post" :comment="comment" :reply="reply" :commentId="id" @send="(replyObj) => onSend(replyObj)"></reply>
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
};
</script>
