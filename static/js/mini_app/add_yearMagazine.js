import commJS from '../common.js';
export default {
  data() {
    return {
      // 表单
      form_data: {
        name: '',
        picture: [],
        sort: '',
        status: '1',
      },

      rules: {
        picture: [{
          required: true,
          message: '请上传图片',
          trigger: 'blur',
          type: 'array',
          min: 1,
        }],
        sort: [{
          required: true,
          message: '请填写排序',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请填写名称',
          trigger: 'blur'
        }],
      },

      // 七牛云信息
      upload_img_url: this.adminApi.upload_url,
      postData: {},
      domain: '',

      year_id: ''
    }
  },

  /**
   * 进入页面加载
   */
  mounted: function () {
    var that = this;
    commJS.getQiNiuToken(that);

    var query = that.$route.query;

    if (query.year_id) {
      that.year_id = query.year_id;
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

      that.axios.post("/magazine_year/edit", {
        id: that.year_id
      }).then(data => {

        
        if (data) {
          that.form_data.name = data.name;
          that.form_data.picture = [{
            url: data.picture
          }];
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
      that.$refs.form_data.validate((valid) => {
        if (!valid) return that.$message.warning('请完整填写内容!');
        var formData = {};

        formData.name = that.form_data.name;
        formData.picture = that.form_data.picture[0].url;
        formData.sort = that.form_data.sort;
        formData.status = that.form_data.status;

        var url = '/magazine_year/create';
        if (that.year_id) {
          formData.id = that.year_id;
          url = '/magazine_year/update';
        }
        that.axios.post(url, formData).then(() => {
          that.$message.success(that.year_id ? '修改成功' : '添加成功');
          that.$router.go(-1)
        });
      })
    },

    /**
     * 图片超限制
     */
    descExceed: function (t, e) {
      this.$message.warning("只能上传一张图片哦!")
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
     * 返回
     */
    back() {
      this.$router.go(-1);
    },
  }
}
