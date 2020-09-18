<template>
<div v-if="reply && !loading" class="ml-4">
    <p>{{ reply.reply }}</p>
    <v-btn v-if="!replying" @click="replying = true">Reply</v-btn>
    <comment-input v-if="replying" @send="(replyObj) => onSend(replyObj)" @cancel="replying = false" :post="post"></comment-input>
</div>
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
