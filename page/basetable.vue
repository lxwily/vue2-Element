<template>
<div >
    <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 表格</el-breadcrumb-item>
                <el-breadcrumb-item>基础表格</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    <div style="margin:20px 0">
        <el-button type="primary" icon="delete" @click="deleteBatch(tableData3)">批量删除</el-button>
        <el-button type="primary" @click="addAddress">新增</el-button>
        <template>
            <el-select v-model="value" placeholder="筛选城市">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </template>
         <el-input class="inputwidth" v-model="input" placeholder="筛选关键字"></el-input>
         <el-button type="primary" icon="search" @click="onSearch">搜索</el-button>
    </div>
  <el-table
    ref="multipleTable"
    :data="tableData3"
    border
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
     <el-table-column
      type="selection"
      width="55">
    </el-table-column>
     <el-table-column
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
     <el-table-column
      prop="operation"
      label="操作"
      width="140">
        <template scope="scope">
        <el-button  @click="editClick(scope.row)"  size="small" >编辑</el-button>
        <el-button  @click="clearClick(scope.$index)" type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <template>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    size="tiny">
    <span>确定要删除这条记录？</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="clickTrue">确 定</el-button>
    </span>
    </el-dialog>
</template>

<template>
   <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
</template>


<el-dialog :title="title" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="日期" :label-width="formLabelWidth">
        <el-date-picker
      v-model="form.date"
      type="date"
      format
      placeholder="选择日期"
      >
    </el-date-picker>
    </el-form-item>
    			
    <el-form-item label="姓名" :label-width="formLabelWidth">
      <el-input style="width:194px" v-model="form.name" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="地址" :label-width="formLabelWidth">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入你的地址"
      v-model="form.address">
</el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogEdit">确 定</el-button>
  </div>
</el-dialog>

</div>



</template>

<script>
  export default {
    data() {
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        title :"收货地址",
         form: {
          date: '',
          name: '',
          address: ''
        },
        formLabelWidth: '120px',
        dialogFormVisible : false,
        deleteIndex : 0,
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4,
        options: [{
            value: '选项1',
            label: '广州'
            }, {
            value: '选项2',
            label: '深圳'
            }, {
            value: '选项3',
            label: '珠海'
            }, {
            value: '选项4',
            label: '惠州'
            }, {
            value: '选项5',
            label: '梅州'
            }],
        value: '',
        input:'',
        dialogVisible: false,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          operation :['编辑','删除']
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          operation :['编辑','删除']
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          operation :['编辑','删除']  
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          operation :['编辑','删除']  
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          operation :['编辑','删除']  
        }, {
          date: '2016-05-06',
          name: '何静',
          address: '江苏省 宿迁市 宿豫区',
          operation :['编辑','删除']  
        }, {
          date: '2016-05-07',
          name: '郭秀英',
          address: '西藏自治区 阿里地区 普兰县',
          operation :['编辑','删除']  
        }],
        multipleSelection: []
      }
    },
     watch :{
      'form.date' (curVal,oldVal){
        console.log(curVal,"=====")
        this.form.date ? this.form.date =  new Date(curVal).toJSON().substr(0,10) : this.form.date = ""
      }
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      editClick(event) {
        this.dialogFormVisible = true;
       
        this.title = "修改收获地址"
        
      },
      clearClick(index) {
         this.deleteIndex = index;
         this.dialogVisible = true;  
         console.log(this.deleteIndex,this.tableData3[index])
      },
      //是否要删除这条纪录
      clickTrue() {
          this.dialogVisible = false;
          this.$message({
            message: '恭喜你，成功删除消息',
            type: 'success',
          });
          
          this.tableData3.splice(this.deleteIndex,1)
      },
      //查询过滤条件
      onSearch (){
        let newArray = [];
        this.tableData3.filter(item =>{
          if(item.name.indexOf(this.input) != -1){
            newArray.push(item)
          }
        })
         this.tableData3 = newArray
      },
      //新增地址

      addAddress() {
        this.dialogFormVisible = true;
        this.title = "新增收获地址"
      },
      dialogEdit (){
        if(this.title == "新增收获地址"){
          console.log("新增。。。。",this.form)
            this.tableData3.unshift(this.form)
        }else{
          this.form = event;
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //批量删除
      deleteBatch (rows){
           let that = this;
           rows.forEach(function(values,key){
             for (let i of that.multipleSelection){
               if(i == values){
                 rows.splice(key,1)
               }
             }
           });
           
            
      }
    },
  }
</script>
<style>
    .inputwidth{
        width:300px;
    }
    .block{
        float: right;
        margin-top:20px;
    }
</style>
