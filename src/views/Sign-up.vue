<template>
  <div class="signUp">
    <form>
      <h1>Sign-up</h1>
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
        label="E=mail"
        required
        @input="v.email.$touch()"
        @blur="v.email.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Normal with hint text"
        hint="At least 8 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
      <v-btn @click="submit">Submit</v-btn>
      <v-btn @click="clear">Clear</v-btn>
    </form>
  </div>
</template>