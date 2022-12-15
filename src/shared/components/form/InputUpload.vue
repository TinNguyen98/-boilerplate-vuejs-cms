<template>
  <ValidationProvider
    ref="upload"
    tag="div"
    :name="field"
    :vid="vid"
    :rules="!valueModel ? rules : null"
    :class="classContainer"
    v-slot="{ errors }">
    <!-- Label -->
    <label
      v-if="label"
      class="label"
      :class="{ 'font-weight-normal': hiddenAsterisk }"
    >
      {{ label }}
      <span
        v-if="rules.includes('required') && !hiddenAsterisk"
        class="required"
        v-text="'*'"
      />
    </label>

    <div class="position-relative d-flex"
         :class="[
            errors[0] ? 'has_error' : null,
            previewAlign === 'bottom' ? 'flex-column' : null
         ]"
    >
      <div class="flex-shrink-0 w-100"
           :class="[previewAlign === 'bottom' ? 'mb-2' : 'mr-2']"
      >
        <!-- Field -->
        <label :for="`${vid}_upload`"
               :title="inputName"
               :class="{ 'ant-btn-loading': isUploading }"
               class="file-button ant-btn">
          <a-icon v-if="isUploading" type="loading"/>
          <span class="text-ellipsis pr-2" v-text="inputName"/>

          <a-icon v-if="!valueModel" type="upload"
                  class="flex-shrink-0"/>
          <a-icon v-else
                  type="delete"
                  class="flex-shrink-0"
                  @click.prevent="deleteFile"/>
        </label>

        <input type="file"
               :id="`${vid}_upload`"
               :disabled="valueModel || isUploading"
               :accept="acceptableFileTypes"
               class="file-input"
               @change="handleChange"
        >

        <!-- Message Error -->
        <span v-if="errors[0]"
              class="errors"
              v-html="errors[0]" />
      </div>

      <!-- Preview image -->
      <figure v-if="isPreview && previewSrc" class="preview-image">
        <image-zoom :src="previewSrc" alt="aeon_preview_image" />
      </figure>
    </div>
  </ValidationProvider>
</template>

<script>
// Components
import ImageZoom from '@/shared/components/common/ImageZoom'
// Others
import { checkImageSizeByMb, toBase64 } from '@/shared/helpers'

export default {
  name: 'InputUploadComponent',

  components: {
    ImageZoom
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    vid: { type: String, default: '' },
    value: { type: [File, String], default: '' },
    field: { type: String, default: '' },
    label: { type: String, default: '' },
    rules: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    classContainer: { type: String, default: '' },
    acceptableFileTypes: { type: String, default: 'image/png,image/jpeg,image/jpg' },
    sizeLimit: { type: [String, Number], default: 150 }, // unit MB
    isPreview: { type: Boolean, default: false },
    previewAlign: { type: String, default: 'bottom' }, // right, bottom
    hiddenAsterisk: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },

  data () {
    return {
      previewSrc: null,
      isUploading: false
    }
  },

  computed: {
    valueModel: {
      get () {
        return this.$props.value
      },
      set (newVal) {
        this.$emit('change', newVal)
      }
    },

    inputName () {
      if (!this.valueModel) return this.$props.placeholder

      if (typeof this.valueModel === 'object') {
        return this.valueModel.name
      }
      return this.valueModel
    }
  },

  methods: {
    deleteFile () {
      this.valueModel = ''
      this.previewSrc = null
    },

    async handleChange (event) {
      const files = event.target.files || event.dataTransfer.files
      // If the file isn't an image nothing happens
      // Check size image before send server
      if (!files.length || checkImageSizeByMb(files[0], this.$props.sizeLimit)) return

      this.isUploading = true
      this.valueModel = files[0]
      this.previewSrc = await toBase64(files[0])

      this.isUploading = false
      this.$refs.upload.reset()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/helpers/_mixins.scss';
@import '@/assets/scss/helpers/_variables.scss';

.label {
  margin-bottom: 4px;
  font-weight: bold;
  color: $text-color;
}

.file-button {
  position: relative;
  @include flex();
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0;
  color: $text-weak-black-color;

  .anticon {
    margin: 0;
  }

  .anticon-delete {
    pointer-events: auto;
    transition: color 0.3s ease;
    &:hover {
      color: $text-light-black-color;
    }
  }
}

.file-input {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
}

.preview-image {
  margin: 0 auto;
  max-width: 80%;

  img {
    width: 100%;
  }
}
</style>
