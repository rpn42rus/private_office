<template>
  <div>
    <form class="reg" @submit.prevent="registerUser">
      <div class="reg__title">Регистрация</div>
      <div class="reg__fields">
        <!-- Поле с именем -->
        <label class="field__label">Name:</label>
        <input
          class="field__input"
          v-model.trim="name"
          type="text"
          placeholder="Name"
          :class="{
            invalid:
              ($v.name.$dirty && !$v.name.required) || ($v.name.$dirty && !$v.name.minLength),
          }"
        />
        <small class="invalid" v-if="$v.name.$dirty && !$v.name.required">Заполните поле</small>
        <small class="invalid" v-else-if="$v.name.$dirty && !$v.name.minLength"
          >Имя должно состоять из {{ $v.name.$params.minLength.min }} символов
        </small>
        <!-- Поле с email -->
        <label class="field__label">Email:</label>
        <input
          class="field__input"
          v-model.trim="email"
          type="email"
          placeholder="Email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email),
          }"
        />
        <small class="invalid" v-if="$v.email.$dirty && !$v.email.required">Заполните поле</small>
        <small class="invalid" v-else-if="$v.email.$dirty && !$v.email.email"
          >Введите корректный email</small
        >
        <!-- Поле с password -->
        <label class="field__label">Password:</label>
        <input
          class="field__input"
          v-model.trim="password"
          type="password"
          placeholder="Password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
        />
        <small class="invalid" v-if="$v.password.$dirty && !$v.password.required"
          >Заполните поле</small
        >
        <small class="invalid" v-else-if="$v.password.$dirty && !$v.password.minLength"
          >Пароль должен быть не менее {{ $v.password.$params.minLength.min }} символов, сейчас
          {{ password.length }} символов</small
        >
      </div>

      <button class="reg__btn" type="submit">Зарегистрироваться</button>
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

  data() {
    return {
      name: '',
      email: '',
      password: '',
      textNotification: '',
      notificationIsShow: false,
    };
  },

  validations: {
    name: {
      required,
      minLength: minLength(3),
    },
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
    ...mapActions('auth', ['register']),

    async registerUser() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }

      const formData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      try {
        await this.register(formData);
        this.$router.push('/');
      } catch (error) {
        if (error.code == ' auth/email-already-in-use') {
          this.textNotification = 'Такой пользователь уже существует';
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
.reg {
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
  &__checkbox {
    display: flex;
    margin: 10px 0px;
    input {
      margin-right: 10px;
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

.invalid {
  color: red;
}
</style>
