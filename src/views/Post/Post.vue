<template>
<v-div>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="headline" v-text="post.title"></v-card-title>
                    <v-card-subtitle v-text="post.date"></v-card-subtitle>
                    <v-img :src="post.imageURL"></v-img>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</v-div>
</template>

<script>
export default {
    props: ["id"],
    computed: {
        post() {
            return this.$store.getters.post(this.id);
        },
    },
};
</script>
