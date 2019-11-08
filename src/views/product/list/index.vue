<template>
  <div>
    <el-card shadow="never" style="margin-bottom:10px">
      <el-form :inline="true" :model="filterForm" @submit.prevent.native="loadProducts">
        <el-form-item>
          <el-input
            v-model="filterForm.name"
            placeholder="Rechercher par libellé"
            clearable
            autofocus
            prefix-icon="el-icon-search"
            @clear="loadProducts"
          />
        </el-form-item>
        <el-button native-type="submit" type="primary" icon="el-icon-search" />
      </el-form>
    </el-card>
    <el-table
      v-loading="loading"
      class="product-list"
      :data="productList"
      :empty-text="loadingText"
      border
      fit
      highlight-current-row
      :default-sort="{prop: 'name', order: 'ascending'}"
      sortable="custorm"
      @sort-change="sortChange"
    >
      <el-table-column label="Image" width="80" align="center">
        <template slot-scope="scope">
          <img v-if="scope.row.image" :src="scope.row.image" height="40">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="Libellé" sortable="custom" width="300" />
      <el-table-column label="Mois" width="250">
        <template slot-scope="scope">
          <span v-for="(month, index) in scope.row.months" :key="index">
            <span v-if="index > 0">, </span>{{ month.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Créé le" width="200" align="center" prop="created_at" sortable>
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
      <el-table-column label="Actions" class-name="small-padding fixed-width" align="center">
        <!-- <template slot-scope="scope">
          <el-row>
            <category-edit :product-id="scope.row.product_id" />
            <category-delete :category-id="scope.row.product_id" />
          </el-row>
        </template> -->
      </el-table-column>
    </el-table>

    <el-pagination
      :page-size="10"
      layout="prev, pager, next"
      :total="productTotal"
      @current-change="currentChange"
    />
  </div>
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
      loadingText: 'Chargement des produits en cours',
      page: 1,
      prop: 'name',
      order: 'ascending',
      filterForm: {
        name: ''
      }
    }
  },
  computed: {
    productList() {
      return this.$store.getters.productList
    },
    productTotal() {
      return this.$store.getters.productTotal
    }
  },
  /**
   * Chargement de la liste des produits à la création de la liste
   */
  async created() {
    this.loadProducts()
  },
  methods: {
    /**
     * Chargement de la liste des produits
     */
    async loadProducts() {
      this.loading = true
      try {
        await this.$store.dispatch(`product/${PRODUCT_API_LOAD}`, {
          page: this.page,
          prop: this.prop,
          order: this.order,
          filters: {
            name: this.filterForm.name
          }
        })
      } catch (error) {
        this.loadingText = 'Impossible d\'afficher les produits'
        console.error(error)
      }

      this.loading = false
    },
    /**
     * Rechargement de la list lors du changement de page
     * @param {int} page
     */
    currentChange(page) {
      this.page = page
      this.loadProducts()
    },
    /**
     * Rechargement de la liste lors du tri sur une colonne
     */
    sortChange(params) {
      this.prop = params.prop
      this.order = params.order
      this.loadProducts()
    }
  }
}
</script>
<style>
  .el-form-item {
    margin: 0;
  }
</style>
