<template>
      <div id="app">
        <!-- 头部导航 -->
        <header class="header">
          <h3 class="login-title">后台管理系统</h3>
           <el-dropdown class="login-header"  >
            <span class="el-dropdown-link login-header-wrap">
                <span class="login_admin">{{userId}}</span><i trigger="click"class="el-icon el_icon_admin"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="LoginOut()">退出</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown> 
        </header>
        <div class="mian-left ">
          <el-row class="tac ">
            <el-col>
              <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
                 <template v-for="item in items" >
                     <template v-if="item.subs">
                          <el-submenu :index="item.index">
                              <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                              <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                              </el-menu-item>
                          </el-submenu>
                     </template>
                     <template v-else>
                       <el-menu-item :index="item.index"><i :class="item.icon"></i>{{ item.title }}</el-menu-item>
                     </template>
                 </template>
               
              </el-menu>
            </el-col>
          </el-row>
        </div>

        <div class="content">
            <router-view></router-view>
        </div>
      </div>
    </template>

    <script>
    import Vue from 'vue'
    import Element from 'element-ui'
    import 'element-ui/lib/theme-default/index.css'

    Vue.use(Element)

    export default {
      name: 'app',
      data: function (){
        return {
          user : "122222",
          active:true,
          items: [
                    {
                        icon: 'el-icon-setting',
                        index: 'readme',
                        title: '自述'
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: '表格',
                        subs: [
                            {
                                index: 'basetable',
                                title: '基础表格'
                            },
                            {
                                index: 'vuetable',
                                title: 'Vue表格组件'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '3',
                        title: '表单',
                        subs: [
                            {
                                index: 'baseform',
                                title: '基本表单'
                            },
                            {
                                index: 'vueeditor',
                                title: '编辑器'
                            },
                            // {
                            //     index: 'markdown',
                            //     title: 'markdown'
                            // },
                            {
                                index: 'upload',
                                title: '文件上传'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-star-on',
                        index: 'basecharts',
                        title: '图表'
                    },
                    // {
                    //     icon: 'el-icon-upload2',
                    //     index: 'drag',
                    //     title: '拖拽'
                    // }
                ]
        }
      },
     
      computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            },
            userId () {
               return  this.$store.state.name ? this.$store.state.name : JSON.parse(sessionStorage.getItem("user")).name
                
            }
        },
       
        methods:{
            LoginOut (){
                
                this.$confirm('是否要退出?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    });
                    sessionStorage.removeItem("user");
                    this.$router.push('/login');
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消退出'
                    });          
                });
            }
        }
    }
    </script>

    <style>
      body{margin: 0;}
      .header{
        background-color: #242f42;
        width:100%;
        height:70px;
      }
      .login-title{
        width: 250px;
        line-height:70px;
        color:#fff;
        font-size: 24px;
        text-align: center;
        float: left;
      }
      .login-header{
        margin:auto;
        float: right;
        font-size: 20px;
        width:auto;
        height:50px;
        margin-top:10px;
        text-align: center;
        margin-right:30px;
        line-height: 50px;
        color:#fff;
      }
      .mian-left{

        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom: 0;
        background: #324157;
      }
      .content{
          background: none repeat scroll 0 0 #fff;
          position: absolute;
          left: 250px;
          right: 0;
          top: 70px;
          bottom: 0;
          width: auto;
          padding: 40px;
          box-sizing: border-box;
          overflow-y: scroll;
      }
      .login_admin{
          height: 50px;
          line-height:50px;
          display: inline-block;
          float: left;margin-right: 20px;
      }
      .el_icon_admin{
          display: inline-block;
          width:50px;
          height: 50px;
          background-color:red;
          border-radius: 50%;
      }
    </style>
