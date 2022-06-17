<template>
  <div>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>List of topics</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in getTopicList" :key="item.id" link>
          <v-list-item-content>
            <v-list-item-title @click="selectTopicName(item)">{{
              item.title ? item.title : "No title found"
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "NavigationDrawer",
  props: {
    openNavigation: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      drawer: null,
    };
  },
  async created() {
    try {
      const response = await this.$store.dispatch("fetchTopics");
      this.$store.state.setTopicName = response[0]?.title;
      this.$store.state.setDescription = response[0]?.description;

      if (!response) {
        this.$store.state.errorMessage =
          response?.data?.errors[0] || `Sorry we couldn't find any topics.`;
      }
    } catch (error) {
      this.$store.state.errorMessage =
        response?.data?.errors[0] || `Sorry we couldn't find any topics.`;
    }
  },
  computed: {
    getTopicList() {
      return this.$store.state.topics;
    },
  },
  methods: {
    isDrawerShowing() {
      this.drawer = !this.drawer;
    },
    selectTopicName(item) {
      this.$store.state.searchValue = item.slug;
      this.$store.state.setDescription = item.description;
      this.getNewPhotos(item.slug);
    },
    async getNewPhotos(topicSlug) {
      this.$store.state.isLoading = true;
      this.$store.state.isOverlay = true;
      try {
        const response = await this.$store.dispatch("fetchPhotos", topicSlug);
        if (response) {
          for (let i = 0; i < response.length; i++) {
            const imageUrl = response[i];
            this.$store.commit("SET_NEW_PHOTO_LIST", imageUrl);
          }
        } else {
          this.$store.state.errorMessage =
            response?.data?.errors[0] || `Sorry we couldn't find any topics.`;
        }

        this.$store.state.isLoading = false;
      } catch (error) {
        this.$store.state.isLoading = false;
        this.$store.state.errorMessage =
          response?.data?.errors[0] || `Sorry we couldn't find any topics.`;
      }
    },
  },
};
</script>

<style scoped>
.v-navigation-drawer--temporary {
  z-index: 10;
}
</style>
