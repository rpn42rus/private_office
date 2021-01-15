<template>
  <div class="container">
    <div class="page__wrapper">
      <!-- Шапка страницы -->
      <div class="page__header">
        <div class="page__header-title">Список контактов</div>
        <div class="page__header-row">
          <div class="add-user__wrapper">
            <div class="add-user__btn" @click="openModal((modalMode = 'add'))">
              + Добавить контакт
            </div>
          </div>
          <contact-search
            class="search__wrapper"
            @getSearchResult="(searchText = $event), findContacts()"
          />
        </div>
      </div>
      <!-- Контент страницы -->
      <div class="page__content">
        <div class="grid-layout" v-if="contacts.length && !error">
          <contact-card
            v-for="character in contacts"
            :key="character.id"
            :character="character"
            @openEditModal="openModal"
          />
        </div>
        <div class="no-result" v-else-if="error">
          Совпадений не найдено...
        </div>
      </div>
      <!-- Подвал страницы -->
      <div class="page__footer" v-if="!error">
        <div class="pagination-controls">
          <div
            class="pagination-btn"
            :class="{ 'disabled-btn': info.prev === null }"
            @click="goToPage(info.prev, 'prev')"
          >
            prev
          </div>
          <div
            class="pagination-btn"
            :class="{ 'disabled-btn': info.next === null }"
            @click="goToPage(info.next, 'next')"
          >
            next
          </div>
        </div>
      </div>

      <!-- Модальное окно -->
      <transition name="modal-transition">
        <contact-modal
          v-if="showModalContact"
          @closeModal="closeModal"
          :modalMode="modalMode"
          :contactInfo="selectedContact"
        />
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

import { mapState, mapActions } from 'vuex';

export default {
  components: { ContactCard, Preloader, ContactSearch, ContactModal },

  name: 'ContactList',

  data() {
    return {
      searchText: '', // искомый текст
      currentPage: 1, // текущая страница
      showModalContact: false, // флаг отображения модального окна контакта
      modalMode: '', // режим открытия модального окна(добавление/редактирование)
      selectedContact: {},
    };
  },

  mounted() {
    this.getData(1);
  },

  computed: {
    ...mapState(['contacts', 'info', 'error', 'loading']),
  },

  methods: {
    ...mapActions(['getData']),

    /**
     * Метод перехода на следующую/предыдущую страницу списка контактов
     * @param {String} page
     * @param {String} direction
     */
    goToPage(page, direction) {
      if (page === null) {
        return;
      }

      let numberPage = parseInt(page.match(/\d+/));

      this.getData({ page: numberPage, text: this.searchText });

      if (direction === 'next') {
        this.currentPage++;
      } else if (direction === 'prev') {
        this.currentPage--;
      }
    },

    /**
     * Метод поиска контактов
     */
    findContacts() {
      this.currentPage = 1;
      try {
        this.getData({ page: this.currentPage, text: this.searchText });
      } catch (error) {
        console.log('error :>> ', error);
        this.error = true;
      }
    },

    /**
     * Метод открытия модального окна
     * @param {String} mode
     */
    openModal(mode, contactInfo = {}) {
      this.selectedContact = contactInfo;
      this.showModalContact = true;
      this.modalMode = mode;

      const body = document.getElementsByTagName('body')[0];
      body.style.overflowY = 'hidden';
      body.style.paddingRight = 17 + 'px';
    },

    /**
     * Метод закрытия модального окна
     */
    closeModal() {
      this.showModalContact = false;
      this.modalMode = '';

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
    height: calc(100vh - 70px);
    /* Шапка страницы*/
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
    /* Контент страницы*/
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
    /* Подвал страницы*/
    .page__footer {
      .pagination-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px 0;
        .pagination-btn {
          padding: 10px 30px;
          border: 2px solid rgb(41, 41, 41);
          border-radius: 10px;
          &:last-of-type {
            margin-left: 15px;
          }
          &:hover {
            cursor: pointer;
            background-color: rgb(41, 41, 41);
            color: #fff;
          }
        }
        .disabled-btn {
          pointer-events: none;
          background-color: #dedede;
          border: 2px solid #acacac;
          color: #acacac;
        }
      }
    }
  }
}

/* Анимация отображения модального окна */
.modal-transition-enter-active {
  animation: modal-transition-in 0.5s;
}
.modal-transitionleave-active {
  animation: modal-transition-in 0.5s reverse;
}
@keyframes modal-transition-in {
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
