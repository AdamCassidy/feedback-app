<template>
<v-container>
    <h1 style="font-size: 37px">
        <router-link to="/" tag="span" style="cursor: pointer; color: #701487">
            <v-avatar class="mb-1"> <img src="../logo/logo.png" /> </v-avatar>nd
            Opinion
        </router-link>
    </h1>
    <v-row v-if="loading">
        <v-col>
            <v-progress-circular v-if="loading" :size="50" indeterminate color="primary"></v-progress-circular>
        </v-col>
    </v-row>
    <v-parallax v-else class="mt-4" src="../assets/sunglassesWelcome.jpg">
        <v-row></v-row>
        <v-row class="mb-20" justify="center">
            <v-col>
                <h2 class="white--text">See through a different lens<br /></h2>
                <p class="white--text" style="font-size: 14px">
                    A forum to gather opinions on whatever you share<br />
                </p>
                <v-btn v-if="!userIsAuthenticated" class="secondary" to="/signup">Join</v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>
        <v-row></v-row>
    </v-parallax>
</v-container>
</template>

<script>
export default {
    computed: {
        loading() {
            return this.$store.getters.loading;
        },
        userIsAuthenticated() {
            return (
                this.$store.getters.user !== null &&
                this.$store.getters.user !== undefined
            );
        },
    },
};
</script>
