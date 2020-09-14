<template>
<div class="text-center">
    <v-dialog width="350px">
        <template v-slot:activator="{ on }">
            <v-btn fab v-on="on">
                <v-icon>edit</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>Edit Post</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-text-field v-model="editedTitle"></v-text-field>
                <v-divider></v-divider>
                <v-text-field v-model="editedContext"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn>Cancel</v-btn>
                <v-btn type="save" @click="onSave">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    props: ["post"],
    data() {
        return {
            dialog: false,
            editedTitle: this.post.title,
            editedContext: this.post.context,
        };
    },
    methods: {
        onSave() {
            this.dialog = false;
            var editedObj = {
                title: this.editedTitle.trim(),
                context: this.editedContext.trim(),
            };
            this.$store.dispatch("updatePost", editedObj);
        },
    },
};
</script>
