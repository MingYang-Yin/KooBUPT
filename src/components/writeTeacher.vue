<template>
  <div>
    <p>
      <font size="5" face="Verdana">
        请输入教师信息
      </font>
    </p>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" align="center">
      <el-form-item label="姓名" prop="name" required>
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="学工号" prop="id" align="center" required>
        <el-input v-model="ruleForm.id"></el-input>
      </el-form-item>

      <el-form-item label="学院" prop="institute" align="center" required>
        <el-input v-model="ruleForm.institute"></el-input>
      </el-form-item>

      <el-form-item label="联系方式" prop="phone" align="center" required>
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>

      <el-form-item align="center">
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  export default {
    name: 'writeTeacher',
    data() {
      return {
        ruleForm: {
          name: '',
          id: '',
          institute: '',
          phone: ''
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
          institute: [
            { required: true, message: '请输入教师所在学院', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入教师联系方式', trigger: 'blur' },
            { min: 11, max: 11, message: '电话号码应为 11 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var submit = {  //JSON数据		名称-值对   需要根据后端修改
              "campus": this.ruleForm.name, //姓名
              "building": this.ruleForm.id, //学工号
              "room": this.ruleForm.institute, //学院
              "equipmentNum": this.ruleForm.phone, //电话号
            }
            this.$axios({
              method: 'post',
              url: 'http://localhost:8080/computerRoom/addRoom',
              contentType: 'application/json; charset=UTF-8',// 解决415错误
              headers:{'Content-Type':'application/json;charset=UTF-8'},
              dataType: 'json',
              data: JSON.stringify(submit),
            }).then(res => {
              console.log(this.formInline.campus)
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
            console.log('error submit!!');
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
