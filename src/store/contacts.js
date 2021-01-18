import axios from 'axios';

export default {
  namespaced: true,

  state: {
    contacts: [], // список контактов
    info: {}, // информация о страницах
  },

  mutations: {
    SET_CONTACTS(state, contacts) {
      state.contacts = contacts;
    },
    SET_INFO(state, info) {
      state.info = info;
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
      commit('SET_LOADING', true, { root: true });
      return await axios
        .get(`https://rickandmortyapi.com/api/character/?page=${page}&name=${text}`)
        .then(response => {
          commit('SET_CONTACTS', response.data.results);
          commit('SET_INFO', response.data.info);
          commit('SET_ERROR', false, { root: true });
          commit('SET_LOADING', false, { root: true });
        })
        .catch(err => {
          console.log('err :>> ', err);
          commit('SET_ERROR', true, { root: true });
          commit('SET_LOADING', false, { root: true });
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
};
