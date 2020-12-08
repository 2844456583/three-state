<template>
  <div class="grid">
    <van-grid column-num="5">
      <van-grid-item icon="label" text="畅销榜单" @click="to" />
      <van-grid-item icon="diamond" text="每周惠选" @click="to" />
      <van-grid-item icon="star" text="新品速递" @click="to" />
      <van-grid-item icon="gift" text="礼品套装" @click="to" />
      <van-grid-item icon="gem" text="小众尖货" @click="to"  />
      <van-grid-item icon="bookmark" text="全部品牌" @click="to" />
      <van-grid-item icon="shop" text="美妆先锋" @click="to" />
      <van-grid-item icon="vip-card" text="会员中心" @click="to" />
      <van-grid-item icon="shop" text="门店服务" @click="to" />
      <van-grid-item icon="phone" text="订购咨询" @click="to" />
    </van-grid>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },

  components: {},

  methods: {
    //页面默认跳转
        to(){
      this.$router.push({
        path: "/details",
        query: {listname: "hufu"},
      })
    }
  }
};
</script>

<style scoped>
</style>