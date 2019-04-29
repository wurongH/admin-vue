
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>小程序</b></el-breadcrumb-item>
                <el-breadcrumb-item to="/mini_app/manage_smallLesson">小课管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/mini_app/Lesson_essay', query: {smallLesson_id: course_id, smallLesson_name: smallLesson_name}}">小课文章</el-breadcrumb-item>
                <el-breadcrumb-item>{{activity_id ? '修改' : '添加'}}小课文章</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span class="title">{{activity_id ? '修改' : '添加'}}小课文章</span>
            </div>
            <div class="xcx-content">
                <el-form ref="form_data" :model="form_data" :rules="rules" label-width="140px" style="width: 80%;">

                    <el-form-item label="小课名称：" prop="address">{{smallLesson_name}}</el-form-item>

                    <el-form-item label="小课标题：" prop="title">
                        <el-input class="w400" v-model="form_data.title" placeholder="请输入小课标题"></el-input>
                    </el-form-item>

                    <el-form-item label="小课副标题：" prop="sub_title">
                        <el-input class="w400" v-model="form_data.sub_title" placeholder="请输入小课副标题"></el-input>
                    </el-form-item>

                    <el-form-item label="小课图片：" class="line_H" prop="picture">
                        <el-upload accept="image/*" :on-exceed='descExceed' :limit="1" :on-remove='del_img' :action="upload_img_url" :file-list="form_data.picture" list-type="picture-card" :on-success="img_succ" :data="postData">
                            <i class="el-icon-plus"></i>
                            <div style="font-size: 12px; color: #606266;" slot="tip">图片大小（ ）像素，图片格式png、jpg，默认第一张为封面图</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="上传音频:" prop="audio">
                        <el-upload accept="audio/*" style="width: 400px;" v-loading="loading" :before-upload="before_upload" :action="upload_img_url" :on-remove="remove_audio" :on-success="upload_video_success" :limit="1" :show-file-list="false" :on-exceed="handle_exceed_video" :data="postData" v-if="is_upload_video == false">
                            <el-button type="primary">点击上传</el-button>
                            <p style="font-size:12px; color:#909399;">音频格式mp3</p>
                        </el-upload>

                        <el-button type="primary" @click="remove_audio" v-if="is_upload_video">移除音频
                        </el-button>
                        <div style="padding-top: 10px;" v-if="is_upload_video">
                            <el-row>
                                <el-col :span="0.5">
                                    <el-popover placement="top-start" trigger="hover">
                                        <div style="text-align: center">
                                            <el-progress color="#67C23A" type="circle" :percentage="music.volume"></el-progress>
                                            <br>
                                            <el-button @click="changeVolume(-10)" icon="el-icon-minus" circle></el-button>
                                            <el-button @click="changeVolume(10)" icon="el-icon-plus" circle></el-button>
                                        </div>
                                        <el-button @click="play" id="play" slot="reference" :icon="music.isPlay?'iconfont icon-iconstop':'el-icon-caret-right'" circle></el-button>
                                    </el-popover>
                                </el-col>
                                <el-col :span="8" style="padding-left: 15px;">
                                    <el-slider @change="changeTime" :format-tooltip="formatTime" :max="music.maxTime" v-model="music.currentTime" style="width: 100%;"></el-slider>
                                </el-col>
                                <el-col :span="6" style="padding: 0px 0px 0px 10px;color:#909399;font-size: 13px">
                                    {{formatTime(music.currentTime)}}/{{formatTime(music.maxTime)}}
                                </el-col>
                            </el-row>
                            <audio ref="music" loop>
                                <source :src="form_data.audio" type="audio/mpeg">
                            </audio>
                        </div>
                    </el-form-item>

                    <el-form-item label="音频时长：" prop="duration">
                        <el-input class="w400" readonly v-model="form_data.duration" placeholder="请输入音频时长"></el-input>
                    </el-form-item>

                    <el-form-item label="文章内容：" prop="content">
                        <!-- 富文本 -->
                        <richText placeholder='请输入文章内容' ref="richText" @editor_change='editor_change' :describe='form_data.content'></richText>
                    </el-form-item>

                    <el-form-item label="作者：" prop="author">
                        <el-input class="w400" v-model="form_data.author" placeholder="请输入作者姓名"></el-input>
                    </el-form-item>

                    <el-form-item label="排序：" prop="sort">
                        <el-input class="w400" v-model="form_data.sort" placeholder="请输入排序数字"></el-input>
                    </el-form-item>

                    <el-form-item label="状态：" prop="status">
                        <el-radio v-model="form_data.status" label="1">开启</el-radio>
                        <el-radio v-model="form_data.status" label="2">关闭</el-radio>
                    </el-form-item>

                    <el-form-item class="mar_T_50">
                        <el-button type="primary" @click="save">保存</el-button>
                        <el-button @click="back">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script src="../../../static/js/mini_app/add_Lesson_essay.js"></script>

<style scoped>
</style>