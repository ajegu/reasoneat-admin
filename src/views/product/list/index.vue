<template>
  <el-table v-loading="loading" class="product-list" :data="productList" :empty-text="loadingText" border fit highlight-current-row>
    <el-table-column label="Image" width="80" align="center">
      <template slot-scope="scope">
        <img v-if="scope.row.image" :src="scope.row.image" height="40">
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Libellé" />
    <el-table-column label="Mois" width="250">
      <template slot-scope="scope">
        <span v-for="(month, index) in scope.row.months" :key="index">
          <span v-if="index > 0">, </span>{{ month.name }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Créé le" width="200" align="center" prop="created_at">
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
      <!-- <template slot-scope="scope">
        <el-row>
          <category-edit :product-id="scope.row.product_id" />
          <category-delete :category-id="scope.row.product_id" />
        </el-row>
      </template> -->
    </el-table-column>
  </el-table>
</template>

<script>
import { parseDate } from '@/utils/date'
import { PRODUCT_API_LOAD } from '@/store/actions'
export default {
  name: 'ProductList',
  filters: {
    parseDate
  },
  data() {
    return {
      loading: false,
      loadingText: 'Chargement des produits en cours'
    }
  },
  computed: {
    productList() {
      return this.$store.getters.productList
    }
  },
  async created() {
    this.loading = true
    try {
      await this.$store.dispatch(`product/${PRODUCT_API_LOAD}`)
    } catch (error) {
      this.loadingText = 'Impossible d\'afficher les produits'
      console.error(error)
    }

    this.loading = false
  }
}
</script>
