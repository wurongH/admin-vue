
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>小程序</b></el-breadcrumb-item>
                <el-breadcrumb-item to="/mini_app/manage_yearMagazine">年份杂志</el-breadcrumb-item>
                <el-breadcrumb-item>设置年份价格</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span class="title">设置年份价格</span>
            </div>
            <div class="xcx-content">
                <el-form ref="form_data" :model="form_data" :rules="rules" label-width="140px" style="width: 80%;">
                    <el-form-item label="半年杂志价格：" prop="magazine_half_year_price">
                        <el-input class="w400" v-model="form_data.magazine_half_year_price" placeholder="请填写全年杂志价格"></el-input>
                    </el-form-item>

                    <el-form-item label="全年杂志价格：" prop="magazine_annual_price">
                        <el-input class="w400" v-model="form_data.magazine_annual_price" placeholder="请填写半年杂志价格"></el-input>
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
<script src="../../../static/js/mini_app/set_year.js"></script>

<style scoped>
</style>