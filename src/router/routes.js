/* Route module */
import LoginRoute from './modules/login'
import ErrorsRoutes from './modules/errors'
// import ManagementAccountRoute from './modules/management_account'
import ManagementCollectionRoute from './modules/management_collection'
import ManagementEventRoute from './modules/management_event'
import ManagementFrameRoute from './modules/management_frame'

export function page (path) {
  return () => import(/* webpackChunkName: "[request]" */ `@/pages/${path}`)
}

export const routes = [
  ...LoginRoute,
  ...ErrorsRoutes,
  // ...ManagementAccountRoute,
  ...ManagementCollectionRoute,
  ...ManagementEventRoute,
  ...ManagementFrameRoute
]
