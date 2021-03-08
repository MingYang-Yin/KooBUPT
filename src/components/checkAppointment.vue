<template>
  <div>
    <el-table
      :data="tableData"
      >
      <el-table-column
        prop="date"
        label="提出时间"
        width="100">
      </el-table-column>
      <el-table-column label="申请信息"> <!--申请信息表头-->
        <el-table-column
          prop="name"
          label="姓名"
          width="70"
          >
        </el-table-column>
        <el-table-column
          prop="requireDate"
          label="使用日期"
          width="100"
          >
        </el-table-column>
        <el-table-column
          prop="requireClass"
          label="申请节数"
          width="80"
          >
        </el-table-column>
        <el-table-column label="申请机房信息"> <!--申请机房信息表头-->
          <el-table-column
            prop="requireCampus"
            label="校区"
            width="80">
          </el-table-column>
          <el-table-column
            prop="requireBuilding"
            label="楼宇"
            width="60">
          </el-table-column>
          <el-table-column
            prop="requireRoom"
            label="房间"
            width="60">
          </el-table-column>
        </el-table-column> <!--申请机房信息表头结束-->
        <el-table-column
          prop="requireReason"
          label="申请原因（课程）"
          width="180"
          >
        </el-table-column>
      </el-table-column> <!--申请信息表头结束-->
      <el-table-column
        fixed="right"
        label="操作"
        width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleAgree(scope.$index, scope.row)">同意</el-button>
          <br>
          <el-button type="text" size="small" @click="open">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import * as process from '../../.eslintrc'

  export default {
    name: 'checkAppointment',
    data(){
      return{
        /*tableData: [{
          name: '殷铭阳',
          date: '2021-2-21',
          requireDate: '2021-2-25',
          requireClass: '1至3节',
          requireCampus: '沙河校区',
          requireBuilding: 'S楼',
          requireRoom: '102',
          aid: '2017211912',
          cid: 1,
          requireReason: '敬的校领导： 您好！ 为准备市、省、国家技能大赛，并为申请承办省技能大赛做准备，也为培训建筑预算员、建造师、造价师的工作提供设备支持。特向学院领导申请40-50人建筑工程系专用机房一个。'
        }],*/
        tableData: [],
      }
    },
    mounted:function(){ //在页面加载时触发的函数
      this.createPage();//需要触发的函数
    },
    methods:{
      //将时间戳转化为日期
      formatDate: function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d;
        //return h + ':' + m + ':' + s;
      },

      //将时间戳转化为时间
      formatTime: function (value) {
        process.env.TZ = 'Europe/London';//可以切换到任意时区
        var tempTime = new Date(value)
        //SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        //System.out.println(sdf.format(dt));

        //tempTime.toLocaleString('English',{hour12:false})
        console.log(tempTime)
        var hour = tempTime.getHours()
        if(hour>8){
          hour = hour-8
        }
        else{
          hour = 16+hour
        }
        return hour + ":" + tempTime.getMinutes()
        /*let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        //return y + '-' + MM + '-' + d;
        return h + ':' + m + ':' + s;*/
      },

      //处理初始化事件
      createPage:function(){
        const that = this; //用that解决函数内部this指向问题
        var string1 = ""
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/subscribe/checkReservations', /*需要更改*/
          contentType: 'application/json; charset=UTF-8',// 解决415错误
          headers:{'Content-Type':'application/json;charset=UTF-8'},
          dataType: 'json',
          data: JSON.stringify({
            "request":"1"
          }),
        }).then(function (res) {
          string1 = res.data //储存数据
          console.log(res)
          console.log(res.data)
          var dataNum = string1.length //储存数据条数
          for(var i=0;i<dataNum;i++){ /*向表格中添加数据*/
            var temp = {
              name: '',
              date: '',
              requireDate: '',
              requireClass: '',
              requireCampus: '',
              requireBuilding: '',
              requireRoom: '',
              requireReason: ''
            }
            var objectToInsert = JSON.parse(string1[i]);
            var sendTime = parseInt(objectToInsert.time)
            var orderTime = parseInt(objectToInsert.date)
            temp.date = that.formatTime(sendTime)
            temp.requireDate = that.formatDate(orderTime)
            if(objectToInsert.campus === "S"){
              temp.requireCampus = "沙河校区"
            }
            if(objectToInsert.campus === "H"){
              temp.requireCampus = "校本部"
            }
            temp.name = objectToInsert.account
            temp.requireClass = objectToInsert.startSession+'至'+objectToInsert.endSession+'节'
            temp.requireBuilding = objectToInsert.building
            temp.requireRoom = objectToInsert.room
            temp.requireReason = objectToInsert.name
            that.tableData.push(temp);
          }
        }).catch(error => {
          alert(error)
          console.log(error)
        })
      },

      //点击同意按钮触发的事件
      handleAgree: function (index, row) {
        var that = this
        console.log(index, row);
        alert(row.building)
        var temp = row.requireClass
        temp = temp.split('至')
        var temp2 = temp[1].split('节')
        var submit = {  //JSON数据		需要按照后端要求修改
          "date": row.requireDate,
          "room": row.requireRoom,
          "Cid": row.cid,
          "startSession": temp[0],
          "endSession": temp2[0],
          "campus": row.requireCampus,
          "building":row.requireBuilding
        }
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/subscribe/pass', //需要修改
          contentType: 'application/json; charset=UTF-8',// 解决415错误
          headers:{'Content-Type':'application/json;charset=UTF-8'},
          dataType: 'json',
          data: JSON.stringify(submit),
        }).then(res => {
          that.tableData.splice(index,1); /*删除该行已处理的数据*/
          that.$message({
            message: '您已成功同意该申请',
            type: 'success'
          });
        }).catch(error => {
          alert(error)
          alert('与服务器连接错误')
          console.log(error)
        })
      },

      //向服务器发送拒绝原因及能标识该申请的信息
      sendForbid: function (index, row, reason) {
        var that = this
        console.log(index, row);
        alert(row.building)
        var submit = {  //JSON数据		需要按照后端要求修改
          "building": row.building,
          "campus": row.campus,
          "reason": reason,
          "cid": row.aid,
          "room": row.name,
        }
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/computerRoom/deleteRoom', //需要修改
          contentType: 'application/json; charset=UTF-8',// 解决415错误
          headers:{'Content-Type':'application/json;charset=UTF-8'},
          dataType: 'json',
          data: JSON.stringify(submit),
        }).then(res => {
          that.tableData.splice(index,1); /*删除该行已处理的数据*/
          that.$message({
            message: '您已成功拒绝该申请',
            type: 'warning'
          });
        }).catch(error => {
          alert(error)
          alert('与服务器连接错误')
          console.log(error)
        })
      },

      /*点击拒绝按钮，弹出弹框，可在此输入拒绝原因*/
      open(index, row) {
        var that = this
        this.$prompt('请输入拒绝原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
          inputErrorMessage: '拒绝原因不可为空'
        }).then(({ value }) => {
          that.sendForbid(index, row,value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },

      /*处理点击拒绝按钮的函数*/
      handleForbid: function (index, row){
        this.open(index, row);
      },
    }
  }
</script>

<style scoped>

</style>
