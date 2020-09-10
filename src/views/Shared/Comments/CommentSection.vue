<template>
<div v-if="post">
    <comment-input @send="(commentObj) => onSend(commentObj)" :post="post"></comment-input>
    <div v-if="comments">
        <comment v-for="comment in comments" :key="comment.id" v-bind:comment="comment" @send="(replyObj) => onReplySend(replyObj)"></comment>
    </div>
</div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
        },
    },
    computed: {
        comments: function () {
            if (this.post) {
                return this.$store.getters.comments(this.post.id);
            }
            return [];
        },
    },
    methods: {
        onSend(commentObj) {
            console.log(commentObj);
            this.$store.dispatch("createComment", commentObj);
        },
        onReplySend(replyObj) {
            replyObj.postId = this.post.id;
            this.$store.dispatch("createReply", replyObj);
        },
    },
};
</script>
