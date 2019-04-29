
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>用户</b></el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/user/manage_distribution'}">分销管理</el-breadcrumb-item>
                <el-breadcrumb-item>已提现金额</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <div>
                    <span class="font14">关键词：</span>
                    <el-input clearable class="w300" v-model="key" placeholder="请输入用户昵称"></el-input>

                    <span class="font14 mar_L_20">提现日期：</span>
                    <el-date-picker v-model="date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button class="mar_L_20" type="primary" @click="search()" plain>搜索</el-button>
                </div>

                <el-button class="mar_L_20" type="primary" @click="export_file()">导出Eexcel数据</el-button>
            </div>
            <div class="xcx-content">
                <!--列表-->
                <el-table border :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="nickname" label="微信昵称"></el-table-column>
                    <el-table-column prop="avatar_url" label="微信头像">
                        <div slot-scope="scope">
                            <img class="img_round" :src="scope.row.avatar_url" alt="">
                        </div>
                    </el-table-column>
                    <el-table-column prop="price" label="提现金额"></el-table-column>
                    <el-table-column prop="current_price" label="提现后剩余金额"></el-table-column>
                    <el-table-column prop="time" label="提现时间"></el-table-column>
                    <el-table-column prop="name" label="提现状态">
                        <div slot-scope="scope">
                            <span v-if="scope.row.is_arrival == 1" class="success">提现成功</span>
                            <span v-else class="danger">提现失败</span>
                        </div>
                    </el-table-column>
                    <el-table-column prop="arrival_reason" label="备注" width="400"></el-table-column>
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
<script src="../../../static/js/user/lift_pic.js"></script>

<style scoped>
</style>