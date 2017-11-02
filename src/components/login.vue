<template>
<div class="login-wrap">
   <div class="login"@keyup.enter="onSubmit('form')">
       <h1>登录</h1>
       <el-form :rules="rules" ref="form" :model="form" label-width="80px" >
            <el-form-item label="账号" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input  v-model="form.pass"></el-input>
            </el-form-item>
             <el-form-item>
                 <el-button type="primary" @click="onSubmit('form')">登录</el-button>
                 <el-button  @click="dialogFormVisible = true" >注册</el-button>
            </el-form-item>
       </el-form>
   </div>

    <el-dialog  title="注册" :visible.sync="dialogFormVisible">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="name">
        <el-input type="text" v-model="ruleForm2.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
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
<script>
    export default {
        data (){
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请输入密码'));
                } else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm2.pass) {
                callback(new Error('两次输入密码不一致!'));
                } else {
                callback();
                }
            };
            return {
                 ruleForm2: {
                    pass: '',
                    checkPass: '',
                    age: ''
                },
                rules2: {
                    name: [
                        { required: true, message: '请输入正确的账号', trigger: 'blur' },
                        { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    
                },
                    
                dialogFormVisible : false,
                formLabelWidth : "120px",
                form : {
                    name : "",
                    pass : "",  
                    date : "",              
                },
                rules: {
                    name: [
                        { required: true, message: '请输入正确的账号', trigger: 'blur' },
                        { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
                    ],
                    pass: [
                        { required: true, message: '请输入密码', trigger: 'change' }
                    ],
                }
            }
        },
         computed: {
                author(){
                    return this.$store.state.user
                }
            },
        methods :{
             onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    sessionStorage.setItem("user",JSON.stringify(this.form));
                    this.$store.commit("user",this.form.name)
                    //否则跳转到登录后的页面
                     this.$router.push('/readme');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            registered(){
                this.loginFlag = true;
            },
            dialogEdit () {},
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(this.ruleForm2,1111111111)
                    this.$store.commit("user",this.ruleForm2.name)
                    //否则跳转到登录后的页面
                     this.$router.push('/readme');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>
<style>
    body,html{
        height:100%;
        background-color:#000;
        overflow: hidden;
    }
    .login-wrap{
        width: 500px;
        height:300px!important;
        border-radius: 10px;
        background-color:#fff;
        margin:200px auto;
    }
    .login{
        margin:20px;
    }
    .login h1 {
        font-size: 30px;
        width: 100%;
        text-align: center;
        height: 80px;line-height: 80px;
    }
</style>

