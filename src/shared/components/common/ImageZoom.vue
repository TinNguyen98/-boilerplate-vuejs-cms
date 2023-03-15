<template>
  <div class="w-100">
    <img
      :class="[src ? 'cursor-pointer' : null, classImage]"
      :src="src || fallBack"
      :alt="alt"
      loading="lazy"
      @load="onLoaded"
      @click.prevent="src ? onClickZoom() : null" />

    <a-modal
      v-model="visible"
      :footer="null"
      class="modal-image-zoom">
      <img
        class="w-100"
        :src="src"
        :alt="alt" />
    </a-modal>
  </div>
</template>

<script>
export default {
  name: 'ImageZoom',

  props: {
    src: { type: String, required: true, default: '' },
    alt: { type: String, default: 'vue2-cms-image' },
    classImage: { type: String, default: null },
    fallBack: {
      type: String,
      default: require('@/assets/images/noimage_bg.png'),
    },
  },

  data() {
    return {
      visible: false,
    }
  },

  methods: {
    onClickZoom() {
      this.visible = true
    },

    onLoaded($event) {
      const { path } = $event
      if (path) {
        const loaded = path[0].complete && path[0].naturalHeight !== 0
        this.$emit('update:allLoaded', loaded)
      }
    },
  },
}
</script>
