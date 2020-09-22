<template>
<v-dialog width="400px" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
        <v-btn fab v-bind="attrs" v-on="on" @click="dialog = true">
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
            <div class="text-start">
                <v-select v-model="tagsPicked" value="post.tags" :items="tags" chips label="Tags" multiple outlined></v-select>
            </div>
            <v-btn @click="dialog = false">Cancel</v-btn>
            <v-btn @click="onSave">Save</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    props: ["post"],
    data() {
        return {
            tags: ["Home Projects", "Sports", "Cooking", "Automotive"],
            tagsPicked: this.post.tags,
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
                id: this.post.id,
                tags: this.tagsPicked,
            };
            this.$store.dispatch("updatePost", editedObj);
        },
    },
};
</script>
