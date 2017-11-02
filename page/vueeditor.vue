<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>
                <el-breadcrumb-item>编辑器</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="plugins-tips">
            Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。
            访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
        </div>
        <quill-editor class="editor" ref="myQuillEditor" v-model="content" :config="editorOption"></quill-editor>
        <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
    </div>
</template>
<script>
 import Quill from 'quill'
  export default {
    data(){
            return {
                content: '<p>编辑的内容</p>',
                editorOption: {
                    // something config
                }
            }
        },
    mounted() {
      console.log('this is current quill instance object', this.myQuillEditor)
    },
    methods:{
        submit(){
            console.log(this.$refs.myQuillEditor.quill)
        }
    }
    
    // Omit the same parts as in the following component sample code
    // ...
  }
</script>
<style scoped>
    .editor-btn{
        clear: both;
        margin-top: 50px;
    }
    .editor{
        height:400px;
    }
    .crumbs{
        margin-bottom: 20px;
    }
    .plugins-tips{
        height: 60px;line-height: 60px;
        background-color:#eee;
        margin:10px 0;
        text-indent: 20px;
    }
</style>
