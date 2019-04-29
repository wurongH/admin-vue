export default {
  data() {
    return {
      qr_code: '',
      loading: false
    }
  },

  /**
   * 进入页面加载
   */
  mounted: function () {
    var that = this;
    that.getData();
  },

  //方法
  methods: {
    /**
     * 预览
     */
    getData() {
      const that = this;
      that.loading = true;

      var formData = {};

      that.axios.post('/config/is_ios', formData).then((data) => {
        that.qr_code = data;
        that.loading = false;
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
