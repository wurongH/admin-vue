import commJS from '../common.js';
export default {
  data() {
    return {
      tableData: [{
        name: 1
      }],
      count: 0,
      page: 1,
      limit: 10,
      keys: ''
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
      formData.key = that.keys;

      that.axios.post("/user/distribution_index", formData).then(data => {
        if (data) {

          that.tableData = data.list;
          that.count = data.count;
          that.page = curr_page ? curr_page : that.page;
          curr_page ? sessionStorage.removeItem('curr_page') : '';
        }
      });
    },

    /**
     * 搜索
     */
    search() {
      const that = this;
      that.page = 1;
      that.getList();
    },

    /**
     * 导出表格
     */
    export_file() {
      let that = this;
      if (!that.tableData.length) return that.$message.warning('暂无数据!');

      window.location.href = that.adminApi.admin_api + "/experience/balance_list_export?token=" + that.token + '&key=' + that.keys;
    },

    /**
     * 已提现金额
     */
    lift_pic: function (id) {
      let that = this;
      commJS.save_page(that)

      that.$router.push({
        path: '/user/lift_pic',
        query: {
          user_id: id
        }
      });
    },

    /**
     * 分销详情
     */
    detail: function (id) {
      let that = this;
      commJS.save_page(that)

      that.$router.push({
        path: '/user/distribution_detail',
        query: {
          user_id: id
        }
      });
    },

    /**
     * 订阅记录
     */
    Subscribe(id) {
      let that = this;
      commJS.save_page(that)

      that.$router.push({
        path: '/user/Subscribe',
        query: {
          id: id
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
