<template>
  <div class="lunbo">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white"  :height="340">
      <van-swipe-item v-for="(item) in lunboArr" :key="item._id"><img width="100%" :src="item.url" alt="" @click="to" ></van-swipe-item>

    </van-swipe>
  </div>
</template>   

<script>
//引入axios的api接口
import goodApi from "@/api/good.js";


export default {

  data() {
    return {
      //存放大轮播图的数组
      lunboArr:[]
    };
  },

  components: {},

  methods: {
    
    to(){
      this.$router.push({
        path: "/details",
        query: {listname: "caizhuang"},
      })
    }
  },

  created(){
    //从服务器获取轮播图图片路径并存放到数组中
    goodApi.getlunbo().then(res=>{
      // console.log(res.data.data);
      this.lunboArr=Array.from(res.data.data);
      // console.log(this.lunboArr);
      
    })
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/public/common.scss";
.lunbo {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  top::-webkit-scrollbar {
    display: none;
  }

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background: #fff url("../../assets/img/product_loading.gif") center center;
    .van-swipe__indicators  i.van-swipe__indicator {
    width: 38px;
    height: 3px;
    border-radius: "";
  }
  }


}

</style>
