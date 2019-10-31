<template>
  <div>
    <el-table v-loading="loading" class="category-list" :data="categoryList" :empty-text="loadingText" border fit highlight-current-row>
      <el-table-column label="Image" width="80" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.image" height="40">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Nom" />
      <el-table-column label="Créé le" width="200" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 0.25em">{{ scope.row.created_at | parseDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Modifié le" width="200" align="center">
        <template v-if="scope.row.updated_at" slot-scope="scope">
          <i class="el-icon-time" />
          <span style="margin-left: 0.25em">{{ scope.row.updated_at | parseDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="250" class-name="small-padding fixed-width" align="center">
        <template slot-scope="scope">
          <el-row>
            <category-edit :category-id="scope.row.category_id" />
            <category-delete :category-id="scope.row.category_id" />
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <category-form />
  </div>
</template>
<script>
import { isNull } from 'util'
import CategoryForm from '@/views/category/form/index'
import CategoryEdit from '@/views/category/edit/index'
import CategoryDelete from '@/views/category/delete/index'
import { CATEGORY_API_LOAD } from '@/store/actions'
export default {
  name: 'CategoryList',
  components: {
    CategoryEdit,
    CategoryForm,
    CategoryDelete
  },
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
      loading: false,
      loadingText: 'Chargement en cours'
    }
  },
  computed: {
    categoryList() {
      return this.$store.getters.categoryList
    }
  },
  async created() {
    this.loading = true
    try {
      await this.$store.dispatch(`category/${CATEGORY_API_LOAD}`)
    } catch (error) {
      this.loadingText = 'Impossible d\'afficher les catégories'
      console.error(error)
    }

    this.loading = false
  }
}
</script>

<style scoped>
  .category-list {
    width: 100%;
  }
</style>
