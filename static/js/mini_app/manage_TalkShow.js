import commJS from '../common.js';
export default {
  data() {
    return {
      tableData: [],
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

      that.axios.post("/talk_show/index", formData).then(data => {
        if (data) {
          data.list.forEach(ele => {
            ele.status = ele.status == 1 ? '开启' : '关闭';
          })

          that.tableData = data.list;
          that.count = data.count;
          that.page = curr_page ? curr_page : that.page;
          curr_page ? sessionStorage.removeItem('curr_page') : '';
        }
      });
    },

    /**
     * 添加
     */
    add: function () {
      let that = this;
      commJS.save_page(that)

      that.$router.push({
        path: '/mini_app/add_TalkShow'
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
     * 修改
     */
    edit: function (id) {
      let that = this;
      commJS.save_page(that)

      that.$router.push({
        path: '/mini_app/add_TalkShow',
        query: {
          talk_id: id,
        }
      });
    },

    /**
     * 删除
     */
    del_item: function (e) {
      var that = this;

      that.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.axios.post("/talk_show/delete", {
          id: e
        }).then(res => {
          that.$message({
            type: 'success',
            message: `操作提示: ${ '删除成功' }`
          });
          that.getList();
        })
      }).catch(res => {});
    },

    /**
     * 链接地址
     */
    see_link(id) {
      var that = this;
      that.$confirm('/pages/talkshow/talk_details?id=' + id, '链接地址', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {}).catch();
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
