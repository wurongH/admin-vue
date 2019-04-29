
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>小程序</b></el-breadcrumb-item>
                <el-breadcrumb-item to="/mini_app/manage_Magazine">杂志管理</el-breadcrumb-item>
                <el-breadcrumb-item>杂志章节</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span>杂志名称：{{magazine_name}}</span>
                <div>
                    <span class="mar_L_20 font14">关键词：</span>
                    <el-input class="w251 font14" placeholder="请输入章节名称" v-model="keys" clearable> </el-input>
                    <el-button class="mar_L_20" type="primary" @click="search()" plain>搜索</el-button>
                    <el-button type="primary" @click="add()">添加杂志章节</el-button>
                </div>
            </div>
            <div class="xcx-content">
                <!--列表-->
                <el-table border :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="type" label="类型"></el-table-column>
                    <el-table-column prop="title" label="章节标题"></el-table-column>
                    <el-table-column prop="author" label="章节作者"></el-table-column>
                    <el-table-column prop="sort" label="排序"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column label="操作">
                        <div slot-scope="scope" class="doSonimg_box font14">
                            <span class="text primary" @click="edit(scope.row.id)">修改章节</span>
                            <span class="text danger" @click="del_item(scope.row.id)">删除章节</span>
                        </div>
                    </el-table-column>
                </el-table>

                <el-button class="mar_T_50" @click="back()">返回杂志列表</el-button>
            </div>
        </div>
    </div>
</template>
<script src="../../../static/js/mini_app/Magazine_chapters.js"></script>

<style scoped>
</style>