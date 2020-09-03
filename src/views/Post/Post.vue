<template>
<v-div>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-row>
                        <v-col>
                            <v-card-title class="headline" v-text="post.title"></v-card-title>
                            <v-card-subtitle>{{ post.date | date}}</v-card-subtitle>
                        </v-col>
                        <v-col>
                            <v-spacer></v-spacer>
                            <edit-post-context-dialog v-if="userIsCreator"></edit-post-context-dialog>
                        </v-col>
                    </v-row>
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
