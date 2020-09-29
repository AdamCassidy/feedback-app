<template>
  <v-container>
    <v-container>
      <h1>Sign up</h1>
    </v-container>
    <v-container>
      <v-row v-if="authError">
        <v-col>
          <authError-alert
            @dismissed="onDismissed"
            :text="authError.message"
          ></authError-alert>
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
                      <v-text-field
                        v-model="name"
                        label="Name"
                        required
                        type="name"
                      ></v-text-field>
                      <v-text-field
                        v-model="email"
                        label="E-mail"
                        required
                        type="email"
                      ></v-text-field>
                      <v-text-field
                        v-model="password"
                        label="Password"
                        required
                        type="password"
                      ></v-text-field>
                      <v-text-field
                        v-model="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        :rules="[comparePasswords]"
                      ></v-text-field>
                      <v-row cols="12">
                        <v-col xs="5" sm="4" lg="3">
                          <v-avatar size="200px">
                            <img
                              v-if="image !== null && image !== undefined"
                              :src="imageURL"
                            />
                            <img v-else src="../../logo/logo.png" />
                          </v-avatar>
                        </v-col>
                        <v-col xs="7" sm="8" lg="9">
                          <v-file-input
                            class="ma-2"
                            v-model="image"
                            label="Upload Avatar"
                            persistent-hint
                            hint="Optional"
                            outlined
                            prepend-icon="mdi-camera"
                            accept="image/*"
                            @change="onFilePick"
                          ></v-file-input>
                        </v-col>
                      </v-row>

                      <v-btn
                        type="submit"
                        :loading="loading"
                        :disabled="loading"
                      >
                        Sign Up
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
        this.comparePasswords === "" &&
        this.name !== "" &&
        this.password !== "" &&
        this.confirmPassword !== "" &&
        this.email !== ""
      );
    },
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Passwords do not match"
        : "";
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
    onFilePick() {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageURL = fileReader.result;
      });
      fileReader.readAsDataURL(this.image);
    },
  },
};
</script>
