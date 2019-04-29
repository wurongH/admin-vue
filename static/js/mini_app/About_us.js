import richText from "../../../src/page/common/richText";

export default {
  components: {
    richText
  },
  data() {
    return {
      //  表单
      form_data: {
        content: ''
      },

      rules: {
        content: [{
          required: true,
          message: '请填写内容',
          trigger: 'blur'
        }],
      },
    };
  },

  /**
   * 进入页面加载
   */
  mounted: function () {
    var that = this;
    that.getDetail();
  },

  //方法
  methods: {
    /**
     * 获取详情
     */
    getDetail() {
      var that = this;

      that.axios.post("/config/view_about_us", {}).then(data => {
        if (data) {
          that.form_data.content = data;
        }
      });
    },

    /**
     * 保存预览
     */
    save() {
      const that = this;
      that.$refs.form_data.validate(valid => {
        if (!valid) return that.$message.warning("请完整填写内容!");
        var formData = {};
        formData.about_us = that.form_data.content;

        that.axios.post('/config/about', formData).then(res => {
          that.$message.success('设置成功');
        });
      });
    },

    /**
     * 富文本改变时
     */
    editor_change(e) {
      this.form_data.content = e;
    },
  }
};
