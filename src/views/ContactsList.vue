<template>
  <div class="container">
    <div class="title">Список контактов</div>
    <div class="grid-layout">
      <contact-card v-for="character in characters" :key="character.id" :character="character" />
    </div>
    <div class="pagination-controls">
      <div class="prev-contacts pagination-btn" @click="goToPage(info.prev)">prev</div>
      <div class="next-contacts pagination-btn" @click="goToPage(info.next)">next</div>
    </div>
  </div>
</template>

<script>
import ContactCard from './ContactCard.vue';
export default {
  components: { ContactCard },
  name: 'ContactsList',

  data() {
    return {
      info: {},
      characters: [],
      nextPage: null,
    };
  },

  mounted() {
    this.axios.get('https://rickandmortyapi.com/api/character').then(response => {
      this.characters = response.data.results;
      this.info = response.data.info;
    });
  },

  methods: {
    goToPage(page) {
      this.axios.get(`${page}`).then(response => {
        this.characters = response.data.results;
        this.info = response.data.info;
      });
    },
  },

  // created: async function() {
  //   try {
  //     const res = await fetch('https://rickandmortyapi.com/api/character');
  //     const characters = await res.json();
  //     console.log('characters :>> ', characters);
  //   } catch (error) {
  //     console.log('error :>> ', error);
  //   }
  // },
};
</script>

<style scoped lang="scss">
.container {
  max-width: 1620px;
  margin: 0 auto;
  padding: 0 15px;
  .title {
    margin: 50px 0;
    font-size: 32px;
    color: rgb(41, 41, 41);
    font-weight: bold;
  }
  .grid-layout {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 2rem;
    gap: 2rem;
    display: grid;
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
