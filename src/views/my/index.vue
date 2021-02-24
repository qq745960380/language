<template>
  <div class="myBox">
    <el-button type="primary" size="mini" @click="handleEdit">修改登录密码</el-button>
    <div class="wordItem"><div>昵称:</div>{{ userInfo.nickname }}</div>
    <div class="wordItem"><div>用户名:</div>{{ userInfo.username }}</div>
    <!-- 新增用户 -->
    <el-dialog title="修改密码" :visible.sync="changePwdVisible" width="500px" append-to-body>
      <ChangePwd v-if="changePwdVisible" @listenClose="handlePwdClose" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ChangePwd from '@/views/my/ChangePwd';

export default {
  name: 'My',
  components: {
    ChangePwd
  },
  data() {
    return {
      changePwdVisible: false
    };
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {},
  methods: {
    handleEdit() {
      this.changePwdVisible = true;
    },
    handlePwdClose() {
      this.changePwdVisible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.myBox {

  padding:30px 40px;
  .wordItem{
    display: flex;
    align-items: center;
    font-size: 24px;
    line-height: 36px;
    >div:nth-child(1){
      width: 120px;
      text-align: right;
      margin-right: 10px;
    }
  }
}
</style>
