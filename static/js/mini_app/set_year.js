export default {
  data() {
    return {
      // 表单
      form_data: {
        magazine_annual_price: '',
        magazine_half_year_price: '',
      },

      rules: {
        magazine_annual_price: [{
          required: true,
          message: '请填写全年杂志价格',
          trigger: 'blur'
        }],
        magazine_half_year_price: [{
          required: true,
          message: '请填写半年杂志价格',
          trigger: 'blur'
        }],
      },
    }
  },

  /**
   * 进入页面加载
   */
  mounted: function () {
    var that = this;
    that.getData();
  },

  //方法
  methods: {
    /**
     * 预览
     */
    getData() {
      const that = this;

      var formData = {};

      that.axios.post('/config/view_price', formData).then((data) => {
        that.form_data.magazine_annual_price = data.magazine_annual_price;
        that.form_data.magazine_half_year_price = data.magazine_half_year_price;
      });
    },

    /**
     * 保存预览
     */
    save() {
      const that = this;
      that.$refs.form_data.validate((valid) => {
        if (!valid) return that.$message.warning('请完整填写内容!');
        var formData = {};

        formData.magazine_annual_price = that.form_data.magazine_annual_price;
        formData.magazine_half_year_price = that.form_data.magazine_half_year_price;

        that.axios.post('/config/set_price', formData).then(() => {
          that.$message.success('添加成功');
          that.$router.go(-1)
        });
      })
    },

    /**
     * 返回
     */
    back() {
      this.$router.go(-1);
    },
  }
}
