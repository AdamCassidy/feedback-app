
<template>
  <v-div>
    <v-container>
      <v-row>
        <v-flex>
          <v-card>
            <v-card-title class="headline" v-text="post.title"></v-card-title>
            <v-card-subtitle v-text="post.date"></v-card-subtitle>
            <v-card-media :src="post.src"></v-card-media>
          </v-card>
        </v-flex>
      </v-row>
    </v-container>
  </v-div>
</template>