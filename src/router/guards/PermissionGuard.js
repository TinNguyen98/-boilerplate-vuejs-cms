import store from '@/shared/store'

export const PermissionGuard = async (to, from, next) => {
  // Check permission of page
  const { role } = to.meta
  if (!role.includes(store.state.auth.userProfile.role)) {
    return next({ name: 'not_authenticated' })
  }

  next()
}
