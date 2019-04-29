
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>小程序</b></el-breadcrumb-item>
                <el-breadcrumb-item to="/mini_app/manage_yearMagazine">年份杂志</el-breadcrumb-item>
                <el-breadcrumb-item>{{year_id ? '修改' : '添加'}}年份杂志</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span class="title">{{year_id ? '修改' : '添加'}}年份杂志</span>
            </div>
            <div class="xcx-content">
                <el-form ref="form_data" :model="form_data" :rules="rules" label-width="140px" style="width: 80%;">

                    <el-form-item label="输入年份：" prop="name">
                        <el-input type="number" class="w400" v-model="form_data.name" placeholder="请输入输入年份，如：2018年"></el-input>
                    </el-form-item>

                    <el-form-item label="年度杂志封面：" prop="picture">
                        <el-upload class="Magazine_img" accept="image/*" :on-exceed="descExceed" limit="1" :on-remove='del_img' :action="upload_img_url" :file-list="form_data.picture" list-type="picture-card" :on-success="img_succ" :data="postData">
                            <i class="el-icon-plus"></i>
                            <div style="font-size: 12px; color: #606266;" slot="tip">图片大小（ 274px * 360px ）像素，图片格式png、jpg，默认第一张为封面图</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="排序：" prop="sort">
                        <el-input type="number" class="w400" v-model="form_data.sort" placeholder="请输入排序数字"></el-input>
                    </el-form-item>

                    <el-form-item label="状态：" prop="status">
                        <el-radio v-model="form_data.status" label="1">开启</el-radio>
                        <el-radio v-model="form_data.status" label="2">关闭</el-radio>
                    </el-form-item>

                    <el-form-item class="mar_T_50">
                        <el-button type="primary" @click="save()">保存</el-button>
                        <el-button @click="back">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script src="../../../static/js/mini_app/add_yearMagazine.js"></script>

<style scoped>
</style>