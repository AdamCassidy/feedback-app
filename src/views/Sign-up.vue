<template>
  <div class="signUp">
    <h1>Sign-up</h1>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-text>
              <v-container>
                <form>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="name"
                        :error-messages="nameErrors"
                        label="Name"
                        required
                        type="name"
                      ></v-text-field>
                      <v-text-field
                        v-model="email"
                        :error-messages="emailErrors"
                        label="E-mail"
                        required
                        type="email"
                      ></v-text-field>
                      <v-text-field
                        v-model="password"
                        :error-messages="passwordErrors"
                        label="Password"
                        required
                        type="password"
                      ></v-text-field>
                      <v-text-field
                        v-model="confirmPassword"
                        :error-messages="confirmPasswordErrors"
                        label="Confirm Password"
                        required
                        type="password"
                        :rules="[passwordVerified]"
                      ></v-text-field>
                      <v-btn @click="submit" right>Submit</v-btn>
                      <v-btn @click="clear" left>Clear</v-btn>
                    </v-col>
                  </v-row>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
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
    passwordVerified() {
      return this.password != this.confirmPassword
        ? "Passwords do not match"
        : "";
    },
  },
  methods: {
    addToStore() {
      });
    },
  },
};
</script>