<template>
  <el-button type="primary" size="mini" icon="el-icon-edit" @click="showFormDialog">Modifier</el-button>
</template>

<script>
import { CATEGORY_FORM_UPDATE } from '@/store/actions'
import { SET_CATEGORY_DIALOG_FORM_VISIBLE } from '@/store/mutations'
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
    showFormDialog() {
      this.$store.dispatch(`category/${CATEGORY_FORM_UPDATE}`, this.categoryId)
      this.$store.commit(`category/${SET_CATEGORY_DIALOG_FORM_VISIBLE}`, true)
    }
  }
}
</script>
