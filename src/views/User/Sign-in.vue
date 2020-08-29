<template>
  <div class="signIn">
    <h1>Sign in</h1>
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
                <form @submit.prevent="onSignIn">
                  <v-row>
                    <v-flex>
                      <v-text-field v-model="email" label="E-mail" required type="email"></v-text-field>
                      <v-text-field v-model="password" label="Password" required type="password"></v-text-field>
                      <v-btn type="submit" :loading="loading" :disabled="loading">
                        Sign In
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
      email: "",
      password: "",
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    loading() {
      return this.$store.getters.loading;
    },
    authError() {
      return this.$store.getters.authError;
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
    onSignIn() {
      this.$store.dispatch("signInUser", {
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