<template>
  <a-layout-header id="header"
                   class="d-flex justify-content-between align-items-center">

    <router-link :to="{ name: 'home' }"
                 tag="h1"
                 class="header-logo blur-effect mb-0"
                 v-text="'Logo template'"
    />

    <div class="header-profile">
      <div class="header-profile-avatar"
        :style="{'background-image': `url('${userAvatar}')`}"/>

      <a-dropdown placement="bottomRight">
        <p v-if="Object.keys(userProfile).length && userProfile.name"
           :title="userProfile.name"
           v-text="userProfile.name"
           class="header-profile-name"/>
        <a-menu slot="overlay">
          <a-menu-item>
            <span @click.prevent="handleLogout"
                  v-text="$t('log_out')"/>
          </a-menu-item>
        </a-menu>
      </a-dropdown>

      <a-dropdown placement="bottomRight">
        <img :src="require('@/assets/images/language-icon.png')"
             class="cursor-pointer"
             alt="language-icon"/>
        <a-menu slot="overlay">
          <a-menu-item v-for="locale in LOCALE" :key="`locale-${locale}`"
                       :class="{ 'ant-dropdown-menu-item-active': $i18n.locale === locale }">
            <span @click.prevent="changeLanguage(locale)"
                  v-text="capitalizeFirstLetter(locale)"/>
            <a-icon v-if="$i18n.locale === locale" type="check" class="ml-3"/>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<script>
// Store
import { mapState, mapActions } from 'vuex'
// Other
import FormMixin from '@/shared/mixins/form.mixin'
import { LOCALE } from '@/enums/locale.enum'
import { capitalizeFirstLetter } from '@/shared/helpers'

export default {
  name: 'HeaderComponent',

  mixins: [FormMixin],

  data () {
    return {
      defaultAvatar: require('@/assets/images/noimage_user.svg'),
      LOCALE
    }
  },

  computed: {
    // State
    ...mapState('auth', ['userProfile']),

    userAvatar () {
      return this.userProfile && Object.keys(this.userProfile).length && this.userProfile.avatar
        ? this.userProfile.avatar : this.defaultAvatar
    }
  },

  methods: {
    capitalizeFirstLetter,
    ...mapActions('auth', ['userLogout']),

    changeLanguage (lang) {
      // If the language does not exist will do nothing
      if (!Object.values(LOCALE).includes(lang)) return

      const htmlLang = Object.keys(LOCALE).find(key => LOCALE[key] === lang)
      this.$i18n.locale = lang
      document.querySelector('html').setAttribute('lang', htmlLang)
    },

    handleLogout () {
      this.userLogout().then(res => {
        if (res) {
          this.onSuccess(this.$t('completion'), this.$t('logout_success'))
          this.$router.push({ name: 'auth.login' })
        }
      }).catch(err => err)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/helpers/_variables.scss';
@import '@/assets/scss/helpers/_mixins.scss';

#header {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  color: $white;
  background-color: $main-color;
  height: 48px;
  padding: 0 16px 0 11px;
  z-index: 2;
  @include transition(all 0.2s ease-out);

  .header-profile {
    display: flex;
    align-items: center;
    &-avatar {
      width: 30px;
      height: 30px;
      margin-right: 7px;
      border-radius: 50%;
      background-size: cover;
      background-position: 50%;
      background-color: #fffbfb;
    }
    &-name {
      font-size: 14px;
      line-height: 22px;
      padding-left: 8px;
      margin: 0 25px 0 0;
      max-width: 300px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      cursor: pointer;
    }
  }

  .header-logo {
    color: $white;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
