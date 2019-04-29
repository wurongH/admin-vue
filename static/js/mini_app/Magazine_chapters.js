export default {
  data() {
    return {
      tableData: [],
      keys: '',

      magazine_id: '',
      magazine_year_id: '',
      magazine_name: '',
    }
  },
  //进入页面加载
  mounted: function () {
    var that = this;

    var query = that.$route.query;
    that.magazine_year_id = query.magazine_year_id;
    that.magazine_id = query.magazine_id;
    that.magazine_name = query.magazine_name;
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

      formData.page = 1;
      formData.limit = 9999;
      formData.key = that.keys;
      formData.id = that.magazine_id;

      that.axios.post("/magazine_article/index", formData).then(data => {
        if (data) {
          data.list.forEach(ele => {
            ele.type = ele.type == 1 ? '章节' : '文章';
            ele.status = ele.status == 1 ? '开启' : '关闭';
          })

          that.tableData = data.list;
        }
      });
    },

    /**
     * 添加
     */
    add: function () {
      let that = this;

      that.$router.push({
        path: '/mini_app/add_Magazine_chapters',
        query: {
          magazine_id: that.magazine_id,
          magazine_year_id: that.magazine_year_id,
          magazine_name: that.magazine_name,
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
     * 修改
     */
    edit: function (id) {
      let that = this;

      that.$router.push({
        path: '/mini_app/add_Magazine_chapters',
        query: {
          chapters_id: id,
          magazine_id: that.magazine_id,
          magazine_year_id: that.magazine_year_id,
          magazine_name: that.magazine_name,
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
        that.axios.post("/magazine_article/delete", {
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
     * 返回
     */
    back() {
      this.$router.push('/mini_app/manage_Magazine')
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
