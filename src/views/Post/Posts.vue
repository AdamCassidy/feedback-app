<template>
<v-container>
    <v-row>
        <v-col v-for="post in posts" :key="post.id" cols="12">
            <v-card>
                <v-row>
                    <v-col>
                        <v-img :src="post.imageURL" width="200" height="200"></v-img>
                    </v-col>
                    <v-col>
                        <v-card-title class="headline" v-text="post.title"></v-card-title>
                        <v-card-subtitle v-text="post.date"></v-card-subtitle>
                        <v-card-actions>
                            <v-btn :to="'./post/' + post.id">
                                <v-icon left>arrow_forward</v-icon>View
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    computed: {
        posts() {
            /*if (this.$store.getters.user) {
                                    this.$store.dispatch("getPosts");
                                    }*/
            return this.$store.getters.posts;
        },
    },
};
</script>
