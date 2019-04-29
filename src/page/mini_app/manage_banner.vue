
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>小程序</b></el-breadcrumb-item>
                <el-breadcrumb-item>Banner管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span class="title">Banner列表</span>
                <span class="xcx-add left font14" @click="add()">添加Banner</span>
            </div>
            <div class="xcx-content">
                <!--列表-->
                <el-table border :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="title" label="标题"></el-table-column>
                    <el-table-column prop="name" label="图片">
                        <div slot-scope="scope">
                            <img class="img_rectangle" :src="scope.row.picture" alt="">
                        </div>
                    </el-table-column>
                    <el-table-column prop="url" label="链接"></el-table-column>
                    <el-table-column prop="sort" label="排序"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column label="操作">
                        <div slot-scope="scope" class="doSonimg_box font14">
                            <span class="text primary" @click="edit(scope.row.id)">编辑</span>
                            <span class="text danger" @click="del_item(scope.row.id)">删除</span>
                        </div>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <div class="paging">
                    <el-pagination class="left" @current-change="handleCurrentChange" :current-page="page" background layout="prev, pager, next" :total="count"></el-pagination>
                    <span class="demonstration left">共 {{ count }} 条 每页10条</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script src="../../../static/js/mini_app/manage_banner.js"></script>

<style scoped>
</style>