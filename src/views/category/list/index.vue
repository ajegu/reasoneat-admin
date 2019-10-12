<template>
  <div>
    <el-table v-loading="listLoading" class="category-list" :data="data" :empty-text="loadingText" border fit highlight-current-row>
      <el-table-column prop="id" label="ID" width="300" />
      <el-table-column prop="name" label="Nom" />
      <el-table-column label="Créé le" width="200" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 0.25em">{{ scope.row.createdAt | parseDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Modifié le" width="200" align="center">
        <template v-if="scope.row.updatedAt" slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 0.25em">{{ scope.row.updatedAt | parseDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="250" class-name="small-padding fixed-width">
        <el-button type="primary" size="mini" icon="el-icon-edit">Modifier</el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete">Supprimer</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import store from '@/store'
import { isNull } from 'util'
export default {
  name: 'CategoryList',
  filters: {
    parseDate(value) {
      if (!isNull(value)) {
        const date = new Date(value)
        return `${date.toLocaleDateString()} à ${date.toLocaleTimeString()}`
      }
    }
  },
  data() {
    return {
      listLoading: true,
      loadingText: 'Chargement en cours'
    }
  },
  computed: {
    data() {
      return store.state.category.data
    }
  },
  created() {
    setTimeout(() => {
      this.listLoading = false
      store.dispatch('category/load')
    }, 1.5 * 1000)
  }
}
</script>

<style scoped>
  .category-list {
    width: 100%;
  }
</style>
