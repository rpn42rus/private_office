<template>
  <header class="header">
    <div class="container">
      <div class="menu">
        <div class="user__name">{{ userName }}</div>
        <div class="btn-wrap" @click="logoutSystem">
          <button-component :buttonStyles="buttonStyles" :textButton="textButton" />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import ButtonComponent from '../common/ButtonComponent.vue';

export default {
  name: 'ContactHeader',

  components: { ButtonComponent },

  data() {
    return {
      buttonStyles: {
        color: '#fff',
        colorHover: 'rgb(37, 35, 35)',
        bgColor: 'transparent',
        bgColorHover: '#fff',
        border: '2px solid #fff',
      },
      textButton: 'Выйти',

      textNotification: '',
    };
  },

  computed: {
    ...mapState('auth', ['userName']),
  },

  methods: {
    ...mapActions('auth', ['logout']),

    async logoutSystem() {
      await this.logout();
      this.$router.push('/login');
      this.textNotification = 'Вы вышли из системы';
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: rgb(41, 40, 40);
  .container {
    max-width: 1620px;
    margin: 0 auto;
    padding: 0 15px;
    .menu {
      height: 70px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #fff;
      .user__name {
        margin-right: 30px;
      }
      .btn-wrap {
        margin-right: 15px;
      }
    }
  }
}
</style>
