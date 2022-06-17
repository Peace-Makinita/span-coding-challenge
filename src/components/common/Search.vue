<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          single-line
          dense
          placeholder="Search for topics you find interesting..."
        ></v-text-field>
        <p class="search-keys">
          <b>search keys for demo purposes:</b> current-events, wallpapers,
          3d-renders, experimental
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      search: null,
    };
  },
  watch: {
    search(val) {
      if (val.length > 10) {
        this.$store.state.searchValue = val;
      }
    },
  },
  computed: {
    setSearchValue() {
      return this.$store.getters.getSearchValue;
    },
  },
};
</script>

<style scoped>
.search-keys {
  font-size: 0.8rem;
  color: #b78484;
}
</style>
