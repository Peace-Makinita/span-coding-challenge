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
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import ImageCover from "../common/ImageCover.vue";
import { useStore } from "vuex";

export default {
  name: "NavigationDrawer",
  components: {
    ImageCover,
  },
  props: {
    openNavigation: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", icon: "mdi-view-dashboard" },
        { title: "About", icon: "mdi-forum" },
      ],
    };
  },

  async created() {
    try {
      await this.$store.dispatch("fetchTopics");
    } catch (error) {
      console.log("error in component");
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
      console.log("message from parent ??");
    },
  },
};
</script>

<style scoped>
.v-navigation-drawer--temporary {
  z-index: 10;
}
</style>
