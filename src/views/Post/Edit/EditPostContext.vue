<template>
<v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs}">
        <v-btn fab v-bind="attrs" v-on="on">
            <v-icon>edit</v-icon>
        </v-btn>
    </template>
    <v-card>
        <v-card-title>Are you sure you want to edit this post?</v-card-title>
        <v-card-actions>
            <v-btn type="submit">Edit</v-btn>
            <v-btn type="cancel">Cancel</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>
