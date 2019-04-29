export default {
  data() {
    return {
      tableData: [],
      count: 0,
      page: 1,
      limit: 10,
      type: '1',
      code_number: '',
      dialogVisible: false,
      loading: false,

      // 小课id
      Lesson_essay_id: '',
      Lesson_essay_title: '',
    }
  },
  //进入页面加载
  mounted: function () {
    var that = this;
    that.token = sessionStorage.getItem('access-token');


    var query = that.$route.query;
    if (query.id) {
      that.Lesson_essay_id = query.id;
      that.Lesson_essay_title = query.title;
    }
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
      formData.coures_id = that.Lesson_essay_id;

      formData.is_use = that.type;

      that.axios.post("/course_code/course_code_index", formData).then(data => {
        if (data) {

          that.tableData = data.list;
          that.count = data.count;
        }
      });
    },

    /**
     * 确定生成
     */
    config_code() {
      const that = this;
      that.loading = true;

      var formData = {};
      formData.number = that.code_number;
      formData.id = that.Lesson_essay_id;

      that.axios.post('/course_code/create_course_code', formData).then(data => {

        that.loading = false;
        that.getList();
        that.code_number = '';
        that.$message.success('生成成功');
        that.dialogVisible = false;
      }).catch(res => {});
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
     * tab切换
     */
    handleClick(tab, event) {
      var that = this;
      that.type = tab.name;
      that.getList();
    },

    /**
     * 下载
     */
    down_img(e) {
      const that = this;

      location.href = that.adminApi.admin_api + '/course_code/download_code?code_url=' + e + '&token=' + that.token;
    },

    /**
     * 删除
     */
    del: function (e) {
      var that = this;

      that.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        that.axios.post("/course_code/delete", {
          id: e
        }).then((res) => {
          that.$message.success('删除成功');
          that.getList();
        }).catch(res => {
          that.$message.warning(res);
        });

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

  }
}
