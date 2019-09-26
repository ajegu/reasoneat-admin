<template>
  <el-button @click="logout">Déconnexion</el-button>
</template>

<script>
export default {
  methods: {
    logout: () => {
      console.log('logout ')
    }
  }
}
</script>
