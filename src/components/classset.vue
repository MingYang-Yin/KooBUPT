<template>
  <div>
    <div>
      <h4 class="content">每天的课程总数为</h4>
      <h4>{{value}}</h4>
    </div>

    <el-button type="text" @click="dialogVisible = true">编辑</el-button>

    <div>
      <el-dialog
        title="编辑每日课程节数"
        :visible.sync="dialogVisible"
        :append-to-body="true"
        width="30%">
        <span>编辑每日上课节数：{{value}} 改为 {{clickvalue}}</span>
        <br>
        <br>
        <br>
        <el-popover
          placement="right"
          width="400"
          trigger="click">
          <el-select v-model="clickvalue" placeholder="选择课程总节数">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button slot="reference">设置课程总数</el-button>
        </el-popover>
        <el-button type="primary" @click="handleClick" style="margin-left: 200px">提交</el-button>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
      data() {
        return {
          dialogVisible: false,
          options: [{
            value: '1',
            label: '1节'
          }, {
            value: '2',
            label: '2节'
          }, {
            value: '3',
            label: '3节'
          }, {
            value: '4',
            label: '4节'
          }, {
            value: '5',
            label: '5节'
          },{
            value: '6',
            label: '6节'
          },{
            value: '7',
            label: '7节'
          },{
            value: '8',
            label: '8节'
          },{
            value: '9',
            label: '9节'
          },{
            value: '10',
            label: '10节'
          },{
            value: '11',
            label: '11节'
          },{
            value: '12',
            label: '12节'
          },{
            value: '13',
            label: '13节'
          },{
            value: '14',
            label: '14节'
          },{
            value: '15',
            label: '15节'
          },{
            value: '16',
            label: '16节'
          },{
            value: '17',
            label: '17节'
          },{
            value: '18',
            label: '18节'
          }],
          value: '',
          clickvalue: '未定义'
        }
      },
    mounted:function(){ //在页面加载时触发的函数
      this.createPage();//需要触发的函数
    },
      methods:{
        //处理初始化事件
        createPage:function(){
          const that = this; //用that解决函数内部this指向问题
          var string1 = ""
          this.$axios({
            method: 'post',
            url: 'http://localhost:8080/Info/getSession', //需要修改
            contentType: 'application/json; charset=UTF-8',// 解决415错误
            headers:{'Content-Type':'application/json;charset=UTF-8'},
            dataType: 'json',
            data: JSON.stringify({
              "request":"1"
            }),
          }).then(function (res) {
            string1 = res.data //储存数据
            that.value = string1
            if(that.value === ''){
              that.value = "未定义"
            }
          }).catch(error => {
            alert(error)
            console.log(error)
          })
        },

        //处理提交事件
        handleClick(){
          var timeset = {  //JSON数据		名称-值对
            "classes": this.clickvalue+"节",
          }
          var that = this
          if (this.clickvalue === '未定义') {
            alert('请选择退改已预约机房的限制时间')
          }
          else{
            this.$axios({
              method: 'post',
              url: 'http://localhost:8080/Info/setSession', //需要修改
              //contentType: 'application/json;charset=UTF-8',
              contentType: 'application/json; charset=UTF-8', // 解决415错误
              headers:{'Content-Type':'application/json;charset=UTF-8'},
              dataType: 'json',
              data: JSON.stringify(timeset),
            }).then(res => {
              if(res.data === 1){ //成功提示
                that.dialogVisible = false
                alert("设置成功")
                that.value = that.clickvalue
                that.clickvalue = '未定义'
              }
            }).catch(error => {
              alert(error)
              alert('账号或密码错误')
              console.log(error)
            })
          }
        }
      }
    }
</script>

<style>

  .word{
    float: left;
     margin-left: 200px;
     margin-top: 240px;
   }
   .select{
    float: left;
    margin-left: 10px;
    margin-top: 250px;
   }
</style>
