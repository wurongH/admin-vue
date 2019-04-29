<template>
    <div style="padding-bottom: 120px;" id="subpage">

        <el-breadcrumb separator="/">
            <el-breadcrumb-item><b>用户</b></el-breadcrumb-item>
            <el-breadcrumb-item :to="{path: '/user/manage_distribution'}">分销管理</el-breadcrumb-item>
            <el-breadcrumb-item>查看明细</el-breadcrumb-item>
        </el-breadcrumb>

        <div class="content mb30">
            <div class="xcx-head">
                <span class="title">查看明细</span>
            </div>
            <div class="xcx-content" style="padding: 0;">
                <div class="info_item">
                    <p class="mar_L_20 flex_align_center">
                        <span class="border_crude"></span>
                        <span class="title">汇总数据</span>
                    </p>

                    <div class="dis_jcsb mar_T_30 w60_B mar_L_30 info_box">
                        <div class="img_box">
                            <img class="img_round" v-if="avatar_url" :src="avatar_url" alt="">
                            <span v-else>暂无头像</span>
                        </div>

                        <div>
                            <p>微信昵称：{{nickname}}</p>
                            <p>收益总金额：{{total_profit_price}}</p>
                            <p>拉新总人数：{{drainage_count}}</p>
                        </div>

                        <div>
                            <p>已提现金额: {{total_receive_price}}</p>
                            <p>可提现金额: {{can_withdraw_money}}</p>
                        </div>
                    </div>
                </div>

                <div class="info_item">
                    <p class="mar_L_20 flex_align_center">
                        <span class="border_crude"></span>
                        <span class="title">拉新用户列表</span>
                    </p>

                    <el-table border :data="source_user" stripe class="mar_L_30 mar_T_30 w90_B">
                        <el-table-column prop="avatar_url" label="被拉新用户头像">
                            <div slot-scope="scope">
                                <img class="img_round" v-if="scope.row.avatar_url" :src="scope.row.avatar_url" alt="">
                            </div>
                        </el-table-column>
                        <el-table-column prop="nickname" label="被拉新用户昵称"></el-table-column>
                        <el-table-column prop="total_consume_price" label="消费总金额"></el-table-column>
                        <el-table-column prop="total_profit_price" label="收益总金额"></el-table-column>
                        <el-table-column prop="create_time" label="收益时间"></el-table-column>
                    </el-table>
                </div>

                <div class="info_item">
                    <p class="mar_L_20 flex_align_center">
                        <span class="border_crude"></span>
                        <span class="title">已提现记录列表</span>
                    </p>

                    <el-table border :data="recode" stripe class="mar_L_30 mar_T_30 w90_B">
                        <el-table-column prop="time" label="提现日期"></el-table-column>
                        <el-table-column prop="total_receive_price" label="提现金额"></el-table-column>
                        <el-table-column prop="can_withdraw_money" label="可提现金额"></el-table-column>
                        <el-table-column prop="is_arrival" label="提现状态">
                            <div slot-scope="scope">
                                <span v-if="scope.row.is_arrival == 1" class="success">提现成功</span>
                                <span v-else class="danger">提现失败</span>
                            </div>
                        </el-table-column>
                        <el-table-column prop="arrival_reason" label="备注说明" width="200"></el-table-column>
                    </el-table>
                </div>

            </div>
        </div>
    </div>
</template>
<script src="../../../static/js/user/distribution_detail.js"></script>

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