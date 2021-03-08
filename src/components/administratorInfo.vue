<template>
  <div style="border: 5px black">
    <!--修改权限对话框-->
    <el-dialog
      title="用户权限修改"
      :visible.sync="dialogFormVisible"
      width="30%"
      :append-to-body="true"
    >
      <el-form :label-position="left" label-width="70px" class="demo-form-inline">
        <el-form-item label="姓名：">
          {{this.dataInForm.name}}
        </el-form-item>
        <el-form-item label="学工号：">
          {{this.dataInForm.aid}}
        </el-form-item>
        <el-form-item label="权限：" prop="campus">
          <el-select v-model="submit" placeholder="选择权限">
            <el-option label="管理员" value="A"></el-option>
            <el-option label="教师" value="T"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleClick()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table
      :data="tableData.filter(data => !search || data.aid.toLowerCase().includes(search.toLowerCase()))"
      stripe>
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="aid"
        label="学工号"
        align="center"
        width="200">
      </el-table-column>
      <el-table-column
        prop="classes"
        label="账号类型"
        align="center"
        width="180px"
        :filters="[{text: '超级管理员', value: '超级管理员'}, {text: '管理员', value: '管理员'}, {text: '教师', value: '教师'}]"
        :filter-method="filterHandler">
      </el-table-column>

      <el-table-column
        align="center">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入学工号搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)" type="text" size="small" >修改权限</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'administratorInfo',
    data(){
      return{
        dialogFormVisible: false,
        //tableData:[],
        tableData:[],
        search: '',
        dataInForm:[
          {
          aid:"",
          classes:"",
          name:""
          }
        ],
        submit:''
      }
    },

    mounted:function(){ //在页面加载时触发的函数
      this.createPage();//需要触发的函数
    },
    methods: {
      //处理删除事件
      handleEdit(index, row) {
        this.dataInForm.aid = row.aid
        this.dataInForm.name = row.name
        this.dialogFormVisible = true
      },

      //处理初始化事件
      createPage:function(){
        const that = this; //用that解决函数内部this指向问题 zhengkai.blog.csdn.net
        var string1 = ""
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/user/showAllUser',
          contentType: 'application/json; charset=UTF-8',// 解决415错误
          headers:{'Content-Type':'application/json;charset=UTF-8'},
          dataType: 'json',
          data: JSON.stringify({
            "request":"1"
          }),
        }).then(function (res) {
          string1 = res.data //储存数据
          var dataNum = string1.length //储存数据条数
          for(var i=0;i<dataNum;i++){
            var objectToInsert = JSON.parse(string1[i]);
            if(objectToInsert.classes === "S"){
              objectToInsert.classes = "超级管理员"
            }
            if(objectToInsert.classes === "A"){
              objectToInsert.classes = "管理员"
            }
            if(objectToInsert.classes === "T"){
              objectToInsert.classes = "教师"
            }
            that.tableData.push(objectToInsert);
          }
        }).catch(error => {
          alert(error)
          console.log(error)
        })
      },

      //过滤表格信息操作
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },

      //处理提交事件
      handleClick: function () {
        var submit1 = {  // JSON数据		名称-值对
          "aid": this.dataInForm.aid,
          "name": this.dataInForm.name,
          "classes": this.submit, // 注意：传递的是A、T等数据库中的表示字符
        }
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/user/updateAdminister', // 需要更改
          contentType: 'application/json; charset=UTF-8', // 解决415错误
          headers:{'Content-Type':'application/json;charset=UTF-8'},
          dataType: 'json',
          data: JSON.stringify(submit1),
        }).then(res => {
          //console.log(this.formInline.campus)
          if(res.data === 1){
            alert("修改成功")
          }
          else{
            alert("修改失败")
          }
        }).catch(error => {
          alert(error)
          console.log(error)
        })
      }
    }
  }
</script>

<style scoped>

</style>
