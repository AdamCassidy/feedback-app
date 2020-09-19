<template>
<v-app>
    <v-container>
        <h1 style="font-size: 37px">Second Opinion</h1>
    </v-container>
    <v-row justify="center">
        <v-col v-for="post in posts" :key="post.id" cols="10">
            <v-card>
                <v-row>
                    <v-col xs="4" sm="3" md="2">
                        <v-img :src="post.imageURL"></v-img>
                    </v-col>
                    <v-col xs="6" sm="7" md="8">
                        <v-card-title class="bold" style="font-size: 2.3rem" justify="start">{{post.title}}</v-card-title>
                        <v-card-title justify="start">{{post.date | date}}</v-card-title>
                        <v-card-actions>
                            <v-btn :to="'./' + post.id">
                                <v-icon left>arrow_forward</v-icon>View
                            </v-btn>
                        </v-card-actions>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</v-app>
</template>

<script>
export default {
    computed: {
        posts() {
            return this.$store.getters.posts;
        },
    },
};
</script>
