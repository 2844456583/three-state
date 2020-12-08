<template>
  <div>
    <!-- 头部 -->
    <headerDetails></headerDetails>
    <!-- 页面主体部分 -->
    <middleDetails></middleDetails>
  </div>
</template>

<script>
import headerDetails from "../components/header/headerDetails.vue";
import middleDetails from "../components/middle/details.vue";
export default {
  data() {
    return {};
  },

  components: {
    headerDetails,
    middleDetails,
  },

  methods: {}
};
</script>

<style scoped>
</style>