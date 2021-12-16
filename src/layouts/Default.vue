<template>
  <div class="page">
    <header-components/>

    <main-components/>

    <footer-components/>
  </div>
</template>

<script>
import HeaderComponents from '@/components/Header'
import MainComponents from '@/components/Main'
import FooterComponents from '@/components/Footer'

export default {
  name: 'Default',

  components: {
    HeaderComponents,
    MainComponents,
    FooterComponents
  }
}
</script>
