<template>
  <el-button type="success" size="mini" icon="el-icon-plus" @click="showFormDialog">Ajouter</el-button>
</template>

<script>
import { SET_CATEGORY_FORM_DATA, SET_CATEGORY_DIALOG_FORM_VISIBLE } from '@/store/mutations'
export default {
  name: 'CategoryAdd',
  methods: {
    /**
     * Affiche la fenêtre de création d'une catégorie
     */
    showFormDialog() {
      this.$store.commit(`category/${SET_CATEGORY_FORM_DATA}`, {})
      this.$store.commit(`category/${SET_CATEGORY_DIALOG_FORM_VISIBLE}`, true)
    }
  }
}
</script>
