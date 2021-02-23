<template>
  <div class="addDirector">
    <el-button type="primary" size="mini" @click="handleAdd">新增负责人</el-button>
    <el-table :data="directorsData" size="mini" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column label="账户" prop="nickname" />
      <el-table-column label="昵称" prop="nickname" />
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button v-if="!scope.row.isEdit" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改负责人 -->
    <el-dialog title="新增负责人" :visible.sync="addDirectorVisible" width="500px" append-to-body>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="负责人">
          <el-select v-model="form.userId" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in options"
              :key="item.userId"
              :label="item.nickname"
              :value="item.userId"
            />
          </el-select>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即添加</el-button>
          <el-button @click="hanldeClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { addDirector, delDirector, getDirector } from '@/api/project';
import { getUser } from '@/api/user';

export default {
  name: 'AddDirector',
  props: {
    projectDetail: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      form: {
        userId: ''
      },
      options: [],
      directorsData: [],
      addDirectorVisible: false
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {
    this.getDirector();
  },
  methods: {
    async getDirector() {
      const result = await getDirector({ projectId: this.projectDetail.projectId });
      const { status, data } = result;
      if (status) {
        this.directorsData = data.list;
      }
    },
    async onSubmit() {
      const result = await addDirector({ ...this.form, projectId: this.projectDetail.projectId });
      const { status } = result;
      if (status) {
        this.$message.success('创建成功');
        this.$emit('listenDirector');
        this.hanldeClose();
      } else {
        this.$message.error('创建失败，请重试');
      }
      this.getDirector();
    },
    hanldeClose() {
      this.addDirectorVisible = false;
    },
    async handleAdd() {
      const result = await getUser();
      const { status, data } = result;
      if (status) {
        this.options = data.list;
      }
      this.addDirectorVisible = true;
    },
    // 删除负责人
    async handleDelete(row) {
      if (this.directorsData.length === 1) {
        this.$message.error('当前负责人只有一位，不可删除');
        return;
      }
      const result = await delDirector({ projectId: this.projectDetail.projectId, userId: row.userId });
      const { status } = result;
      if (status) {
        this.$message.success('删除成功');
        this.$emit('listenDirector');
        if (row.userId === this.userInfo.userId) {
          this.$emit('listenClose');
          return;
        }
        this.getDirector();
      } else {
        this.$message.error('删除失败，请重试');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.addDirector{
  padding-bottom: 30px;
  .select{
    width: 100%;
  }
}
</style>
