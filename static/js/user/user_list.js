export default {
  data() {
    return {
      tableData: [{
        name: 1
      }],
      count: 0,
      page: 1,
      limit: 10,
      keys: '',
      vip: '',
      ispay: '',
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
      formData.vip = that.vip;
      formData.ispay = that.ispay;
      formData.key = that.keys;

      that.axios.post("/user/index", formData).then(data => {
        if (data) {
          data.list.forEach(ele => {
            ele.gender = ele.gender == 1 ? '男' : '女';
            ele.is_vip = ele.is_vip == 1 ? '会员' : '非会员';
          })

          that.tableData = data.list;
          that.count = data.count;
          that.page = curr_page ? curr_page : that.page;
          curr_page ? sessionStorage.removeItem('curr_page') : '';
        }
      });
    },

    /**
     * 查看用户详情
     */
    to_detail: function (id) {
      let that = this;
      that.$router.push({
        path: '/user/user_detail',
        query: {
          user_id: id
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
     * 订阅记录
     */
    Subscribe(id) {
      let that = this;

      that.$router.push({
        path: '/user/Subscribe',
        query: {
          user_id: id
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
