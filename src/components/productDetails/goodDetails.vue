<template>
  <div class="goodDetails">
        <!-- 商品详情+规格参数 -->
    <div class="detail">
      <div class="top">
        <p>
          <span :class="{redColor:currentbox=='one'}" @click="changeColor('one')">商品详情</span>|
          <span :class="{redColor:currentbox=='two'}" @click="changeColor('two')">规格参数</span>
        </p>
      </div>
      <div class="bigcontent" v-show="currentbox=='one'">
        <div class="context">
          <h3>产品功效</h3>
          <h4>
            纪梵希高定香榭红丝绒唇膏N37 3.4g
            纪梵希高定香榭红丝绒唇膏N36 3.4g
            唇膏壳水蜜桃粉
            丝芙兰中国，限量5000套，售完为止。
          </h4>

          <h3>产地</h3>
          <h4>中国/法国</h4>
          <h5>支付及配送</h5>
          <h6>
            1 在线支付
            <br />支持支付宝、微信、及目前市场所有主流银行卡的在线支付。请在确认订单后选择相应支付界面进行支付。
          </h6>
        </div>
        <div class="price">
          <h5>价格声明</h5>
          <h6>本店商品标注的促销价，为此商品的实际售价。本店标注的其他价格信息，如划线价、专柜价、建议零售价、价值等，为仅供消费者参考的市场价格信息，来源为有关商品实体店的柜台售价、品牌方建议零售价或者根据有关商品正装产品售价和容量推算的价值等，便于您了解市场行情和价格变动。但是，由于地区、时间和行情波动因素，这些价格的实际情况可能与本店标注的其他价格信息有所不同。</h6>
        </div>
        <div class="tuihuo">
          <h5>退换货声明</h5>
          <h6>
            1. 我们不接受包装盒已被开封的商品的退换货（商品外包装盒上的透明封装胶纸已被撕开同样视为开封），请您谅解！
            <br />2. 所有未开封的商品如需退换请于签收日算起14日内办理，退货收到并确认无误后于一周内办理退款。
            <br />3. 如您需整单退换，请您务必将当次订单中所有商品（包括免费赠品、包装礼盒）全部退回。
            <br />4. 因顾客自身原因造成退换货时，由顾客承担商品退回时的邮资和再次发送时的运费。
            <br />5. 如该商品曾被积分，退货后，该笔金额产生的积分将被从积分数中扣除。
            <br />6. 如您希望调换其它等价商品，请您先为需要退回的订单办理退货，我们收到退货并确认无误后，将为您发送新的商品。若您希望调换的为非等价商品，请您先为您的订单办理退货及退款，然后至网站另行订购您喜欢的其它商品，我们将另行发送。
            <br />7. 如您在使用了于丝芙兰网站购买的产品后出现过敏症状，在提供相关医院出具的有效证明后，我们将接受此产品的退货。
          </h6>
        </div>
        <div class="consume">
          <h5>消费提醒</h5>
          <h6>国家药监局提示您：请正确认识化妆品功效，化妆品不能替代药品，不能治疗皮肤病等疾病。国家药监局提示您：宣称用于祛斑美白、防晒、染发、烫发等的化妆品为特殊用途化妆品，产品标签上应标注‘国妆特字’或者‘国妆特进字’的批准文号。</h6>
        </div>
      </div>
      <div class="guige" v-show="currentbox=='two'">
        <h3>适用部位：唇部</h3>
        <h3>功效：造型</h3>
        <h3>适合肤质：各种肤质</h3>
        <h3>质地：固态</h3>
        <h3>妆效：各种妆效</h3>
        <h3>遮盖力：高度</h3>
        <h3>规格：套装</h3>
        <h3>货号：528586</h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      currentbox: "one"
    };
  },

  components: {},

  methods: {
    changeColor(name) {
      this.currentbox = name;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/public/common.scss";
// 产品详情+规格参数
.goodDetails{
    height: 85vh;
  overflow-y: auto;

.detail {
  width: 100vw;
  height: 80vh;
  background-color: #fff;
  .top {
    width: 100vw;
    height: 8vh;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      display: flex;
      justify-content: space-between;
      width: 70vw;
      color: #999;
      span {
        &.redColor {
          color: #ee0000;
        }
        color: #999;
        font-size: vw(30);
      }
    }
  }
  .context {
    box-sizing: border-box;
    width: 100vw;
    padding: 0 3vw;
    h3 {
      border-bottom: 1px solid #eee;
      font-weight: normal;
      font-size: vw(28);
      padding: 1vh 0;
    }
    h4 {
      margin-top: 1vh;
      font-weight: normal;
      font-size: vw(26);
      padding-bottom: 3vh;
      color: #666;
    }
    h5 {
      font-weight: normal;
      font-size: vw(28);
    }
    h6 {
      margin-top: 1vh;
      font-weight: normal;
      font-size: vw(26);
      padding-bottom: 2vh;
      color: #666;
    }
  }
  .tuihuo,
  .price,
  .consume {
    border-top: 1.5vh solid #f5f5f5;
    padding: 3vw;
    h5 {
      font-weight: normal;
      font-size: vw(28);
    }
    h6 {
      margin-top: 1vh;
      font-weight: normal;
      font-size: vw(26);
      padding-bottom: 2vh;
      color: #666;
    }
  }
  .guige {
    box-sizing: border-box;
    width: 100vw;
    padding: 0 3vw;
    h3 {
      border-bottom: 1px solid #eee;
      font-weight: normal;
      font-size: vw(28);
      padding: 2vh 0;
    }
  }
}
}


</style>