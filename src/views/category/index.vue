<template>
  <div class="app-container">
    <el-row type="flex" align="middle" justify="space-between">
      <el-col :span="12">
        <h2>Liste des catégories</h2>
      </el-col>
      <el-button type="success" size="mini" icon="el-icon-plus">Ajouter</el-button>

    </el-row>
    <category-list />
  </div>
</template>

<script>
import CategoryList from './list/index'
export default {
  components: {
    CategoryList
  }
}
</script>

<style scoped>

</style>
