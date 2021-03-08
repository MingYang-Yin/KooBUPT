<template>
  <!-- 首页根元素 -->
  <div id="root">
    <!-- 首页标头 -->
    <div id="head">
      <img id="bupt" src="static/bupt.png">
      <img id="koobupt" src="static/koobupt1.png">
      <h1 id="schoolNum">{{ msg }}</h1>
      <div id="exit" @click="handleExit()"><h1 id="exit_text">退出</h1></div>
    </div>
    <!-- 首页侧边菜单栏 -->
    <div id="menu">
      <el-container style="text-align:left">
        <el-row class="tac">
          <el-col :span="28" style="width: 201px">
            <el-menu
              default-active="0"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#004898"
              text-color="#fff"
              active-text-color="#ffd04b">

              <el-menu-item index="0">
                <i class="el-icon-view"></i>
                <span slot="title">查看预约单</span>
              </el-menu-item>

              <el-menu-item index="2" @click="goTo('/menu_Administrator/administratorInfo')">
                <i class="el-icon-monitor"></i>
                <span>设置管理员</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-container>
    </div>
    <div>
      <router-view id="homepage_view"></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'menu_Administrator',
    methods:{
      goTo (path) {
        this.$router.push(path);
      },
      handleExit() {
        this.$router.push("./login");
        localStorage.removeItem("userID");
      }
    }
  }
</script>

<style scoped>
  #root {
    position:absolute;
    left: 50%;
    top: 0%;
    transform: translate(-50%);
    width: 1024px;
    height: auto;
  }

  #head {
    position:absolute;
    left: 50%;
    top: 0%;
    transform: translate(-50%);
    width: 1022px;
    height: 110px;
    border: 2px solid #eeeeee;
    /*border-bottom: 2px solid #D7D7D7;*/
    border-top: 0px;
  }

  #bupt {
    position:absolute;
    left: 1%;
    top: 50%;
    transform: translate(0%,-50%);
    width: 282px;
    height: 70px;
  }

  #koobupt {
    position:absolute;
    left:30%;
    top: 50%;
    transform: translate(0,-50%);
    width: 410px;
    height: 70px;
  }

  #schoolNum {
    position:absolute;
    left:78%;
    top: 53%;
    transform: translate(0,-50%);
    width: 110px;
    height: 65px;
  }

  #exit {
    position:absolute;
    left:93%;
    top: 53%;
    transform: translate(0,-50%);
    width: 41px;
    height: 70px;
    cursor: pointer;
  }

  #schoolNum {
    font-weight:normal;
    font-style:normal;
    font-size:20px;
    color:#004898;
    text-align:center;
  }

  #exit_text {
    font-weight:normal;
    font-style:normal;
    font-size:20px;
    color:red;
    text-align:center;
  }

  #menu {
    position:absolute;
    left: 0%;
    top: 111px;
    width: 200px;
    height: 600px;
    border-left: 2px solid #004898;
    background-color: #004898;
  }

  #homepage_view {
    position:absolute;
    left: 202px;
    top: 111px;
    width: 822px;
    height: 600px;
    border: 1px solid #eeeeee;
    overflow-y: scroll;
    white-space: nowrap;
  }
</style>
