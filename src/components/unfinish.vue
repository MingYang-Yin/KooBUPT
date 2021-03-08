<template>
  <div>
<!--  斑马纹+按钮+日期排序  -->
  <el-table :data="tableData" id="unfinish_table" stripe border
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
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default {
    name: 'unfinish',
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          position:'沙河校区',
          name: '机房502',
          address: '第一节 至 第三节'
        },{
          date: '2016-05-03',
          position:'校本部',
          name: '机房503',
          address: '第一节 至 第三节'
        }
        ]
      }
    },
    methods: {
      addList(){
        for(var i=0;i<5;i++){
        this.tableData.push({
          date: '2016-05-02',
          name: '王小虎'+i.toString(),
          address: '第一节 至 第三节'
        })
      }
      },
      handleEdit(index, row){
        // index记录是哪一行的按钮被选中（从0开始）
        // row保存一行的信息，row.date显示储存的时间
        // alert(row.date)
        alert("修改按钮被按下")
      },
      handleDelete(index, row){
        alert("删除按钮被按下")
      }
    },
    created(){
      //自动加载方法
      // this.addList();
    }
  }
</script>

<style scoped>
#unfinish_table{
  left: 50%;
  top: 3%;
  transform: translate(-50%);
  width: 800px;
}
</style>
