<template>
  <div class="preloader-wrap" v-show="isShowPreloader">
    <atom-spinner :animation-duration="1000" :size="100" :color="'#ff1d5e'" />
  </div>
</template>

<script>
import { AtomSpinner } from 'epic-spinners';
export default {
  name: 'Preloader',

  components: {
    AtomSpinner,
  },

  props: {
    isShowPreloader: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.preloader-wrap {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
</style>
