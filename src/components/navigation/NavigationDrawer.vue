<template>
  <div>
    <ImageCover
      category="Cars"
      description="Watch all the exciting content content about cars"
    />
    <ImageCover
      category="Food"
      description="Are you a foodie? you'll enjoy this content"
    />
    <ImageCover
      category="Music"
      description="Watch and listen to music all the exciting content about music"
    />

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>SPAN CODING CHALLENGE</v-list-item-title>
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

<!-- /* 320px — 480px: Mobile devices
481px — 768px: iPads, Tablets
769px — 1024px: Small screens, laptops
1025px — 1200px: Desktops, large screens
1201px and more —  Extra large screens, TV */ -->
