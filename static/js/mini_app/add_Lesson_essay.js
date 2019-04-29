import commJS from "../common.js";
import richText from "../../../src/page/common/richText";

export default {
  components: {
    richText
  },
  data() {
    return {
      //  表单
      form_data: {
        title: "",
        sub_title: "",
        picture: [],
        audio: "",
        duration: "",
        content: "",
        sort: "",
        status: "1",
        author: "",
      },

      rules: {
        title: [{
          required: true,
          message: "请输入小课标题",
          trigger: "blur"
        }],
        sub_title: [{
          required: true,
          message: "请输入小课副标题",
          trigger: "blur"
        }],
        picture: [{
          required: true,
          message: "请上传图片",
          trigger: "blur",
          type: "array",
          min: 1
        }],
        audio: [{
          required: true,
          message: "请上传音频",
          trigger: "blur",
        }],
        duration: [{
          required: true,
          message: "请输入音频时长",
          trigger: "blur"
        }],
        content: [{
          required: true,
          message: "请输入文章内容",
          trigger: "blur"
        }],
        sort: [{
          required: true,
          message: "请输入排序数字",
          trigger: "blur"
        }],
        author: [{
          required: true,
          message: "请输入作者姓名",
          trigger: "blur"
        }],
      },

      // 七牛云地址
      upload_img_url: this.adminApi.upload_url,
      postData: {},
      //图片域名
      domain: "",

      // 小课文章id
      Lesson_essay_id: "",
      smallLesson_name: '',
      // 小课id
      course_id: "",

      // 音频
      src: "",
      is_upload_video: false,
      preview_video_dialog: false,
      loading: '',
      music: {
        isPlay: false,
        currentTime: 0,
        maxTime: 0,
        volume: 100
      }
    };
  },

  /**
   * 进入页面加载
   */
  mounted: function () {
    var that = this;
    commJS.getQiNiuToken(that);

    var query = that.$route.query;
    that.course_id = query.smallLesson_id;
    that.smallLesson_name = query.smallLesson_name;

    if (query.Lesson_essay_id) {
      that.Lesson_essay_id = query.Lesson_essay_id;
      that.getDetail();
    }

    //初始化播放器
    that.$nextTick(() => {
      setInterval(that.listenMusic, 1000);
    });
  },

  //方法
  methods: {
    /**
     * 获取详情
     */
    getDetail() {
      var that = this;

      that.axios.post("/course_article/edit", {
          id: that.Lesson_essay_id
        }).then(data => {
            
          if (data) {
            that.form_data.title = data.title;
            that.form_data.sub_title = data.sub_title;
            that.form_data.picture = [{
              url: data.picture
            }];
            that.form_data.audio = data.audio;
            that.form_data.duration = data.duration;
            that.form_data.content = data.content;
            that.form_data.sort = data.sort;
            that.form_data.status = data.status.toString();
            that.form_data.author = data.author;
            that.is_upload_video = true;
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

        formData.course_id = that.course_id;
        formData.title = that.form_data.title;
        formData.sub_title = that.form_data.sub_title;
        formData.picture = that.form_data.picture[0].url;
        formData.audio = that.form_data.audio;
        formData.duration = that.form_data.duration;
        formData.content = that.form_data.content;
        formData.sort = that.form_data.sort;
        formData.status = that.form_data.status;
        formData.author = that.form_data.author;

        var url = '/course_article/create';
        if (that.Lesson_essay_id) {
          formData.id = that.Lesson_essay_id;
          url = '/course_article/update';
        }

        that.axios.post(url, formData).then(() => {
          that.$message.success(that.Lesson_essay_id ? '修改成功' : '添加成功');
          that.$router.go(-1);
        });
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
        url: that.domain + res.key
      });
    },

    /**
     *图片移除
     */
    del_img(file, fileList) {
      this.form_data.picture = fileList;
    },

    /**
     * 文件超出个数限制时的钩子
     */
    descExceed() {
      this.$message.warning("只能上传一张图片哦!");
    },

    handle_exceed_video() {
      this.$message.warning("只能上传一个音频!");
    },

    /**
     * 上传音频-成功
     */
    upload_video_success(e) {
      let that = this;
      that.form_data.audio = that.domain + e.key;
      that.is_upload_video = true;
      that.loading = false;

      setTimeout(function () {
        that.form_data.duration = Math.floor(that.$refs.music.duration);
      }, 700)
    },

    /**
     * 上传前
     */
    before_upload() {
      this.loading = true;
    },

    /**
     * 移除
     */
    remove_audio(e) {
      let that = this;

      that.$confirm('是否删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        that.form_data.video = "";
        that.is_upload_video = false;

      }).catch();
    },

    /**
     * 返回
     */
    back() {
      this.$router.go(-1);
    },

    /**
     * 播放器
     */
    listenMusic() {
      if (!this.$refs.music) {
        return;
      }
      if (this.$refs.music.readyState) {
        this.music.maxTime = this.$refs.music.duration;
      }
      this.music.isPlay = !this.$refs.music.paused;
      this.music.currentTime = this.$refs.music.currentTime;
    },

    /**
     * 播放/暂停音乐
     */
    play() {
      if (this.$refs.music.paused) {
        this.$refs.music.play();
      } else {
        this.$refs.music.pause();
      }
      this.music.isPlay = !this.$refs.music.paused;
      this.$nextTick(() => {
        document.getElementById("play").blur();
      });
    },

    /**
     * 格式化时间
     */
    formatTime(time) {
      let it = parseInt(time);
      let m = parseInt(it / 60);
      let s = parseInt(it % 60);
      return (m < 10 ? "0" : "") + parseInt(it / 60) + ":" + (s < 10 ? "0" : "") + parseInt(it % 60)
    },

    /**
     * 改变播放时间
     */
    changeTime(time) {
      this.$refs.music.currentTime = time;
    },

    /**
     * 调整音量
     */
    changeVolume(v) {
      this.music.volume += v;
      if (this.music.volume > 100) {
        this.music.volume = 100;
      }
      if (this.music.volume < 0) {
        this.music.volume = 0;
      }
      this.$refs.music.volume = this.music.volume / 100;
    }
  }
};
