<template>
  <el-button size="mini" type="danger" icon="el-icon-delete" :loading="loading" @click="showDeleteDialog">Supprimer</el-button>
</template>

<script>
import { CATEGORY_FIND, CATEGORY_API_DELETE } from '@/store/actions'
export default {
  name: 'CategoryDelete',
  props: {
    categoryId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async showDeleteDialog() {
      this.loading = true
      const category = await this.$store.dispatch(`category/${CATEGORY_FIND}`, this.categoryId)
      this.$confirm(`Voulez-vous supprimer la catégorie : ${category.name}`, 'Suppression d\'une catégorie', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Annuler',
        type: 'danger'
      }).then(() => {
        this.$store.dispatch(`category/${CATEGORY_API_DELETE}`, this.categoryId).then(() => {
          this.$message({
            type: 'success',
            message: `La catégorie ${category.name} a bien été supprimée`
          })
        })
        this.loading = false
      })
    }
  }
}
</script>
