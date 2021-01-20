import Vue from 'vue';
import Vuex from 'vuex';

import contacts from './contacts';
import auth from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loading: false, // флаг для отображения прелоадера
  },

  mutations: {
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
  },

  modules: {
    contacts,
    auth,
  },
});
