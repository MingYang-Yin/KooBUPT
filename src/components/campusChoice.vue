<template>
  <el-row>
    <el-col :span="11" id="campus1">
      <el-card :body-style="{ padding: '0px' }">
        <div class="bottom clearfix">
          <el-button type="text" class="button" style="font-size: 20px">校本部</el-button>
        </div>
        <br>
        <img src="../../static/bupt_benbu.jpg" class="image">
        <div style="padding: 14px;">
<!--          <span>校本部</span>-->
<!--          <div class="bottom clearfix">-->
<!--            <el-button type="text" class="button" style="font-size: 20px">校本部</el-button>-->
<!--          </div>-->
        </div>
      </el-card>
    </el-col>

    <el-col :span="11" id="campus2">
      <el-card :body-style="{ padding: '0px' }">
        <img src="../../static/bupt_shahe.jpeg" class="image">
        <div style="padding: 14px;">
<!--          <span>沙河校区</span>-->
          <div class="bottom clearfix">
            <el-button type="text" class="button" style="font-size: 20px">沙河校区</el-button>
          </div>
        </div>
      </el-card>
    </el-col>

  </el-row>
</template>

<script>
  export default {
    name: 'campusChoice'
  }
</script>

<style scoped>
  #campus1{
    position: relative;
    left: 20px;
    top: 50%;
    transform: translate(0,-50%);
  }

  #campus2{
    position: relative;
    left: 40px;
    top: 50%;
    transform: translate(0,-50%);
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    /*float: right;*/
  }

  .image {
    width: 400px;
    height: 250px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
