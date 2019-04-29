import commJS from '../common.js';
import richText from '../../../src/page/common/richText';

export default {
  components: {
    richText
  },
  data() {
    return {
      //  表单
      form_data: {
        title: '',
        content: '',
        sort: '',
        status: '1',
      },

      rules: {
        title: [{
          required: true,
          message: '请输入帮助说明标题',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }],
        sort: [{
          required: true,
          message: '请填写活动名称',
          trigger: 'blur'
        }],
      },

      help_id: ''
    }
  },

  /**
   * 进入页面加载
   */
  mounted: function () {
    var that = this;
    commJS.getQiNiuToken(that);

    var query = that.$route.query;
    if (query.help_id) {
      that.help_id = query.help_id;
      that.getDetail();
    }
  },

  //方法
  methods: {
    /**
     * 获取详情
     */
    getDetail() {
      var that = this;

      that.axios.post("/help/edit", {
        id: that.help_id
      }).then(data => {
        if (data) {

          that.form_data.title = data.title;
          that.form_data.content = data.content;
          that.form_data.sort = data.sort;
          that.form_data.status = data.status.toString();
        }
      });
    },

    /**
     * 返回
     */
    back() {
      this.$router.go(-1);
    },

    /**
     * 富文本
     */
    editor_change(e) {
      this.form_data.content = e;
    },

    /**
     * 保存预览
     */
    save() {
      const that = this;
      that.$refs.form_data.validate((valid) => {
        if (!valid) return that.$message.warning('请完整填写内容!');
        var formData = {};
        formData.title = that.form_data.title;
        formData.content = that.form_data.content;
        formData.sort = that.form_data.sort;
        formData.status = that.form_data.status;

        var url = '/help/create';
        if (that.help_id) {
          formData.id = that.help_id;
          url = '/help/update';
        }

        that.axios.post(url, formData).then(() => {
          that.$message.success(that.help_id ? '修改成功' : '添加成功');
          that.$router.go(-1)
        });
      })
    }
  }
}
