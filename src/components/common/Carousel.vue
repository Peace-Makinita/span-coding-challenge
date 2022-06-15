<template>
  <v-sheet class="mx-auto" elevation="8" max-width="100%">
    <p class="Heading 5 mt-6 pt-6 pl-10 mb-0 font-weight-bold">
      {{ category }}
    </p>
    <p class="pl-10">{{ description }}</p>
    <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
      <v-slide-item
        v-for="imageUrl in imageItems"
        :key="imageUrl"
        v-slot="{ active, toggle }"
      >
        <v-card class="ma-4" height="200" width="200" @click="toggle">
          <v-img
            :src="imageUrl"
            :lazy-src="imageUrl"
            :class="active ? 'set-active-border' : ''"
            class="mr-5"
            height="200"
            width="200"
          ></v-img>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-sheet>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  data: () => ({
    model: null,
    show: false,
    isSelected: false,
    activeItem: null,
    topicName: "digital-nomad",
    imageItems: [],
    errorMessage: "",
  }),
  async created() {
    try {
      const response = await this.$store.dispatch(
        "fetchPhotos",
        !this.setSearchValue.length ? this.topicName : this.setSearchValue
      );
      let newImageItems = [];
      // console.log("response", response);
      if (response) {
        for (let i = 0; i < response.length; i++) {
          const imageUrl = response[i]?.urls?.regular;
          newImageItems.push(imageUrl);
          this.imageItems = newImageItems;
          // console.log("urls", response[i].urls.regular);
        }
      }

      if (!response.length) {
        this.imageItems = [];
        return;
      }
    } catch (error) {
      console.log("error in components", error);
    }
  },
  computed: {
    getImageList() {
      return this.$store.state.photos;
    },
    setSearchValue() {
      return this.$store.getters.getSearchValue;
    },
  },
};
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}

.set-active-border {
  border: 3px solid orange;
}

.topic-name {
  font-size: 1rem;
  font-weight: 500;
}
</style>
