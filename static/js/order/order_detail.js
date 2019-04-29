import commJS from '../common.js';
export default {
  data() {
    return {
      user_id: '',


      sn: '',
      avatar_url: '',
      nickname: '',
      type_name: '',
      create_time: '',
      pay_price: '',
      is_pay: '',
      pay_time: '',
      title: '',
      picture: '',
      author: '',
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

      that.axios.post("/order/read", {
        id: that.user_id
      }).then(data => {
        if (data) {
          that.sn = data.sn;
          that.avatar_url = data.avatar_url;
          that.nickname = data.nickname;
          that.type_name = data.type_name;
          that.create_time = commJS.formatTime(new Date(data.create_time * 1000));
          that.pay_price = data.pay_price;
          that.is_pay = data.is_pay;
          that.title = data.title;
          that.picture = data.picture;
          that.author = data.author ? data.author : '';
          that.pay_time = commJS.formatTime(new Date(data.pay_time * 1000));
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
