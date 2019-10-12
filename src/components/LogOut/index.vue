<template>
  <el-button class="btn-logout" @click="logout">Déconnexion</el-button>
</template>

<script>
import { keycloak } from '@/utils/authenticate'

export default {
  methods: {
    logout: () => {
      keycloak.logout()
    }
  }
}
</script>

<style scoped>
  .btn-logout {
    margin-right: 1em;
  }
</style>
