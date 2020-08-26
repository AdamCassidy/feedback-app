<template>
  <div class="signUp">
    <h1>Sign-up</h1>
    <v-container>
      <v-row>
        <v-flex>
          <v-card>
            <v-card-text>
              <v-container>
                <form @submit.prevent="addToUsers">
                  <v-row>
                    <v-flex>
                      <v-text-field v-model="name" label="Name" required type="name"></v-text-field>
                      <v-text-field v-model="email" label="E-mail" required type="email"></v-text-field>
                      <v-text-field v-model="password" label="Password" required type="password"></v-text-field>
                      <v-text-field
                        v-model="confirmPassword"
                        label="Confirm Password"
                        required
                        type="password"
                        :rules="[passwordVerified]"
                      ></v-text-field>
                      <v-btn type="submit">Submit</v-btn>
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
    passwordVerified() {
      return this.password != this.confirmPassword
        ? "Passwords do not match"
        : "";
    },
  },
  methods: {
    addToUsers() {
      console.log({
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        date: new Date(),
      });
    },
  },
};
</script>