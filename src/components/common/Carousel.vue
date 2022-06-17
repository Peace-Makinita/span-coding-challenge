<template>
  <div>
    <v-sheet v-if="!isLoading" class="mx-auto" elevation="8" max-width="100%">
      <p class="Heading 5 mt-6 pt-6 pl-10 mb-0 font-weight-bold">
        {{ setSearchValue ? setSearchValue : category }}
      </p>
      <p class="description-text pl-10 pr-15 mt-4">
        {{ setDescription ? setDescription : description }}
      </p>
      <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
        <v-slide-item
          v-for="imageUrl in imageItems"
          :key="imageUrl.id"
          v-slot="{ active, toggle }"
        >
          <v-card class="ma-4" height="200" width="200" @click="toggle">
            <v-img
              :src="imageUrl"
              :class="active ? 'set-active-border' : ''"
              class="mr-5"
              height="200"
              width="200"
            ></v-img>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
    <p>{{ setErrorMessage }}</p>
  </div>
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
    showNewData: false,
  }),
  watch: {
    async setSearchValue(val) {
      if (val) {
        await this.handleFetchPhotos();
      }
    },
  },
  async mounted() {
    const response = await this.$store.dispatch(
      "fetchPhotos",
      this.setSearchValue ? this.setSearchValue : this.topicName
    );

    if (response) {
      for (let i = 0; i < response.length; i++) {
        const imageUrl = response[i]?.urls?.regular;
        this.imageItems.push(imageUrl);
      }
    }
    return;
  },
  methods: {
    async handleFetchPhotos() {
      const response = await this.$store.dispatch(
        "fetchPhotos",
        this.setSearchValue
      );
      let newImageItems = [];
      if (response) {
        for (let i = 0; i < response.length; i++) {
          const imageUrl = response[i]?.urls?.regular;
          newImageItems.push(imageUrl);
          this.imageItems = newImageItems;
        }
      } else {
        this.$store.state.errorMessage =
          response?.data?.errors[0] || `Sorry we couldn't find any topics.`;
      }

      if (!response.length) {
        this.imageItems = [];
        this.$store.state.errorMessage =
          response?.data?.errors[0] || `Sorry we couldn't find any topics.`;
        return;
      }
      return;
    },
  },
  computed: {
    getImageList() {
      return this.$store.state.photos;
    },
    getNewPhotoList() {
      return this.$store.getters.getNewPhotoList;
    },
    setSearchValue() {
      return this.$store.getters.getSearchValue;
    },
    setDescription() {
      return this.$store.getters.getDescription;
    },
    isLoading() {
      return this.$store.getters.getIsLoading;
    },
    isOverlay() {
      return this.$store.getters.getIsOverlay;
    },
    setErrorMessage() {
      return this.$store.getters.getErrorMessage;
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

.description-text {
  font-size: 0.8rem;
  color: #b78484;
}
</style>
