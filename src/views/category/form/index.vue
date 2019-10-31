<template>
  <el-dialog :title="title" :visible="categoryDialogFormVisible" @close="closeDialogForm">
    <transition name="fade">
      <el-alert v-if="formError.category" type="error" :title="formError.category" style="margin-bottom:20px" center :closable="false" />
    </transition>

    <el-form ref="categoryForm" :model="formData" :rules="rules" @submit.native.prevent="onSubmit">
      <el-form-item label="Libellé" prop="name" :label-width="formLabelWidth" :error="formError.name">
        <el-input v-model="formData.name" autocomplete="off" placeholder="Renseignez le libellé de la catégorie" autofocus />
      </el-form-item>

      <el-form-item label="Lien vers l'image" prop="image" :label-width="formLabelWidth" :error="formError.image">
        <el-input v-model="formData.image" autocomplete="off" placeholder="Exemple : http://mon-image.fr" />
      </el-form-item>

      <el-form-item label="Texte de haut de page" prop="header_text" :label-width="formLabelWidth" :error="formError.headerText">
        <el-input v-model="formData.header_text" type="textarea" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Texte de bas de page" prop="footer_text" :label-width="formLabelWidth" :error="formError.footerText">
        <el-input v-model="formData.footer_text" type="textarea" autocomplete="off" />
      </el-form-item>

      <el-row type="flex" justify="end">
        <el-button class="ion-float-right" type="text" @click="closeDialogForm">Annuler</el-button>
        <el-button class="ion-float-right" native-type="submit" type="primary" :loading="loading">{{ buttonAction }}</el-button>
      </el-row>
    </el-form>

  </el-dialog>
</template>

<script>
import { isUndefined } from 'util'
import { SET_CATEGORY_DIALOG_FORM_VISIBLE, SET_CATEGORY_FORM_ERROR } from '@/store/mutations'
import { CATEGORY_API_SAVE } from '@/store/actions'
export default {
  name: 'CategoryForm',
  data() {
    return {
      formLabelWidth: '180',
      loading: false,
      rules: {
        name: [
          { required: true, message: 'Le libellé est obligatoire', trigger: 'blur' },
          { min: 3, max: 50, message: 'La taille doit être comprise entre 3 et 50 caractères', trigger: 'blur' }
        ],
        header_text: [
          { min: 50, message: 'Le texte doit faire plus de 50 caractères', trigger: 'blur' }
        ],
        footer_text: [
          { min: 50, message: 'Le texte doit faire plus de 50 caractères', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    /**
     * Retourne le formData du store category
     * @return {object} formData
     */
    formData: {
      get() {
        return this.$store.getters.categoryFormData
      }
    },
    /**
     * Retourne le formError du store category
     * @return {object} formError
     */
    formError() {
      return this.$store.getters.categoryFormError
    },
    /**
     * Récupère le statut visible de la fenêtre
     * @return {bool} formVisible
     */
    categoryDialogFormVisible() {
      return this.$store.getters.categoryDialogFormVisible
    },
    /**
     * Détermine le titre de la fenêtre
     * @return {string} title
     */
    title() {
      let title
      const category = this.$store.getters.categoryFormData
      if (isUndefined(category.id)) {
        title = 'Ajout d\'une catégorie'
      } else {
        title = `Modification de la catégorie ${category.name}`
      }

      return title
    },
    /**
     * Détermine le libellé du bouton d'action
     * @return {string} action
     */
    buttonAction() {
      let action
      const category = this.$store.getters.categoryFormData
      if (isUndefined(category.category_id)) {
        action = 'Créer'
      } else {
        action = 'Sauvegarder'
      }

      return action
    }
  },
  methods: {
    /**
     * Ferme la fenêtre et réinitialise formulaire
     */
    closeDialogForm() {
      this.resetForm()
      this.$store.commit(`category/${SET_CATEGORY_DIALOG_FORM_VISIBLE}`, false)
    },
    /**
     * Soumission du formulaire vers l'api
     */
    async onSubmit() {
      this.loading = true
      try {
        await this.$store.dispatch(`category/${CATEGORY_API_SAVE}`)
        this.resetForm()
        this.$store.commit(`category/${SET_CATEGORY_DIALOG_FORM_VISIBLE}`, false)
      } catch (error) {
        console.error(error)
      }
      this.loading = false
    },
    /**
     * Réinitialise l'état du formulaire
     */
    resetForm() {
      if (this.$refs['categoryForm']) {
        this.$refs['categoryForm'].resetFields()
      }
      this.$store.commit(`category/${SET_CATEGORY_FORM_ERROR}`, null)
    }
  }
}
</script>
