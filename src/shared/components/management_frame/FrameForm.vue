<template>
  <ValidationObserver
    ref="observer"
    tag="form"
    class="main-form frame-page"
    @submit.prevent="validateBeforeSubmit">
    <div class="main-form_container pb-5">
      <div class="main-form_row d-flex flex-wrap">
        <!-- Frame name -->
        <InputText
          v-model="form.name"
          vid="frame_name"
          field="management_frame.frame_name"
          :label="$t('management_frame.frame_name')"
          :placeholder="$t('management_frame.frame_name_placeholder')"
          class-container="main-form_field mb-sm-2"
          rules="required|max:100"
          hidden-asterisk />

        <!-- Frame type -->
        <InputSelect
          v-model="form.type"
          vid="frame_type"
          :options="FRAME_TYPE"
          :label="$t('management_frame.frame_type')"
          field="management_frame.frame_type"
          class-container="main-form_field mb-sm-2"
          rules="required_choose"
          :show-arrow="false"
          disabled
          hidden-asterisk />

        <!-- Frame file -->
        <InputUpload
          v-model="form.frame_file"
          vid="frame_file"
          field="management_frame.frame_file"
          :label="$t('management_frame.frame_file')"
          :placeholder="$t('management_frame.frame_file')"
          acceptable-file-types=".png"
          class-container="main-form_field"
          rules="required_file"
          hidden-asterisk
          is-preview />
      </div>
    </div>

    <div class="main-form_controller">
      <router-link
        tag="button"
        :to="{ name: 'management_frame' }"
        class="cancel-button ant-btn"
        v-text="$t('cancel')" />

      <a-button
        type="primary"
        html-type="submit"
        :loading="isSubmit"
        class="save-button">
        {{ $t('save') }}
      </a-button>
    </div>
  </ValidationObserver>
</template>

<script>
// Store
import { mapState, mapActions } from 'vuex'
// Components
import InputText from '@/shared/components/form/InputText'
import InputUpload from '@/shared/components/form/InputUpload'
import InputSelect from '@/shared/components/form/InputSelect'
// Others
import FormMixin from '@/shared/mixins/form.mixin'
import {
  verifyArgument,
  scrollToErrorPlace,
  handleInputProtection,
  handleRequestErrorMessage,
} from '@/shared/helpers'
import { FRAME_TYPE } from '@/enums/pages/frame.enum'

export default {
  name: 'FrameForm',

  components: {
    InputText,
    InputSelect,
    InputUpload,
  },

  props: {
    updateMode: { type: Boolean, default: false },
  },

  mixins: [FormMixin],

  data() {
    return {
      form: {
        name: null,
        type: null,
        frame_file: null,
      },
      recordDetail: {},
      isSubmit: false,
      FRAME_TYPE,
    }
  },

  mounted() {
    if (this.$props.updateMode) {
      this.recordDetail = this.detail
      this.form = {
        ...this.recordDetail,
        frame_file: {
          old_file: true,
          name: this.recordDetail.frame_name,
          path: this.recordDetail.frame_image,
        },
      }
    } else {
      this.form.type = this.$route.query['type'] || FRAME_TYPE[0].value
    }
  },

  computed: {
    ...mapState('frame', ['detail']),
  },

  methods: {
    ...mapActions('frame', ['createFrame', 'updateFrame']),

    async validateBeforeSubmit() {
      const isValid = await this.$refs.observer.validate()

      if (isValid) {
        this.handleSubmit(this.$props.updateMode ? 'update' : 'create')
      } else {
        scrollToErrorPlace(this.$refs.observer)
      }
    },

    /**
     * @param type {string} ['create', 'update']
     */
    handleSubmit(type) {
      verifyArgument(['create', 'update'], type)

      this.isSubmit = true
      const formProtected = handleInputProtection(this.form)

      if (type === 'update') {
        // Verify file_frame unchanged
        if (formProtected.frame_file.old_file) {
          delete formProtected.frame_file
        }
      }

      const promise =
        type === 'create' ? this.createFrame(formProtected) : this.updateFrame(formProtected)

      promise.then((res) => {
        if (res) {
          this.isSubmit = false
          this.onSuccess(this.$t('completion'), this.$t(`${type}_message_successfully`))
          this.$router.push({ name: 'management_frame' })
        } else {
          this.isSubmit = false
          handleRequestErrorMessage(res, `${type}_message_fail`)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.frame-page {
  .main-form_container {
    max-height: calc(100vh - 220.89px);
    overflow: auto;
  }
}
</style>
