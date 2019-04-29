<template>
    <div style="padding-bottom: 120px;" id="subpage">

        <el-breadcrumb separator="/">
            <el-breadcrumb-item><b>用户</b></el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: '/user/user_list'}">用户列表</el-breadcrumb-item>
            <el-breadcrumb-item>查看详情</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content mb30">
            <div class="xcx-head">
                <span class="title">用户详情</span>
            </div>
            <div class="xcx-content" style="padding: 0;">
                <div class="info_item">
                    <p class="mar_L_20 flex_align_center">
                        <span class="border_crude"></span>
                        <span class="title">微信基本信息</span>
                    </p>

                    <div class="dis_jcsb mar_T_30 w60_B mar_L_30 info_box">
                        <div class="flex_align_center">
                            <div class="img_box mar_R_50">
                                <img class="img_round" v-if="avatar_url" :src="avatar_url" alt="">
                                <span v-else>暂无头像</span>
                            </div>
                            <div>
                                <p>微信昵称：{{nickname}}</p>
                                <p>性别：{{gender}}</p>
                                <p>用户城市：{{city}}</p>
                            </div>
                        </div>

                        <div>
                            <p>注册时间：{{create_time}}</p>
                            <p>授权时间：{{timestamp}}</p>
                            <p>消费总金额：￥{{total_consume_price}}</p>
                        </div>

                        <div>
                            <p>用户订阅总数：{{subscribe_count}}</p>
                            <p>用户订单数量：{{order_count}}</p>
                            <p v-if="is_vip == 1">是否会员：VIP会员 （{{vip_end_time}}到期）</p>
                            <p v-else>是否会员：非会员</p>
                        </div>
                    </div>
                </div>

                <div class="info_item">
                    <p class="mar_L_20 flex_align_center">
                        <span class="border_crude"></span>
                        <span class="title">会员购买记录列表</span>
                    </p>

                    <el-table border :data="member" stripe class="mar_L_30 mar_T_30 w90_B">
                        <el-table-column prop="start_time" label="购买日期"></el-table-column>
                        <el-table-column prop="end_time" label="到期日期"></el-table-column>
                        <el-table-column prop="pay_price" label="消费金额"></el-table-column>
                    </el-table>
                </div>

                <div class="info_item">
                    <p class="mar_L_20 flex_align_center">
                        <span class="border_crude"></span>
                        <span class="title">用户订阅杂志年度列表</span>
                    </p>

                    <el-table border :data="magazineYear" stripe class="mar_L_30 mar_T_30 w90_B">
                        <el-table-column prop="type_name" label="订阅类型"></el-table-column>
                        <el-table-column prop="pay_time" label="购买日"></el-table-column>
                        <el-table-column prop="end_time" label="到期日期"></el-table-column>
                        <el-table-column prop="pay_price" label="消费金额"></el-table-column>
                    </el-table>
                </div>

                <div class="info_item">
                    <p class="mar_L_20 flex_align_center">
                        <span class="border_crude"></span>
                        <span class="title">用户订阅记录</span>
                    </p>

                    <el-table border :data="UserSubscribe" stripe class="mar_L_30 mar_T_30 w90_B">
                        <el-table-column prop="type" label="订阅类型">
                            <div slot-scope="scope">
                                <span v-if="scope.row.type == 1">年份杂志</span>
                                <span v-if="scope.row.type == 2">单期杂志</span>
                                <span v-if="scope.row.type == 3">小课</span>
                                <span v-if="scope.row.type == 4">原音重现</span>
                            </div>
                        </el-table-column>
                        <el-table-column prop="title" label="标题"></el-table-column>
                        <el-table-column prop="picture" label="图片">
                            <div slot-scope="scope">
                                <img style="width: 120px; height: auto;" :src="scope.row.picture" alt="">
                            </div>
                        </el-table-column>
                        <el-table-column prop="create_time" label="创建时间"></el-table-column>
                    </el-table>
                </div>

                <div class="info_item" style="border: 0;">
                    <p class="mar_L_20 flex_align_center">
                        <span class="border_crude"></span>
                        <span class="title">订单列表</span>
                    </p>

                    <el-table border :data="orderList" stripe class="mar_L_30 mar_T_30 w90_B">
                        <el-table-column prop="sn" label="订单编号"></el-table-column>
                        <el-table-column prop="type" label="订单类型">
                            <div slot-scope="scope">
                                <span v-if="scope.row.type == 1">年份杂志</span>
                                <span v-if="scope.row.type == 2">单期杂志</span>
                                <span v-if="scope.row.type == 3">单个小课</span>
                                <span v-if="scope.row.type == 4">原音重现</span>
                                <span v-if="scope.row.type == 5">VIP会员</span>
                            </div>
                        </el-table-column>
                        <el-table-column prop="name" label="购买内容" width="360">
                            <div slot-scope="scope" class="flex_align_center mar_L_30">
                                <img class="year_cover" :src="scope.row.picture" alt="">

                                <div class="dis_fd_1 dis_sb mar_L_20" style="text-align: left; height: 120px">
                                    <p>{{scope.row.title}}</p>
                                    <p v-if="scope.row.author">作者：{{scope.row.author}}</p>
                                </div>
                            </div>
                        </el-table-column>
                        <el-table-column prop="create_time" label="下单日期"></el-table-column>
                        <el-table-column prop="pay_time" label="支付日期"></el-table-column>
                    </el-table>
                    <el-button class="mar_L_30 mar_T_50 w120" type="primary" plain @click="back()">返回</el-button>
                </div>

            </div>
        </div>
    </div>
</template>
<script src="../../../static/js/user/user_detail.js"></script>

<style scoped>
.info_item {
    padding: 0 30px 40px 30px;
    border-bottom: 1px solid #eee;
    margin-bottom: 27px;
}

.border_crude {
    background: #0486fe;
    width: 4px;
    height: 16px;
    margin-right: 10px;
}

.info_box {
    line-height: 40px;
    font-size: 14px;
}

.info_item .title {
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: #303133;
}

.info_box img {
    width: 100px;
    height: 100px;
}
</style>