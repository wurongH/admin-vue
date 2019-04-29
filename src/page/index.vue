<template>
    <div id="index">
        <el-container>
            <!--导航栏-->
            <el-menu router default-active="1-4-1" :collapse="isCollapse">
                <el-menu-item index="1" class="logo" disabled>
                    <img src="../../static/img/login/logo.png" />
                    <span slot="title">运营后台</span>
                </el-menu-item>
                <el-submenu v-for="(item,k) in menuList" :key="item.id" :index="''+ k +''">
                    <div slot="title">
                        <img :src="item.icon" class="icon" />
                        <span slot="title" class="menu-title">{{ item.name }}</span>
                    </div>
                    <el-menu-item-group v-for="(v) in item.child" :key="v.id">
                        <el-menu-item :index="v.url">{{ v.name }}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>

            <!--主体-->
            <el-main>
                <!--头部-->
                <el-col class="main_haed">
                    <el-radio-group v-model="isCollapse">
                        <el-radio-button :label="false"><img src="../../static/img/index/open.png" class="open_retract" />
                        </el-radio-button>
                        <el-radio-button :label="true"><img src="../../static/img/index/retract.png" class="open_retract" />
                        </el-radio-button>
                    </el-radio-group>
                    <el-dropdown trigger="hover">
                        <span class="el-dropdown-link userinfo-inner">
                            <!--<img src="../../static/img/index/header.png" class="hader"/>-->
                            {{ user_name }}<i class="el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <el-button type="text" @click="dialogVisible = true">修改密码</el-button>
                            </el-dropdown-item>
                            <el-dropdown-item divided @click.native="logout">退出登陆</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-col>
                <!--切换内容-->
                <section class="content-container">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item v-if="oneMenuName">{{ oneMenuName }}</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="twoMenuName">{{ twoMenuName }}</el-breadcrumb-item>
                        <el-breadcrumb-item v-if="threeMenuName">{{ threeMenuName }}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <transition name="fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </section>
            </el-main>
        </el-container>

        <!--修改密码-->
        <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="原密码:" prop="OldPass">
                    <el-input v-model.number="ruleForm2.OldPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码:" prop="pass">
                    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" prop="checkPass">
                    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script type="text/javascript" src="../../static/js/index.js"></script>

<style>
@import "../../static/css/index.css";
</style>