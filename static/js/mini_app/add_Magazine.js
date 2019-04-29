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
        magazine_year_id: '',
        title: '',
        sub_title: '',
        picture: [],
        stage: '',
        date_issue: '',
        price: '',
        content: '',
        status: '1',
      },

      rules: {
        title: [{
          required: true,
          message: '请输入杂志名称',
          trigger: 'blur',
        }],
        sub_title: [{
          required: true,
          message: '请输入杂志副标题',
          trigger: 'blur'
        }],
        picture: [{
          required: true,
          message: '请选择年份',
          trigger: 'blur',
          type: 'array',
          min: 1
        }],
        stage: [{
          required: true,
          message: '请输入当前期数',
          trigger: 'blur'
        }],
        date_issue: [{
          required: true,
          message: '请选择选择日期',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '请输入本期费用',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入杂志介绍',
          trigger: 'blur'
        }],
      },

      // 七牛云地址
      upload_img_url: this.adminApi.upload_url,
      postData: {},
      domain: '',

      magazine_id: '',

      // 年份
      year_data: [],
    }
  },

  /**
   * 进入页面加载
   */
  mounted: function () {
    var that = this;
    commJS.getQiNiuToken(that);
    commJS.get_year(that)

    var query = that.$route.query;
    if (query.magazine_id) {
      that.magazine_id = query.magazine_id;
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

      that.axios.post("/magazine/edit", {
        id: that.magazine_id
      }).then(data => {
        if (data) {
          that.form_data.magazine_year_id = data.magazine_year_id;
          that.form_data.title = data.title;
          that.form_data.sub_title = data.sub_title;
          that.form_data.picture = [{
            url: data.picture
          }];
          that.form_data.stage = data.stage;
          that.form_data.date_issue = new Date(data.date_issue);
          that.form_data.price = data.price;
          that.form_data.content = data.content;
          that.form_data.status = data.status.toString();
        }
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

        formData.magazine_year_id = that.form_data.magazine_year_id;
        formData.title = that.form_data.title;
        formData.sub_title = that.form_data.sub_title;
        formData.picture = that.form_data.picture[0].url;
        formData.stage = that.form_data.stage;
        formData.date_issue = commJS.formatTime(that.form_data.date_issue, 1);
        formData.price = that.form_data.price;
        formData.content = that.form_data.content;
        formData.status = that.form_data.status;

        var url = '/magazine/create';
        if (that.magazine_id) {
          formData.id = that.magazine_id;
          url = '/magazine/update';
        }
        that.axios.post(url, formData).then(() => {

          that.$message.success(that.magazine_id ? '修改成功' : '添加成功');
          that.$router.go(-1)
        });
      })
    },

    /**
     * 富文本改变时
     */
    editor_change(e) {
      this.form_data.content = e;
    },

    /**
     * 图片上传成功
     */
    img_succ(res) {
      const that = this;
      that.form_data.picture.push({
        url: that.domain + res.key,
      })
    },

    /**
     *图片移除
     */
    del_img(file, fileList) {
      this.form_data.picture = fileList
    },

    /**
     * 文件超出个数限制时的钩子
     */
    descExceed() {
      this.$message.warning('只能上传一张图片哦!');
    },

    /**
     * 返回
     */
    back() {
      this.$router.go(-1);
    },
  }
}
