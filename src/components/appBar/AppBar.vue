<template>
  <div>
    <v-card class="overflow-hidden">
      <v-app-bar absolute color="teal lighten-3" dark hide-on-scroll prominent>
        <v-app-bar-nav-icon @click="handleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Span Coding Challenge</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-container v-if="!isLoading" class="mt-15">
        <Search class="mt-16" />
        <Carousel
          :category="setDefaultTopic"
          :description="setDefaultDescription"
        />
      </v-container>
      <NavigationDrawer ref="openNavigationRef" />
      <Loader />
    </v-card>
  </div>
</template>

<script>
import Carousel from "../common/Carousel.vue";
import Search from "../common/Search.vue";
import NavigationDrawer from "../navigation/NavigationDrawer.vue";
import Loader from "../common/Loader.vue";

export default {
  name: "AppBar",
  components: {
    Carousel,
    Search,
    NavigationDrawer,
    Loader,
  },
  data: () => ({
    drawer: false,
  }),
  methods: {
    handleDrawer() {
      this.$refs.openNavigationRef.isDrawerShowing();
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.getIsLoading;
    },
    setDefaultTopic() {
      return this.$store.getters.getTopicName;
    },
    setDefaultDescription() {
      return this.$store.getters.getDescription;
    },
    setErrorMessage() {
      return this.$store.getters.getErrorMessage;
    },
  },
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
