<template>
  <div>
    <div class="xiangshui" v-if="isshow">
      <span>香氛</span>
      <i @click="to"></i>
    </div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in bigImgs" :key="item.name">
        <img width="100%" :src="item.url" alt @click="to" />
      </van-swipe-item>
    </van-swipe>

    <nav>
      <li v-for="item in smallImgs" :key="item._id"  @click="godetails(item.url,item.brand,item.title,item.price.substr(0,7),item.type)">
        <div class="image">
          <img :src="item.url" alt />
        </div>
        <h6>{{item.brand}}</h6>
        <p>{{ item.title }}</p>
        <h5>{{ item.price.substr(0,7) }}</h5>
      </li>
    </nav>
  </div>
</template>

<script>
import goodApi from "@/api/good.js";
export default {
  props: ["isload"],
  data() {
    return {
        //默认标题不出现
      isshow:false,
      //存放大轮播图的数组
      bigImgs: [],
      //存放小轮播图的数组
      smallImgs: []
    };
  },

  components: {},

  methods: {
    //点击商品到详情页
    godetails(url,brand,title,price,type){
      this.$router.push({path:"/productDetails",query:{url,brand,title,price,type}})
    },
    to(){
      this.$router.push({
        path: "/details",
        query: {listname: "xiangshui"},
      })
    }
  },

  created() {},
  watch: {
    isload(newval) {
       this.isshow = true;
      if (newval) {
        //发送请求获取大图片数据
        goodApi.getTypeHomeImg("香水").then(res => {
          // console.log(res.data);
          this.bigImgs = Array.from(res.data.data[0].imgs);
        });
        //发送请求获取小图片数据
        goodApi.getTypeHomeListImg("xiangshui").then(res => {
          this.smallImgs = Array.from(res.data.data);
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
//引入vw样式
@import "@/assets/scss/public/common.scss";

//标题字体样式
.xiangshui {
  margin: vw(40) 0;
  padding: 0 vw(20);
  overflow: hidden;
  span {
    float: left;
    font-size: vw(40);
  }
  i {
    float: right;
    width: vw(50);
    height: vw(50);
    background: pink url("../../assets/img/more.png") no-repeat center center;
    background-size: cover;
  }
}

//轮播图
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  // height: 210px;
  background: #fff url("../../assets/img/product_loading.gif") center center;
  background-size: 70%;
}

//各种商品显示
nav {
  top: vw(100);
  // height: vw(350);
  display: flex;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  li {
    overflow: hidden;
    list-style: none;
    position: relative;
    // line-height: vw(330);
    width: vw(180);
    //felx-shrink一行中显示不变形
    flex-shrink: 0;
    // font-size: 14px;
    text-align: center;
    color: #000;
    margin: 0 vw(15);
    .image {
      width: vw(180);
      height: vw(180);
      background: #fff url("../../assets/img/product_loading.gif") center center;
      background-size: 70%;
      img {
        display: block;
        margin: 0 auto;
        width: 100%;
      }
    }

    h5 {
      padding: 0;
      font-size: vw(12);
      font-weight: normal;
    }
    p {
      padding: 0;
      font-size: vw(12);
      margin: vw(5) 0;
    }
    h6 {
      padding: 0;
      font-size: vw(12);
      font-weight: normal;
    }
  }
}
</style>