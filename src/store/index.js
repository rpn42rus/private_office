import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contact: {},
  },
  mutations: {
    changeContactInfo(state) {
      console.log('state :>> ', state);
    },
  },
  actions: {},
  getters: {},
});
