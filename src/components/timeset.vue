<template>
  <div>
    <div>
      <h4 class="content">退改已预约机房的限制时间为</h4>
      <h4>{{value}}</h4>
    </div>

    <el-button type="text" @click="dialogVisible = true">编辑</el-button>

    <el-dialog
      title="编辑退改限制时间"
      :visible.sync="dialogVisible"
      :append-to-body="true"
      width="30%">
      <span>编辑预约机房的限制时间为：{{value}} 改为 {{clickValue}}</span>
      <br>
      <br>
      <br>
      <span>
        <el-popover
          placement="right"
          width="400"
          trigger="click">
          <el-select v-model="clickValue" placeholder="选择限制时间">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button slot="reference">设置限制时间</el-button>
        </el-popover>
      </span>
      <el-button type="primary" @click="handleClick" style="margin-left: 200px">提交</el-button>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        options: [{
          value: '0.5',
          label: '半小时'
        }, {
          value: '1',
          label: '一小时'
        }, {
          value: '2',
          label: '两小时'
        }, {
          value: '6',
          label: '六小时'
        }, {
          value: '12',
          label: '十二小时'
        },{
          value: '24',
          label: '一天'
        },{
          value: '48',
          label: '两天'
        },{
          value: '120',
          label: '五天'
        },{
          value: '168',
          label: '七天'
        }],
        value: '',
        clickValue:'未定义'
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
          url: 'http://localhost:8080/Info/getRange', //需要修改
          contentType: 'application/json; charset=UTF-8',// 解决415错误
          headers:{'Content-Type':'application/json;charset=UTF-8'},
          dataType: 'json',
          data: JSON.stringify({
            "request":"1"
          }),
        }).then(function (res) {
          string1 = res.data //储存数据
          /*alert(res.data)
          alert(typeof res.data)*/
          if(string1 === 1){
            that.value = "半小时"
          }
          else if(string1 === 4){
            that.value = "一小时"
          }
          else if(string1 === 12){
            that.value = "六小时"
          }
          else if(string1 === 24){
            that.value = "十二小时"
          }
          else if(string1 === 48){
            that.value = "一天"
          }
          else if(string1 === 96){
            that.value = "两天"
          }
          else if(string1 === 240){
            that.value = "五天"
          }
          else if(string1 === 336){
            that.value = "七天"
          }
          //that.value = string1
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
        var string1 = this.clickValue //储存数据
        alert(this.clickValue)
        alert(typeof this.clickValue)
        var thatvalue = ""
        if(string1 === '0.5'){
          thatvalue = "半小时"
        }
        else if(string1 === '1'){
          thatvalue = "一小时"
        }
        else if(string1 === '6'){
          thatvalue = "六小时"
        }
        else if(string1 === '12'){
          thatvalue = "十二小时"
        }
        else if(string1 === '24'){
          thatvalue = "一天"
        }
        else if(string1 === '48'){
          thatvalue = "两天"
        }
        else if(string1 === '120'){
          thatvalue = "五天"
        }
        else if(string1 === '168'){
          thatvalue = "七天"
        }
        var timeset = {  //JSON数据		名称-值对
          "range": thatvalue,
        }
        if (this.clickValue === '未定义') {
          alert('请选择退改已预约机房的限制时间')
        }
        else{
          var that = this
          this.$axios({
            method: 'post',
            url: 'http://localhost:8080/Info/setRange', //需要修改
            //contentType: 'application/json;charset=UTF-8',
            contentType: 'application/json; charset=UTF-8', // 解决415错误
            headers:{'Content-Type':'application/json;charset=UTF-8'},
            dataType: 'json',
            data: JSON.stringify(timeset),
          }).then(res => {
            if(res.data === 1){ //成功提示
              that.dialogVisible = false
              alert("设置成功")
              that.value = thatvalue
              that.clickValue = '未定义'
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
     margin-left: 150px;
     margin-top: 240px;
   }
   .select{
    float: left;
    margin-left: 10px;
    margin-top: 250px;
   }
</style>
