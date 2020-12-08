<template>
  <div>
    <div class="blank"></div>
    <div class="panel">
      <ul class="leftPanel">
        <li v-for="(item,index) in datalist" :key="index" :class="{select:currentPath==item.path}">
          <router-link :class="{selectcolor:currentPath==item.path}" :to="item.path">{{item.name}}</router-link>
        </li>
        <li @click="to('tools')">礼物套装</li>
        <li @click="to('xiangshui')">独家发售</li>
      </ul>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPath: "",
      //遍历循环数据
      datalist: [
        { name: "护肤", path: "/list/hufu" },
        { name: "彩妆", path: "/list/caizhuang" },
        { name: "香水", path: "/list/xiangshui" },
        { name: "工具", path: "/list/tools" },
        { name: "男士", path: "/list/man" },
        { name: "洗浴护体", path: "/list/xiyu" },
        { name: "美发护发", path: "/list/meifa" },
        { name: "肤食", path: "/list/fushi" },
        // { name: "礼物套装", path: "/list/liwu" },
        // { name: "独家发售", path: "/list/dujia" }
      ]
    };
  },

  created() {
    this.currentPath = this.$route.path;
  },
  components: {},

  methods: {
    to(path){
      this.$router.push({
        path: "/details",
        query: {listname: path},
      })
    }

  },
  watch: {
    $route: {
      deep: true,
      handler(newval) {
        console.log(this.$route);
        this.currentPath = this.$route.path;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/public/common.scss";
.blank {
  background-color: transparent;
  width: 100vw;
  height: 7vh;
}
.panel {
  width: 100vw;
  display: flex;
  flex-direction: row;
  .select {
    background-color: #fff;
  }
  .selectcolor {
    color: #ee0000;
  }

  ul {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 83vh;
    list-style: none;
    &::-webkit-scrollbar {
      display: none;
    }

    li {
      flex-shrink: 0;
      overflow: hidden;
      height: vw(122);
      line-height: vw(122);
      text-align: center;
      background-color: #f5f5f5;
      color: #333;
      font-size: vw(20);
    }
  }
  .content {
    flex: 4;
    display: flex;
    flex-direction: column;
    height: 83vh;
    overflow-y: auto;
    border-bottom: vw(10) solid #f5f5f5;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>