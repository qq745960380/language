<template>
  <div class="addMember">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item label="密码" class="passwordItem" style="position:relative">
        <el-input
          ref="password"
          v-model="form.password"
          :type="passwordType"
          auto-complete="on"
        />
        <span class="showPwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item label="成员权限">
        <el-select v-model="form.role" placeholder="请选择" style="width:100%">
          <el-option :key="0" label="管理员" :value="0" />
          <el-option :key="1" label="普通成员" :value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAdd">立即创建</el-button>
        <el-button @click="hanldeClose">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { register } from '@/api/user';

export default {
  name: 'AddMember',
  data() {
    return {
      form: {
        username: '',
        nickname: '',
        password: '',
        role: ''
      },
      passwordType: 'password'
    };
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    hanldeClose() {
      this.$emit('listenClose');
    },
    async handleAdd() {
      const result = await register(this.form);
      const { status, message } = result;
      if (status) {
        this.$message.success('创建成功');
        this.$emit('listenAdd');
      } else {
        this.$message.error(message);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.addMember{
  .passwordItem{
    position: relative;
  }
  .showPwd {
    position: absolute;
    right: 10px;
    top:50%;
    transform: translate(0,-50%);
    font-size: 16px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
