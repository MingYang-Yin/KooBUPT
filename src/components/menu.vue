<template xmlns:el-container="http://www.w3.org/1999/html">
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
                  <span slot="title">今日情况</span>
              </el-menu-item>

              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-edit-outline"></i>
                  <span>信息设置</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="0-1" @click="goTo('/menu/changeInformation')">房间信息管理</el-menu-item>
                  <el-menu-item index="0-2" @click="goTo('/menu/timeset')">预约退改时间设置</el-menu-item>
                  <el-menu-item index="0-3" @click="goTo('/menu/classset')">设置上课节数</el-menu-item>
                  <el-menu-item index="0-4" @click="goTo('/menu/importTeacher')">导入人员名单</el-menu-item>
                  <el-menu-item index="0-5">导入课表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

<!--              <el-menu-item index="2">
                <i class="el-icon-monitor"></i>
                <span>机房情况一览</span>
              </el-menu-item>-->

              <el-menu-item index="3" @click="goTo('/menu/roomManage')">
                  <i class="el-icon-date"></i>
                  <span>机房管理</span>
              </el-menu-item>

              <el-menu-item index="4" @click="goTo('/menu/checkAppointment')">
                <i class="el-icon-document"></i>
                <span>预约单审核</span>
              </el-menu-item>
<!--              <el-submenu index="1">-->
<!--                <template slot="title">-->
<!--                  <i class="el-icon-date"></i>-->
<!--                  <span>我的管理</span>-->
<!--                </template>-->
<!--                <el-menu-item-group>-->
<!--                  <el-menu-item index="1-1" @click="goTo('/menu')">未完成</el-menu-item>-->
<!--                  <el-menu-item index="/homepage_user" @click="goTo('/menu/finish')">已完成</el-menu-item>-->
<!--                </el-menu-item-group>-->
<!--              </el-submenu>-->
<!--              <el-menu-item index="2">-->
<!--                <i class="el-icon-s-data"></i>-->
<!--                <span slot="title">机房情况</span>-->
<!--              </el-menu-item>-->
<!--              <el-menu-item index="3">-->
<!--                <i class="el-icon-edit-outline"></i>-->
<!--                <span slot="title" @click="goTo('/menu/campusChoice')">管理机房</span>-->
<!--              </el-menu-item>-->
<!--              <el-menu-item index="4">-->
<!--                <i class="el-icon-document"></i>-->
<!--                <span slot="title">导入课表</span>-->
<!--              </el-menu-item>-->
            </el-menu>
          </el-col>
        </el-row>
      </el-container>
    </div>

    <!--  放置页面主体内容  -->
    <div>
      <router-view id="homepage_view"></router-view>
    </div>
  </div>
</template>

<script type="text/javascript">
  // import ElementUI from 'element-ui'
  export default {
    name: 'homepage_user',
    data () {
      return {
        msg: localStorage.getItem('userID')
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleExit() {
        this.$router.push("/login");
        localStorage.removeItem("userID");
      },
      goTo (path) {
        this.$router.push(path);
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

  /*.homepage_body {*/
  /*  position:absolute;*/
  /*  left: 202px;*/
  /*  top: 111px;*/
  /*  width: 822px;*/
  /*  height: 568px;*/
  /*}*/
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
