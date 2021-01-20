<template>
  <div>
    <form class="login" @submit.prevent="submitHandler">
      <div class="login__title">Войти</div>
      <div class="login__fields">
        <label class="field__label">Email:</label>
        <input
          class="field__input"
          v-model.trim="email"
          type="email"
          placeholder="Login"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email),
          }"
        />
        <small class="invalid" v-if="$v.email.$dirty && !$v.email.required">Заполните поле</small>
        <small class="invalid" v-else-if="$v.email.$dirty && !$v.email.email"
          >Введите корректный email</small
        >
        <label class="field__label">Password:</label>
        <input
          class="field__input"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
          v-model.trim="password"
          type="password"
          placeholder="Password"
        />
        <small class="invalid" v-if="$v.password.$dirty && !$v.password.required"
          >Заполните поле</small
        >
        <small class="invalid" v-else-if="$v.password.$dirty && !$v.password.minLength"
          >Пароль должен быть не менее {{ $v.password.$params.minLength.min }} символов, сейчас
          {{ password.length }} символов</small
        >
      </div>
      <button class="login__btn" type="submit">Login</button>
      <div class="login__register-link">
        <span>У вас нет аккаунта?</span>
        <router-link to="/register"> Зарегистрироваться</router-link>
      </div>
    </form>
    <transition name="fade">
      <notification v-if="notificationIsShow === true" :text="textNotification" />
    </transition>
  </div>
</template>

<script>
import { email, required, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import Notification from '../components/common/Notification.vue';

export default {
  components: { Notification },
  name: 'Login',

  data() {
    return {
      email: '',
      password: '',
      textNotification: '',
      notificationIsShow: false,
    };
  },

  validations: {
    email: {
      email,
      required,
    },
    password: {
      required,
      minLength: minLength(4),
    },
  },

  methods: {
    ...mapActions('auth', ['login']),

    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
      };

      try {
        await this.login(formData);
        this.$router.push('/');
      } catch (error) {
        console.log('error :>> ', error);
        if (error.code == 'auth/wrong-password') {
          this.textNotification = 'Вы ввели не верный пароль';
          this.notificationIsShow = true;
        }
        if (error.code == 'auth/user-not-found') {
          this.textNotification = 'Такого пользователя не существует';
          this.notificationIsShow = true;
        }
        if (error.code == 'auth/too-many-requests') {
          this.textNotification = 'Много неудачных попыток входа в систему, попробуйте зайти позже';
          this.notificationIsShow = true;
        }
        setTimeout(() => {
          this.notificationIsShow = false;
        }, 4000);
      }
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
    margin: 10px auto 0;
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
  &__register-link {
    margin: 0 auto;
  }
}
.invalid {
  color: red;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
