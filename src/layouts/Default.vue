<template>
  <a-layout>
    <header-component />

    <a-layout id="components-layout-demo-custom-trigger"
              :class="{ 'layout-fold': collapsed }">
      <sidebar-component :collapsed.sync="collapsed" />
      <a-layout id="main-layout">
        <breadcrumb-component />

        <a-config-provider :locale="locale">
          <main-component />
        </a-config-provider>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
// Store
import { mapState } from 'vuex'
// Components
import SidebarComponent from '@/shared/components/layout/Sidebar'
import HeaderComponent from '@/shared/components/layout/Header'
import MainComponent from '@/shared/components/Main'
import BreadcrumbComponent from '@/shared/components/common/Breadcrumb.vue'
// Others
import vi_VN from 'ant-design-vue/es/locale/vi_VN'

export default {
  name: 'DefaultLayout',

  components: {
    SidebarComponent,
    HeaderComponent,
    MainComponent,
    BreadcrumbComponent
  },

  data () {
    return {
      collapsed: false,
      locale: vi_VN
    }
  },

  computed: {
    ...mapState('auth', ['bearerToken']),
  },

  created() {
    // In case the user restores the previous page in the browsers
    !this.bearerToken && this.$store.commit('SET_LAYOUT', { layout: 'auth' })
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/helpers/_variables.scss';

#components-layout-demo-custom-trigger {
  margin: 48px 0 0 213px;
  min-height: 100vh;
  &.layout-fold {
    margin-left: 58px;
  }

  .sidebar-trigger {
    display: flex;
    align-items: center;
    border-top: 2px solid $light-grey-blue;
    height: 40px;

    .trigger {
      font-size: 18px;
      padding: 0 16px;
      cursor: pointer;
      transition: all 0.25s linear;
      &:hover {
        color: $primary-color;
      }
    }
  }

  .ant-menu.ant-menu-root {
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    margin-bottom: 40px;
  }
}
</style>
