export default {
  name: 'index',
  data() {
    var validOldPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码'));
      } else {
        if (this.ruleForm2.checkOldPass !== '') {
          this.$refs.ruleForm2.validateField('checkOldPass');
        }
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      isCollapse: true,
      user_name: '',
      user_id: '',
      token: '',
      menuList: [],
      oneMenuName: '',
      twoMenuName: '',
      threeMenuName: '',
      key: 0,
      ruleForm2: {
        pass: '',
        checkPass: '',
        OldPass: ''
      },
      rules2: {
        checkOldPass: [{
          validator: validOldPass,
          trigger: 'blur'
        }],
        pass: [{
          validator: validatePass,
          trigger: 'blur'
        }],
        checkPass: [{
          validator: validatePass2,
          trigger: 'blur'
        }],
      },
      dialogVisible: false,
    };
  },

  //进入页面加载
  mounted: function () {
    var that = this;
    that.user_name = sessionStorage.getItem("user_name");
    that.user_id = sessionStorage.getItem("user_id");
    //获取菜单列表
    that.getMenuList();
  },

  methods: {

    /**
     * 退出登陆
     */
    logout: function () {
      var _this = this;
      this.$confirm('确认退出吗?', '提示', {
        type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('user');
        _this.$router.push('/login');
      }).catch(() => {

      });
    },

    /**
     * 请求菜单api
     */
    getMenuList: function () {
      var that = this;
      //请求登陆接口
      that.axios.post("/System/show", {}).then(data => {
          
          for (var i in data) {
            data[i].img = data.icon;
          }
          that.menuList = data;
        },
        function () {});
    },

    /**
     * 提交
     */
    submitForm(formName) {
      var that = this;
      that.$refs[formName].validate((valid) => {
        if (valid) {
          that.editPass();
          // alert('submit!');
        } else {
          return false;
        }
      });
    },

    /**
     * 重置
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    /**
     * 关闭
     */
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
          this.ruleForm2 = {
            pass: '',
            checkPass: '',
            checkOldPass: ''
          };
        })
        .catch(_ => {});
    },

    /**
     * 修改密码api
     */
    editPass: function () {
      var that = this;
      that.axios.post("/Manager/edit_pass_word", {
        id: that.user_id,
        old_password: that.ruleForm2.OldPass,
        newPassword: that.ruleForm2.pass,
        newConfirmPassword: that.ruleForm2.checkPass
      }).then(res => {
        that.$message({
          type: 'success',
          message: `操作提示: ${ '修改成功' }`
        });
        that.ruleForm2 = {
          pass: '',
          checkPass: '',
          checkOldPass: ''
        };
        that.dialogVisible = false;
      }).catch(res => {

        that.$message({
          type: 'error',
          message: `操作提示: ${ res }`
        });
      });
    }
  }
}
