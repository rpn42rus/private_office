import firebase from 'firebase/app';

export default {
  namespaced: true,

  state: {
    userName: '',
  },

  mutations: {
    SET_USER_NAME(state, name) {
      state.userName = name;
    },
  },

  actions: {
    /**
     * Метод авторизации пользователя
     * @param {String} email
     * @param {String} password
     */
    async login({ commit }, { email, password }) {
      try {
        commit('SET_LOADING', true, { root: true });
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        commit('SET_LOADING', false, { root: true });
        throw error;
      }
    },

    /**
     * Метод выхода из системы
     */
    async logout() {
      await firebase.auth().signOut();
    },

    /**
     * Метод регистрации пользователя
     * @param {String} email
     * @param {String} password
     * @param {String} name
     */
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        commit('SET_LOADING', true, { root: true });
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = await dispatch('getUid');
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            name,
          });
        commit('SET_USER_NAME', name);
      } catch (error) {
        commit('SET_LOADING', false, { root: true });
        console.log('error :>> ', error);
        throw error;
      }
    },

    /**
     * Меторд получение id пользователя
     */
    getUid() {
      const user = firebase.auth().currentUser;
      return user ? user.uid : null;
    },
  },
};
