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
        sub_title: '',
        cover: [],
        picture: [],
        price: '',
        is_end: '1',
        content: '',
        status: '1',
      },

      rules: {
        title: [{
          required: true,
          message: '请输入小课名称',
          trigger: 'blur',
        }],
        sub_title: [{
          required: true,
          message: '请输入小课副标题',
          trigger: 'blur',
        }],
        cover: [{
          required: true,
          message: '请上传小课封面',
          trigger: 'blur',
          type: 'array',
          min: 1
        }],
        picture: [{
          required: true,
          message: '请上传小课图片头图',
          trigger: 'blur',
          type: 'array',
          min: 1
        }],
        price: [{
          required: true,
          message: '请输入小课的费用',
          trigger: 'blur',
        }],
        content: [{
          required: true,
          message: '请输入小课内容',
          trigger: 'blur',
        }],
      },

      // 七牛云地址
      upload_img_url: this.adminApi.upload_url,
      postData: {},
      domain: '',

      smallLesson_id: '',
    }
  },

  /**
   * 进入页面加载
   */
  mounted: function () {
    var that = this;
    commJS.getQiNiuToken(that);

    var query = that.$route.query;
    if (query.smallLesson_id) {
      that.smallLesson_id = query.smallLesson_id;
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

      that.axios.post("/course/edit", {
        id: that.smallLesson_id
      }).then(data => {
        if (data) {
          that.form_data.title = data.title;
          that.form_data.sub_title = data.sub_title;
          that.form_data.cover = [{
            url: data.cover
          }];
          that.form_data.picture = [{
            url: data.picture
          }];
          that.form_data.price = data.price;
          that.form_data.is_end = data.is_end.toString();
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

        formData.title = that.form_data.title;
        formData.sub_title = that.form_data.sub_title;
        formData.cover = that.form_data.cover[0].url;
        formData.picture = that.form_data.picture[0].url;
        formData.price = that.form_data.price;
        formData.is_end = that.form_data.is_end;
        formData.content = that.form_data.content;
        formData.status = that.form_data.status;

        var url = '/course/create';
        if (that.smallLesson_id) {
          formData.id = that.smallLesson_id;
          url = '/course/update';
        }
        that.axios.post(url, formData).then(() => {

          that.$message.success(that.smallLesson_id ? '修改成功' : '添加成功');
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
      that.form_data.cover.push({
        url: that.domain + res.key,
      })
    },

    /**
     *图片移除
     */
    del_img(file, fileList) {
      this.form_data.cover = fileList
    },

    /**
     * 文件超出个数限制时的钩子
     */
    descExceed() {
      this.$message.warning('只能上传一张图片哦!');
    },

    /**
     * 图片上传成功
     */
    img_succ2(res) {
      const that = this;
      that.form_data.picture.push({
        url: that.domain + res.key,
      })
    },

    /**
     *图片移除
     */
    del_img2(file, fileList) {
      this.form_data.picture = fileList
    },

    /**
     * 文件超出个数限制时的钩子
     */
    descExceed2() {
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
