export default {
  data() {
    return {
      tableData: [],
      count: 0,
      page: 1,
      limit: 10,
      keys: '',

      smallLesson_id: '',
      smallLesson_name: '',
    }
  },
  //进入页面加载
  mounted: function () {
    var that = this;

    var query = that.$route.query;
    that.smallLesson_id = query.smallLesson_id;
    that.smallLesson_name = query.smallLesson_name;
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
      formData.page = that.page;
      formData.limit = that.limit;
      formData.key = that.keys;
      formData.id = that.smallLesson_id;

      that.axios.post("/course_article/index", formData).then(data => {
        if (data) {
          data.list.forEach(ele => {
            ele.status = ele.status == 1 ? '开启' : '关闭';
          })

          that.tableData = data.list;
          that.count = data.count;
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
     * 添加
     */
    add: function () {
      let that = this;

      that.$router.push({
        path: '/mini_app/add_Lesson_essay',
        query: {
          smallLesson_id: that.smallLesson_id,
          smallLesson_name: that.smallLesson_name,
        }
      });
    },

    /**
     * 修改
     */
    edit: function (id) {
      let that = this;

      that.$router.push({
        path: '/mini_app/add_Lesson_essay',
        query: {
          smallLesson_id: that.smallLesson_id,
          smallLesson_name: that.smallLesson_name,
          Lesson_essay_id: id
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
        that.axios.post("/course_article/delete", {
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
     * 下一页
     */
    handleCurrentChange: function (currentPage) {
      var that = this;
      that.page = currentPage;
      that.getList();
    },

    /**
     * 返回
     */
    back() {
      this.$router.go(-1);
    },

  }
}
