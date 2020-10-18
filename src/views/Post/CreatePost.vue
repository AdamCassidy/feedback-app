<template>
<v-container>
    <v-container>
        <h1>Create Post</h1>
    </v-container>
    <v-container>
        <v-row v-if="authError">
            <v-col>
                <AuthErrorAlert @dismissed="onDismissed" :text="authError.message"></AuthErrorAlert>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onCreatePost">
                                <v-row>
                                    <v-col>
                                        <v-text-field v-model="title" label="Title" single-line required></v-text-field>
                                        <v-textarea v-model="context" label="Context" auto-grow></v-textarea>
                                        <div class="text-start">
                                            <v-select v-model="tagsPicked" value="tags" :items="tags" label="Tags" multiple outlined></v-select>
                                        </div>
                                        <v-file-input v-model="image" label="Upload Image" outlined prepend-icon="image" accept="image/*" @change="onFilePick"></v-file-input>
                                        <v-img :src="imageURL" max-height="400" contain></v-img>
                                        <v-checkbox v-model="displayUser" label="Show my username with this post">
                                        </v-checkbox>
                                        <v-btn type="submit" :loading="loading" :disabled="!validForm || loading">
                                            Create Post
                                            <template v-slot:loader>
                                                <span class="custom-loader">
                                                    <v-icon light>cached</v-icon>
                                                </span>
                                            </template>
                                        </v-btn>
                                        <v-btn type="clear">Clear</v-btn>
                                    </v-col>
                                </v-row>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</v-container>
</template>

<script>
export default {
    data() {
        return {
            title: "",
            context: "",
            image: null,
            imageURL: "",
            tags: ["Home Projects", "Automotive", "Sports", "Cooking"],
            tagPicked: false,
            tagsPicked: [],
            postId: "",
            displayUser: false,
        };
    },

    computed: {
        validForm() {
            return this.title !== "" && this.context !== "";
        },
        loading() {
            return this.$store.getters.loading;
        },
        authError() {
            return this.$store.getters.authError;
        },
        tagTitles() {
            let titles, tag;

            for (tag in this.tags) {
                titles.append(tag.title);
            }

            return titles;
        },
        user() {
            return this.$store.getters.user;
        },
    },
    watch: {
        postId(value) {
            if (value !== null && value !== undefined) {
                this.$router.push("/posts/" + value);
            }
        },
    },

    methods: {
        onCreatePost() {
            if (!this.validForm) {
                return;
            }
            const postData = {
                title: this.title,
                context: this.context,
                image: this.image,
                date: new Date(),
                displayUser: this.displayUser,
            };

            if (this.tagsPicked !== undefined && this.tagsPicked !== null) {
                postData.tags = this.tagsPicked;
            } else {
                postData.tags = [];
            }

            if (this.user !== null && this.user !== undefined) {
                this.$store.dispatch("createPost", postData).then((postId) => {
                    this.postId = postId;
                });
            } else {
                this.$router.push("/signin");
            }
        },
        onDismissed() {
            this.$store.dispatch("clearAuthError");
        },
        onFilePick() {
            const fileReader = new FileReader();
            fileReader.addEventListener("load", () => {
                this.imageURL = fileReader.result;
            });
            fileReader.readAsDataURL(this.image);
        },
    },
    components: {

        AuthErrorAlert: () =>
            import( /* webpackChunkName: "AuthErrorAlert" */ "../../components/Alert.vue"),
    }
};
</script>
