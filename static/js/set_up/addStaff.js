export default {
  data() {
    return {
      staff_id: 0,
      formData: {
        username: '',
        password: '',
        name: '',
        phone_num: '',
        auth: '1'
      },
      rules: {
        username: [{
          required: true,
          message: '请输入输手机号码',
          trigger: 'blur'
        }, ],
        name: [{
          required: true,
          message: '请选择姓名',
          trigger: 'blur'
        }, ],
        password: [{
          required: true,
          message: '请选择密码',
          trigger: 'blur'
        }, ],
        phone_num: [{
          required: true,
          message: '请输入手机号码',
          trigger: 'blur'
        }, ]
      },

      // 权限列表
      Role_list: []
    };
  },
  //进入页面加载
  mounted: function () {
    var that = this;
    that.get_Role_list();

    if (that.$route.query.id) {
      that.staff_id = that.$route.query.id;
      that.detail();
    }
  },

  methods: {

    /**
     * 获取数据
     */
    detail: function () {
      var that = this;
      //请求登陆接口
      that.axios.post("/Manager/show_edit", {
        id: that.staff_id,
      }).then(data => {

        that.formData.username = data.username;
        that.formData.phone_num = data.mobile;
        that.formData.name = data.truename;
        that.formData.auth = data.identity;

      });
    },

    /**
     * 保存
     */
    submitForm: function (formName) {
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (that.staff_id == 0) {
            that.add();
          } else {
            that.edit();
          }
        } else {
          return false;
        }
      });
    },

    /**
     * 添加员工
     */
    add: function () {
      const that = this;

      //请求的数据
      var formData = {};
      formData.mobile = that.formData.phone_num;
      formData.username = that.formData.username;
      formData.truename = that.formData.name;
      formData.password = that.formData.password;
      formData.identity = that.formData.auth;

      //请求api
      that.axios.post("/Manager/add", formData).then(res => {
        that.$message({
          type: 'success',
          message: `操作提示: ${ '添加成功' }`
        });
        that.$router.back(-1);
      });
    },

    /**
     * 权限列表
     */
    get_Role_list() {
      const that = this;

      that.axios.post("/Role/index", {
        page: 1,
        limit: 99999,
      }).then(data => {
        if (!data) return;

        that.Role_list = data.list;
      });
    },

    /**
     * 返回
     */
    back() {
      this.$router.go(-1);
    },

    /**
     * 修改员工
     */
    edit: function () {
      const that = this;

      //请求的数据
      var formData = {};
      formData.mobile = that.formData.phone_num;
      formData.truename = that.formData.name;
      formData.username = that.formData.username;
      formData.password = that.formData.password;
      formData.identity = that.formData.auth;
      formData.id = that.staff_id;

      //请求api
      that.axios.post("/Manager/edit", formData).then(res => {
        // 处理成功的结果
        that.$message({
          type: 'success',
          message: '操作提示: 修改成功'
        });
        that.$router.back(-1);
      });
    },

  }
}
