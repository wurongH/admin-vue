import commJS from '../common.js';
export default {
  data() {
    return {
      user_id: '',
      tableData: [],

      avatar_url: '',
      nickname: '',
      gender: '',
      city: '',
      create_time: '',
      timestamp: '',
      total_consume_price: '',
      subscribe_count: '',
      order_count: '',
      vip_end_time: '',
      magazineYear: '',
      UserSubscribe: '',
      orderList: '',
      is_vip: '',
      member: '',
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

      that.axios.post("/user/read", {
        id: that.user_id
      }).then(data => {
        if (data) {
          that.avatar_url = data.user.avatar_url;
          that.nickname = data.user.nickname;
          that.gender = data.user.gender == 1 ? '男' : '女';
          that.city = data.user.city ? data.user.city : '--';
          that.is_vip = data.user.is_vip;
          that.create_time = commJS.formatTime(new Date(data.user.create_time * 1000)).split(' ')[0];
          that.timestamp = commJS.formatTime(new Date(data.user.timestamp * 1000)).split(' ')[0];
          that.total_consume_price = data.user.total_consume_price;
          that.subscribe_count = data.user.subscribe_count;
          that.order_count = data.user.order_count;
          that.vip_end_time = commJS.formatTime(new Date(data.user.vip_end_time * 1000)).split(' ')[0];

          data.member.forEach(ele => {
            ele.pay_time = commJS.formatTime(new Date(ele.pay_time * 1000));
            ele.end_time = commJS.formatTime(new Date(ele.end_time * 1000));
            ele.start_time = commJS.formatTime(new Date(ele.start_time * 1000));
          })
          that.member = data.member;

          data.magazineYear.forEach(ele => {
            ele.pay_time = commJS.formatTime(new Date(ele.pay_time * 1000));
            ele.end_time = commJS.formatTime(new Date(ele.end_time * 1000));
          })
          that.magazineYear = data.magazineYear;

          data.$UserSubscribe.forEach(ele => {
            ele.create_time = commJS.formatTime(new Date(ele.create_time * 1000));
          })
          that.UserSubscribe = data.$UserSubscribe;

          data.orderList.forEach(ele => {
            ele.create_time = commJS.formatTime(new Date(ele.create_time * 1000));
            ele.pay_time = commJS.formatTime(new Date(ele.pay_time * 1000));
          })
          that.orderList = data.orderList;

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
