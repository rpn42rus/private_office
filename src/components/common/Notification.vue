<template>
  <div class="notification">
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: String,
  },
};
</script>

<style lang="scss" scoped>
.notification {
  background: #464646;
  padding: 20px 30px;
  width: max-content;
  border-radius: 10px;
  color: #fff;
  margin-top: 20px;
  margin-left: 30px;
}
</style>
