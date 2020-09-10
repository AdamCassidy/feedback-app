<template>
<div v-if="comment">
    <div>{{ comment.comment }}</div>
    <v-btn v-if="!replying" @click="replying = true">Reply</v-btn>
    <v-btn v-if="!loadReplies" @click="loadReplies = true">Load Replies</v-btn>
    <v-btn v-if="loadReplies" @click="loadReplies = false">Close Replies</v-btn>
    <comment-input v-if="replying" @send="(replyObj) => onSend(replyObj)" @cancel="replying = false"></comment-input>
    <div v-if="loadReplies" class="ml-2">
        <reply v-for="reply in replies" :key="reply.id"></reply>
    </div>
</div>
</template>

<script>
export default {
    props: {
        comment: {
            type: Object,
        },
    },
    data() {
        return {
            replying: false,
            loadReplies: false,
        };
    },
    computed: {
        replies: function () {
            if (this.comment) {
                return this.$store.getters.replies(
                    this.comment.postId,
                    this.comment.id
                );
            }
            return [];
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
