<template>
  <div class="recordTree">
    <json-viewer
      :value="jsonData"
      :expand-depth="5"
      copyable
      sort
    />
  </div>
</template>
<script>
import { getExportRecord } from '@/api/project';

export default {
  name: 'RecordTree',
  data() {
    return {
      jsonData: {
        zhCN: {},
        en: {},
        zhTW: {}
      }
    };
  },
  created() {
    this.handleExport();
  },
  methods: {
    async handleExport() {
      const result = await getExportRecord({ projectId: this.$route.query.projectId });
      const { status, data } = result;
      if (status) {
        this.jsonData = data.exportData;
      }
    }
  }

};
</script>
<style lang="scss" scoped>
.recordTree{
  width: 700px;
}
</style>
