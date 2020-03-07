<template>
	<el-row class="container">
		<el-row :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'" @click.native="backmain">{{collapsed?'后台':sysName}}</el-col>
			<el-col :span="11"><div class="tools" @click.prevent="collapse"><i class="fa fa-align-left"></i></div><div class="tools" @click.prevent="refresh"><i class="fa fa-refresh"></i></div><div class="tools" @click.prevent="goback"><i class="fa fa-arrow-left"></i></div></el-col>
			<el-col :span="3" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img src="~@/assets/avatar.png" />{{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item  @click.native="resetpwd">修改密码</el-dropdown-item>
						<el-dropdown-item  @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>
		<el-row :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'" style="height:100%; z-index:10;">
				<!--导航菜单-->
                <!-- <el-menu :default-openeds="['1', '3']">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>导航一</template>
                        <el-menu-item-group>
                            <template slot="title">分组一</template>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                </el-menu> -->


				<el-menu background-color="#333" text-color="#fff" :default-active="$route.matched[1].path" theme="light" unique-opened router class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect" v-if="!collapsed" ref="expandmenu">
					<template v-for="(item,index) in navlists" v-if="item.hidden==0">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.imageurl"></i><span style="display:inline-block; width:96px; text-align:left; padding-left:10px; box-sizing:border-box;">{{item.name}}</span></template>
							<el-menu-item v-for="child in item.children" :index="child.path" :path="child.path" :key="child.path" v-if="child.hidden==0">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconcls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" ref="menuCollapsed" v-if="collapsed">
					<li v-for="(item,index) in navlists" v-if="item.hidden==0" class="el-submenu item">
						<template>
							<div class="el-submenu__title" style="padding-left:20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.imageurl"></i></div>
							<ul class="el-menu submenu" style="background:#fff; padding-top:49px; box-shadow:0 0 6px #999; overflow:hidden;" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)" @click="showMenu(index,false)"> 
								<li style="width:100%; font:16px/50px '微软雅黑'; text-align:center; color:#344058; border-bottom:1px solid #eaeaea; position:absolute; top:0;">{{item.name}}</li>
								<li v-for="child in item.children" v-if="child.hidden==0" :key="child.path" class="el-menu-item" :class="$route.matched[1].path==child.path?'is-active':''" @click="$router.push(child.path)" style="padding-left:40px;">{{child.name}}</li>
							</ul>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container" id="displayMain" ref="displayMain">
				<el-row class="grid-content bg-purple-light content" style="min-width:1000px;">
					<el-col :span="24" class="breadcrumb-container">
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :zmx="item" :key="item.path" :to="{path:item.path}">{{ item.name }}</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" style="display:none;" :class="breadcrumbFixed&&collapsed==false?'breadFixed':breadcrumbFixed&&collapsed==true?'breadCollapsedFixed':''" id="breadcrumb">
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :zmx="item" :key="item.path" :to="{path:item.path}">{{ item.name }}</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</el-row>
			</section>
		</el-row>
	</el-row>
</template>

<script>
	import http from "api/http.js"
	import MenuUtils from '@/utils/menuUtils.js';
	// import theme from "@/mixins/theme.js";
	export default {
		inject:['reload'],
		// mixins:[theme()],
		data() {
			return {
				chalk: "",
				breadcrumbFixed:false,  //吸顶固定
				sysName:'管理后台',
				collapsed: false,
				sysUserName:'admin',
				sysUserAvatar:'',
				navlists:this.$router.options.routes
			}
		},
		created(){
            console.log(this.navlists)
			let isLoadNodes = sessionStorage.getItem('isLoadNodes');
			if( !isLoadNodes ){
				let data = JSON.parse(window.sessionStorage.getItem('menudata'));
				sessionStorage.setItem('isLoadNodes','true');
			}
		},
		mounted() {
			if( screen.width<=750 ){  //移动端适配
				this.collapsed=true;
			}
			var user = sessionStorage.getItem('SysUserInfo');
			if (user) {
				user = JSON.parse(user);
				this.sysUserName = user.Account || '';
				this.sysUserAvatar = "~@/assets/avatar.png";
			}
			document.getElementById("displayMain").addEventListener('scroll',this.handleScroll);
		},
		methods: {
		    historyBack(){  //返回上一页
		    	if( sessionStorage.historyUrl ){
		    		this.$router.replace( sessionStorage.historyUrl );
		    	}
		    },
		    backmain(){  //回到首页
		    	this.$router.push({path:'/homepage'});
		    },
		    resetpwd(){  //修改密码
		    	this.$router.push({path:'/updatepwd'});
		    },
			onSubmit(){  },
			handleopen(){  },
			handleclose(){  },
			handleselect:function(a,b){  },
			logout:function(){  //退出登录
				var that = this;
				// this.$confirm('确认退出吗?','提示',{
				// 	type:'warning'
				// }).then(() => {
					sessionStorage.removeItem('userDtl');
					sessionStorage.removeItem('meundata');
					sessionStorage.removeItem('isLoadNodes');
					sessionStorage.removeItem('Token');
					that.$router.push('/login');
				// }).catch(() => {  });
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			//折叠导航栏状态，控制副导航显示消失
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			},
			handleScroll(){  //页面滚动监听
				let mainDiv=document.getElementById("displayMain");
				var scrollTop = mainDiv.scrollTop;
				if( scrollTop>80 ){
		        	this.breadcrumbFixed = true;
		        }else{
		        	this.breadcrumbFixed = false;
		        }
			},
			refresh(){
				this.reload();
			},
			goback(){
				this.$router.back();
			}
		}
	}
</script>

<style scoped lang="scss">
	.container{ width:100%; position:absolute; top:0px; bottom:0px;
		.header{ height:60px; line-height:60px; background:#fff; color:#000; border-bottom:1px solid #ccc;
			.logo{ height:60px; color:#fff; text-align:center; background:#333; overflow:hidden;
				img{ height:38px; margin:15px auto 0; }
			}
			.logo-width{ width:199px; font:16px/60px "微软雅黑"; cursor:pointer; }
			.logo-collapse-width{ width:58px; }
			.tools{display:inline-block; padding:0px 23px; width:14px; height:60px; line-height:60px; cursor:pointer; }
			.userinfo{ text-align:center; float:right; position:relative;
				.theme-picker{ position:absolute; top:15px; left:0; }
				.theme-picker-dropdown .el-color-dropdown__link-btn{ display:none; }
				.userinfo-inner{ cursor:pointer; color:#000;
					img{ width:40px; height:40px; border-radius:20px; margin:10px; float:left; }
				}
			}
		}
		.main{ display:flex; width:100%; position:absolute; top:60px; bottom:0px; background:none; overflow:hidden;
			aside{ flex:0 0 200px; width:200px; text-align:center;
				.el-menu{ width:200px; height:100%;  box-sizing:border-box; }
				.collapsed{ width:59px; background:#333;
					.item{ position:relative; }
					.submenu{ position:absolute; top:0px; left:58px; z-index:99999; height:auto; display:none; }
					.el-submenu__title:hover{background-color:#00b38a !important;}
				}
			}
			.menu-expanded{ flex:0 0 200px; width:200px; overflow:hidden; }
			.menu-expanded>.el-menu-vertical-demo{ width:217px; height:100%; overflow-y:scroll; }
			.menu-collapsed{ flex:0 0 60px; width:60px; }
			.content-container{ flex:1; width:100%; background:#f9f9f9; overflow-y:scroll; position:relative;
				.content{ width:100%; overflow:auto;
					.breadcrumb-container{ background:#fff; padding:15px 20px; box-sizing:border-box; line-height:19px; border-bottom:1px solid #ddd; margin-bottom:15px; 
						.title{ width:200px; color:#475669; float:left; }
						.breadcrumb-inner{ line-height:19px; }
					}
					.breadFixed{ display:block !important; background:rgb(255,255,255); border-bottom:1px solid #eaeaea; padding:15px 245px 15px 20px; box-sizing:border-box; position:fixed; top:60px; left:200px; right:0; z-index:10; }
					.breadCollapsedFixed{ display:block !important; background:rgb(255,255,255); border-bottom:1px solid #eaeaea; padding:15px 105px 15px 25px; box-sizing:border-box; position:fixed; top:60px; left:60px; right:0; z-index:10; }
					.content-wrapper{ width:100%; padding:0 15px 20px; box-sizing:border-box; overflow:auto; }
				}
			}
		}
	}
</style>