<template>
<v-container>
    <h1 style="font-size: 37px">
        <router-link to="/" tag="span" style="cursor: pointer; color: #701487">
            <v-avatar class="mb-1"> <img src="../logo/logo.png" /> </v-avatar>nd
            Opinion
        </router-link>
    </h1>

    <v-divider></v-divider>
    <h3>Home Projects</h3>
    <v-divider></v-divider>
    <v-row>
        <v-col>
            <v-progress-circular v-if="loading" :size="50" indeterminate color="primary"></v-progress-circular>
        </v-col>
    </v-row>
    <v-row v-if="!loading" justify="center">
        <v-col v-for="post in posts" :key="post.id" cols="12">
            <v-card :to="'./' + post.id" style="cursor: pointer">
                <v-row v-if="post.imageURL !== undefined && post.imageURL !== null" class="text-start">
                    <v-col xs="5" sm="4" md="3">
                        <v-img :src="post.imageURL" max-height="150"></v-img>
                    </v-col>
                    <v-col xs="7" sm="8" md="9">
                        <v-card-title class="bold" style="font-size: 2.3rem; cursor: pointer; word-break: normal">{{ post.title }}</v-card-title>

                        <p class="ms-4">{{ post.date | date }}</p>

                        <div class="ms-2">
                            <v-chip v-for="tag in post.tags" :key="tag.key" color="#701487" class="ma-2" text-color="white">{{ tag }}</v-chip>
                        </div>
                    </v-col>
                </v-row>
                <v-row v-else class="text-start">
                    <v-col>
                        <v-card-title class="bold" style="font-size: 2.3rem; cursor: pointer; word-break: normal">{{ post.title }}</v-card-title>

                        <p class="ms-4">{{ post.date | date }}</p>
                        <div class="ms-2">
                            <v-chip v-for="tag in post.tags" :key="tag.key" color="#701487" class="ma-2" text-color="white">{{ tag }}</v-chip>
                        </div>
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
    <div v-observe-visibility="loadPosts"></div>
</v-container>
</template>

<script>
export default {
    computed: {
        posts() {
            return this.$store.getters.categorizedPosts("Home Projects");
        },
        loading() {
            return this.$store.getters.loading;
        },
    },
    created() {
        if (
            this.posts === null ||
            this.posts === undefined ||
            this.posts.length === 0
        ) {
            this.$store.dispatch("loadPosts");
        }
    },
};
</script>
