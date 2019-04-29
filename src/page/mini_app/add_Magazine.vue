
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>小程序</b></el-breadcrumb-item>
                <el-breadcrumb-item to="/mini_app/manage_Magazine">杂志管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{activity_id ? '修改' : '添加'}}杂志</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span class="title">{{activity_id ? '修改' : '添加'}}杂志</span>
            </div>
            <div class="xcx-content">
                <el-form ref="form_data" :model="form_data" :rules="rules" label-width="140px" style="width: 80%;">

                    <el-form-item label="杂志名称：" prop="title">
                        <el-input class="w400" v-model="form_data.title" placeholder="请输入杂志名称"></el-input>
                    </el-form-item>

                    <el-form-item label="杂志副标题：" prop="sub_title">
                        <el-input class="w400" v-model="form_data.sub_title" placeholder="请输入杂志副标题"></el-input>
                    </el-form-item>

                    <el-form-item label="杂志封面：" prop="picture">
                        <el-upload class="Magazine_img" accept="image/*" :on-exceed="descExceed" limit="1" :on-remove='del_img' :action="upload_img_url" :file-list="form_data.picture" list-type="picture-card" :on-success="img_succ" :data="postData">
                            <i class="el-icon-plus"></i>
                            <div style="font-size: 12px; color: #606266;" slot="tip">图片大小（ 198px * 260px ）像素，图片格式png、jpg，默认第一张为封面图</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="杂志年份：" prop="magazine_year_id">
                        <el-select v-model="form_data.magazine_year_id" class="w400" placeholder="请选择年份">
                            <el-option v-for="(item, i) in year_data" :key="i" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="当前期数：" prop="stage">
                        <el-input class="w400" v-model="form_data.stage" placeholder="请输入当前期数"></el-input>
                    </el-form-item>

                    <el-form-item label="发刊日期：" prop="date_issue">
                        <el-date-picker class="w400" v-model="form_data.date_issue" type="date" placeholder="请选择发刊日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="本期费用：" prop="price">
                        <el-input class="w400" v-model="form_data.price" placeholder="请输入本期费用"></el-input>
                    </el-form-item>

                    <el-form-item label="杂志介绍：" prop="content">
                        <!-- 富文本 -->
                        <richText placeholder='请输入杂志介绍' @editor_change='editor_change' ref="richText" :describe='form_data.content'></richText>
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
<script src="../../../static/js/mini_app/add_Magazine.js"></script>

<style scoped>
</style>