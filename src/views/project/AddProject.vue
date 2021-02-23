<template>
  <div class="addProject">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="项目名称">
        <el-input v-model="form.projectName" />
      </el-form-item>
      <el-form-item label="通配符key">
        <el-input v-model="form.key" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="hanldeClose">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getNewProject } from '@/api/project';
export default {
  name: 'AddProject',
  data() {
    return {
      form: {
        projectName: '',
        key: ''
      }

    };
  },
  methods: {
    async onSubmit() {
      const result = await getNewProject(this.form);
      const { code } = result;
      if (code === 0) {
        this.$message.success('创建成功');
        this.$emit('listenClose');
      } else {
        this.$message.error('创建失败，请重试');
      }
    },
    hanldeClose() {
      this.$emit('listenClose');
    }
  }
};
</script>

<style lang="scss" scoped>
.addProject{
  .select{
    width: 100%;
  }
}
</style>
