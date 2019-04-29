
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>小程序</b></el-breadcrumb-item>
                <el-breadcrumb-item to="/mini_app/manage_smallLesson">小课管理</el-breadcrumb-item>
                <el-breadcrumb-item>小课文章</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span>小课名称：{{smallLesson_name}}</span>
                <div>
                    <span class="mar_L_20 font14">关键词：</span>
                    <el-input class="w251 font14" placeholder="请输入小课文章名称" v-model="keys" clearable> </el-input>
                    <el-button class="mar_L_20 mar_R_20" type="primary" @click="search()" plain>搜索</el-button>
                    <el-button type="primary" @click="add()">添加小课文章</el-button>
                </div>
            </div>
            <div class="xcx-content">
                <!--列表-->
                <el-table border :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="title" label="章节标题"></el-table-column>
                    <el-table-column prop="picture" label="章节图片">
                        <div slot-scope="scope">
                            <img class="img_smallLesson" :src="scope.row.picture" alt="">
                        </div>
                    </el-table-column>
                    <el-table-column prop="duration" label="章节音频时长"></el-table-column>
                    <el-table-column prop="author" label="章节作者"></el-table-column>
                    <el-table-column prop="sort" label="排序"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column label="操作">
                        <div slot-scope="scope" class="dis_fd font14">
                            <span class="text primary" @click="edit(scope.row.id)">修改小课文章</span>
                            <span class="text danger" @click="del_item(scope.row.id)">删除小课文章</span>
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
<script src="../../../static/js/mini_app/Lesson_essay.js"></script>

<style scoped>
</style>