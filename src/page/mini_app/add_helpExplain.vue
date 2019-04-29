
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>小程序</b></el-breadcrumb-item>
                <el-breadcrumb-item to="/mini_app/manage_Magazine">帮助说明</el-breadcrumb-item>
                <el-breadcrumb-item>{{help_id ? '修改' : '添加'}}帮助说明</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span class="title">{{help_id ? '修改' : '添加'}}帮助说明</span>
            </div>
            <div class="xcx-content">
                <el-form ref="form_data" :model="form_data" :rules="rules" label-width="140px" style="width: 80%;">

                    <el-form-item label="标题：" prop="title">
                        <el-input class="w400" v-model="form_data.title" placeholder="请输入帮助说明标题"></el-input>
                    </el-form-item>
 
                    <el-form-item label="内容：" prop="content">
                        <!-- 富文本 -->
                        <richText placeholder='请输入内容' ref="richText" @editor_change='editor_change' :describe='form_data.content'></richText>
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
<script src="../../../static/js/mini_app/add_helpExplain.js"></script>

<style scoped>
</style>