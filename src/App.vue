<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <button @click="handleDrawer">Call Method in child</button>
      </div>
    </v-app-bar>

    <v-main class="navigation-wrapper">
      <NavigationDrawer ref="openNavigationRef" />
    </v-main>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import NavigationDrawer from "./components/navigation/NavigationDrawer";

export default {
  name: "App",

  components: {
    HelloWorld,
    NavigationDrawer,
  },
  data: () => ({}),
  methods: {
    handleDrawer() {
      this.$refs.openNavigationRef.isDrawerShowing();
    },
    // openNavigation(message) {
    //   console.log('message from child', message);
    // }
  },
};
</script>
