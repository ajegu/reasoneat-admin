<template>
  <el-button @click="logout">Déconnexion</el-button>
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
