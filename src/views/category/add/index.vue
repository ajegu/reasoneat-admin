<template>
  <div>
    <el-button type="success" size="mini" icon="el-icon-plus" @click="dialogFormVisible = true">Ajouter</el-button>

    <el-dialog title="Ajout d'une catégorie" :visible.sync="dialogFormVisible" @closed="resetForm">

      <transition name="fade">
        <el-alert v-if="error.global" type="error" :title="error.global" style="margin-bottom:20px" center :closable="false" />
      </transition>

      <el-form ref="categoryForm" :rules="rules" :model="form">
        <el-form-item label="Libellé" :label-width="formLabelWidth" :error="error.name">
          <el-input v-model="form.name" autocomplete="off" autofocus @keyup.enter.native="onSubmit" />
        </el-form-item>
        <el-form-item label="Lien vers l'image" :label-width="formLabelWidth" :error="error.image">
          <el-input v-model="form.image" autocomplete="off" @keyup.enter.native="onSubmit" />
        </el-form-item>
        <el-form-item label="Texte de haut de page" :label-width="formLabelWidth" :error="error.headerText">
          <el-input v-model="form.headerText" type="textarea" :rows="5" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Texte de bas de page" :label-width="formLabelWidth" :error="error.footerText">
          <el-input v-model="form.footerText" type="textarea" :rows="5" autocomplete="off" />
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Annuler</el-button>
        <el-button native-type="submit" type="primary" :loading="loading" @click="onSubmit">Confirmer</el-button>
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
        image: '',
        headerText: '',
        footerText: ''
      },
      rules: {
        name: [
          { required: true, message: 'Le libellé est obligatoire', trigger: 'blur' },
          { min: 3, max: 50, message: 'La taille doit être comprise entre 3 et 50 caractères', trigger: 'blur' }
        ],
        headerText: [
          { min: 50, message: 'Le texte doit faire plus de 50 caractères', trigger: 'blur' }
        ],
        footerText: [
          { min: 50, message: 'Le texte doit faire plus de 50 caractères', trigger: 'blur' }
        ]
      },
      error: {
        name: '',
        headerText: '',
        footerText: '',
        global: ''
      }
    }
  },
  created() {
    this.resetErrors()
    this.resetForm()
  },
  methods: {
    async onSubmit() {
      this.loading = true
      let formValid = false
      this.resetErrors()
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
        .catch((failure) => {
          if (failure.response.status === 400) {
            // On affiche les messages d'erreur
            const errors = failure.response.data.errors
            for (const [code, message] of Object.entries(errors)) {
              const codes = code.split('.')
              for (const [field] of Object.entries(this.error)) {
                if (codes[0] === field) {
                  this.error[field] = message
                }
              }

              if (code === 'category.exists') {
                this.error.global = message
              }
            }

            this.loading = false
          }
        })
    },
    resetForm() {
      this.name = ''
      this.image = ''
      this.headerText = ''
      this.footerText = ''
      if (this.$refs['categoryForm']) {
        this.$refs['categoryForm'].resetFields()
      }
    },
    resetErrors() {
      this.error.global = ''
      this.error.headerText = ''
      this.error.footerText = ''
    }
  }
}
</script>
