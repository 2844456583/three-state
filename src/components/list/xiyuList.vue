<template>
  <div class="xiyudata">
    <div class="image">
      <img :src="imgurl" alt />
    </div>
    <div class="goodtype" v-for="(item,index) in arrs" :key="index">
      <header>
        <span>{{typelist[index]}}</span>
        <i @click="to(typelist[index])">
          <van-icon name="arrow" />
        </i>
      </header>
      <ul>
        <li v-for="item2 in item" :key="item2._id"    @click="godetails(item2.url,item2.brand,item2.title,item2.price.substr(0,7),item2.type)">
          <img :src="item2.url" alt />
          <p v-text="item2.title.slice(3)"></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import goodApi from "@/api/good.js";
import { Loading } from "vant";
export default {
  data() {
    return {
      imgurl: "",
      typelist: [
        "沐浴清洁",
        "身体护理",
        "手部护理",
        "胸部护理",
        "足部护理",
        "惠选套装"
      ],
      // typelist: ["卸妆"],
      arrs: []
    };
  },
  methods: {
    //点击商品到详情页
    godetails(url,brand,title,price,type){
      this.$router.push({path:"/productDetails",query:{url,brand,title,price,type}})
    },

    getTypeData(typename) {},
    to(smalltype){
      this.$router.push({
        path: "/details",
        query: {
          listname: "muyu",
          smalltype,//卸妆这种耳机筛选出来
          imgurl: this.imgurl
        }
      });
    }
  },
  created() {
    //发送请求获取顶部的图片
    goodApi.getTypeListImg("洗浴护体").then(res => {
      this.imgurl = res.data.data[0].url;
    });

    //获取每个分类的小分类图片
    this.typelist.forEach(item => {
      goodApi.getSmallTypeListImg("muyu", 1, 5, item).then(res => {
        this.arrs.push(res.data.data);
      });
    });
    console.log(this.arrs);
  },
  components: {}
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/public/common.scss";

.xiyudata {
  // background-color: #fff;

  .image {
    // padding: vw(18);
    padding: vw(20);
    img {
      width: 75vw;
      background: #fff url("../../assets/img/product_loading.gif") center center;
    }
  }
  .goodtype {
    border-bottom: vw(10) solid #f5f5f5;
    padding: vw(20);
    header {
      padding: vw(20) 0;
      height: vw(30);
      display: block;
      padding: vw(20);
      span {
        float: left;
      }
      i {
        float: right;
      }
    }
    ul {
      list-style: none;
      overflow: hidden;
      li {
        float: left;
        width: vw(166);
        height: vw(200);
        text-align: center;
        margin: vw(10);

        img {
          display: block;
          width: 100%;
          height: vw(150);
          margin-bottom: vw(20);
          background: #fff url("../../assets/img/product_loading.gif") center
            center;
          background-size: 90% 90%;
        }
        p {
          font-size: vw(20);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>