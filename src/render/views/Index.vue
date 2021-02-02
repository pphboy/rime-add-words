<template>
  <el-card shadow="false">
    <a-row>
      <a-col :span="24">
        <el-input v-model="filePath"  placeholder="请输入RIME词库路径" />
         <el-button style="margin-top:5px;" @click="saveFilePath(filePath)">保存</el-button>
         <el-button @click="clearPath">重置</el-button>
      </a-col>
    </a-row>
  </el-card>
  <br><br>
  <el-card shadow="false">
    <a-row>
      <a-col :span="24">
        词条: <el-input v-model="word" style="width:90px;" placeholder="输入词条" />
        编码: <el-input v-model="code" style="width:90px;" placeholder="输入编码" />
        词频: <el-input v-model="num"  style="width:90px;" placeholder="输入编码" />
          &nbsp;<el-button type="primary"  @click="save">添加</el-button>
      </a-col>
    </a-row>
  </el-card>
</template>



<script lang="ts">
import { reactive, computed, getCurrentInstance } from 'vue'
import main from '/@/utils/main.ts';
const version = require('process').versions.electron
var remote = require('electron').remote;
var efs= remote.require('fs');

// clear test

export default {
  name: 'Index',
  components: {
  },
  data(){
    return {
      filePath:null,
      word:null,
      code:null,
      num:null,
    }
  },
  created() {
    var vm = this;
    let file = main.local.get("file");
    file = file?file:{};
    if(!file.path){
      this.$notify({
        title: '请保存路径',
        message: `请添一个没有 盘符的路径 D:\\xx => \\xx`,
        type: 'warning'
      });
    }else{
      this.filePath = main.local.get("file").path;
    }
  },
  methods:{
    clearPath(){
      this.filePath = null;
      main.local.remove("file");
      this.$notify({
        title: '成功',
        message: `路径删除成功`,
        type: 'success'
      });
    },
    saveFilePath(filePath:string){
      console.log(filePath);
      main.local.set("file",{path:filePath});
      this.$notify({
        title: '保存路径成功',
        message: `${this.filePath}保存成功`,
        type: 'success'
      });
    },
    save(){
      var vm = this;
      if(!this.filePath){
        this.$message.error("请保存文件路径");
        return;
      }
      if(!this.word || !this.code){
        this.$message.error("请输入词和编码再添加");
        return;
      }
      console.log(__dirname);
      console.log(`\/${this.filePath}`);

      efs.appendFile(`${this.filePath}`,`${this.word}\t${this.code}\t${this.num?this.num:''}\n`,{flag:"a+"}, (err:any) => {
        if (err) {
          this.$message.error("文件路径有问题");
          console.error(err)
          return
        }
        //文件写入成功。
      })
        this.$notify({
          title: '加词成功',
          message: `词${this.word},已加入词库`,
          type: 'success'
        });
      //清除输入框
      this.reset();
    },
    reset(){
      this.word = null;
      this.code = null;
      this.num = null;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

