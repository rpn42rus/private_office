<template>
  <div class="container">
    <div class="page__wrapper">
      <!-- Шапка страницы -->
      <div class="page__header">
        <div class="page__header-title">Список контактов</div>
        <div class="page__header-row">
          <div class="add-user__wrapper">
            <div class="add-user__btn" @click="openModal">+ Добавить контакт</div>
          </div>
          <contact-search
            class="search__wrapper"
            @getSearchResult="(searchText = $event), getContactData(1)"
          />
        </div>
      </div>
      <!-- Контент страницы -->
      <div class="page__content">
        <div class="grid-layout" v-if="characters.length && !error">
          <contact-card
            v-for="character in characters"
            :key="character.id"
            :character="character"
          />
          <div v-observe-visibility="loadDataOnScroll"></div>
        </div>
        <div class="no-result" v-else-if="!characters.length && error">
          Совпадений не найдено...
        </div>
      </div>
      <!-- Модальное окно -->
      <transition name="bounce">
        <contact-modal v-if="showModalContact" @closeModal="closeModal" />
      </transition>

      <!-- Прелоадер -->
      <preloader :isShowPreloader="loading" />
    </div>
  </div>
</template>

<script>
import ContactCard from './ContactCard';
import ContactSearch from './ContactSearch';
import ContactModal from './ContactModal.vue';
import Preloader from '../common/Preloader';

export default {
  components: { ContactCard, Preloader, ContactSearch, ContactModal },

  name: 'ContactList',

  data() {
    return {
      characters: [], //персонажи(контакты)
      currentPage: 1, // текущая страница
      lastPage: 1, // последняя страница
      loading: false, // флаг для отображения preloader
      searchText: '', // искомый текст
      showModalContact: false, // флаг отображения модального окна контакта
      error: '', // флаг ошибки
    };
  },

  mounted() {
    this.getContactData(1);
  },

  methods: {
    /**
     * Метод получение данных о контактах
     * @param {Number} page
     */
    async getContactData(page) {
      if (page > this.lastPage) {
        return;
      }
      this.loading = true;

      if (page == 1) {
        this.currentPage = 1;
        this.characters = [];
      }

      await this.axios
        .get(
          `https://rickandmortyapi.com/api/character/?page=${this.currentPage}&name=${this.searchText}`,
        )
        .then(response => {
          this.characters.push(...response.data.results);
          this.lastPage = response.data.info.pages;
          this.error = false;
          this.loading = false;
        })
        .catch(() => {
          this.characters = [];
          this.error = true;
          this.loading = false;
        });
    },

    /**
     * Метод подгружает данные по мере прокрутки страницы
     * @param {Boolean} isVisible
     */
    loadDataOnScroll(isVisible) {
      if (!isVisible) {
        return;
      } else {
        this.currentPage++;
        this.getContactData(this.currentPage);
      }
    },

    openModal() {
      this.showModalContact = true;

      const body = document.getElementsByTagName('body')[0];
      body.style.overflowY = 'hidden';
      body.style.paddingRight = 17 + 'px';
    },

    closeModal() {
      this.showModalContact = false;

      const body = document.getElementsByTagName('body')[0];
      body.style.overflowY = '';
      body.style.paddingRight = '';
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  max-width: 1620px;
  margin: 0 auto;
  padding: 0 15px;
  .page__wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    .page__header {
      &-title {
        padding: 50px 0;
        font-size: 32px;
        color: rgb(41, 41, 41);
        font-weight: bold;
      }
      &-row {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        @media screen and (max-width: 475px) {
          flex-direction: column;
        }
        .search__wrapper {
          flex-basis: 50%;
          display: flex;
          width: 100%;
          @media screen and (max-width: 475px) {
            flex-basis: 100%;
          }
        }
        .add-user__wrapper {
          display: flex;
          justify-content: flex-end;
          @media screen and (max-width: 475px) {
            width: 100%;
            margin-bottom: 20px;
          }
          .add-user__btn {
            color: #fff;
            padding: 10px;
            border-radius: 10px;
            background: transparent;
            transition: all 0.3s ease-in;
            border: 2px solid rgb(29, 180, 29);
            color: rgb(29, 180, 29);
            &:hover {
              color: #fff;
              background-color: rgb(29, 180, 29);
              cursor: pointer;
            }
          }
        }
      }
    }
    .page__content {
      flex: 1 1 auto;
      .grid-layout {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 100px;
      }
      .no-result {
        font-size: 24px;
        margin: 20px 0;
      }
    }
  }
}

.modal-transition-enter-active {
  transition: all 0.3s ease;
}
.modal-transition-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.modal-transition-enter,
.modal-transition-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>
