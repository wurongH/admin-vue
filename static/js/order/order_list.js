import commJS from '../common.js';
export default {
  data() {
    return {
      tableData: [],
      count: 0,
      page: 1,
      limit: 10,
      type: '',
      // 模糊搜索
      nickname: '',
      user_list: [],
      date: [],
      key: ''
    }
  },
  //进入页面加载
  mounted: function () {
    var that = this;
    that.getList();
  },

  //方法
  methods: {

    /**
     * 获取列表
     */
    getList() {
      let that = this;
      let formData = {};

      var curr_page = sessionStorage.getItem('curr_page');
      that.page = curr_page ? curr_page - 0 : that.page;

      formData.page = that.page;
      formData.limit = that.limit;
      formData.nickname = that.nickname;
      formData.sn = that.key;
      formData.type = that.type;
      formData.start_time = that.date && that.date.length > 0 ? commJS.formatTime(that.date[0], 1) : '';
      formData.end_time = that.date && that.date.length > 0 ? commJS.formatTime(that.date[1], 1) : '';

      that.axios.post("/order/index", formData).then(data => {
        if (data) {
          data.list.forEach(ele => {
            ele.create_time = commJS.formatTime(new Date(ele.create_time * 1000));
            ele.pay_time = commJS.formatTime(new Date(ele.pay_time * 1000));
          })

          that.tableData = data.list;
          that.count = data.count;
          that.page = curr_page ? curr_page : that.page;
          curr_page ? sessionStorage.removeItem('curr_page') : '';
        }
      });
    },

    /**
     * 模糊搜索
     */
    remoteMethod(e) {
      let that = this;

      that.axios.post("/order/user", {
        uname: e
      }).then(data => {
        if (data) {
          that.user_list = data;
        }
      });
    },

    /**
     * 导出表格
     */
    export_file() {
      let that = this;
      if (!that.tableData.length) return that.$message.warning('暂无数据!');
      var start_time = that.date.length ? commJS.formatTime(that.date[0], 1) : '';
      var end_time = that.date.length ? commJS.formatTime(that.date[1], 1) : '';

      window.location.href = that.adminApi.admin_api +  "/experience/order_export?token=" + that.token + '&type=' + that.type + '&sn=' + that.key + '&nickname=' + that.nickname + '&start_time=' + start_time + '&end_time=' + end_time;
    },

    /**
     * 搜索
     */
    search() {
      let that = this;
      that.page = 1;
      that.getList();
    },

    /**
     * 查看详情
     */
    detail: function (e) {
      let that = this;
      commJS.save_page(that)

      that.$router.push({
        path: '/order/order_detail',
        query: {
          user_id: e
        }
      });
    },

    /**
     * 下一页
     */
    handleCurrentChange: function (currentPage) {
      var that = this;
      that.page = currentPage;
      that.getList();
    },

  }
}
