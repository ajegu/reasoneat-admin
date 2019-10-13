<!-- Table -->
<el-button type="text" @click="dialogTableVisible = true">Ouvrir un modal avec tableau</el-button>
<template>
  <div>
    <el-button type="success" size="mini" icon="el-icon-plus" @click="dialogFormVisible = true">Ajouter</el-button>

    <el-dialog title="Ajout d'une catégorie" :visible.sync="dialogFormVisible" @closed="resetForm">
      <el-form ref="categoryForm" :rules="rules" :model="form">
        <el-form-item label="Libellé" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Lien vers l'image" :label-width="formLabelWidth">
          <el-input v-model="form.image" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Annuler</el-button>
        <el-button type="primary" :loading="loading" @click="onSubmit">Confirmer</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'CategoryAdd',
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: '180px',
      loading: false,
      form: {
        name: '',
        image: ''
      },
      rules: {
        name: [
          { required: true, message: 'Le libellé est obligatoire', trigger: 'blur' }
          // { min: 3, max: 5, message: 'La taille doit être comprise entre 3 et 50 caractères', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit() {
      this.loading = true
      let formValid = false
      this.$refs['categoryForm'].validate((valid) => {
        formValid = valid
      })

      if (!formValid) {
        this.loading = false
        return formValid
      }

      store.dispatch('category/add', this.form)
        .then(() => {
          store.dispatch('category/load').then(() => {
            this.dialogFormVisible = false
            this.loading = false
          })
        })
        .catch((error) => {
          console.log(error.response.data)
        })
    },
    resetForm() {
      this.form.name = ''
      this.form.image = ''
    }
  }
}
</script>
