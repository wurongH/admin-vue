<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>小程序</b></el-breadcrumb-item>
                <el-breadcrumb-item to="/mini_app/manage_Magazine">杂志管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/mini_app/Magazine_chapters', query: {magazine_name: magazine_name,magazine_year_id: magazine_year_id, magazine_id: magazine_id}}">杂志章节</el-breadcrumb-item>
                <el-breadcrumb-item>{{activity_id ? '修改' : '添加'}}杂志章节</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span class="title">{{activity_id ? '修改' : '添加'}}杂志章节</span>
            </div>
            <div class="xcx-content">
                <el-form ref="form_data" :model="form_data" label-width="140px" style="width: 80%;">

                    <el-form-item label="杂志名称：" prop="address">{{magazine_name}}</el-form-item>

                    <el-form-item label="文章类型：" prop="type">
                        <el-radio v-model="form_data.type" label="1">章节</el-radio>
                        <el-radio v-model="form_data.type" label="2">文章</el-radio>
                    </el-form-item>

                    <el-form-item label="章节标题：" prop="address">
                        <div class="flex_align_center dis_sb w400">
                            <el-input class="w300" v-model="form_data.title" placeholder="请输入章节标题"></el-input>
                            <el-color-picker v-model="form_data.color"></el-color-picker>
                        </div>
                    </el-form-item>

                    <el-form-item v-if="form_data.type == 2" label="文章副标题：" prop="address">
                        <el-input class="w400" v-model="form_data.sub_title" placeholder="请输入文章副标题"></el-input>
                    </el-form-item>

                    <el-form-item v-if="form_data.type == 2" label="文章封面：" class="line_H" prop="picture">
                        <el-upload accept="image/*" :on-exceed='descExceed' :limit="1" :on-remove='del_img' :action="upload_img_url" :file-list="form_data.picture" list-type="picture-card" :on-success="img_succ" :data="postData">
                            <i class="el-icon-plus"></i>
                            <div style="font-size: 12px; color: #606266;" slot="tip">图片大小（ ）像素，图片格式png、jpg，默认第一张为封面图</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item v-if="form_data.type == 2" label="文章内容：">
                        <!-- 富文本 -->
                        <richText placeholder='请输入文章内容' @editor_change='editor_change' ref="richText" :describe='form_data.content'></richText>
                    </el-form-item>

                    <el-form-item v-if="form_data.type == 2" label="作者：" prop="author">
                        <el-input class="w400" v-model="form_data.author" placeholder="请输入作者"></el-input>
                    </el-form-item>

                    <el-form-item label="排序：" prop="sort">
                        <el-input class="w400" v-model="form_data.sort" placeholder="请输入排序数字"></el-input>
                    </el-form-item>

                    <el-form-item label="杂志状态：" prop="status">
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
<script src="../../../static/js/mini_app/add_Magazine_chapters.js"></script>

<style scoped>
</style>