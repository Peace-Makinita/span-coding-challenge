<template>
  <div>
    <v-card class="overflow-hidden">
      <v-app-bar absolute color="teal lighten-3" dark hide-on-scroll prominent>
        <v-app-bar-nav-icon @click="handleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Span Coding Challenge</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-container v-if="!isLoading && !isOverlay" class="mt-15">
        <Search class="mt-16" />
        <Carousel
          category="Animation"
          description="Below are images with searched topics"
        />
        <Carousel />
        <Carousel />
        <Carousel />
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
  mounted() {
    let setState = this.$store.state;
    setState.isLoading = true;
    setState.isOverlay = true;
    setTimeout(this.mockResponseTime, 2000);
  },
  methods: {
    handleDrawer() {
      this.$refs.openNavigationRef.isDrawerShowing();
    },
    openNavigation(message) {
      console.log("message from child", message);
    },
    mockResponseTime() {
      this.$store.state.isLoading = false;
      this.$store.state.isOverlay = false;
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.getIsLoading;
    },
    isOverlay() {
      return this.$store.getters.getIsOverlay;
    },
  },
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
