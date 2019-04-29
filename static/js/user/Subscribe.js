export default {
  data() {
    return {
      tableData: [{
        name: 1
      }],
      type: '2',
      count: '1',

      magazine_count: "",
      course_count: "",
      talkshow_count: "",
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
      formData.user_id = that.user_id;
      formData.type = that.type;

      that.axios.post("/user_subscribe/index", formData).then(data => {
          if (data) {
            that.tableData = data.list;
            that.magazine_count = data.magazine_count;
            that.course_count = data.course_count;
            that.talkshow_count = data.talkshow_count;
          }
        });
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
     * 下一页
     */
    handleCurrentChange: function (currentPage) {
      var that = this;
      that.page = currentPage;
      that.getList();
    },

  }
}
