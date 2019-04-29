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
        type: '1',
        title: '',
        sub_title: '',
        color: '',
        picture: [],
        content: '',
        author: '',
        sort: '',
        status: '1',
      },

      // 七牛云地址
      upload_img_url: this.adminApi.upload_url,
      postData: {},
      domain: '',

      magazine_id: '',
      magazine_year_id: '',
      magazine_name: '',

      // 章节id
      chapters_id: ''
    }
  },

  /**
   * 进入页面加载
   */
  mounted: function () {
    var that = this;
    commJS.getQiNiuToken(that);

    var query = that.$route.query;
    that.magazine_year_id = query.magazine_year_id;
    that.magazine_id = query.magazine_id;
    that.magazine_name = query.magazine_name;

    if (query.chapters_id) {
      that.chapters_id = query.chapters_id;
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

      that.axios.post("/magazine_article/edit", {
        id: that.chapters_id
      }).then(data => {
        if (data) {

          that.form_data.picture = [{
            url: data.picture
          }];

          that.form_data.type = data.type.toString();
          that.form_data.title = data.title;
          that.form_data.sub_title = data.sub_title;
          that.form_data.color = data.color;
          that.form_data.content = data.content;
          that.form_data.author = data.author;
          that.form_data.sort = data.sort;
          that.form_data.status = data.status.toString();
        }
      });
    },

    /**
     * 保存预览
     */
    save() {
      const that = this;
      var formData = {};

      formData.magazine_year_id = that.magazine_year_id;
      formData.magazine_id = that.magazine_id;
      formData.type = that.form_data.type;
      formData.title = that.form_data.title;
      formData.sub_title = that.form_data.sub_title;
      formData.color = that.form_data.color;
      formData.picture = that.form_data.picture.length > 0 ? that.form_data.picture[0].url : '';
      formData.content = that.form_data.content;
      formData.author = that.form_data.author;
      formData.sort = that.form_data.sort;
      formData.status = that.form_data.status;

      var url = '/magazine_article/create';
      if (that.chapters_id) {
        formData.id = that.chapters_id;
        url = '/magazine_article/update';
      }
      that.axios.post(url, formData).then(() => {

        that.$message.success(that.chapters_id ? '修改成功' : '添加成功');
        that.$router.go(-1)
      });
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
