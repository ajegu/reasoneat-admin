<template>
  <el-dialog :title="title" :visible="productDialogFormVisible" @close="closeDialogForm">

    <transition name="fade">
      <el-alert v-if="formError.product" type="error" :title="formError.product" style="margin-bottom:20px" center :closable="false" />
    </transition>

    <el-form ref="productForm" :model="formData" :rules="rules" :label-width="formLabelWidth" @submit.native.prevent="onSubmit">
      <el-form-item label="Libellé" prop="name" :label-width="formLabelWidth" :error="formError.name">
        <el-input v-model="formData.name" autocomplete="off" placeholder="Renseignez le libellé du produit" autofocus />
      </el-form-item>

      <el-form-item label="Lien vers l'image" prop="image" :error="formError.image">
        <el-input v-model="formData.image" autocomplete="off" placeholder="Exemple : http://mon-image.fr" />
      </el-form-item>

      <el-form-item label="Mois" prop="months" :error="formError.months">
        <month-select v-model="formData.months" autocomplete="off" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="Catégorie" prop="category" :error="formError.category">
        <category-select v-model="formData.category" autocomplete="off" style="width: 100%;" />
      </el-form-item>

      <el-form-item label="Texte de haut de page" prop="header_text" :error="formError.headerText">
        <el-input v-model="formData.header_text" type="textarea" autocomplete="off" />
      </el-form-item>

      <el-form-item label="Texte de bas de page" prop="footer_text" :error="formError.footerText">
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
import { SET_PRODUCT_DIALOG_FORM_VISIBLE, SET_PRODUCT_FORM_ERROR } from '@/store/mutations'
import { PRODUCT_API_SAVE } from '@/store/actions'
import MonthSelect from '@/components/MonthSelect'
import CategorySelect from '@/components/CategorySelect'
export default {
  name: 'ProductForm',
  components: {
    MonthSelect,
    CategorySelect
  },
  data() {
    return {
      formLabelWidth: '180',
      loading: false,
      rules: {
        name: [
          { required: true, message: 'Le libellé est obligatoire', trigger: 'blur' },
          { min: 3, max: 50, message: 'La taille doit être comprise entre 3 et 50 caractères', trigger: 'blur' }
        ],
        image: [
          { required: true, message: 'Le lien de l\'image est obligatoire', trigger: 'blur' }
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
     * Retourne le formData du store product
     * @return {object} formData
     */
    formData: {
      get() {
        return this.$store.getters.productFormData
      }
    },
    /**
     * Retourne le formError du store product
     * @return {object} formError
     */
    formError() {
      return this.$store.getters.productFormError
    },
    /**
     * Récupère le statut visible de la fenêtre
     * @return {bool} formVisible
     */
    productDialogFormVisible() {
      return this.$store.getters.productDialogFormVisible
    },
    /**
     * Détermine le titre de la fenêtre
     * @return {string} title
     */
    title() {
      let title
      const product = this.$store.getters.productFormData
      if (product.id === undefined) {
        title = 'Ajout d\'un produit'
      } else {
        title = `Modification du produit ${product.name}`
      }

      return title
    },
    /**
     * Détermine le libellé du bouton d'action
     * @return {string} action
     */
    buttonAction() {
      let action
      const product = this.$store.getters.productFormData
      if (product.product_id === undefined) {
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
      this.$store.commit(`product/${SET_PRODUCT_DIALOG_FORM_VISIBLE}`, false)
    },
    /**
     * Soumission du formulaire vers l'api
     */
    async onSubmit() {
      this.loading = true
      try {
        await this.$store.dispatch(`product/${PRODUCT_API_SAVE}`)
        this.closeDialogForm()
      } catch (error) {
        console.error(error)
      }
      this.loading = false
    },
    /**
     * Réinitialise l'état du formulaire
     */
    resetForm() {
      if (this.$refs['productForm']) {
        this.$refs['productForm'].resetFields()
      }
      this.$store.commit(`product/${SET_PRODUCT_FORM_ERROR}`, null)
    }
  }
}
</script>
