<template>
  <el-select
    :value="value"
    placeholder="Choisissez un ou plusieurs mois"
    :loading="loading"
    multiple
    @change="change"
  >
    <el-option
      v-for="month in monthList"
      :key="month.month_id"
      :label="month.name"
      :value="month.month_id"
    />
  </el-select>
</template>

<script>
import { MONTH_API_LOAD } from '@/store/actions'
export default {
  name: 'MonthSelect',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      months: [],
      loading: false
    }
  },
  computed: {
    monthList() {
      return this.$store.getters.monthList
    }
  },
  /**
   * Charge la liste des mois à la création du composant
   */
  async created() {
    this.loadMonths()
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
    async loadMonths() {
      this.loading = true
      try {
        await this.$store.dispatch(`month/${MONTH_API_LOAD}`)
      } catch (error) {
        console.error(error)
      }
      this.loading = false
    }
  }
}
</script>
