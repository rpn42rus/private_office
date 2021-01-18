<template>
  <div>
    <form class="login" @submit.prevent="login">
      <div class="login__title">Войти</div>
      <div class="login__fields">
        <label class="field__label">Email:</label>
        <input class="field__input" required v-model="email" type="email" placeholder="Name" />
        <label class="field__label">Password:</label>
        <input
          class="field__input"
          required
          v-model="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <button class="login__btn" type="submit">Login</button>
      <div class="login__register-link">
        <span>У вас нет аккаунта?</span>
        <router-link to="/register"> Зарегистрироваться</router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    login() {
      // let email = this.email;
      // let password = this.password;
      // this.$store
      //   .dispatch('login', { email, password })
      //   .then(() => this.$router.push('/'))
      //   .catch(err => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  &__title {
    margin-bottom: 10px;
    font-size: 26px;
  }
  &__fields {
    .field__label {
      display: flex;
      font-size: 18px;
      margin: 10px 0 5px 0;
    }
    .field__input {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      outline: none;
    }
  }
  &__btn {
    width: 50%;
    margin: 20px auto;
    padding: 10px 15px;
    border-radius: 10px;
    color: #fff;
    background-color: #000;
    border: 2px solid #fff;
    transition: all 0.3s ease-in;
    outline: none;
    font-size: 20px;
    &:hover {
      color: #000;
      background-color: #fff;
      border: 2px solid #000;
      cursor: pointer;
    }
  }
}
</style>
