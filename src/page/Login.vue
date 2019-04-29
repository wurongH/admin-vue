<template>
	<div id="login">
		<img src="../../static/img/login/logo_login.png" class="logo" />
		<p class="title"></p>
		<div id="form">
			<div class="model">
				<img src="../../static/img/login/user.png" class="icon-user" />
				<el-input v-model="user_name" v-on:input="checkNumber(user_name)" placeholder="账号" prefix-icon=" " clearable></el-input>
			</div>
			<div class="model">
				<img src="../../static/img/login/password.png" class="icon-password" />
				<el-input v-model="passWord" v-on:input="checkPwd(passWord)" @keyup.enter.native="Login" type="password" placeholder="请输入密码" prefix-icon=" " clearable></el-input>
			</div>
			<el-button v-on:click="Login" type="primary">立即登录</el-button>
		</div>
	</div>
</template>

<script src="../../static/js/Login.js"></script>

<style scoped>
	@import '../../static/css/login.css';
</style>
