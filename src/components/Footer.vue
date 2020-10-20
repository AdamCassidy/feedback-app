<template>
  <v-footer>
    <v-row justify="center" no-gutters>
      <v-btn to="/" text>Home</v-btn>
      <v-btn to="/about" text>About</v-btn>
      <v-col cols="12">
        <v-btn v-for="media in socialMedia" :key="media.icon" text
          ><a :href="media.link" style="text-decoration: none">
            <v-icon color="black"> {{ media.icon }}</v-icon>
          </a>
        </v-btn>
      </v-col>
      <v-col cols="12">
        <strong style="font-size: 11px">
          <v-icon>copyright</v-icon>
          2020 - Second Opinion Forum. All Rights Reserved.
        </strong>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
export default {
  data: () => {
    return {
      socialMedia: [
        {
          icon: "email",
          link: "mailto:2ndopinionforum@gmail.com",
        },
        {
          icon: "mdi-facebook",
          link: "https://www.facebook.com/2ndOpinionForum/",
          color: "#3b5998",
        },
        {
          icon: "mdi-twitter",
          link: "https://twitter.com/2ndForum",
          color: "#00acee",
        },
      ],
    };
  },
};
</script>