
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>小程序</b></el-breadcrumb-item>
                <el-breadcrumb-item>帮助说明</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span>帮助说明</span>
                <el-button type="primary" class="mar_L_30" @click="add()">添加帮助说明</el-button>
            </div>
            <div class="xcx-content">
                <!--列表-->
                <el-table border :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="title" label="标题"></el-table-column>
                    <el-table-column prop="sort" label="排序值"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column label="操作">
                        <div slot-scope="scope" class="doSonimg_box font14">
                            <span class="text primary" @click="edit(scope.row.id)">修改帮助</span>
                            <span class="text danger" @click="del_item(scope.row.id)">删除帮助</span>
                        </div>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script src="../../../static/js/mini_app/manage_helpExplain.js"></script>

<style scoped>
</style>