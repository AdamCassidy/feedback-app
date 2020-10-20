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
    <v-parallax v-else class="mt-4" :src="picURLs.about">
        <v-row></v-row>
        <v-row class="mb-20" justify="center">
            <v-col>
                <h2 class="white--text">See through a different lens<br /></h2>
                <p class="white--text" style="font-size: 14px">
                    A forum to gather opinions on whatever you post<br />
                </p>
                <v-btn v-if="!userIsAuthenticated" class="secondary" to="/signup">Join</v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>
        <v-row></v-row>
    </v-parallax>
    <v-row v-if="!loading" justify="center">
        <v-col cols="12">
            <v-banner color="gradient">
                <v-row justify="center">
                    <h3 class="white--text mt-6">Share:&nbsp;&nbsp;</h3>

                    <v-btn v-for="item in shareItems" color="secondary" :key="item.key" fab class="ma-2" transistion="scroll - y - reverse - transition">
                        <a :href="item.link">
                            <v-icon color="white">{{ item.icon }}</v-icon>
                        </a>
                    </v-btn>
                </v-row>
            </v-banner>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
export default {
    data: () => {
        return {
            shareItems: [{
                    icon: "mdi-facebook",
                    link: "https://www.facebook.com/2ndOpinionForum/",
                    color: "#3b5998",
                },
                {
                    icon: "mdi-twitter",
                    link: "https://twitter.com/intent/tweet?text=Check%20out%20this%20forum.&url=https%3a%2f%2fsecondopinionforum.com",
                    color: "#00acee",
                },
                {
                    icon: "mdi-reddit",
                    link: "https://www.reddit.com/submit?title=Check%20out%20this%20forum.%20&url=https%3A%2F%2Fsecondopinionforum.com",
                    color: "#FF4500",
                },
                {
                    icon: "mdi-whatsapp",
                    link: "https://wa.me/?text=Check%20out%20this%20forum.%20https%3A%2F%2Fsecondopinionforum.com",
                    color: "#25d366",
                },
            ],
        };
    },
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
        picURLs() {
            return this.$store.getters.picURLs;
        },
    },
    created() {
        this.$store.dispatch("getAboutPicURL");
    },
};
</script>

<style lang="scss">
@mixin gradient($start-color, $end-color, $orientation) {
    background: $start-color;

    @if $orientation=="vertical" {
        background: -webkit-linear-gradient(top, $start-color, $end-color);
        background: linear-gradient(to bottom, $start-color, $end-color);
    }

    @else if $orientation=="horizontal" {
        background: -webkit-linear-gradient(left, $start-color, $end-color);
        background: linear-gradient(to right, $start-color, $end-color);
    }

    @else {
        background: -webkit-radial-gradient(center,
                ellipse cover,
                $start-color,
                $end-color);
        background: radial-gradient(ellipse at center, $start-color, $end-color);
    }
}

.gradient {
    @include gradient(#701487, #bbc919, horizontal);
}
</style>
