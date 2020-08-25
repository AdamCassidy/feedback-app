<template>
  <div class="signIn">
    <h1>Sign-in</h1>
    <v-container>
      <v-row>
        <v-flex>
          <v-card>
            <v-card-text>
              <v-container>
                <form @submit.prevent="correctPassword">
                  <v-row>
                    <v-flex>
                      <v-text-field v-model="email" label="E-mail" required type="email"></v-text-field>
                      <v-text-field v-model="password" label="Password" required type="password"></v-text-field>
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
      email: "",
      password: "",
    };
  },
  methods: {
    correctPassword() {
      return this.password != /*getUserId(this.email)*/ ""
        ? "Incorrect email or password"
        : "";
    },
  },
};
</script>