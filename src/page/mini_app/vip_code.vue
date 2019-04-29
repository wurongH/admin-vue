
<template>
    <div id="subpage">

        <el-col :span="24" class="warp-breadcrum">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><b>小程序</b></el-breadcrumb-item>
                <el-breadcrumb-item>会员码</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>

        <el-dialog title="批量生成会员码" :visible.sync="dialogVisible" width="26%" :before-close="handleClose">
            <el-form ref="form" label-width="80px">
                <el-form-item label="生成数量: ">
                    <el-input type="number" placeholder="1-50" v-model="code_number"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" v-loading='loading' @click="config_code()">确 定</el-button>
            </span>
        </el-dialog>

        <div class="content">
            <div class="xcx-head">
                <div>
                    <span class="font14">关键词：</span>
                    <el-input class="w251 font14" placeholder="请输入会员码编号" v-model="keys" clearable> </el-input>
                    <el-button class="mar_L_20" type="primary" @click="search()" plain>筛选</el-button>
                </div>

                <el-button type="primary" @click="dialogVisible = true">批量生成会员码</el-button>
            </div>
            <div class="xcx-content">

                <!-- tabs -->
                <el-tabs v-model="type" class="vip_tabs" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="1"></el-tab-pane>
                    <el-tab-pane label="已使用" name="2"></el-tab-pane>
                    <el-tab-pane label="未使用" name="3"></el-tab-pane>
                </el-tabs>

                <!--列表-->
                <el-table border :data="tableData" stripe style="width: 100%" class="mar_T_20">
                    <el-table-column prop="id" label="会员码序号"></el-table-column>
                    <el-table-column prop="sn" label="会员码"></el-table-column>
                    <el-table-column prop="create_time" label="创建时间"></el-table-column>
                    <el-table-column prop="is_use" label="是否使用">
                        <div slot-scope="scope">
                            <span v-if="scope.row.is_use == 1" class="yellow">已使用</span>
                            <span v-if="scope.row.is_use == 2" class="success">未使用</span>
                        </div>
                    </el-table-column>
                    <el-table-column prop="use_time" label="使用时间">
                        <div slot-scope="scope">
                            <span>{{scope.row.use_time ? scope.row.use_time : '--'}}</span>
                        </div>
                    </el-table-column>
                    <el-table-column label="操作">
                        <div slot-scope="scope" class="doSonimg_box font14">
                            <span class="text primary" @click="down_img(scope.row.code_url)">下载会员码</span>
                            <span class="text danger" @click="del(scope.row.id)">删除</span>
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
<script src="../../../static/js/mini_app/vip_code.js"></script>

<style scoped>
</style>