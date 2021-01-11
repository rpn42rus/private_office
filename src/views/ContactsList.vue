<template>
  <div class="container">
    <div class="page-wrap">
      <div class="page-title">Список контактов</div>
      <div class="page-content">
        <div class="grid-layout">
          <contact-card
            v-for="character in characters"
            :key="character.id"
            :character="character"
          />
          <div v-if="characters.length" v-observe-visibility="loadDataOnScroll"></div>
        </div>
      </div>
      <preloader :isShowPreloader="loading" />
    </div>
  </div>
</template>

<script>
import ContactCard from '../components/ContactCard';
import Preloader from '../components/Preloader.vue';

export default {
  components: { ContactCard, Preloader },
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
    this.getContactData();
  },

  methods: {
    /**
     * Метод получение данных о контактах
     * @param {Number} page
     */
    async getContactData() {
      if (this.currentPage > this.lastPage) {
        return;
      }
      this.loading = true;
      await this.axios
        .get(
          `https://rickandmortyapi.com/api/character/?name=${this.searchText}&page=${this.currentPage}`,
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
      console.log('isVisible :>> ', isVisible);
      if (!isVisible) {
        return;
      } else {
        this.currentPage++;
        this.getContactData();
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
  .page-wrap {
    display: flex;
    flex-direction: column;
    height: 100vh;
    .page-title {
      padding: 50px 0;
      font-size: 32px;
      color: rgb(41, 41, 41);
      font-weight: bold;
    }
    .page-content {
      flex: 1 1 auto;
      .grid-layout {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 100px;
      }
    }
  }
}
</style>
