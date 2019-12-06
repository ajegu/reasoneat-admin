<template>
  <el-button type="success" size="mini" icon="el-icon-plus" @click="showFormDialog">Ajouter</el-button>
</template>

<script>
import { SET_PRODUCT_FORM_DATA, SET_PRODUCT_DIALOG_FORM_VISIBLE } from '@/store/mutations'
export default {
  name: 'ProductAdd',
  methods: {
    /**
     * Affiche la fenêtre de création d'un produit
     */
    showFormDialog() {
      this.$store.commit(`product/${SET_PRODUCT_FORM_DATA}`, {})
      this.$store.commit(`product/${SET_PRODUCT_DIALOG_FORM_VISIBLE}`, true)
    }
  }
}
</script>
