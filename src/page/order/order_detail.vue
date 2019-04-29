
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>订单</b></el-breadcrumb-item>
                <el-breadcrumb-item to="/order/order_list">订单列表</el-breadcrumb-item>
                <el-breadcrumb-item>查看详情</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span class="title">查看详情</span>
            </div>
            <div class="xcx-content">
                <el-form ref="form_data" label-width="140px" style="width: 80%;">

                    <el-form-item label="订单编号：" prop="address">{{sn}}</el-form-item>

                    <el-form-item label="用户头像：" prop="picture">
                        <img class="img_round" :src="avatar_url" alt="">
                    </el-form-item>

                    <el-form-item label="用户昵称：" prop="address">{{nickname}}</el-form-item>

                    <el-form-item label="订单类型：" prop="address">{{type_name}}</el-form-item>

                    <el-form-item label="订单内容：" v-if="picture" prop="address">
                        <div class="flex_align_center mar_T_10">
                            <img class="year_cover" v-if="picture" :src="picture" alt="">

                            <div class="dis_fd_1 dis_sb mar_L_20" style="text-align: left; height: 100px">
                                <p>{{title}}</p>
                                <p v-if="author">作者：{{author}}</p>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="下单时间：" prop="address">{{create_time}}</el-form-item>
                    <el-form-item label="订单金额：" prop="address">¥{{pay_price}}</el-form-item>
                    <el-form-item label="支付状态：" prop="address">
                        <span class="success" v-if="is_pay == 1">已支付</span>
                        <span class="danger" v-else>未支付</span>
                    </el-form-item>
                    <el-form-item label="支付时间：" prop="address">{{pay_time}}</el-form-item>

                    <el-form-item class="mar_T_50">
                        <el-button @click="back">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script src="../../../static/js/order/order_detail.js"></script>

<style scoped>
</style>