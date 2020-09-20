<template>
<v-container v-if="post && !loading">
    <v-text-field v-model="comment" label="Comment"></v-text-field>
    <v-btn v-if="$listeners['cancel']" @click="$emit('cancel')">Cancel</v-btn>
    <v-btn @click="onSubmit">Submit</v-btn>
</v-container>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            comment: "",
        };
    },
    computed: {
        loading() {
            return this.$store.getters.loading;
        },
    },
    methods: {
        onSubmit() {
            const date = new Date();
            const commentObj = {
                date: date,
                comment: this.comment,
                postId: this.post.id,
            };
            this.$emit("send", commentObj);
        },
    },
};
</script>
