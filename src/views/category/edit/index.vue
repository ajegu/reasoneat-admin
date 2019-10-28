<template>
  <el-button type="primary" size="mini" icon="el-icon-edit" @click="showFormDialog">Modifier</el-button>
</template>

<script>
import { CATEGORY_FIND } from '@/store/actions'
import { SET_CATEGORY_FORM_DATA, SET_CATEGORY_DIALOG_FORM_VISIBLE } from '@/store/mutations'
export default {
  name: 'CategoryEdit',
  props: {
    categoryId: {
      type: String,
      required: true
    }
  },
  methods: {
    /**
     * Affiche le formulaire avec les données de la catégorie à modifier
     */
    async showFormDialog() {
      const categoryUpdated = await this.$store.dispatch(`category/${CATEGORY_FIND}`, this.categoryId)
      this.$store.commit(`category/${SET_CATEGORY_FORM_DATA}`, categoryUpdated)
      this.$store.commit(`category/${SET_CATEGORY_DIALOG_FORM_VISIBLE}`, true)
    }
  }
}
</script>
