
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>订单</b></el-breadcrumb-item>
                <el-breadcrumb-item>订单列表</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <div style="width: 100%;">
                    <span class="font14">用户：</span>
                    <el-select clearable filterable remote style="width: 10%;" :remote-method="remoteMethod" v-model="nickname" placeholder="用户昵称">
                        <el-option v-for="(item, i) in user_list" :key="i" :label="item.nickname" :value="item.nickname"></el-option>
                    </el-select>

                    <span class="font14 mar_L_20">订单类型：</span>
                    <el-select clearable class="w120" v-model="type" placeholder="杂志">
                        <el-option label="年份杂志" value="1"></el-option>
                        <el-option label="单期杂志" value="2"></el-option>
                        <el-option label="单个小课" value="3"></el-option>
                        <el-option label="原音重现" value="4"></el-option>
                        <el-option label="VIP会员" value="5"></el-option>
                    </el-select>

                    <span class="font14 mar_L_20">日期：</span>
                    <el-date-picker v-model="date" style="width: 23%;" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>

                    <span class="font14 mar_L_20">关键词：</span>
                    <el-input class="font14" style="width: 13%;" placeholder="关键词" v-model="key" clearable></el-input>
                    <el-button class="mar_L_20" type="primary" @click="search()" plain>搜索</el-button>
                </div>

                <el-button class="mar_L_20" type="primary" @click="export_file()">导出Eexcel数据</el-button>
            </div>
            <div class="xcx-content">
                <!--列表-->
                <el-table border :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="sn" label="订单编号"></el-table-column>
                    <el-table-column prop="type_name" label="订单类型"></el-table-column>
                    <el-table-column prop="name" label="订单内容" width="300">
                        <div slot-scope="scope" class="flex_align_center" v-if="scope.row.sn_content.length > 0">

                            <p style="margin: 0 auto;" v-if="type == 1">--</p>

                            <img v-if="scope.row.sn_content[0].picture" :class=" type == 3 ? 'img_smallLesson' : 'year_cover'" :src="scope.row.sn_content[0].picture" alt="">
                            <p style="margin: 0 auto;" v-if="scope.row.sn_content[0].vip">{{scope.row.sn_content[0].vip}}</p>
                            <div class="dis_fd_1 dis_sb mar_L_20" v-if="scope.row.sn_content[0].picture" style="text-align: left; height: 120px">
                                <p v-if="scope.row.sn_content[0].title">{{scope.row.sn_content[0].title}}</p>
                                <p v-if="scope.row.sn_content[0].stage">期数：{{scope.row.sn_content[0].stage}}</p>
                                <p v-if="scope.row.sn_content[0].author">作者：{{scope.row.sn_content[0].author}}</p>
                            </div>

                        </div>
                    </el-table-column>
                    <el-table-column prop="price" label="订单金额"></el-table-column>
                    <el-table-column prop="create_time" label="下单日期"></el-table-column>
                    <el-table-column prop="pay_time" label="支付日期"></el-table-column>
                    <el-table-column prop="avatar_url" label="用户头像">
                        <div slot-scope="scope">
                            <img class="img_round" :src="scope.row.avatar_url" alt="">
                        </div>
                    </el-table-column>

                    <el-table-column label="操作">
                        <div slot-scope="scope" class="dis_fd font14">
                            <span class="text primary" @click="detail(scope.row.id)">查看详情</span>
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
<script src="../../../static/js/order/order_list.js"></script>

<style scoped>
</style>