<template>
  <div class="container">
    <div class="page-wrap">
      <div class="page-title">Список контактов</div>
      <div class="page-content">
        <div class="grid-layout" v-if="!loading">
          <contact-card
            v-for="character in characters"
            :key="character.id"
            :character="character"
          />
        </div>
      </div>
      <div class="pagination-controls">
        <div class="prev-contacts pagination-btn" @click="goToPage(info.prev)">prev</div>
        <div class="next-contacts pagination-btn" @click="goToPage(info.next)">next</div>
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
      info: {},
      characters: [],
      loading: false,
    };
  },

  mounted() {
    this.loading = true;
    this.axios.get('https://rickandmortyapi.com/api/character').then(response => {
      this.characters = response.data.results;
      this.info = response.data.info;
      this.loading = false;
    });
  },

  methods: {
    goToPage(page) {
      this.loading = true;
      this.axios.get(`${page}`).then(response => {
        this.characters = response.data.results;
        this.info = response.data.info;
        this.loading = false;
      });
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
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 2rem;
        gap: 2rem;
        display: grid;
      }
    }
  }

  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
    .pagination-btn {
      padding: 10px 30px;
      border: 2px solid rgb(41, 41, 41);
      border-radius: 10px;
      &:hover {
        cursor: pointer;
        background-color: rgb(41, 41, 41);
        color: #fff;
      }
    }
    .prev-contacts {
      margin-right: 15px;
    }
    .next-contacts {
    }
  }
}
</style>
