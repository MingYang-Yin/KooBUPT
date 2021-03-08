<template>
  <div style="border: 5px black">
    <br>
    <el-button type="primary" size="small" @click="dialogFormVisible = true" style="position:relative;left:-340px;" plain>添加房间信息</el-button>
    <br>

    <el-dialog
      title="添加房间信息"
      :visible.sync="dialogFormVisible"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true"
    >
      <el-form :inline="true" :model="formInline" :rules="rules" ref="addInfo" class="demo-form-inline">
        <el-form-item label="校区" prop="campus" label-position=auto>
          <el-select v-model="formInline.campus" placeholder="选择校区">
            <el-option label="校本部" value="校本部"></el-option>
            <el-option label="沙河校区" value="沙河校区"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼宇" prop="building">
          <el-input v-model="formInline.building" placeholder="请输入楼宇"></el-input>
        </el-form-item>
        <el-form-item label="实验室房间号" prop="room">
          <el-input v-model="formInline.room" placeholder="请输入房间号"></el-input>
        </el-form-item>
        <el-form-item label="设备数量" prop="equipmentNum">
          <el-input v-model="formInline.equipmentNum" placeholder="请输入设备数量"></el-input>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button type="primary" @click="handleClick('addInfo')">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-table
      :data="tableData"
      stripe>
      <el-table-column
        prop="campus"
        label="校区"
        width="150"
        :filters="[{text: '校本部', value: '校本部'}, {text: '沙河校区', value: '沙河校区'}]"
        :filter-method="filterHandler">
      </el-table-column>
      <el-table-column
        prop="building"
        label="楼宇"
        width="150">
      </el-table-column>
      <el-table-column
        prop="roomnum"
        label="实验室房间号" width="180px">
      </el-table-column>
      <el-table-column
        prop="number"
        label="设备数量" width="150px">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleDelete(scope.$index, scope.row)" type="text" size="small" >删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'changeInformation',
    data(){
      return{
        dialogFormVisible: false,
        tableData:[],
        formInline: {
          campus: '',
          building:'',
          room:'',
          equipmentNum:'',
        },
        rules: {
          campus: [
            { required: true, message: '请选择校区', trigger: 'blur' },
          ],
          building: [
            { required: true, message: '请输入楼宇', trigger: 'blur' },
          ],
          room: [
            { required: true, message: '请输入房间号', trigger: 'blur' },
          ],
          equipmentNum: [
            { required: true, message: '请输入设备数量', trigger: 'blur' },
          ],
        },
        formLabelWidth: '120px',
      }
    },
    mounted:function(){ //在页面加载时触发的函数
      this.createPage();//需要触发的函数
    },
    methods: {
      //处理删除事件
      handleDelete(index, row) {
        console.log(index, row);
        alert(row.building)
         var submit = {  //JSON数据		名称-值对
          "building": row.building,
          "campus": row.campus,
          "room": row.roomnum,
        }
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/computerRoom/deleteRoom', //需要修改
          contentType: 'application/json; charset=UTF-8',// 解决415错误
          headers:{'Content-Type':'application/json;charset=UTF-8'},
          dataType: 'json',
          data: JSON.stringify(submit),
        }).then(res => {
          alert("删除成功！")
        }).catch(error => {
          alert(error)
          alert('与服务器连接错误')
          console.log(error)
        })
      },

      //处理初始化事件
      createPage:function(){
        const that = this; //用that解决函数内部this指向问题
        var string1 = ""
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/computerRoom/showRooms',
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
            if(objectToInsert.campus === "S"){
              objectToInsert.campus = "沙河校区"
            }
            if(objectToInsert.campus === "H"){
              objectToInsert.campus = "校本部"
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

      //处理关闭表单操作
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        this.$refs['addInfo'].resetFields();
      },

      //处理提交事件
      handleClick: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var submit = {  //JSON数据		名称-值对
              "campus": this.formInline.campus, //校区
              "building": this.formInline.building, //楼宇
              "room": this.formInline.room, //房间号
              "equipmentNum": this.formInline.equipmentNum, //设备数量
            }
            this.$axios({
              method: 'post',
              url: 'http://localhost:8080/computerRoom/addRoom',
              contentType: 'application/json; charset=UTF-8',// 解决415错误
              headers:{'Content-Type':'application/json;charset=UTF-8'},
              dataType: 'json',
              data: JSON.stringify(submit),
            }).then(res => {
              console.log(this.formInline.campus)
              if(res.data === 1){
                alert("添加成功")
              }
              else{
                alert("添加失败")
              }
            }).catch(error => {
              alert(error)
              alert('账号或密码错误')
              console.log(error)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
