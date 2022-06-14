<template>
  <v-card class="overflow-hidden">
    <v-app-bar absolute color="teal lighten-3" dark hide-on-scroll prominent>
      <v-app-bar-nav-icon @click="handleDrawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Span Coding Challenge</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-container class="mt-15">
      <Search class="mt-16" />
      <Carousel />
      <Carousel />
      <Carousel />
      <Carousel />
    </v-container>

    <NavigationDrawer ref="openNavigationRef" />
  </v-card>
</template>

<script>
import Carousel from "../common/Carousel.vue";
import Search from "../common/Search.vue";
import NavigationDrawer from "../navigation/NavigationDrawer.vue";

export default {
  name: "AppBar",
  components: {
    Carousel,
    Search,
    NavigationDrawer,
  },
  data: () => ({ drawer: false }),
  methods: {
    handleDrawer() {
      this.$refs.openNavigationRef.isDrawerShowing();
    },
    openNavigation(message) {
      console.log("message from child", message);
    },
  },
};
</script>
