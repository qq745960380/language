<template>
  <div class="member">
    <el-button type="primary" size="mini" @click="handleAdd">新增用户</el-button>
    <div>
      <el-table :data="userList" size="mini" style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column label="账户" prop="username" />
        <el-table-column label="昵称" prop="nickname" />
        <el-table-column label="角色" prop="role">
          <template slot-scope="scope">
            <div v-if="scope.row.role===0">管理员</div>
            <div v-else>普通成员</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增用户 -->
    <el-dialog title="新增用户" :visible.sync="addMemberVisible" width="500px" append-to-body>
      <AddMember v-if="addMemberVisible" @listenClose="handleAddClose" @listenAdd="handleAddSuccess" />
    </el-dialog>
  </div>
</template>

<script>
import { getUser, delUser } from '@/api/user';
import AddMember from '@/views/member/AddMember';
export default {
  name: 'Member',
  components: {
    AddMember
  },
  data() {
    return {
      userList: [],
      addMemberVisible: false
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    async getUser() {
      const result = await getUser();
      const { status, data } = result;
      if (status) {
        this.userList = data.list;
      }
    },
    handleAdd() {
      this.addMemberVisible = true;
    },
    handleAddClose() {
      this.addMemberVisible = false;
    },
    handleAddSuccess() {
      this.addMemberVisible = false;
      this.getUser();
    },
    async handleDelete(row) {
      const result = await delUser({ userId: row.userId });
      const { status } = result;
      if (status) {
        this.$message.success('删除成功');
      } else {
        this.$message.error('删除失败');
      }
      this.getUser();
    }
  }
};
</script>
<style lang="scss" scoped>
.member{
  padding: 20px 30px;
}
</style>
