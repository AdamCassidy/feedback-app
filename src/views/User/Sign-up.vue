<template>
<v-container>
    <v-container>
        <h1>Sign up</h1>
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
                            <form @submit.prevent="onSignUp">
                                <v-row>
                                    <v-col>
                                        <v-text-field v-model="name" label="Name" required type="name"></v-text-field>
                                        <v-text-field v-model="email" label="E-mail" required type="email"></v-text-field>
                                        <v-text-field v-model="password" label="Password" required type="password"></v-text-field>
                                        <v-text-field v-model="confirmPassword" label="Confirm Password" type="password" :rules="[comparePasswords || 'Passwords do not match.']"></v-text-field>
                                        <v-row cols="12">
                                            <v-col xs="5" sm="4" lg="3">
                                                <v-avatar size="200px">
                                                    <img v-if="image !== null && image !== undefined" :src="transformImg(imageURL)" />
                                                    <img v-if="
                                (image === null || image === undefined) &&
                                webpSupported
                              " src="../../logo/logo.webp" />
                                                    <img v-if="
                                (image === null || image === undefined) &&
                                !webpSupported
                              " src="../../logo/logo.png" />
                                                </v-avatar>
                                            </v-col>
                                            <v-col xs="7" sm="8" lg="9">
                                                <v-file-input class="ma-2" v-model="image" label="Upload Avatar" persistent-hint hint="Optional" outlined prepend-icon="mdi-camera" accept="image/*" @change="onFilePick"></v-file-input>
                                            </v-col>
                                        </v-row>
                                        <v-row v-if="authError">
                                            <v-col>
                                                <AuthErrorAlert @dismissed="onDismissed" :text="authError.message"></AuthErrorAlert>
                                            </v-col>
                                        </v-row>
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
            webpSupported: true,

            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            image: null,
            imageURL: "",
        };
    },
    computed: {
        validForm() {
            return (
                this.comparePasswords &&
                this.name !== "" &&
                this.password !== "" &&
                this.confirmPassword !== "" &&
                this.email !== ""
            );
        },
        comparePasswords() {
            return this.password === this.confirmPassword;
        },
        authError() {
            return this.$store.getters.authError;
        },
        user() {
            return this.$store.getters.user;
        },
        loading() {
            return this.$store.getters.loading;
        },
    },
    watch: {
        user(value) {
            if (value !== undefined && value !== null) {
                this.$router.push("/");
            }
        },
    },
    methods: {
        transformImg(url) {
            if (this.webpSupported) {
                return url.replace(/\.\w{1,5}$/, ".webp");
            } else {
                return url;
            }
        },
        onSignUp() {
            this.$store.dispatch("createUser", {
                name: this.name,
                email: this.email,
                password: this.password,
                image: this.image,
            });
        },

        onDismissed() {
            this.$store.dispatch("clearAuthError");
        },
    },
    components: {
        AuthErrorAlert: () =>
            import(
                /* webpackChunkName: "AuthErrorAlert" */
                "../../components/Alert.vue"
            ),
    },
    created() {
        async () => {
            if (!self.createImageBitmap) {
                this.webpSupported = false;
                return false;
            }

            const webpData =
                "data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=";
            const blob = await fetch(webpData).then((r) => r.blob());
            this.webpSupported = await createImageBitmap(blob).then(
                () => true,
                () => false
            );
        };
    },
};
</script>
