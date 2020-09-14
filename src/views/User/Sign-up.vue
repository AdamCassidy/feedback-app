<template>
  <div class="signUp">
    <v-container>
      <h1>Sign up</h1>
    </v-container>
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
                <form @submit.prevent="onSignUp">
                  <v-row>
                    <v-flex>
                      <v-text-field v-model="name" label="Name" required type="name"></v-text-field>
                      <v-text-field v-model="email" label="E-mail" required type="email"></v-text-field>
                      <v-text-field v-model="password" label="Password" required type="password"></v-text-field>
                      <v-text-field
                        v-model="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        :rules="[comparePasswords]"
                      ></v-text-field>
                      <v-btn type="submit" :loading="loading" :disabled="loading">
                        Sign Up
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
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  computed: {
    comparePasswords() {
      return this.password != this.confirmPassword
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
        email: this.email,
        password: this.password,
      });
    },
    onDismissed() {
      this.$store.dispatch("clearAuthError");
    },
  },
};
</script>