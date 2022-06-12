import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    topics: [],
    isResponseOkay: false,
  },

  getters: {
    getTopics: (state) => state.topics,
    getIsResponseOkay: (state) => state.isResponseOkay,
  },

  actions: {
    // fetchTopics({ commit }) {
    //     const url = 'https://api.unsplash.com/topics/?client_id=ucVVGtioEDaoporFMI1stcwOGSFRWE_qZ0hsOjQG9EY'

    //     return new Promise((resolve, reject) => {
    //         axios.get(url).then((response) => {
    //                 if (response?.data) {
    //                     commit('SET_TOPICS', response.data)
    //                     commit('SET_RESPONSE_OKAY', true)
    //                     resolve(response.data)
    //                 } else {
    //                     commit('SET_TOPICS', [])
    //                     commit('SET_RESPONSE_OKAY',  false)
    //                     reject(error)
    //                 }

    //         }).catch((error) => {
    //             commit('SET_RESPONSE_OKAY',  false)
    //             reject(error)
    //         })
    //     })
    //   },

    fetchTopics({ commit }) {
      commit("SET_TOPICS", [
        { title: "Food" },
        { title: "Cars" },
        { title: "Animals" },
        { title: "Sea" },
        { title: "Ocean" },
        { title: "House" },
      ]);
      //const url = 'https://api.unsplash.com/topics/?client_id=ucVVGtioEDaoporFMI1stcwOGSFRWE_qZ0hsOjQG9EY'

      // return new Promise((resolve, reject) => {
      //     axios.get(url).then((response) => {
      //             if (response?.data) {
      //                 commit('SET_TOPICS', response.data)
      //                 commit('SET_RESPONSE_OKAY', true)
      //                 resolve(response.data)
      //             } else {
      //                 commit('SET_TOPICS', [])
      //                 commit('SET_RESPONSE_OKAY',  false)
      //                 reject(error)
      //             }

      //     }).catch((error) => {
      //         commit('SET_RESPONSE_OKAY',  false)
      //         reject(error)
      //     })
      // })
    },
  },

  mutations: {
    SET_TOPICS(state, topics) {
      state.topics = topics;
    },
    SET_RESPONSE_OKAY(state, isResponseOkay) {
      state.isResponseOkay = isResponseOkay;
    },
  },
});

export default store;
