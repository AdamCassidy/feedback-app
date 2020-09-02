<template>
<div class="createPost">
    <h1>Create Post</h1>
    <v-container>
        <v-row v-if="authError">
            <v-flex>
                <authError-alert @dismissed="onDismissed" :text="authError.message"></authError-alert>
            </v-flex>
        </v-row>
        <v-row>
            <v-flex>
                <v-card>
                    <v-card-text>
                        <v-container>
                            <form @submit.prevent="onCreatePost">
                                <v-row>
                                    <v-flex>
                                        <v-text-field v-model="title" label="Title" single-line required></v-text-field>
                                        <v-textarea v-model="context" label="Context" auto-grow></v-textarea>
                                        <v-file-input v-model="image" label="Upload Image" outlined prepend-icon="image" accept="image/*" @change="onFilePicked"></v-file-input>
                                        <v-img :src="imageURL" aspect-ratio="1"></v-img>
                                        <v-btn type="submit" :loading="loading" :disabled="!validForm || loading">
                                            Create Post
                                            <template v-slot:loader>
                                                <span class="custom-loader">
                                                    <v-icon light>cached</v-icon>
                                                </span>
                                            </template>
                                        </v-btn>
                                        <v-btn type="clear">Clear</v-btn>
                                    </v-flex>
                                </v-row>
                            </form>
                        </v-container>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-row>
    </v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            title: "",
            context: "",
            image: null,
            imageURL: "",
        };
    },

    computed: {
        validForm() {
            return this.title != "" && this.context != "" && this.image != null;
        },
        loading() {
            return this.$store.getters.loading;
        },
        authError() {
            return this.$store.getters.authError;
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
            };

            this.$store.dispatch("createPost", postData);
        },
        onDismissed() {
            this.$store.dispatch("clearAuthError");
        },
        onFilePicked() {
            const fileReader = new FileReader();
            fileReader.addEventListener("load", () => {
                this.imageURL = fileReader.result;
            });
            fileReader.readAsDataURL(this.image);
        },
    },
};
</script>
