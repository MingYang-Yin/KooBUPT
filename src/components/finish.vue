<template>
  <div>
    <!--  斑马纹+按钮+日期排序  -->
    <el-table :data="tableData" id="finish_table" stripe border
              :default-sort = "{prop: 'date', order: 'descending'}">
      <el-table-column
        prop="date"
        label="日期"
        width="130"
        sortable>
      </el-table-column>
      <el-table-column
        prop="position"
        label="校区"
        width="150"
        sortable>
      </el-table-column>
      <el-table-column
        prop="name"
        label="机房"
        width="150">
      </el-table-column>
      <el-table-column
        prop="address"
        label="节次">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: 'finish'
  }
</script>

<style scoped>
  #finish_table{
    left: 50%;
    top: 3%;
    transform: translate(-50%);
    width: 800px;
  }
</style>
