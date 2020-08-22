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
                        @input="v.name.$touch()"
                        @blur="v.name.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="email"
                        :error-messages="emailErrors"
                        label="E-mail"
                        required
                        @input="v.email.$touch()"
                        @blur="v.email.$touch()"
                      ></v-text-field>
                      <v-text-field
                        v-model="password"
                        :error-messages="passwordErrors"
                        label="Password"
                        required
                        @input="v.password.$touch()"
                        @blur="v.password.$touch()"
                      ></v-text-field>
                      <v-btn @click="submit">Submit</v-btn>
                      <v-btn @click="clear">Clear</v-btn>
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
      show1: true,
    };
  },
};
</script>

