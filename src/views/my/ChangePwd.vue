<template>
  <div class="chengePwd">
    <el-form ref="form" :model="form" label-width="80px">
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
      <el-form-item label="新密码" class="passwordItem" style="position:relative">
        <el-input
          ref="newPasswordType"
          v-model="form.newPassword"
          :type="newPasswordType"
          auto-complete="on"
        />
        <span class="showPwd" @click="showNewPwd">
          <svg-icon :icon-class="newPasswordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleChange">立即修改</el-button>
        <el-button @click="hanldeClose">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { changePwd } from '@/api/user';

export default {
  name: 'ChengePwd',
  data() {
    return {
      form: {
        password: '',
        newPassword: ''
      },
      passwordType: 'password',
      newPasswordType: 'password'

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
    showNewPwd() {
      if (this.newPasswordType === 'password') {
        this.passwordType = '';
      } else {
        this.newPasswordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.newPasswordType.focus();
      });
    },
    hanldeClose() {
      this.$emit('listenClose');
    },
    async handleChange() {
      const result = await changePwd(this.form);
      const { status } = result;
      if (status) {
        this.$message.success('修改成功');
        this.$emit('listenAdd');
      } else {
        this.$message.error('修改失败');
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.chengePwd{
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
