<template>
  <div class="projectDetail">
    <div class="btnBox">
      <el-button type="primary" size="mini" @click="handleAdd">新增一行</el-button>
      <el-button type="primary" size="mini" @click="handleExport">导出</el-button>
      <el-button v-if="recordData.length" type="danger" size="mini" @click="handleDelete">删除最后一行</el-button>
    </div>
    <!-- <div class="tableBox"> -->
    <el-scrollbar class="tableBox">
      <el-table :data="recordData" size="mini" style="width: 100%">
        <el-table-column type="index" width="50" />
        <el-table-column label="关键key" width="80" prop="key" />
        <el-table-column v-for="(item,index) in tableHead" :key="index" :prop="item.value" :label="item.label">
          <template slot-scope="scope">
            <div v-if="!scope.row.isEdit" class="word">{{ scope.row[item.value] }}</div>
            <el-input v-else v-model=" scope.row[item.value]" placeholder="请输入内容" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.isEdit" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button v-else size="mini" @click="handleSave(scope.$index, scope.row)">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <!-- </div> -->

  </div>
</template>

<script>
import { getProjectRecord, updateProjectRecord, addProjectRecord, delProjectRecord } from '@/api/project';
export default {
  name: 'AddProject',
  props: {
    projectDetail: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      recordData: [],
      tableHead: [
        { label: '中文', value: 'zhCN' },
        { label: '英文', value: 'en' },
        { label: '台湾', value: 'zhTW' }
      ]
    };
  },
  created() {
    this.getRecordList();
  },

  methods: {
    async handleExport() {
      const routeData = this.$router.resolve({
        path: '/recordExport',
        query: { projectId: this.projectDetail.projectId }
      });
      window.open(routeData.href, '_blank');
    },
    // 新增一行
    async handleAdd() {
      const key = this.projectDetail.key + (this.recordData.length + 1);
      const result = await addProjectRecord({ key, projectId: this.projectDetail.projectId });
      const { code } = result;
      if (code === 0) {
        this.$message.success('新增成功');
      } else {
        this.$message.error('新增失败');
      }
      this.getRecordList();
    },
    async getRecordList() {
      const result = await getProjectRecord({ projectId: this.projectDetail.projectId });
      const { code, data } = result;
      if (code !== 0) {
        return;
      }
      this.recordData = data.recordList;
    },

    hanldeClose() {
      this.$emit('listenClose');
    },
    handleEdit(index, row) {
      row.isEdit = true;
      this.recordData.splice(index, 1, row);
    },
    async handleSave(index, row) {
      row.isEdit = false;
      this.recordData.splice(index, 1, row);
      const result = await updateProjectRecord({ id: row.id, zhCN: row.zhCN, zhTW: row.zhTW, en: row.en });
      const { code } = result;
      if (code === 0) {
        this.$message.success('更新成功');
      } else {
        this.$message.error('更新失败');
      }
    },
    async handleDelete(row) {
      const result = await delProjectRecord({ id: this.recordData[this.recordData.length - 1].id });
      const { code } = result;
      if (code === 0) {
        this.$message.success('删除成功');
      } else {
        this.$message.error('删除失败');
      }
      this.getRecordList();
    }
  }
};
</script>

<style lang="scss" scoped>
.projectDetail{
  height: calc(100vh - 80px);
  padding: 0px 0 10px 20px;
  position: relative;
  .btnBox{
    // position: fixed;
  }
  .tableBox{
    height: calc(100vh - 140px);
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 20px;
  }
  .word{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>

<style lang="scss">
.el-scrollbar__wrap {
  overflow-x: hidden !important;;
}
</style>
