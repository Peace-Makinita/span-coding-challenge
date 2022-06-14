<template>
  <v-app>
    <AppBar />
  </v-app>
</template>

<script>
import AppBar from "./components/appBar/AppBar.vue";

export default {
  name: "App",

  components: {
    AppBar,
  },
  data: () => ({}),
};
</script>
