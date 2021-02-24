<template>
  <div class="project">
    <el-button type="primary" @click="handleAddProject">添加项目</el-button>
    <el-table :data="projectList" style="width: 100%">
      <el-table-column prop="projectName" label="项目名称" width="150" />
      <el-table-column prop="createUser" label="创建人" width="150" />
      <el-table-column prop="createTime" label="创建时间" width="200" />
      <el-table-column prop="key" label="通配key" width="150" />
      <el-table-column prop="lastPerson" label="最后操作人" width="150" />
      <el-table-column prop="director" label="负责人">
        <template slot-scope="scope">
          <div class="director">
            <div class="name">
              <span v-for="(item, index) in scope.row.directors" :key="index">{{ index===0?'':' , ' }}{{ item.nickname }}</span>
            </div>
            <i class="updateIcon el-icon-edit-outline" @click="handleUpdateDirector(scope.row)" />
          </div>

        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">查看</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      layout="prev, pager, next"
      :total="total"
      :current-page="currentPage"
      @current-change="handleCurrentPage"
    />

    <!-- 新增项目 -->
    <el-dialog title="新增项目" :visible.sync="addProjectVisible" width="440px">
      <AddProject v-if="addProjectVisible" @listenClose="handleAddProjectClose" />
    </el-dialog>

    <!-- 修改负责人 -->
    <el-dialog title="新增负责人" :visible.sync="updateDirectorVisible" width="800px">
      <UpdateDirector v-if="updateDirectorVisible" :projectDetail="projectDetail" @listenDirector="getProjectList" @listenClose="handleDirectorClose" />
    </el-dialog>

    <!-- 项目记录 -->
    <el-drawer :title="projectDetail.projectName" :visible.sync="projectDetailVisible" direction="rtl" size="800px">
      <ProjectDetail v-if="projectDetailVisible" :projectDetail="projectDetail" />
    </el-drawer>
  </div>
</template>

<script>
import { getProjectList, delProject } from '@/api/project';
import AddProject from '@/views/project/AddProject';
import ProjectDetail from '@/views/project/ProjectDetail';
import UpdateDirector from '@/views/project/UpdateDirector';

export default {
  name: 'Project',
  components: {
    AddProject,
    ProjectDetail,
    UpdateDirector
  },
  data() {
    return {
      projectList: [], // 项目列表
      addProjectVisible: false, // 增加项目 弹窗
      projectDetailVisible: false, // 项目详情 弹窗
      updateDirectorVisible: false, // 增加负责人 弹窗
      projectDetail: {},
      currentPage: 1,
      pageSize: 10,
      total: 0

    };
  },
  computed: {},
  created() {
    this.getProjectList();
  },
  methods: {
    async getProjectList() {
      const result = await getProjectList({ currentPage: this.currentPage, pageSize: this.pageSize });
      const { code, data } = result;
      if (code === 0) {
        this.projectList = data.list;
        this.total = data.count;
      }
    },
    handleAddProject() {
      this.addProjectVisible = true;
    },
    handleAddProjectClose() {
      this.addProjectVisible = false;
      this.getProjectList();
    },
    async handleDelete(row) {
      const result = await delProject({ projectId: row.projectId });
      const { code } = result;
      if (code === 0) {
        this.$message.success('删除成功');
      } else {
        this.$message.error('删除失败');
      }
      this.getProjectList();
    },
    handleEdit(row) {
      this.projectDetail = row;
      this.projectDetailVisible = true;
    },
    // 添加负责人
    handleUpdateDirector(row) {
      this.projectDetail = row;
      this.updateDirectorVisible = true;
    },
    handleDirectorClose() {
      this.updateDirectorVisible = false;
    },
    handleCurrentPage(current) {
      this.currentPage = current;
      this.getProjectList();
    }

  }
};
</script>

<style lang="scss" scoped>
.project {
  padding: 20px 30px;
  .updateIcon{
    cursor: pointer;
  }
  .director{
    display: flex;
    flex-direction: flex;
    align-items: center;
    .name{
      max-width: 150px;
      // width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 26px;
    }
  }
  .page{
    display: flex;
    justify-content: center;
    margin-top: 10px;
   }
}

</style>

<style lang="scss">
.el-drawer__header span:focus {
  outline: 0 !important;
}
</style>
