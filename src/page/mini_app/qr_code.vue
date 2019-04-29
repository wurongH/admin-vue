
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>小程序</b></el-breadcrumb-item>
                <el-breadcrumb-item>小程序码</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span class="title">小程序码</span>
            </div>
            <div class="xcx-content">
                <el-form ref="form_data" v-loading='loading' label-width="140px" style="width: 50%;">
                    <el-form-item label="小程序码: ">
                        <img :src="qr_code" style="width: 200px;" alt="">
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script src="../../../static/js/mini_app/qr_code.js"></script>

<style scoped>
</style>