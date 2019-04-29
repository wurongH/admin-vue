export default {
  data() {
    return {
      list_data: [],
      checked: ''
    }
  },
  //进入页面加载
  mounted: function () {
    var that = this;

    that.getlist();
  },

  //方法
  methods: {
    /**
     * 获取列表
     */
    getlist() {
      let that = this;

      //请求的数据
      let formData = {};

      that.axios.post("/System/index", formData).then(data => {
          if (data) {
            data.forEach(ele => {
              ele.status = ele.status == 1 ? true : false;

              if (ele.child) {
                ele.child.forEach(item => {
                  item.status = item.status == 1 ? true : false;
                })
              }
            });

            that.list_data = data;
          }
        });
    },

    /**
     * 添加菜单
     */
    addRegion() {
      this.$router.push('/set_up/add_menu')
    },

    /**
     * 修改菜单
     */
    edit(e) {
      this.$router.push({
        path: '/set_up/add_menu',
        query: {
          id: e
        }
      })
    },

    /**
     * 
     */
    del(e) {
      var that = this;
      that.$confirm('是否删除该菜单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        that.axios.post("/System/delete", {
          id: e
        }).then(data => {
            if (data) {
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
              that.getlist();
            }
          });
      })
    }

  }
}
