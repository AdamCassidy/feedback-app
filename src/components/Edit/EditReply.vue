<template>
<v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" @click="dialog = true"> Edit </v-btn>
    </template>
    <v-card>
        <v-card-title>Edit Reply</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <v-text-field v-model="editedReply"></v-text-field>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="onDelete">Delete Reply</v-btn>
            <v-btn class="ms-2" @click="dialog = false">Cancel</v-btn>
            <v-btn @click="onSave">Save</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
export default {
    props: ["reply"],
    data() {
        return {
            dialog: false,
            editedReply: this.reply.reply,
        };
    },
    methods: {
        onSave() {
            this.dialog = false;
            var editedObj = {
                reply: this.editedReply.trim(),
                id: this.reply.id,
            };
            this.$store.dispatch("updateReply", editedObj);
        },
        onDelete() {
            this.dialog = false;
            this.$store.dispatch("deleteReply", this.reply);
        },
    },
};
</script>
