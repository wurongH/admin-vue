import commJS from '../common.js';
export default {
  data() {
    return {
      user_id: '',

      avatar_url: '',
      nickname: '',
      total_profit_price: '',
      drainage_count: '',
      total_receive_price: '',
      can_withdraw_money: '',
      source_user: [],
      recode: [],
    }
  },

  /**
   * 进入页面加载
   */
  mounted: function () {
    var that = this;

    var query = that.$route.query;
    if (query.user_id) {
      that.user_id = query.user_id;
      that.getDetail();
    }


  },

  //方法
  methods: {
    /**
     * 获取详情
     */
    getDetail() {
      var that = this;

      that.axios.post("/user/distribution_read", {
        id: that.user_id
      }).then(data => {
        if (data) {
          that.avatar_url = data.user[0].avatar_url;
          that.nickname = data.user[0].nickname;
          that.total_profit_price = data.user[0].total_profit_price;
          that.drainage_count = data.user[0].drainage_count;
          that.total_receive_price = data.user[0].total_receive_price;
          that.can_withdraw_money = data.user[0].can_withdraw_money;
          that.source_user = data.source_user;
          that.recode = data.recode;
        }
      });
    },

    /**
     * 返回
     */
    back() {
      this.$router.go(-1);
    },
  }
}
