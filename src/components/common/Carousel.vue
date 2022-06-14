<template>
  <v-sheet class="mx-auto" elevation="8" max-width="100%">
    <v-slide-group v-model="model" class="pa-4" center-active show-arrows>
      <v-slide-item
        v-for="item in imageList"
        :key="item.id"
        v-slot="{ active, toggle }"
      >
        <v-card class="ma-4" height="200" width="200" @click="toggle">
          <v-img
            :src="item.url"
            :lazy-src="item.url"
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
  data: () => ({
    model: null,
    show: false,
    isSelected: false,
    activeItem: null,
    imageList: [
      {
        id: 1,
        url: "https://source.unsplash.com/random/200x200?sig=1",
      },
      {
        id: 2,
        url: "https://source.unsplash.com/random/200x200?sig=2",
      },
      {
        id: 3,
        url: "https://source.unsplash.com/random/200x200?sig=3",
      },
      {
        id: 4,
        url: "https://source.unsplash.com/random/200x200?sig=4",
      },
      {
        id: 5,
        url: "https://source.unsplash.com/random/200x200?sig=5",
      },
      {
        id: 6,
        url: "https://source.unsplash.com/random/200x200?sig=6",
      },
      {
        id: 7,
        url: "https://source.unsplash.com/random/200x200?sig=7",
      },
      {
        id: 8,
        url: "https://source.unsplash.com/random/200x200?sig=8",
      },
      {
        id: 9,
        url: "https://source.unsplash.com/random/200x200?sig=9",
      },
      {
        id: 20,
        url: "https://source.unsplash.com/random/200x200?sig=10",
      },
      {
        id: 10,
        url: "https://source.unsplash.com/random/200x200?sig=11",
      },
      {
        id: 11,
        url: "https://source.unsplash.com/random/200x200?sig=12",
      },
      {
        id: 12,
        url: "https://source.unsplash.com/random/200x200?sig=13",
      },
      {
        id: 13,
        url: "https://source.unsplash.com/random/200x200?sig=14",
      },
      {
        id: 14,
        url: "https://source.unsplash.com/random/200x200?sig=15",
      },
      {
        id: 15,
        url: "https://source.unsplash.com/random/200x200?sig=16",
      },
      {
        id: 16,
        url: "https://source.unsplash.com/random/200x200?sig=17",
      },
      {
        id: 17,
        url: "https://source.unsplash.com/random/200x200?sig=18",
      },
    ],
  }),
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
</style>
