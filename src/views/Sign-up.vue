<template>
  <div class="signUp">
    <h1>Sign-up</h1>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-text>
              <v-container>
                <form @submit.prevent="addToStore">
                  <v-row>
                    <v-col>
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
      console.log({
        name: this.name,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      });
    },
  },
};
</script>