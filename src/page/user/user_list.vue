
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>用户</b></el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <div>
                    <span class="font14">关键词：</span>
                    <el-input class="w251 font14" placeholder="请输入微信昵称搜索" v-model="keys" clearable></el-input>

                    <span class="font14 mar_L_20">是否会员：</span>
                    <el-select clearable class="w200" v-model="vip" placeholder="请选择">
                        <el-option label="会员" value="1"></el-option>
                        <el-option label="非会员" value="2"></el-option>
                    </el-select>

                    <span class="font14 mar_L_20">消费用户：</span>
                    <el-select clearable class="w200" v-model="ispay" placeholder="请选择">
                        <el-option label="已消费用户" value="1"> </el-option>
                        <el-option label="未消费用户" value="2"> </el-option>
                    </el-select>
                    <el-button class="mar_L_20" type="primary" @click="search()" plain>搜索</el-button>
                </div>
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
                    <el-table-column prop="is_vip" label="是否会员"></el-table-column>
                    <el-table-column prop="gender" label="用户性别"></el-table-column>
                    <el-table-column prop="total_consume_price" label="用户消费总金额"></el-table-column>
                    <el-table-column prop="subscribe_count" label="用户订阅数量">
                        <div slot-scope="scope">
                            <span class="primary cur_p" @click="Subscribe(scope.row.id)">{{scope.row.subscribe_count}}</span>
                        </div>
                    </el-table-column>
                    <el-table-column prop="order_count" label="用户订单数量"></el-table-column>
                    <el-table-column label="操作">
                        <div slot-scope="scope" class="dis_fd font14">
                            <span class="text primary" @click="to_detail(scope.row.id)">查看用户详情</span>
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
<script src="../../../static/js/user/user_list.js"></script>

<style scoped>
</style>