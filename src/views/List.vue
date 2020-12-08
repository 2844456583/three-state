<template>
  <div>
    <header-details class="header"></header-details>
    <list-panel></list-panel>

    <!-- 底部组件 -->
    <footer-bar></footer-bar>
  </div>
</template>

<script>
//引入组件
import headerDetails from "@/components/header/headerDetails.vue";
import listPanel from "../components/list/listPanel.vue";
import footerBar from "../components/footer/footerList.vue";

export default {
  data() {
    return {
      active: 1
    };
  },

  components: {
    //注册组件
    headerDetails,
    footerBar,
    listPanel
  },

  methods: {}
};
</script>

<style scoped lang="scss">
</style>