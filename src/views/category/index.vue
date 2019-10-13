<template>
  <div class="app-container">
    <el-row type="flex" align="middle" justify="space-between">
      <el-col :span="12">
        <h2>Liste des catégories</h2>
      </el-col>
      <category-add />

    </el-row>
    <category-list />
  </div>
</template>

<script>
import CategoryList from './list/index'
import CategoryAdd from './add/index'

export default {
  components: {
    CategoryList,
    CategoryAdd
  }
}
</script>

<style scoped>

</style>
