<template>
  <div id="app">  


    <!-- 设置路由出口 用来切换各种页面-->
    <router-view></router-view>
  
  </div>
</template>
<script>
//1引入子组件
// import headerBar from './components/HeadrBar.vue'
// import midBar from './components/MiddleBar'

export default {
  //相当于自身的vue实例
    data () {
    return {
    }
    },

   components:{
    // 2注册子组件

   },
    watch: {

  },
}
</script>


<style lang="scss">
@charset "utf-8";
@import "@/assets/scss/public/common.scss";
html {
    height: 100%;
    width: 100%;
    body {
     height: 100%;
    width: 100%;
     #app{
          height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      
     }
    }
}

</style>
