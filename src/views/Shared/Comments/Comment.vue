<template>
<div v-if="comment && !loading">
    <p>{{comment.comment}}</p>
    <v-btn v-if="!replying" @click="replying = true">Reply</v-btn>
    <v-btn v-if="!loadReplies" @click="loadReplies = true">Load Replies</v-btn>
    <v-btn v-if="loadReplies" @click="loadReplies = false">Close Replies</v-btn>
    <comment-input v-if="replying" @send="(replyObj) => onSend(replyObj)" @cancel="replying = false"></comment-input>
    <div v-if="loadReplies" class="ml-2">
        <reply v-for="reply in replies" :key="reply.id" :id="reply.id" :commentId="this.id"></reply>
    </div>
</div>
</template>

<script>
export default {
    props: {
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
    },
    methods: {
        onSend(replyObj) {
            replyObj.commentId = this.comment.id;
            this.$emit("send", replyObj);
        },
    },
};
</script>
