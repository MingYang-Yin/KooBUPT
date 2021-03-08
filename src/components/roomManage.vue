<template>
  <div class="boxShadow">
    <!--用户选择待管理的房间参数-->
    <div class="dataSelect" >
      <!--日期选择器-->
      <el-date-picker
        :picker-options="pickerOptions"
        v-model="dataValue"
        type="date"
        placeholder="选择日期"
        value-format="yyyy-MM-dd">
      </el-date-picker>
      <!--级联选择器，选择校区、楼宇和层数-->
      <el-cascader
        v-model="selectValue"
        :options="options"
        placeholder="请选择校区/楼宇/楼层"
        style="margin-left: 20px"
        ref="placeCascader"
      ></el-cascader>
      <!--查询按钮，需绑定点击事件，向后端传递信息-->
      <el-button type="primary" size="medium" style="margin-left: 20px" @click="handleSearch">查询</el-button>
      <el-button-group style="margin-left: 40px">
        <el-button type="danger" @click="handleClickForbidden">禁用</el-button>
        <el-button type="success" @click="handleClickFree">启用</el-button>
      </el-button-group>
    </div>
    <div style="margin-top: 20px">
      <el-table
        :data="tables"
        :key="menuKey"
        :cell-style="tableCellStyle"
        border
        ref="multipleTable"
        tooltip-effect="dark"
        style="width: 100%"
        :cell-class-name="tableCellClassName"
        @cell-click="handle"
        @selection-change='selectArInfo'>
        <!--<el-table-column type="selection" width="45px"></el-table-column>
        <el-table-column label="序号" width="62px" type="index">
        </el-table-column>-->
        <template v-for='(col) in tableData'>
          <el-table-column
            :show-overflow-tooltip="true"
            :prop="col.dataItem"
            :label="col.dataName"
            :key="col.dataItem"
            width="124px">
          </el-table-column>
        </template>
       <!-- <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button size="mini" class="del-com" ><i class="iconfont icon-shanchu"></i></el-button>
          </template>
        </el-table-column>-->
      </el-table>


    </div>
  </div>
</template>

<script>
  export default {
    name: 'roomManage',
    data () {
      return {
        options:[
          {
            value: '沙河校区',
            label: '沙河校区',
            children: [
              {
                value: 'S',
                label: 'S楼',
                children:[
                  {
                    value: '1',
                    label: '一层',
                  },
                  {
                    value: '2',
                    label: '二层',
                  },
                  {
                    value: '3',
                    label: '三层',
                  },
                  {
                    value: '4',
                    label: '四层',
                  },
                  {
                    value: '5',
                    label: '五层',
                  },
                ]
              },
              {
                value: 'N',
                label: 'N楼',
                children:[
                  {
                    value: '1',
                    label: '一层',
                  },
                  {
                    value: '2',
                    label: '二层',
                  },
                  {
                    value: '3',
                    label: '三层',
                  },
                  {
                    value: '4',
                    label: '四层',
                  },
                  {
                    value: '5',
                    label: '五层',
                  },
                ]
              }
            ]
          },
          {
            value: '校本部',
            label: '校本部',
            children: [
              {
                value: '科研楼',
                label: '科研楼',
                children: [
                  {
                    value: '1',
                    label: '一层',
                  }
                ]
              }
            ]
          }
        ],
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() // 返回所有时间小于当前时间的值
          }
        },
        selectValue: '', //选择器值
        dataValue: '', //日期值
        menuKey: 1,//强制表格刷新标志
        colNum: 1,
        tables:[], //储存table中的数据
        tableData:[{
          dataItem: 'head',
          dataName: '节数/房间号'
        }], //储存动态生成table的参数
        sessionNumber: 0, //储存课程节数
        roomList: [], //储存房间名称
        row: '',
        column: '',
        clickRowIndex: [],
        clickColIndex: [],
        dataToSend: [], //要发送给后端的数据（陈老师）
        placeVal: [],
        isForbid: false,
        isFree: false,
        /*tables: [{
          xiaoxue: '福兰',
          chuzhong: '加芳',
          gaozhong: '蒲庙',
          daxue: '西安',
          yanjiusheng: '西安',
          shangban: '北京'
        }, {
          xiaoxue: '南坊',
          chuzhong: '礼泉',
          gaozhong: '礼泉',
          daxue: '西安',
          yanjiusheng: '西安',
          shangban: '南坊'
        }, {
          xiaoxue: '马山',
          chuzhong: '加芳',
          gaozhong: '蒲庙',
          daxue: '西安',
          yanjiusheng: '重庆',
          shangban: '北京'
        }],*/
        /*tableData: [{
          dataItem: 'xiaoxue',
          dataName: '小学'
        }, {
          dataItem: 'chuzhong',
          dataName: '初中'
        }, {
          dataItem: 'gaozhong',
          dataName: '高中'
        }, {
          dataItem: 'daxue',
          dataName: '大学'
        }, {
          dataItem: 'yanjiusheng',
          dataName: '研究生'
        }, {
          dataItem: 'shangban',
          dataName: '上班'
        }]*/
      }
    },
    methods: {
      // 获取表格选中时的数据
      selectArInfo (val) {
        this.selectArr = val
      },

      //处理初始化事件
      getInfo:function(placeValue){
        const that = this; //用that解决函数内部this指向问题
        var string1 = ""
        that.tableData = [{
          dataItem: 'head',
          dataName: '节数/房间号'
        }]
        var submit = {  //JSON数据		名称-值对
          "campus": placeValue[0], //校区名字（如沙河校区）
          "building": placeValue[1], //楼宇名字
          "floor": placeValue[2], //传递数字
        }
        this.$axios({
          method: 'post',
          url: 'http://localhost:8080/computerRoom/sendRoomId', //需要修改
          contentType: 'application/json; charset=UTF-8',// 解决415错误
          headers:{'Content-Type':'application/json;charset=UTF-8'},
          dataType: 'json',
          data: JSON.stringify(submit),
        }).then(function (res) {
          var temp = ""
          temp = res.data.replace("[","")
          temp = temp.replace("]","")
          var infoArray = temp.split(', ') // 用逗号+空格分隔
          that.sessionNumber = parseInt(infoArray[0]) //字符串转数字
          that.colNum = infoArray.length
          for(var i = 1;i < infoArray.length; i++){
            var insert = {
              dataItem: '',
              dataName: '',
            }
            //insert.dataItem = infoArray[i]
            insert.dataItem = i.toString()
            insert.dataName = infoArray[i]
            that.tableData.push(insert)
          }
          that.roomList = infoArray
        }).catch(error => {
          alert(error)
          console.log(error)
        })
      },

      // 处理点击查询事件
      handleSearch(){
        var that = this
        if(this.selectValue === '' || this.dataValue === ''){ //警告提示
          alert("日期或地点不能为空")
        }
        else {
          this.tables.splice(0,that.tables.length)
          alert("tables"+this.tables)
          var placeValue = this.$refs['placeCascader'].checkedValue // 获取级联选择器的value数组，可用placeValue[i]的形式访问（0:校区 1:楼宇 2:楼层）
          that.placeVal = placeValue
          this.getInfo(placeValue) //调用函数获取每日课程节数，该楼层的实验室，infoArray为房间数组
          //校区，楼名，房间号，礼拜几，开始节数，结束节数，管理员的账号，和机房不可用的这一天
          var submit = {  //JSON数据		名称-值对
            "date": this.dataValue, //日期，形如yyyy-MM-dd
            "campus": placeValue[0], //校区名字（如沙河校区）
            "building": placeValue[1], //楼宇名字
            "floor": placeValue[2], //传递数字
          }
          this.$axios({
            method: 'post',
            url: 'http://localhost:8080/computerRoom/showSituation',
            contentType: 'application/json; charset=UTF-8',// 解决415错误
            headers: {'Content-Type': 'application/json;charset=UTF-8'},
            dataType: 'json',
            data: JSON.stringify(submit),
          }).then(function (res){ //id:房间号 flag:不可用cannot和已占用already startSession:开始节数 endSession:结束节数
            //that.tables = undefined
            var dataToInsert = res.data
            //that.tables = []
            console.log(that.tables)
            for(var classNum = 1; classNum<=that.sessionNumber; classNum++){
              var rowInfo = {
                "head": "第"+(classNum)+"节课",
                "1": "空闲",
                "2": "空闲",
                "3": "空闲",
                "4": "空闲",
                "5": "空闲",
                "6": "空闲",
                "7": "空闲",
                "8": "空闲",
                "9": "空闲",
                "10": "空闲",
              }
              for(var j = 0;j<res.data.length;j++){
                var temp = JSON.parse(dataToInsert[j])
                //console.log(temp)
                if(temp.startSession<=classNum && classNum<=temp.endSession){//课程开始节数与该次操作的节数相同
                  var indexSearch = temp.id //string
                  var idIndex = that.roomList.findIndex(item => item === indexSearch)
                  idIndex = idIndex.toString()
                  var roomFlag = temp.flag
                  if(roomFlag === 'cannot'){
                    rowInfo[idIndex] = '不可用'
                  }
                  if(roomFlag === 'already'){
                    rowInfo[idIndex] = '已占用'
                  }
                }
              }
              that.tables.push(rowInfo)
            }
            //console.log(that.tables)
            that.menuKey++
          }).catch(error => {
            alert(error)
            alert('账号或密码错误')
            console.log(error)
          })
        }
      },
      tableCellClassName({row, column, rowIndex, columnIndex}){//注意这里是解构
        //利用单元格的 className 的回调方法，给行列索引赋值
        row.index=rowIndex;
        column.index=columnIndex;
      },
      //点击单元格事件
      handle(row,column,cell,event){
        this.row = row.index
        this.column = column.index
        var checkClicked = false
        let content = $(cell); //[object HTMLTableCellElement] 转jq对象    ==== cell =>dom对象
        var contain = content.children()[0].innerHTML; //获取到单元格的文本内容
        //if(column.index !== 0 && contain !== "已占用"){ //若点击的不是表头，则进行以下操作
        if(column.index !== 0){ //若点击的不是表头，则进行以下操作
          for(var i=0;i<this.clickRowIndex.length;i++){
            //若该单元格已经被点击，则消除点击状态
            if(this.clickRowIndex[i] === row.index && this.clickColIndex[i] === column.index){
              this.clickRowIndex.splice(i,1);
              this.clickColIndex.splice(i,1);
              checkClicked = true
              if(this.clickRowIndex.length === 0){
                this.isForbid = false
                this.isFree = false
              }
              break;
            }
          }
          if(checkClicked === false){ //若没被点击过，则加入点击状态
/*            this.clickRowIndex.push(row.index)
            this.clickColIndex.push(column.index)*/
            if(contain === '空闲'){
              if(this.isFree === false){
                this.clickRowIndex.push(row.index)
                this.clickColIndex.push(column.index)
                this.isForbid = true
              }
              /*this.isForbid = true*/
            }
            if(contain === '不可用'){
              /*this.isFree = true*/
              if(this.isForbid === false){
                this.clickRowIndex.push(row.index)
                this.clickColIndex.push(column.index)
                this.isFree = true
              }
            }
          }
        }
        /*console.log(this.clickRowIndex)
        console.log(this.clickColIndex)*/
        /*console.log(row.index) //获取点击的单元格的行号
        console.log(column.index) //获取点击的单元格的列号*/
        console.log(event)
        console.log(cell)
      },

      //点击单元格，改变背景颜色
      tableCellStyle ({row, column,rowIndex,columnIndex}) {
        //if (this.row && this.columnName) {}
        /*console.log(row)
        console.log(rowIndex)
        console.log(column)
        console.log(columnIndex)*/
        /*if (this.row === rowIndex && this.column === columnIndex) {
          alert("changeColor")
          return 'background-color:#CCCCCC;'
        }*/
        for(var i=0;i<this.clickRowIndex.length;i++){
          if(this.clickRowIndex[i] === rowIndex && this.clickColIndex[i] === columnIndex)
            return 'background-color:#CCCCCC;'
        }
      },

      /*校区，楼名，房间号，礼拜几，开始节数，结束节数，管理员的账号，和机房不可用的这一天
[
  {
    "校区":'',
    楼名: '',
    房间号:'105',
    礼拜几:'1',
    不可用节数:[1,2,3],
    管理员的账号:'',
    机房不可用的这一天:'',
  },
  {
    "校区":'',
    楼名: '',
    房间号:'103',
    礼拜几:'1',
    不可用节数:[1,2,3],
    管理员的账号:'',
    机房不可用的这一天:'',
  }
]
* */
      //点击禁用按钮的处理函数
      handleClickForbidden(){
        if(this.isForbid === true){
          var that = this
          var flag = false
          for(var i=0;i<this.tableData.length;i++){
            var sessionNumtoForbid = []
            flag = false
            for(var j=0;j<this.clickColIndex.length;j++){
              if(this.clickColIndex[j] === i){
                var temp = this.clickRowIndex[j]+1
                sessionNumtoForbid.push(temp)
                flag = true
              }
            }
            if(flag === true){
              let dateTemp = new Date(that.dataValue);
              //console.log(that.tableData[i]);
              var jsonToInsert = {
                "campus": that.placeVal[0], //校区名字（如沙河校区）
                "building": that.placeVal[1], //楼宇名字
                "roomID": that.tableData[i].dataName,
                "week": dateTemp.getDay(), //0：周日 1：周一  2：周二  以此类推
                "sessionToForbid": sessionNumtoForbid,
                "administratorID": localStorage.getItem('userID'),
                "date": that.dataValue,
              }
              that.dataToSend.push(jsonToInsert)
            }
          }
          console.log(that.dataToSend)
          for(var m=0;m<that.dataToSend.length;m++){
            this.$axios({
              method: 'post',
              url: 'http://localhost:8080/management/LockRoom', //需要修改
              contentType: 'application/json; charset=UTF-8',// 解决415错误
              headers:{'Content-Type':'application/json;charset=UTF-8'},
              dataType: 'json',
              data: JSON.stringify(that.dataToSend[m]),
            }).then(function (res) {
              alert("设置成功！")
            }).catch(error => {
              alert(error)
              console.log(error)
            })
          }
          that.clickRowIndex = undefined
          that.clickColIndex = undefined
          that.dataToSend = undefined
          that.clickRowIndex = []
          that.clickColIndex = []
          that.dataToSend = []
          that.isFree = false
          that.isForbid = false
        }
        else
          alert("您没有选择空闲机房")
      },

      //点击解禁按钮的处理函数
      handleClickFree(){
        if(this.isFree === true){
          var that = this
          var flag = false
          for(var i=0;i<this.tableData.length;i++){
            var sessionNumtoForbid = []
            flag = false
            for(var j=0;j<this.clickColIndex.length;j++){
              if(this.clickColIndex[j] === i){
                var temp = this.clickRowIndex[j]+1
                sessionNumtoForbid.push(temp)
                flag = true
              }
            }
            if(flag === true){
              let dateTemp = new Date(that.dataValue);
              //console.log(that.tableData[i]);
              /*var jsonToInsert = {
                "campus": that.placeVal[0], //校区名字（如沙河校区）
                "building": that.placeVal[1], //楼宇名字
                "roomID": that.tableData[i].dataName,
                "week": dateTemp.getDay(), //0：周日 1：周一  2：周二  以此类推
                "sessionToForbid": sessionNumtoForbid,
                "administratorID": localStorage.getItem('userID'),
                "date": that.dataValue,
              }*/
              var jsonToInsert = {
                "campus": that.placeVal[0], //校区名字（如沙河校区）
                "building": that.placeVal[1], //楼宇名字
                "room": that.tableData[i].dataName,
                "startSession": sessionNumtoForbid[0],
                "endSession": sessionNumtoForbid[sessionNumtoForbid.length-1],
                "date": that.dataValue,
              }
              that.dataToSend.push(jsonToInsert)
            }
          }
          console.log(that.dataToSend)
          for(var m=0;m<that.dataToSend.length;m++){
            this.$axios({
              method: 'post',
              url: 'http://localhost:8080/management/FreeRoom', //需要修改
              contentType: 'application/json; charset=UTF-8',// 解决415错误
              headers:{'Content-Type':'application/json;charset=UTF-8'},
              dataType: 'json',
              data: JSON.stringify(that.dataToSend[m]),
            }).then(function (res) {
              alert("设置成功！")
            }).catch(error => {
              alert(error)
              console.log(error)
            })
          }
          that.clickRowIndex = undefined
          that.clickColIndex = undefined
          that.dataToSend = undefined
          that.clickRowIndex = []
          that.clickColIndex = []
          that.dataToSend = []
          that.isFree = false
          that.isForbid = false
        }
        else
          alert("您没有选择不可用机房")
      }
    }
  }
</script>

<style scoped>
.dataSelect{
  margin-top: 25px;
/*
  margin-left: -50px;
*/
}
</style>
