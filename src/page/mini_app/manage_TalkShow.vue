
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>小程序</b></el-breadcrumb-item>
                <el-breadcrumb-item>原音重现</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <div>
                    <span class="font14">关键词：</span>
                    <el-input class="w251 font14" placeholder="请输入标题或作者名称" v-model="keys" clearable> </el-input>
                    <el-button class="mar_L_20" type="primary" @click="search()" plain>搜索</el-button>
                </div>

                <el-button type="primary" @click="add()">添加原音重现</el-button>
            </div>
            <div class="xcx-content">
                <!--列表-->
                <el-table border :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="title" label="原音重现标题"></el-table-column>
                    <el-table-column prop="name" label="原音重现图片" width="200">
                        <div slot-scope="scope">
                            <img class="img_rectangle" :src="scope.row.picture" alt="">
                        </div>
                    </el-table-column>
                    <el-table-column prop="duration" label="音频时长"></el-table-column>
                    <el-table-column prop="author" label="演讲嘉宾"></el-table-column>
                    <el-table-column prop="price" label="收听费用"></el-table-column>
                    <el-table-column prop="buy_count" label="购买人数"></el-table-column>
                    <el-table-column prop="subscribe_count" label="订阅人数"></el-table-column>
                    <el-table-column prop="sort" label="排序"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column label="操作">
                        <div slot-scope="scope" class="dis_fd font14">
                            <span class="text primary" @click="edit(scope.row.id)">修改原音重现</span>
                            <span class="text danger" @click="del_item(scope.row.id)">删除原音重现</span>
                            <span class="text primary" @click="see_link(scope.row.id)">链接地址</span>
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
<script src="../../../static/js/mini_app/manage_TalkShow.js"></script>

<style scoped>
</style>