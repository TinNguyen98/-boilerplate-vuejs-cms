// Core
import { ResolveGuard, AuthGuard, PermissionGuard } from '@/router/guards'
import { page } from '@/router/routes'
// Layout
import Resource from '@/shared/components/Resource.vue'
// Others
import { PERMISSION } from '@/enum/permission.enum'

export default [
  {
    path: '',
    redirect: '/management-account-list',
    component: Resource,
    children: [
      {
        path: '/management-account',
        name: 'management_account',
        component: page('management_account/Index.vue'),
        meta: {
          breadcrumb: [
            { title: 'home_page' },
            { title: 'management_account.page_title' }
          ],
          role: [PERMISSION.ADMIN]
        },
        beforeEnter: ResolveGuard([PermissionGuard])
      },
      {
        path: '/management-account-list',
        name: 'management_account_list',
        component: page('management_account/Index.vue'),
        meta: {
          breadcrumb: [
            { title: 'home_page' },
            { title: 'management_account.page_title' },
            { title: 'management_account.page_list' }
          ],
          role: [PERMISSION.ADMIN]
        },
        beforeEnter: ResolveGuard([PermissionGuard])
      },
      {
        path: '',
        name: 'management_account_decentralization',
        component: page('management_account/Index.vue'),
        meta: {
          breadcrumb: [
            { title: 'home_page', routeName: 'home' },
            { title: 'management_account.page_title' },
            { title: 'management_account.decentralization' }
          ],
          role: [PERMISSION.ADMIN]
        },
        beforeEnter: ResolveGuard([PermissionGuard])
      }
    ],
    beforeEnter: ResolveGuard([AuthGuard])
  }
]
