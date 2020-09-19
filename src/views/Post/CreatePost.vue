<template>
  <v-app>
    <v-container>
      <h1>Create Post</h1>
    </v-container>
    <v-container>
      <v-row v-if="authError">
        <v-col>
          <authError-alert @dismissed="onDismissed" :text="authError.message"></authError-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-card>
            <v-card-text>
              <v-container>
                <form @submit.prevent="onCreatePost">
                  <v-row>
                    <v-col>
                      <v-text-field v-model="title" label="Title" single-line required></v-text-field>
                      <v-textarea v-model="context" label="Context" auto-grow></v-textarea>
                      <div class="text-center">
                        <v-menu open-on-hover>
                          <template v-slot:activator="{ on }">
                            <v-btn v-on="on">Category</v-btn>
                          </template>
                          <v-list>
                            <v-list-item
                              v-for="item in categories"
                              :key="item.key"
                              @click="onCategoryPick(item.title)"
                            >
                              <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                              </v-list-item-icon>
                              <v-list-item-title>{{ item.title}}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>
                      <h5 v-if="categoryPicked">{{ category }}</h5>
                      <v-file-input
                        v-model="image"
                        label="Upload Image"
                        outlined
                        prepend-icon="image"
                        accept="image/*"
                        @change="onFilePicked"
                      ></v-file-input>
                      <v-img :src="imageURL"></v-img>
                      <v-btn type="submit" :loading="loading" :disabled="!validForm || loading">
                        Create Post
                        <template v-slot:loader>
                          <span class="custom-loader">
                            <v-icon light>cached</v-icon>
                          </span>
                        </template>
                      </v-btn>
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
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      context: "",
      image: null,
      imageURL: "",
      category: "",
      categories: [
        {
          icon: "house",
          title: "Home Projects",
        },
        {
          icon: "sports_basketball",
          title: "Sports",
        },
        {
          icon: "restaurant",
          title: "Cooking",
        },
        {
          icon: "drive_eta",
          title: "Automotive",
        },
      ],
      categoryPicked: false,
    };
  },

  computed: {
    validForm() {
      return (
        this.title != "" && this.context != "" && this.image != null //&&
        //this.categoryPicked
      );
    },
    loading() {
      return this.$store.getters.loading;
    },
    authError() {
      return this.$store.getters.authError;
    },
  },

  methods: {
    onCreatePost() {
      if (!this.validForm) {
        return;
      }
      const postData = {
        title: this.title,
        context: this.context,
        image: this.image,
        date: new Date(),
        category: "placeholder",
      };

      this.$store.dispatch("createPost", postData).then((postId) => {
        this.$router.push("/" + postId);
        return;
      });
    },
    onDismissed() {
      this.$store.dispatch("clearAuthError");
    },
    onFilePicked() {
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageURL = fileReader.result;
      });
      fileReader.readAsDataURL(this.image);
    },
    onCategoryPicked(itemTitle) {
      this.categoryPicked = true;
      this.category = itemTitle;
    },
  },
};
</script>
