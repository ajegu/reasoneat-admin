const getters = {
  // App
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,

  // User
  roles: state => state.user.roles,

  // Category
  categoryList: state => state.category.list,
  categoryDialogFormVisible: state => state.category.dialogFormVisible,
  categoryFormData: state => state.category.formData,
  categoryFormError: state => state.category.formError,

  // Product
  productList: state => state.product.list,
  productTotal: state => state.product.total,
  productDialogFormVisible: state => state.product.dialogFormVisible,
  productFormData: state => state.product.formData,
  productFormError: state => state.product.formError,

  // Month
  monthList: state => state.month.list

}
export default getters
