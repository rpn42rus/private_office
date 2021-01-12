<template>
  <div class="container">
    <div class="page__wrapper">
      <div class="page__header">
        <div class="page__header-title">Список контактов</div>
        <div class="page__header-row">
          <div class="add-user__wrapper">
            <router-link class="add-user__btn" to="/new_contact">+ Добавить контакт</router-link>
          </div>
          <search-field
            class="search__wrapper"
            @getSearchResult="(searchText = $event), getContactData(1)"
          />
        </div>
      </div>

      <div class="page__content">
        <div class="grid-layout" v-if="characters.length">
          <contact-card
            v-for="character in characters"
            :key="character.id"
            :character="character"
          />
          <div v-observe-visibility="loadDataOnScroll"></div>
        </div>
        <div class="no-result" v-else>
          Совпадений не найдено...
        </div>
      </div>
      <preloader :isShowPreloader="loading" />
    </div>
  </div>
</template>

<script>
import ContactCard from '../components/ContactCard';
import Preloader from '../components/Preloader.vue';
import SearchField from '../components/SearchField.vue';

export default {
  components: { ContactCard, Preloader, SearchField },
  name: 'ContactsList',

  data() {
    return {
      characters: [], //персонажи(контакты)
      currentPage: 1, // текущая страница
      lastPage: 1, // последняя страница
      loading: false, // флаг для отображения preloader
      searchText: '', // искомый текст
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
            text-decoration: none;
            color: #fff;
            padding: 10px;
            border-radius: 10px;
            background-color: rgb(29, 180, 29);
            transition: all 0.2s ease-in;
            &:hover {
              background-color: rgb(22, 138, 22);
              transform: scale(1.02);
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
</style>
