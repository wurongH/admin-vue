
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>小程序</b></el-breadcrumb-item>
                <el-breadcrumb-item>年份杂志</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span>年份杂志列表</span>

                <div>
                    <el-button type="primary" @click="set_year()">设置年份价格</el-button>
                    <el-button type="primary" class="mar_L_30" @click="add()">添加年份杂志</el-button>
                </div>
            </div>
            <div class="xcx-content">
                <!--列表-->
                <el-table border :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="name" label="年份名称"></el-table-column>
                    <el-table-column prop="name" label="年度杂志封面图">
                        <div slot-scope="scope">
                            <img class="year_cover" :src="scope.row.picture" alt="">
                        </div>
                    </el-table-column>
                    <el-table-column prop="sort" label="排序值"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                    <el-table-column label="操作">
                        <div slot-scope="scope" class="dis_fd font14">
                            <span class="text primary" @click="edit(scope.row.id)">修改年份杂志</span>
                            <span class="text danger" @click="del_item(scope.row.id)">删除年份杂志</span>
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
<script src="../../../static/js/mini_app/manage_yearMagazine.js"></script>

<style scoped>
</style>