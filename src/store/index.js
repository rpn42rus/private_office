import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    contacts: [], // список контактов
    info: {}, // информация о страницах
    error: false, // флаг ошибки
    loading: false, // флаг для отображения прелоадера
  },

  mutations: {
    SET_CONTACTS(state, contacts) {
      state.contacts = contacts;
    },
    SET_INFO(state, info) {
      state.info = info;
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    SET_LOADING(state, loading) {
      state.loading = loading;
    },
    EDIT_CONTACT(state, contact) {
      let index = state.contacts.findIndex(el => {
        el.id == contact.id;
      });
      if (index !== -1) {
        state.contacts.splice(index, 1, contact);
      }
    },
    ADD_CONTACT(state, contact) {
      state.contacts.unshift(contact);
    },
    REMOVE_CONTACT(state, contact) {
      let index = state.contacts.findIndex(el => el.id === contact.id);
      if (index !== -1) {
        state.contacts.splice(index, 1);
      }
    },
  },

  actions: {
    async getData({ commit }, { page = null, text = '' }) {
      commit('SET_LOADING', true);
      return await axios
        .get(`https://rickandmortyapi.com/api/character/?page=${page}&name=${text}`)
        .then(response => {
          commit('SET_CONTACTS', response.data.results);
          commit('SET_INFO', response.data.info);
          commit('SET_ERROR', false);
          commit('SET_LOADING', false);
        })
        .catch(err => {
          console.log('err :>> ', err);
          commit('SET_ERROR', true);
          commit('SET_LOADING', false);
        });
    },

    saveEditContact({ commit }, contact) {
      commit('EDIT_CONTACT', contact);
    },

    saveNewContact({ commit }, contact) {
      commit('ADD_CONTACT', contact);
    },

    removeContact({ commit }, contact) {
      commit('REMOVE_CONTACT', contact);
    },
  },

  getters: {},
});
