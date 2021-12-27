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
    >
      {{ label }}
      <span
        v-if="rules.includes('required')"
        class="required"
        v-text="'*'"
      />
    </label>

    <div :class="{ 'has_error': errors[0] }">
      <vue-editor
        :id="'editor_of_' + vid"
        v-model="content"
        class="editor"
        :class="[
         { 'editor-ja': $i18n.locale === 'japanese' },
         classInput
        ]"
        :editor-toolbar="customToolbar.length && customToolbar || EDITOR_TOOLBAR"
        :placeholder="placeholder || $t('editor_placeholder')"
        :disabled="disabled"
        :use-custom-image-handler="useCustomImageHandler"
        @image-added="uploadImageOfEditor"
      />
      <!-- Message Error -->
      <span v-if="errors[0]"
            class="errors"
            v-html="errors[0]" />
    </div>
  </ValidationProvider>
</template>

<script>
import { EDITOR_TOOLBAR } from '@/enum/editor-toolbar.enum'
import { VueEditor } from 'vue2-editor'
import { checkImageSizeByMb, toBase64 } from '@/utils/helper'

export default {
  name: 'InputEditor',

  model: {
    prop: 'value',
    event: 'change'
  },

  components: {
    VueEditor
  },

  props: {
    vid: { type: String, required: true, default: '' },
    value: { type: [String, Number], required: true, default: '' },
    field: { type: String, required: true, default: '' },
    customToolbar: { type: [Array, Object], default: () => [] },
    label: { type: String, default: '' },
    rules: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    classInput: { type: String, default: '' },
    classContainer: { type: String, default: '' },
    // Active when useCustomImageHandler is true
    limitImageSize: { type: [String, Number], default: 5 },
    // Active when useCustomImageHandler is true, default allow all image type
    rulesTypeImage: { type: String, default: '' },
    useCustomImageHandler: { type: Boolean, default: false }
  },

  data () {
    return {
      EDITOR_TOOLBAR
    }
  },

  computed: {
    content: {
      get () {
        return this.$props.value
      },
      set (value) {
        this.$emit('change', value)
      }
    }
  },

  methods: {
    /**
     * Get image of editor upto '...something' and return UI
     *
     * @param file
     * @param Editor
     * @param cursorLocation
     * @param resetUploader
     */
    async uploadImageOfEditor (file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData()
      const { limitImageSize, useCustomImageHandler, rulesTypeImage } = this.$props

      // Check size image before send server
      if (checkImageSizeByMb(file, limitImageSize) || !useCustomImageHandler) {
        return
      }

      const dataBase64 = await toBase64(file)
      formData.append('data', dataBase64)
      formData.append('file_name', file.name.split('.')[0] || '')

      formData.append('from_editor', 'true')

      if (file instanceof File) {
        try {
          // const { data } = await ...call to module api
          const data = ''
          const url = data[0].url

          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
        } catch (error) {
          switch (error.response.status) {
            case 500:
            case 403:
              alert(this.$t('upload_image_error'))
              break
            case 413:
              alert(this.$t('limit_size', { size: limitImageSize }))
              break
          }

          if (error.response.status === 422) {
            const errData = error.response.data.error
            // Take message error in field form
            switch (errData.code) {
              case 'Maximum upload file is 5Mb.':
                alert(this.$t('limit_size', { size: limitImageSize }))
                break
              case 'File mime not allowed.':
                alert(this.$t('rules_type_image', { type: rulesTypeImage }))
                break
              default:
                alert(this.$t('upload_image_error'))
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.editor {
  .ql-toolbar.ql-snow .ql-formats {
    margin-right: 10px;
  }

  &.editor-ja {
    .ql-snow .ql-tooltip[data-mode=link]::before {
      content: "URLを入力"; // default text "Enter link:"
    }

    .ql-snow .ql-tooltip[data-mode=video]::before {
      content: "YouTube URL"; // default text "Enter video:"
    }

    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
      content: '挿入する'; // default text "Save"
    }
  }
}
</style>
