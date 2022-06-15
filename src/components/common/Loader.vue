<template lang="html">
  <v-overlay v-if="isLoading" :value="isOverlay">
    <v-progress-circular
      indeterminate
      size="64"
      color="orange"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    overlay: true,
  }),
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
