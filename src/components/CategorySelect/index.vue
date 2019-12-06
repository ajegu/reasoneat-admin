<template>
  <el-select
    :value="value"
    placeholder="Choisissez une catégorie"
    :loading="loading"
    @change="change"
  >
    <el-option
      v-for="category in categoryList"
      :key="category.category_id"
      :label="category.name"
      :value="category.category_id"
    />
  </el-select>
</template>

<script>
import { CATEGORY_API_LOAD } from '@/store/actions'
export default {
  name: 'CategorySelect',
  props: {
    value: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    categoryList() {
      return this.$store.getters.categoryList
    }
  },
  /**
   * Charge la liste des mois à la création du composant
   */
  async created() {
    this.loadCategories()
  },
  methods: {
    /**
     * Emet le changement de valeur au composant parent
     */
    change(val) {
      this.$emit('input', val)
    },
    /**
     * Chargement de la liste des mois
     */
    async loadCategories() {
      this.loading = true
      try {
        await this.$store.dispatch(`category/${CATEGORY_API_LOAD}`)
      } catch (error) {
        console.error(error)
      }
      this.loading = false
    }
  }
}
</script>
