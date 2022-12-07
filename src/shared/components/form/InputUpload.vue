<template>
  <ValidationProvider
    tag="div"
    :name="field"
    :vid="vid"
    :rules="rules"
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

    <div :class="{ 'has_error': errors[0] }">
      <!-- Field -->
      <a-upload
        :file-list="valueModel"
        :disabled="disabled || isUploading"
        :multiple="multiple"
        :accept="acceptableFileTypes"
        @change="handleChange"
      >
        <a-button :loading="isUploading">
          {{ placeholder }}
          <a-icon type="upload"/>
        </a-button>
      </a-upload>

      <!-- Message Error -->
      <span v-if="errors[0]"
            class="errors"
            v-html="errors[0]" />
    </div>
  </ValidationProvider>
</template>

<script>
// Store
import { mapActions } from 'vuex'

export default {
  name: 'InputUploadComponent',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    vid: { type: String, default: '' },
    value: { type: [File, Array], default: () => [] },
    field: { type: String, default: '' },
    label: { type: String, default: '' },
    rules: { type: String, default: '' },
    acceptableFileTypes: { type: String, default: 'image/png,image/jpeg,image/jpg' },
    placeholder: { type: String, default: '' },
    hiddenAsterisk: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    limitForMultiple: { type: [String, Number], default: 0 },
    disabled: { type: Boolean, default: false },
    classContainer: { type: String, default: '' }
  },

  data () {
    return {
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
    }
  },

  methods: {
    ...mapActions('upload', [
      'postFile'
    ]),

    handleChange (info) {
      let resFileList = [...info.fileList]
      const formData = new FormData()
      const { multiple, limitForMultiple } = this.$props

      this.isUploading = true
      resFileList.forEach((file) => {
        formData.append('files[]', file)
      })

      // Limit the number of uploaded files
      // Only to show two recent uploaded files, and old ones will be replaced by the new
      if (multiple) {
        resFileList = resFileList.slice(-Math.abs(limitForMultiple))
      }

      // Receive response and show file link
      resFileList = resFileList.map(file => {
        if (file.response) {
          file.url = file.response.url
        }
        return file
      })

      this.valueModel = resFileList
      // this.onPostFile(resFileList)
    },

    onPostFile (formData) {
      this.postFile(formData).then(res => {
        if (res) {
          this.isUploading = false
          this.onSuccess(this.$t('completion'), this.$t('upload_message_successfully'))
        } else {
          this.onError(this.$t('fail'), this.$t('upload_message_fail'))
          this.isUploading = false
        }
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/helpers/_variables.scss';

.label {
  margin-bottom: 4px;
  font-weight: bold;
  color: $text-color;
}
</style>
