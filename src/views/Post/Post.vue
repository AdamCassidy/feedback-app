<template>
<v-container>
    <v-row v-if="!loading && post">
        <v-col>
            <v-card>
                <v-row>
                    <v-col>
                        <v-card-title>
                            <h1>{{post.title}}</h1>
                            <template v-if="userIsCreator">
                                <v-spacer></v-spacer>
                                <edit-post-dialog :post="post"></edit-post-dialog>
                            </template>
                        </v-card-title>

                        <v-card-text class="text-start" style="font-size: 1.3rem">{{post.date | date}}</v-card-text>
                        <v-card-text class="text-start" style="font-size: 1.3rem">{{post.context}}</v-card-text>
                        <v-img style="margin: 25px;" :src="post.imageURL"></v-img>
                        <comment-section :post="post"></comment-section>
                    </v-col>
                </v-row>
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

<style lang="scss">
.hidden {
    visibility: hidden;
}
</style>
