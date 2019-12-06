<template>
  <div class="app-container">
    <el-row type="flex" align="middle" justify="space-between">
      <el-col :span="12">
        <h2>Liste des produits</h2>
      </el-col>
      <product-add />
    </el-row>
    <product-list />
  </div>
</template>

<script>
import ProductList from '@/views/product/list/index'
import ProductAdd from '@/views/product/add/index'
export default {
  components: {
    ProductList,
    ProductAdd
  }
}
</script>
