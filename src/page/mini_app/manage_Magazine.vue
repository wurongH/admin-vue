
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>小程序</b></el-breadcrumb-item>
                <el-breadcrumb-item>杂志管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <div>
                    <span class="font14">按年份：</span>
                    <el-select clearable class="w200" v-model="y_id" placeholder="请选择年份">
                        <el-option v-for="(item, i) in year_data" :key="i" :label="item.name" :value="item.id"></el-option>
                    </el-select>

                    <span class="mar_L_20 font14">关键词：</span>
                    <el-input class="w251 font14" placeholder="请输入标题或期数" v-model="keys" clearable> </el-input>
                    <el-button class="mar_L_20" type="primary" @click="search()" plain>筛选</el-button>
                </div>

                <el-button type="primary" @click="add()">添加杂志</el-button>
            </div>
            <div class="xcx-content">
                <!--列表-->
                <el-table border :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="title" label="杂志标题"></el-table-column>
                    <el-table-column prop="sub_title" label="杂志封面图" width="230">
                        <div slot-scope="scope">
                            <img class="year_cover" :src="scope.row.picture" alt="">
                        </div>
                    </el-table-column>
                    <el-table-column prop="name" label="杂志年份"></el-table-column>
                    <el-table-column prop="date_issue" label="发刊日期"></el-table-column>
                    <el-table-column prop="buy_count" label="购买人数"></el-table-column>
                    <el-table-column prop="subscribe_count" label="订阅人数"></el-table-column>
                    <el-table-column label="操作">
                        <div slot-scope="scope" class="dis_fd font14">
                            <span class="text primary" @click="Magazine_chapters(scope.row)">杂志章节</span>
                            <span class="text primary" @click="see_link(scope.row.id)">链接地址</span>
                            <span style="display: none;" id="iWantCopy">/pages/magazine/maga_details?id={{scope.row.id}}</span>
                            <span class="text primary" @click="edit(scope.row.id)">修改杂志</span>
                            <span class="text danger" @click="del(scope.row.id)">删除杂志</span>
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
<script src="../../../static/js/mini_app/manage_Magazine.js"></script>

<style scoped>
</style>