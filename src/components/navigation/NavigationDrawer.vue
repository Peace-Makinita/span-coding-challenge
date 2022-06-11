<template>
  <div>
    <v-container class="fill-height">
      <ImageCover/>
    </v-container>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import ImageCover from '../common/ImageCover.vue';

  export default {
    name: 'NavigationDrawer',
    components: {
      ImageCover
    },
    props: {
      openNavigation: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        drawer: null,
        items: [
          { title: 'Home', icon: 'mdi-view-dashboard' },
          { title: 'About', icon: 'mdi-forum' },
        ],
      }
    },
    methods: {
    //   callParent() {
    //   this.$emit('onChange', 'hi from child');
    // },
      isDrawerShowing() {
        this.drawer = !this.drawer
      console.log('message from parent ??');
    }
    },
  }
</script>



<!-- /* 320px — 480px: Mobile devices
481px — 768px: iPads, Tablets
769px — 1024px: Small screens, laptops
1025px — 1200px: Desktops, large screens
1201px and more —  Extra large screens, TV */ -->