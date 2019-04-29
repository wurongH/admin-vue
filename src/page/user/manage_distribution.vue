
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>用户</b></el-breadcrumb-item>
                <el-breadcrumb-item>分销管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <div>
                    <span class="font14">关键词：</span>
                    <el-input clearable class="w300" v-model="keys" placeholder="请输入用户昵称"></el-input>
                    <el-button class="mar_L_20" type="primary" @click="search()" plain>搜索</el-button>
                </div>

                <el-button type="primary" @click="export_file()">导出用户数据</el-button>
            </div>
            <div class="xcx-content">
                <!--列表-->
                <el-table border :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="nickname" label="微信昵称"></el-table-column>
                    <el-table-column prop="name" label="微信头像">
                        <div slot-scope="scope">
                            <img class="img_round" :src="scope.row.avatar_url" alt="">
                        </div>
                    </el-table-column>
                    <el-table-column prop="total_profit_price" label="收益总金额"></el-table-column>
                    <el-table-column prop="total_receive_price" label="已提现金额">
                        <div slot-scope="scope">
                            <span class="primary cur_p" @click="lift_pic(scope.row.id)">{{scope.row.total_receive_price}}</span>
                        </div>
                    </el-table-column>
                    <el-table-column prop="can_withdraw_money" label="可提现金额"></el-table-column>
                    <el-table-column prop="drainage_count" label="拉新用户人数"></el-table-column>
                    <el-table-column label="操作">
                        <div slot-scope="scope" class="dis_fd font14">
                            <span class="text primary" @click="detail(scope.row.id)">查看明细</span>
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
<script src="../../../static/js/user/manage_distribution.js"></script>

<style scoped>
</style>