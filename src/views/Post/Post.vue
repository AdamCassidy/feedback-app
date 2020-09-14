<template>
<v-container>
    <v-row v-if="!loading && post">
        <edit-post-dialog :post="post"></edit-post-dialog>
        <v-col>
            <v-card>
                <v-row>
                    <v-col>
                        <v-card-title class="headline" v-text="post.title"></v-card-title>
                        <v-card-subtitle>{{ post.date | date }}</v-card-subtitle>
                        <v-card-text v-text="post.context"></v-card-text>
                    </v-col>
                    <v-col>
                        <v-card-title>
                            <template>
                                <v-spacer></v-spacer>
                                <edit-post-dialog :post="post"></edit-post-dialog>
                            </template>
                        </v-card-title>
                    </v-col>
                </v-row>
                <v-img :src="post.imageURL"></v-img>
                <comment-section :post="post"></comment-section>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    props: ["id"],
    computed: {
        loading() {
            return this.$store.getters.loading;
        },
        post() {
            return this.$store.getters.post(this.id);
        },
        userIsAuthenticated() {
            return (
                this.$store.getters.user !== null &&
                this.$store.getters.user !== undefined
            );
        },
        userIsCreator() {
            if (!this.userIsAuthenticated) {
                return false;
            }

            return this.$store.getters.user.id === this.post.creatorId;
        },
    },
};
</script>
