<template>
<div v-if="reply">
    <div>{{ reply.comment }}</div>
    <v-btn v-if="!replying" @click="replying = true">Reply</v-btn>
    <comment-input v-if="replying" @send="(replyObj) => onSend(replyObj)" @cancel="replying = false"></comment-input>
</div>
</template>

<script>
export default {
    props: {
        comment: {
            type: Object,
        },
        reply: {
            type: Object,
        },
    },
    data() {
        return {
            replying: false,
        };
    },
    methods: {
        onSend(replyObj) {
            replyObj.commentId = this.comment.id;
            this.$emit("send", replyObj);
        },
    },
};
</script>
