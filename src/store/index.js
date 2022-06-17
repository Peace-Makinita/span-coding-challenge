import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topics: [],
    photos: [],
    newPhotoList: [],
    isResponseOkay: false,
    infinityLoop: false,
    isLoading: false,
    isOverlay: false,
    searchValue: "",
    setTopicName: "",
    setDescription: "",
    errorMessage: "",
  },

  getters: {
    getTopics: (state) => state.topics,
    getPhotos: (state) => state.photos,
    getIsResponseOkay: (state) => state.isResponseOkay,
    getInfinityLoop: (state) => state.infinityLoop,
    getIsLoading: (state) => state.isLoading,
    getIsOverlay: (state) => state.isOverlay,
    getSearchValue: (state) => state.searchValue,
    getNewPhotoList: (state) => state.newPhotoList,
    getComponentKey: (state) => state.componentKey,
    getTopicName: (state) => state.setTopicName,
    getDescription: (state) => state.setDescription,
    getErrorMessage: (state) => state.errorMessage,
  },

  actions: {
    fetchTopics({ commit }) {
      const url =
        "https://api.unsplash.com/topics/?client_id=ucVVGtioEDaoporFMI1stcwOGSFRWE_qZ0hsOjQG9EY";

      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((response) => {
            if (response?.data) {
              commit("SET_TOPICS", response.data);
              commit("SET_RESPONSE_OKAY", true);
              resolve(response.data);
            } else {
              commit("SET_TOPICS", []);
              commit("SET_RESPONSE_OKAY", false);
              reject(error);
            }
          })
          .catch((error) => {
            commit("SET_RESPONSE_OKAY", false);
            reject(error);
          });
      });
    },

    fetchPhotos({ commit }, topicName) {
      const url = `https://api.unsplash.com/topics/${topicName}/photos/?client_id=ucVVGtioEDaoporFMI1stcwOGSFRWE_qZ0hsOjQG9EY`;
      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((response) => {
            if (response?.data) {
              commit("SET_PHOTOS", response.data);
              commit("SET_RESPONSE_OKAY", true);
              resolve(response.data);
            } else {
              commit("SET_PHOTOS", []);
              commit("SET_RESPONSE_OKAY", false);
              reject(error);
            }
          })
          .catch((error) => {
            commit("SET_RESPONSE_OKAY", false);
            reject(error);
          });
      });
    },
  },

  mutations: {
    SET_TOPICS(state, topics) {
      // Vue.set(state, "photos", val);
      state.topics = topics;
    },
    SET_RESPONSE_OKAY(state, isResponseOkay) {
      state.isResponseOkay = isResponseOkay;
    },
    SET_PHOTOS(state, photos) {
      // state.photos.push(photos);
      // // state.photos.push(photos);
      state.photos = photos;
    },
    SET_NEW_PHOTO_LIST(state, newPhotoList) {
      state.newPhotoList.push(newPhotoList);
    },
    SET_LOADING(state, val) {
      Vue.set(state, "isLoading", val);
    },
    SET_OVERLAY(state, val) {
      Vue.set(state, "isOverlay", val);
    },
    SET_SEARCH_VALUE(state, val) {
      Vue.set(state, "searchValue", val);
    },
  },
});
