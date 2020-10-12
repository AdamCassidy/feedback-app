<template>
<v-app id="app">
    <v-app-bar app>
        <v-app-bar-nav-icon @click="openDrawer = !openDrawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-toolbar-items>
            <v-btn v-for="item in toolbarItems" :key="item.key" :to="item.link">
                <v-icon>{{ item.icon }}</v-icon>
                {{ item.title }}
            </v-btn>
            <v-btn v-if="userIsAuthenticated" @click="onSignOut">
                <v-icon>exit_to_app</v-icon>Sign out
            </v-btn>
        </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer v-model="openDrawer" temporary app>
        <h1 style="font-size: 27px">
            <v-avatar class="mb-2"> <img src="./logo/logo.png" /> </v-avatar>nd
            Opinion
        </h1>
        <v-list flat>
            <v-list-item-group>
                <v-list-item to="/">
                    <v-list-item-content class="text-start">
                        <v-list-item-icon>
                            <v-icon color="primary">pages</v-icon>
                            <v-list-item-title class="ms-6">All Posts</v-list-item-title>
                        </v-list-item-icon>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="userIsAuthenticated" :to="'/users/' + user.id">
                    <v-list-item-content class="text-start">
                        <v-list-item-icon>
                            <v-icon color="primary">account_box</v-icon>
                            <v-list-item-title class="ms-6">Your Posts</v-list-item-title>
                        </v-list-item-icon>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item to="/about">
                    <v-list-item-content class="text-start">
                        <v-list-item-icon>
                            <v-icon color="primary">subject</v-icon>
                            <v-list-item-title class="ms-6">About</v-list-item-title>
                        </v-list-item-icon>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item v-for="item in drawerItems" :key="item.key" :to="item.link">
                    <v-list-item-content class="text-start">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon" color="primary"></v-icon>
                            <v-list-item-title class="ms-6">{{
                  item.title
                }}</v-list-item-title>
                        </v-list-item-icon>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
    <v-main>
        <v-container fluid>
            <router-view></router-view>
        </v-container>
    </v-main>
    <v-footer>
        <v-row justify="center" no-gutters>
            <v-btn to="/" text>Home</v-btn>
            <v-btn to="/about" text>About</v-btn>
            <v-col cols="12">
                <v-btn v-for="media in socialMedia" :key="media.icon" text><a :href="media.link" style="text-decoration: none">
                        <v-icon> {{ media.icon }}</v-icon>
                    </a>
                </v-btn>
            </v-col>
            <v-col cols="12">
                <strong style="font-size: 11px">
                    <v-icon>copyright</v-icon>
                    2020 - Second Opinion Forum. All Rights Reserved.
                </strong>
            </v-col>
        </v-row>
    </v-footer>
</v-app>
</template>

<script>
export default {
    data: () => {
        return {
            openDrawer: false,
            toolTip: true,
            drawerItems: [{
                    icon: "house",
                    title: "Home Projects",
                    link: "/homeProjects",
                    color: "#ff4d4d",
                },
                {
                    icon: "drive_eta",
                    title: "Automotive",
                    link: "/automotive",
                    color: "#4d4dff",
                },
                {
                    icon: "sports_basketball",
                    title: "Sports",
                    link: "/sports",
                    color: "#ffad33",
                },
                {
                    icon: "restaurant",
                    title: "Cooking",
                    link: "/cooking",
                    color: "silver",
                },
            ],
            socialMedia: [{
                    icon: "mdi-gmail",
                    link: "https://mail.google.com/mail/?view=cm&fs=1&to=2ndopinionforum@gmail.com",
                },
                {
                    icon: "mdi-facebook",
                    link: "https://www.facebook.com/2ndOpinionForum/",
                    color: "#3b5998",
                },
                {
                    icon: "mdi-twitter",
                    link: "https://twitter.com/2ndForum",
                    color: "#00acee",
                },
                /*{
                                                                    icon: "mdi-linkedin",
                                                                    link: "",
                                                                    color: "#0e76a8",
                                                                },*/
            ],
        };
    },
    computed: {
        userIsAuthenticated() {
            return (
                this.$store.getters.user !== null &&
                this.$store.getters.user !== undefined
            );
        },
        toolbarItems() {
            let toolbarItems = [{
                icon: "post_add",
                title: "Create Post",
                link: "/new",
            }, ];
            if (!this.userIsAuthenticated) {
                toolbarItems = [{
                        icon: "person_add",
                        title: "Sign up",
                        link: "/signup",
                    },
                    {
                        icon: "lock_open",
                        title: "Sign in",
                        link: "/signin",
                    },
                ];
            }
            return toolbarItems;
        },
        user() {
            return this.$store.getters.user;
        },
    },
    watch: {
        $route(to) {
            document.title = to.meta.title || "2nd Opinion";
        },
    },
    methods: {
        onSignOut() {
            this.$store.dispatch("signOut");
        },
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #701487;
}

.custom-loader {
    animation: loader 1s infinite;
    display: flex;
}

@-moz-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@-webkit-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@-o-keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes loader {
    from {
        transform: rotate(0);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>
