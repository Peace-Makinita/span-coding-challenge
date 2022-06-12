<template>
  <div>
    <h3 class="category-list-name">{{ category }}</h3>
    <p class="description">
      {{ description }} infinityLoop - {{ infinityLoop }}
    </p>
    <v-container class="container m-0">
      <div class="slide-button slide-button-right">
        <v-icon color="black" class="icon-chevron" large @click="right">
          mdi-chevron-right
        </v-icon>
      </div>
      <div class="slide-button slide-button-left" v-if="infinityLoop">
        <v-icon color="black" class="icon-chevron" large @click="left">
          mdi-chevron-left
        </v-icon>
      </div>
      <div class="slider-wrapper" ref="wrapper">
        <transition-group class="slider" tag="div" name="list">
          <div
            class="slide-container"
            v-for="container in slideContainer"
            :key="container"
          >
            <div
              class="slide image-spacer"
              v-for="(content, contentIndex) in contentContainer[container]"
              :key="contentIndex"
              ref="slides"
              :data-content-index="contentIndex"
              @click="viewImageInfo(content, contentIndex)"
            >
              <img :src="content" />
            </div>
          </div>
        </transition-group>
      </div>
    </v-container>

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
          <!-- <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Open Dialog
            </v-btn>
          </template> -->
          <v-card>
            <v-card-title class="text-h5"> display information </v-card-title>
            <v-card-text>
              <p>display information for each selected image.</p>
              <p>{{ urlTest }}</p>
              <p>{{ indexTest }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
                Okay
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "ImageCover",
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
  data() {
    return {
      expandShowcase: false,
      timeoutID: "",
      ratio: 1.6,
      selectedSlidePos: {},
      isSliding: false,
      slideContainer: [-1, 0, 1],
      contentContainer: [],
      contentContainerSize: 6,
      contentData: [
        "https://source.unsplash.com/random/200x200?sig=1",
        "https://source.unsplash.com/random/200x200?sig=2",
        "https://source.unsplash.com/random/200x200?sig=3",
        "https://source.unsplash.com/random/200x200?sig=4",
        "https://source.unsplash.com/random/200x200?sig=5",
        "https://source.unsplash.com/random/200x200?sig=6",
        "https://source.unsplash.com/random/200x200?sig=7",
        "https://source.unsplash.com/random/200x200?sig=8",
        "https://source.unsplash.com/random/200x200?sig=9",
        "https://source.unsplash.com/random/200x200?sig=10",
        "https://source.unsplash.com/random/200x200?sig=11",
        "https://source.unsplash.com/random/200x200?sig=12",
        "https://source.unsplash.com/random/200x200?sig=13",
        "https://source.unsplash.com/random/200x200?sig=23",
        "https://source.unsplash.com/random/200x200?sig=33",
        "https://source.unsplash.com/random/200x200?sig=1",
        "https://source.unsplash.com/random/200x200?sig=132",
        "https://source.unsplash.com/random/200x200?sig=3",
        "https://source.unsplash.com/random/200x200?sig=1",
        "https://source.unsplash.com/random/200x200?sig=2",
        "https://source.unsplash.com/random/200x200?sig=3",
        "https://source.unsplash.com/random/200x200?sig=1",
        "https://source.unsplash.com/random/200x200?sig=2",
        "https://source.unsplash.com/random/200x200?sig=3",
        "https://source.unsplash.com/random/200x200?sig=1",
        "https://source.unsplash.com/random/200x200?sig=2",
        "https://source.unsplash.com/random/200x200?sig=3",
        "https://source.unsplash.com/random/200x200?sig=1",
        "https://source.unsplash.com/random/200x200?sig=2",
        "https://source.unsplash.com/random/200x200?sig=3",
        "https://source.unsplash.com/random/200x200?sig=1",
        "https://source.unsplash.com/random/200x200?sig=2",
        "https://source.unsplash.com/random/200x200?sig=3",
      ],
      infinityLoop: false,
      topicName: "digital-nomad",
      dialog: false,
      urlTest: "",
      indexTest: null,
    };
  },
  methods: {
    left: _.debounce(function slideLeft() {
      ///debugger;
      if (!this.expandShowcase) {
        this.isSliding = false;
        // Infinity loop
        console.log("this.slideContainer", this.slideContainer);
        if (this.slideContainer[0] === 0) {
          const page = this.contentContainer.length - 1;
          this.slideContainer.unshift(page);
        } else {
          this.slideContainer.unshift(this.slideContainer[0] - 1);
        }
        this.slideContainer.pop();
        // this.setColor(this.slideContainer[0]);
      }
    }, 500),
    right: _.debounce(function slideRight() {
      if (
        !this.expandShowcase &&
        _.last(this.slideContainer) < this.contentContainer.length
      ) {
        this.isSliding = true;
        // this.$store.commit("SET_INFINIT_LOOP", true);
        this.infinityLoop = true;
        // Infinity loop
        if (_.last(this.slideContainer) === this.contentContainer.length - 1) {
          const page =
            this.contentContainer.length - _.last(this.slideContainer) - 1;
          this.slideContainer.push(page);
        } else {
          this.slideContainer.push(_.last(this.slideContainer) + 1);
        }
        this.slideContainer.shift();
        // this.setColor(_.last(this.slideContainer));
      }
    }, 500),
    // resetContentContainer() {
    //   this.setContentContainer();
    //   this.updateContentContainer();
    // },
    setContentContainer() {
      if (window.matchMedia("(max-width: 480px)").matches) {
        this.contentContainerSize = 2;
      } else if (window.matchMedia("(max-width: 768px)").matches) {
        this.contentContainerSize = 3;
      } else if (window.matchMedia("(max-width:1024px)").matches) {
        this.contentContainerSize = 4;
      } else {
        this.contentContainerSize = 6;
      }
      this.contentContainer = _.chunk(
        this.contentData,
        this.contentContainerSize
      );
    },
    updateContentContainer() {
      this.slideContainer = [-1, 0, 1];
      // this.setColor(this.slideContainer[0]);
      // this.setColor(this.slideContainer[1]);
      // this.setColor(this.slideContainer[2]);
    },
    // setColor(containerIndex, callback) {
    //   // Helper function for the demo
    //   if (
    //     containerIndex > -1 &&
    //     containerIndex < this.contentContainer.length
    //   ) {
    //     this.$nextTick(() => {
    //       this.contentContainer[containerIndex].forEach(
    //         (content, contentIndex) => {
    //           const slideID = `#slide-${containerIndex}-${contentIndex}`;
    //           const slide = this.$el.querySelector(slideID);
    //           const offset = contentIndex * 7;
    //           const hue = (containerIndex * 20) % 360;
    //           // this.setStyleProperty(slide, {
    //           //   "background-color": `hsl(${hue},${40 + offset}%,${
    //           //     50 + offset
    //           //   }%)`,
    //           // });
    //         }
    //       );
    //       if (callback) {
    //         callback();
    //       }
    //     });
    //   }
    // },
    // setStyleProperty(element, styles) {
    //   Object.assign(element.style, styles);
    // },
    viewImageInfo(item, index) {
      this.urlTest = item;
      this.indexTest = index;
      this.dialog = true;

      if (!this.dialog) {
        this.urlTest = "";
        this.indexTest = null;
      }
      console.log("item", item, "index", index);
    },
  },
  mounted() {
    this.$el.style.setProperty("--ratio", `${this.ratio}`);
    // this.slideContainer.forEach((container) => {
    //   this.setColor(container);
    // });
    // window.addEventListener(
    //   "resize",
    //   _.debounce(this.resetContentContainer, 150)
    // );
  },
  destroyed() {
    // window.removeEventListener(
    //   "resize",
    //   _.debounce(this.resetContentContainer, 150)
    // );
  },
  async created() {
    this.setContentContainer();
    try {
      await this.$store.dispatch("fetchPhotos", this.topicName);
    } catch (error) {
      console.log("error in components");
    }
  },
  computed: {
    getImageList() {
      return this.$store.state.photos;
    },
    // infinityLoop() {
    //   return this.$store.state.infinityLoop;
    // },
  },
};
</script>

<style lang="scss" scoped>
$button-width: 5vw;
$slider-container-width: 90vw;
$slider-width: $slider-container-width * 3;
/* Medium Devices, Desktops */
@mixin md-screen {
  @media only screen and (max-width: 1024px) {
    @content;
  }
}
/* Small Devices, Tablets */
@mixin sm-screen {
  @media only screen and (max-width: 768px) {
    @content;
  }
}
/* Extra small devices */
@mixin xs-screen {
  @media only screen and (max-width: 480px) {
    @content;
  }
}
@function slide-width($numOfSlides) {
  @return $slider-container-width / $numOfSlides;
}
@function slide-height($width) {
  @return $width * 0.6;
}
// .container {
//   --duration: 0.4s;
//   --cubic-bezier: cubic-bezier(0.5, 0, 0.1, 1);
//   position: relative;
// }
// .container * {
//   box-sizing: border-box;
// }
/* Slider buttoms */
.slide-button {
  width: $button-width;
  //height: slide-height(slide-width(9));
  // background-color: white;
  // opacity: 0.6;
  position: absolute;
  //z-index: 10;
}
.slide-button.slide-button-left {
  left: 0;
}
.slide-button.slide-button-right {
  right: 0;
}
.slider-wrapper {
  overflow: hidden;
}
.image-spacer {
  margin-right: 0.5rem;
}

.slider {
  display: flex;
  width: $slider-width;
  background-color: "pink";
  transform: translateX(-($slider-container-width - $button-width));
}
.slide-container {
  display: flex;
  flex: 0 0 $slider-container-width;
  will-change: transform;
}
.slide-container.middle {
  z-index: 1;
}
.slide {
  width: slide-width(6);
  height: slide-height(slide-width(4));
  transition: transform var(--duration) var(--cubic-bezier);
  will-change: transform;
  // box-sizing: border-box;
}

// .slide.image-spacer:hover {
//   border: 4px solid rgba(255, 0, 0, 0.5);
// }
/* Slider Transition*/
.list-enter,
.list-leave-to {
  opacity: 0;
}
.list-leave-active {
  display: none;
  position: absolute;
}
.list-move {
  transition: all 1s;
}

.scroll-btn {
  background-color: red;
}

//fix this
.icon-chevron {
  padding: 0;
  margin: 74px 0;
}

.category-list-name {
  font-weight: 500;
  margin: 2rem 10rem 0;
  font-size: 1rem;
}

.description {
  font-weight: 500;
  margin: 0 10rem 0;
  font-size: 0.9rem;
  color: #5e3e02;
}
/* Responsilbe Web */
@include md-screen {
  .slide {
    width: slide-width(4);
    height: slide-height(slide-width(4));
  }
  .slide-button {
    height: slide-height(slide-width(4));
  }
}
@include sm-screen {
  .slide {
    width: slide-width(3);
    height: slide-height(slide-width(3));
  }
  .slide-button {
    color: white;
    width: slide-width(9);
    // width: 9vw;
    height: slide-height(slide-width(3));
  }

  button.v-icon.notranslate.icon-chevron.v-icon--link.mdi.mdi-chevron-right.theme--light.black--text {
    background-color: black;
    opacity: 0.4;
  }

  button.v-icon.notranslate.icon-chevron.v-icon--link.mdi.mdi-chevron-left.theme--light.black--text {
    color: white !important;
    background-color: black;
    opacity: 0.4;
  }

  .slide.image-spacer {
    margin: 0 0.7rem;
  }
  .icon-chevron {
    padding: 0;
    margin: 2.5rem 0px;
  }

  .description {
    margin: 0 1.7rem;
    display: flex;
    text-align: center;
  }
}
@include xs-screen {
  .slide {
    width: slide-width(2);
    height: slide-height(slide-width(2));
  }
  .slide-button {
    height: slide-height(slide-width(2));
  }
}

/* .image-wrapper {
  margin: 0 2rem 0 0;
}
.container {
  display: flex;
  overflow-y: hidden;
} */

/* Custom, iPhone Retina */
@media only screen and (min-width: 320px) {
}

/* Extra Small Devices, Phones */
@media only screen and (min-width: 480px) {
}

/* Small Devices, Tablets */
@media only screen and (min-width: 768px) {
}

/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) {
}

/* Large Devices, Wide Screens */
@media only screen and (min-width: 1200px) {
}

@media only screen and (min-width: 1264px) {
}

/* ::-webkit-scrollbar {
    display: none;
} */
</style>
