<template>
  <div class="card">
    <el-form class="form" ref="LoginInfo">
      <img src="../assets/me.png" height="30px" width="30px" class="me">
      <el-input placeholder="职工号" width="100px" class="first" v-model="item.input"></el-input>
    </el-form>
    <div class="form">
      <img src="../assets/password.png" height="30px" width="30px" class="me">
      <el-input placeholder="请输入密码" show-password class="second" v-model="item.password"></el-input>
    </div>
    <div>
      <el-row>
        <el-button type="primary" class="button" v-on:click="handleClick('/menu')">登录</el-button>
      </el-row>
    </div>

    <div class="word"><h5>初始密码为身份证号后六位</h5></div>
  </div>
</template>

<script>
  export default {
    name: 'login_user',
    data () {
      return {
        item: {
          input: '',
          password: ''
        },
        userToken: ''
      }
    },
    methods: {
      handleClick: function (Path) {
        var submit = {  //JSON数据		名称-值对
          "input": this.item.input,
          "password": this.item.password
        }
        if (this.item.input === '' || this.item.password === '') {
          alert('账号或密码不能为空，请重新输入')
        } else {
          this.$axios({
            method: 'post',
            url: 'http://localhost:8080/user/login',
            //contentType: 'application/json;charset=UTF-8',
            contentType: 'application/json; charset=UTF-8',// 解决415错误
            headers:{'Content-Type':'application/json;charset=UTF-8'},
            dataType: 'json',
            data: JSON.stringify(submit),
            /*data: JSON.stringify({"input":"123","password":"123"})*/
          }).then(res => {
            if(res.data === -1){
              alert("该账号不存在或账号不满足管理员权限")
            }
            if(res.data === -2){
              alert("账号密码不匹配")
            }
            if(res.data === 1){
              localStorage.setItem('userID', submit.input);
              this.$router.push('/menu')
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

<style scoped>
  .card {
    color: #000000;
    width: 280px;
    height: 200px;
    background-color: #000000;
    opacity: 1;
  }

  .form {
    display: flex;
    margin-top: 30px;
  }

  .me {
    margin-right: 10px;
  }

  .button {
    margin-top: 50px;
    width: 150px;
    margin-left: -10px;
    background-color: #00008B;
    border-color: #00008B;
    opacity: 1;

  }

  .word {
    color: white;
    margin-top: 5px;
    margin-left: 50px;
  }

  .first {
    width: 200px;
    height:30px;
    text-align: center;
  }

  .second {
    width: 200px;
    height:30px;
    text-align: center;
  }
</style>
