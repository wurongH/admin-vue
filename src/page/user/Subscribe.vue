
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>用户</b></el-breadcrumb-item>
                <el-breadcrumb-item :to="{path: '/user/user_list'}">用户列表</el-breadcrumb-item>
                <el-breadcrumb-item>订阅记录</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <div class="content">
            <div class="xcx-head">
                <span>订阅记录</span>
            </div>
            <div class="xcx-content Subscribe">

                <el-tabs v-model="type" class="" @tab-click="handleClick">
                    <el-tab-pane :label="'杂志(' + magazine_count + ')'" name="2">
                        <!--列表-->
                        <el-table border :data="tableData" stripe class="mar_T_10" style="width: 100%">
                            <el-table-column prop="title" label="杂志标题"></el-table-column>
                            <el-table-column prop="name" label="杂志封面图">
                                <div slot-scope="scope">
                                    <img class="year_cover" :src="scope.row.picture" alt="">
                                </div>
                            </el-table-column>
                            <el-table-column prop="stage" label="杂志期数"></el-table-column>
                            <el-table-column prop="create_time" label="订阅时间"></el-table-column>
                            <el-table-column prop="nickname" label="订阅用户昵称"></el-table-column>
                            <el-table-column prop="avatar_url" label="用户头像">
                                <div slot-scope="scope">
                                    <img class="img_round" :src="scope.row.avatar_url" alt="">
                                </div>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane :label="'小课(' + course_count + ')'" name="3">
                        <!--列表-->
                        <el-table border :data="tableData" stripe class="mar_T_10" style="width: 100%">
                            <el-table-column prop="title" label="小课标题"></el-table-column>
                            <el-table-column prop="cover" label="小课封面">
                                <div slot-scope="scope">
                                    <img class="img_smallLesson" :src="scope.row.cover" alt="">
                                </div>
                            </el-table-column>
                            <el-table-column prop="create_time" label="订阅时间"></el-table-column>
                            <el-table-column prop="nickname" label="订阅用户昵称"></el-table-column>
                            <el-table-column prop="avatar_url" label="用户头像">
                                <div slot-scope="scope">
                                    <img class="img_round" :src="scope.row.picture" alt="">
                                </div>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane :label="'原音重现(' + talkshow_count + ')'" name="4">
                        <!--列表-->
                        <el-table border :data="tableData" stripe class="mar_T_10" style="width: 100%">
                            <el-table-column prop="title" label="原音重现标题"></el-table-column>
                            <el-table-column prop="author" label="演讲嘉宾"></el-table-column>
                            <el-table-column prop="picture" label="小课封面">
                                <div slot-scope="scope">
                                    <img class="img_smallLesson" :src="scope.row.picture" alt="">
                                </div>
                            </el-table-column>
                            <el-table-column prop="create_time" label="订阅时间"></el-table-column>
                            <el-table-column prop="nickname" label="订阅用户昵称"></el-table-column>
                            <el-table-column prop="avatar_url" label="用户头像">
                                <div slot-scope="scope">
                                    <img class="img_round" :src="scope.row.avatar_url" alt="">
                                </div>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script src="../../../static/js/user/Subscribe.js"></script>

<style>
</style>