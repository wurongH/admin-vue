
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>小程序</b></el-breadcrumb-item>
                <el-breadcrumb-item to="/mini_app/manage_smallLesson">小课管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{smallLesson_id ? '修改' : '添加'}}小课</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span class="title">{{smallLesson_id ? '修改' : '添加'}}小课</span>
            </div>
            <div class="xcx-content">
                <el-form ref="form_data" :model="form_data" :rules="rules" label-width="140px" style="width: 80%;">

                    <el-form-item label="小课名称：" prop="title">
                        <el-input class="w400" v-model="form_data.title" placeholder="请输入小课名称"></el-input>
                    </el-form-item>

                    <el-form-item label="小课副标题：" prop="sub_title">
                        <el-input class="w400" v-model="form_data.sub_title" placeholder="请输入小课副标题"></el-input>
                    </el-form-item>

                    <el-form-item label="小课封面：" class="line_H" prop="cover">
                        <el-upload accept="image/*" :on-exceed="descExceed" limit="1" :on-remove='del_img' :action="upload_img_url" :file-list="form_data.cover" list-type="picture-card" :on-success="img_succ" :data="postData">
                            <i class="el-icon-plus"></i>
                            <div style="font-size: 12px; color: #606266;" slot="tip">图片大小（ 230px * 230px ）像素，图片格式png、jpg，默认第一张为封面图</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="小课图片头图：" prop="picture">
                        <el-upload class="updata_img" accept="image/*" :on-exceed="descExceed2" limit="1" :on-remove='del_img2' :action="upload_img_url" :file-list="form_data.picture" list-type="picture-card" :on-success="img_succ2" :data="postData">
                            <i class="el-icon-plus"></i>
                            <div style="font-size: 12px; color: #606266;" slot="tip">图片大小（ 750px * 360px ）像素，图片格式png、jpg，默认第一张为封面图</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="小课的费用：" prop="price">
                        <el-input class="w400" v-model="form_data.price" placeholder="请输入小课的费用"></el-input>
                    </el-form-item>

                    <el-form-item label="是否完结：" prop="is_end">
                        <el-radio v-model="form_data.is_end" label="1">完结</el-radio>
                        <el-radio v-model="form_data.is_end" label="2">未完结</el-radio>
                    </el-form-item>

                    <el-form-item label="小课内容：" prop="content">
                        <!-- 富文本 -->
                        <richText placeholder='请输入小课内容' @editor_change='editor_change' ref="richText" :describe='form_data.content'></richText>
                    </el-form-item>

                    <el-form-item label="小课状态：" prop="status">
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
<script src="../../../static/js/mini_app/add_smallLesson.js"></script>

<style scoped>
</style>