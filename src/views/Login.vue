<template>
	<div id="container">
		<div class="fx_paper" :class="collapsed==false?'':'fx_pager_m'">
			<!-- <div class="fx_banner" v-show="!collapsed">
				<el-carousel :interval="4000" arrow="never" style="width:100%; height:100%;">
					<el-carousel-item class="swiper1"></el-carousel-item>
					<el-carousel-item class="swiper2"></el-carousel-item>
				</el-carousel>
			</div> -->
			<div class="fx_wrap">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="right" label-width="0px" class="login-container" @submit.native.prevent>
					<h3 class="fx_h3">登录</h3>
					<el-form-item prop="account">
						<el-input type="text" v-model="ruleForm.account" auto-complete="off" placeholder="请输入用户名">
							<template slot="prepend"><i class="fa fa-mobile-phone fa-fw fa-lg"></i></template>
						</el-input>
					</el-form-item>
					<el-form-item prop="checkPass" v-if="visible">
						<el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="请输入密码">
							<i slot="suffix" class="el-icon-view el-input__icon" title="显示密码" @click="changePass('show')" style="cursor:pointer;"></i>
							<template slot="prepend"><i class="fa fa-key fa-fw fa-lg"></i></template>
						</el-input>
					</el-form-item>
					<el-form-item prop="checkPass" v-else>
						<el-input type="text" v-model="ruleForm.checkPass" auto-complete="off" placeholder="请输入密码">
							<i slot="suffix" class="el-icon-more el-input__icon" title="隐藏密码" @click="changePass('hide')" style="cursor:pointer;"></i>
							<template slot="prepend"><i class="fa fa-key fa-fw fa-lg"></i></template>
						</el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="handleSubmit" :loading="logining" style="width:100%; height:45px;">立即登录<i class="fa fa-long-arrow-right" style="margin-left:10px;"></i></el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
    import { userLogin,getmenulist } from 'api/api.js';
    import MenuUtils from '@/utils/menuUtils.js';
    import menulistjson from '@/data/menulistjson.js';
    // 引用 http 文件里的其它方法
	import http from "@/api/http.js";

	export default {
		data() {
			return {
				b:new http.Base64(),
				logining: false,
				collapsed:false,
				ruleForm: {
					account: '',
					checkPass: ''
                },
                
				rules: {
					account: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					checkPass: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
                    }]
				},
				visible:true
			};
		},
		created() {
			this.keyupSubmit();  //回车登录
			let userAccount = localStorage.getItem("account") || null;
			let userCheckPass = localStorage.getItem("checkPass") || null;
			if(userAccount) {
				this.ruleForm.account = this.b.decode(userAccount);
				this.ruleForm.checkPass = this.b.decode(userCheckPass);
			}
		},
		mounted(){
			if(document.documentElement.clientWidth<=750 ){  //移动端适配
				this.collapsed=true;
			}
		},
		methods: {
			handleOpen(){
				this.$nextTick(function () { 
					let doc = document.getElementById('codeInput');
					doc.focus();
				 })				
			},
			keyupSubmit(){  //回车登录
			  	document.onkeydown=e=>{
			    	let _key=window.event.keyCode;
				    if(_key===13){
				    	this.handleSubmit();
				    }
				}
			},
			handleSubmit(){
                let that=this;
                
				this.$refs.ruleForm.validate((valid) => {
					if(valid) {
						this.logining = true;
						var loginParams = {
							loginId: this.ruleForm.account,
							password: this.ruleForm.checkPass
						};
						userLogin(loginParams).then(res => {
                            var res = { 
                                Ret:200,
                                Token:loginParams.loginId,
							}
							
							//测试状态管理使用 admin 可登录成功
							that.$store.dispatch('login',res.Token).then(()=>{

								that.$message.success('登录成功！')
								//登录成功
								that.logining = false;
								if( res.Ret==100 ){
									return false;
								}
								if( res.Ret==200 ){
									sessionStorage.setItem('Token',res.Token);
									sessionStorage.setItem('SysUserInfo',JSON.stringify({Account:that.ruleForm.account}))
									localStorage.setItem('account',that.b.encode(that.ruleForm.account));
									localStorage.setItem('checkPass',that.b.encode(that.ruleForm.checkPass));
	
									//获取后台侧边栏
									that.menuNav();
								}

							}).catch(()=>{
								that.$message.error('登录失败！')
								that.logining = false;
							})
                                
						});
					} else {
						return false;
					}
				});
            },
            menuNav(){
				let that = this;
                let params = {}
				getmenulist(params).then(res => {
					var res = { 
						Ret:200,
						Menus:menulistjson,
                    }
                    
					if( res.Ret == 200) {
                        let priData={};
						if( res.Menus!=null ){
                            priData = res.Menus;
							priData = JSON.stringify(priData).toLowerCase(); //所有的key转换成小写
							sessionStorage.setItem('meundata',priData);
						}
						that.$router.options.routes=[];
						let routes = [];
						if( priData.length>0 ){
                            MenuUtils(routes,priData);
                            that.$router.options.routes = Object.assign(that.$router.options.routes,routes);
							that.$router.addRoutes(routes);
						}
						that.$router.push({
							path: '/homepage'
						});
					} else {
						this.navlists = null;
					}
				});
			},
			changePass(value){
	        	this.visible = !(value === 'show');
	     	}
		}
	}
</script>

<style lang="scss" scoped>
	#container{ width:100%; height:100%; position:relative; overflow:hidden; }
	.fx_paper{
		display:flex;
		width:400px;
		height:420px;
		position: absolute;
		left:50%;
		top:50%;
		border-radius: 8px;
		justify-content: center;
		transform: translate(-50%, -50%);
		background-color: rgba(255,255,255,0.8);
		box-shadow: 0 6px 20px 5px rgba(40, 120, 255, 0.1), 0 16px 24px 2px rgba(0, 0, 0, 0.05);
		overflow: hidden;
	}
	.fx_pager_m{
		width:420px;
	}
	.fx_banner{
		width:440px;
		height: 100%;
	}
	.fx_wrap{
		width:560px;
		height: 100%;
	}
	.login-container{
		width:330px;
		margin: 0 auto;
		padding-top:40px;
        .fx_h3{
			font-size:30px;
			text-align: center;
			color: #409EFF;
			margin-bottom:60px;
		}
    }
	.remember{margin-bottom:6px;}
	.swiper1{height: 100%; background-color: #409EFF;}
	.swiper2{ height:100%; background-color: #606266; }
</style>






