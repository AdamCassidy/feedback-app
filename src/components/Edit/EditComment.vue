<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" @click="dialog = true"> Edit </v-btn>
    </template>
    <v-card>
      <v-card-title>Edit Comment</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field v-model="editedComment"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="onDelete">Delete Comment</v-btn>
        <v-btn class="ms-2" @click="dialog = false">Cancel</v-btn>
        <v-btn @click="onSave">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["comment"],
  data() {
    return {
      dialog: false,
      editedComment: this.comment.comment,
    };
  },
  methods: {
    onSave() {
      this.dialog = false;
      let editedObj = {
        comment: this.editedComment.trim(),
        id: this.comment.id,
      };
      this.$store.dispatch("updateComment", editedObj);
    },
    onDelete() {
      this.dialog = false;
      this.$store.dispatch("deleteComment", this.comment);
    },
  },
};
</script>
