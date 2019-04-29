export default {
  data: function () {
    return {
      user_name: '',
      passWord: ''
    }
  },
  methods: {
    //设置账号
    checkNumber: function (val) {
      this.user_name = val;
    },
    //设置密码
    checkPwd: function (val) {
      this.passWord = val;
    },
    //登陆
    Login: function () {
      var that = this;
      if (that.user_name === '') {
        that.$message({
          type: 'error',
          message: `操作提示: ${ '账号不能为空' }`
        });
        return;
      }
      if (that.passWord === '') {
        that.$message({
          type: 'error',
          message: `操作提示: ${  '请您输入密码' }`
        });
        return;

      }

      //请求登陆接口
      that.axios.post("/Login/login", {
        user_name: that.user_name,
        pass_word: that.passWord
      }).then(data => {

        //1,设置值到data
        that.adminApi.token = data.token;
        that.adminApi.user_name = data.user_name;
        that.adminApi.user_id = data.user_id;
        that.adminApi.identity = data.identity;
        that.adminApi.region_name = data.region_name;
        that.adminApi.seller_name = data.seller_name;

        //设置到缓存
        sessionStorage.setItem('access-token', data.token);
        sessionStorage.setItem('user_name', data.user_name);
        sessionStorage.setItem('user_id', data.user_id);
        sessionStorage.setItem('identity', parseInt(data.identity));
        sessionStorage.setItem('region_name', data.region_name);
        sessionStorage.setItem('seller_name', data.seller_name);

        that.$message({
          type: 'success',
          message: `操作提示: ${ '登陆成功' }`
        });
        //登录成功，把用户信息保存在sessionStorage中
        sessionStorage.setItem('access-token', that.adminApi.token);
        that.$router.push('/index');
      }).catch(res => {
        that.$message({
          type: 'warning',
          message: `操作提示: ${ res.msg }`
        });
      });
    },
  }
}
