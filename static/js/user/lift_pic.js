import commJS from '../common.js';
export default {
  data() {
    return {
      tableData: [],
      count: 0,
      page: 1,
      limit: 10,

      key: '',
      date: [],
      user_id: '',
    }
  },
  //进入页面加载
  mounted: function () {
    var that = this;

    var query = that.$route.query;
    if (query.user_id) {
      that.user_id = query.user_id;
      that.getList();
    }
  },

  //方法
  methods: {

    /**
     * 获取列表
     */
    getList() {
      let that = this;

      let formData = {};
      formData.id = that.user_id;

      formData.page = that.page;
      formData.limit = that.limit;
      formData.key = that.key;
      formData.start_time = that.date.length > 0 ? commJS.formatTime(that.date[0]) : '';
      formData.end_time = that.date.length > 0 ? commJS.formatTime(that.date[1]) : '';

      that.axios.post("/user/withdraw_recode", formData).then(data => {
        if (data) {
          data.list.forEach(ele => {
            ele.time = commJS.formatTime(new Date(ele.time * 1000));
          })

          that.tableData = data.list;
          that.count = data.count;
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

      window.location.href =that.adminApi.admin_api +   "/experience/balance_recode_export?token=" + that.token + '&key=' + that.key + '&id=' + that.user_id + '&start_time=' + start_time + '&end_time=' + end_time;
    },

    /**
     * 
     */
    search() {
      let that = this;
      that.page = 1;
      that.getList();
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
