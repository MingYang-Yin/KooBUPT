<template>
  <div id="firstDiv" >
    <p>
      <!--课程名字，任课老师名字和教工号，开始周，结束周，开始节，结束节，课程类型（0：必修 1：校任选 2：专业选修课）-->
      <font size="5" face="Verdana">
        请输入课程信息
      </font>
    </p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position='left' label-width="120px" style="text-align: center;">
      <el-form-item label="课程名" prop="name" required style="width: 400px;margin:0 auto;">
        <el-col  style="text-align: center">
          <el-input v-model="ruleForm.name"></el-input>
        </el-col>
      </el-form-item>
      <br>
      <br>

      <el-form-item label="任课教师学工号" prop="id" style="width: 400px;margin:0 auto;" required>
        <el-col >
          <el-input v-model="ruleForm.id"></el-input>
        </el-col>
      </el-form-item>
      <br>
      <br>

      <el-form-item label="开课周次" style="width: 400px;margin:0 auto;" required>
          <!--<el-input v-model="ruleForm.beginWeek"></el-input>
          <el-input v-model="ruleForm.endWeek"></el-input>-->
          <el-col :span="11">
            <el-form-item prop="beginWeek">
              <el-input v-model="ruleForm.beginWeek" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2"> 至 </el-col>
          <el-col :span="11">
            <el-form-item prop="endWeek">
              <el-input v-model="ruleForm.endWeek" style="width: 100%;"></el-input>
            </el-form-item>
          </el-col>
      </el-form-item>
      <br>
      <br>

      <el-form-item label="课程节次" style="width: 400px;margin:0 auto;" required>
        <!--<el-input v-model="ruleForm.beginWeek"></el-input>
        <el-input v-model="ruleForm.endWeek"></el-input>-->
        <el-col :span="11">
          <el-form-item prop="beginClass">
              <el-input v-model="ruleForm.beginClass" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2"> 至 </el-col>
        <el-col :span="11">
          <el-form-item prop="endClass">
            <el-input v-model="ruleForm.endClass" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <br>
      <br>

      <!--0：必修 1：校任选 2：专业选修课-->
      <el-form-item label="课程类型" prop="type" style="width: 400px;margin:0 auto;" required>
        <el-select v-model="ruleForm.type" placeholder="请选择课程类型" style="width: 100%;">
          <el-option label="必修课" value="0"></el-option>
          <el-option label="校任选" value="1"></el-option>
          <el-option label="专业选修课" value="2"></el-option>
        </el-select>
      </el-form-item>
      <br>
      <br>

<!--      <el-form-item style="width: 200px;margin:0 auto;">
        &lt;!&ndash;<el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>&ndash;&gt;
        <el-col :span="11">
          <el-button type="primary" @click="submitForm('ruleForm')" style="width: 100%;">添加</el-button>
        </el-col>
        <el-col :span="11">
          <el-button @click="resetForm('ruleForm')" style="width: 100%;">重置</el-button>
        </el-col>
      </el-form-item>-->
      <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'writeClass',
    data() {
      return {
        ruleForm: {
          name: '',
          id: '',
          beginWeek:'',
          endWeek:'',
          beginClass:'',
          endClass:'',
          type:''
        },
        rules: {
          name: [
            { required: true, message: '请输入教师名称', trigger: 'blur' },
            { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
          ],
          id: [
            { required: true, message: '请输入学工号', trigger: 'blur' },
            { min: 10, max: 10, message: '长度应为 10 个字符', trigger: 'blur' }
          ],
          beginWeek: [
            { required: true, message: '请输入课程开始周次', trigger: 'blur' },
            { min: 1, max: 2, message: '长度应为 1~2 个字符', trigger: 'blur' }
          ],
          endWeek: [
            { required: true, message: '请输入课程结束周次', trigger: 'blur' },
            { min: 1, max: 2, message: '长度应为 1~2 个字符', trigger: 'blur' }
          ],
          beginClass: [
            { required: true, message: '请输入课程开始节数', trigger: 'blur' },
            { min: 1, max: 2, message: '长度应为 1~2 个字符', trigger: 'blur' }
          ],
          endClass: [
            { required: true, message: '请输入课程结束节数', trigger: 'blur' },
            { min: 1, max: 2, message: '长度应为 1~2 个字符', trigger: 'blur' }
          ],
          type:[
            { required: true, message: '请选择课程类型', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid && parseInt(this.ruleForm.beginWeek)<=parseInt(this.ruleForm.endWeek) && parseInt(this.ruleForm.beginClass)<=parseInt(this.ruleForm.endClass)) {
            var submit = {  //JSON数据		名称-值对   需要根据后端修改   课程名字，任课老师名字和教工号，开始周，结束周，开始节，结束节，类型
              "name": this.ruleForm.name, //课程名字
              "aid": this.ruleForm.id, //学工号
              "beginWeek": this.ruleForm.beginWeek, //开始周
              "endWeek": this.ruleForm.endWeek, //结束周
              "beginClass": this.ruleForm.beginClass, //开始节
              "endClass": this.ruleForm.endClass, //结束节
              "type": this.ruleForm.type, //课程类型
            }
            this.$axios({
              method: 'post',
              url: 'http://localhost:8080/user/ManualImport', //需要修改
              contentType: 'application/json; charset=UTF-8',// 解决415错误
              headers:{'Content-Type':'application/json;charset=UTF-8'},
              dataType: 'json',
              data: JSON.stringify(submit),
            }).then(res => {
              console.log("ok")
              if(res.data === 1){
                alert("添加成功")
              }
              else{
                alert("添加失败")
              }
            }).catch(error => {
              alert(error)
              console.log(error)
            })

          } else {
            if(!valid){
              alert('请按照要求填写表单！');
            }
            if(parseInt(this.ruleForm.beginWeek)>parseInt(this.ruleForm.endWeek) ){
              alert('起始周次不得大于结束周次！');
            }
            if(parseInt(this.ruleForm.beginClass)>parseInt(this.ruleForm.endClass)){
              alert('起始节次不得大于结束节次！');
            }
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
