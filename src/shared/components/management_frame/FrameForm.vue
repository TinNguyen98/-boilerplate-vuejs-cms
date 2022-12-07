<template>
  <ValidationObserver
    ref="observer"
    tag="form"
    class="main-form">
    <div class="main-form_container pb-5">
      <div class="main-form_row d-flex flex-wrap">
        <!-- Frame name -->
        <InputText v-model="form.frame_name"
                   vid="frame_name"
                   field="management_frame.frame_name"
                   :label="$t('management_frame.frame_name')"
                   :placeholder="$t('management_frame.frame_name_placeholder')"
                   class-container="main-form_field mb-sm-2"
                   rules="required|max:100"
                   hidden-asterisk
        />

        <!-- Frame type -->
        <InputSelect v-model="form.frame_type"
                     vid="frame_type"
                     :options="FRAME_TYPE"
                     :label="$t('management_frame.frame_type')"
                     field="management_frame.frame_type"
                     class-container="main-form_field mb-sm-2"
                     rules="required"
                     disabled
                     hidden-asterisk
        />

        <!-- Frame file -->
        <InputUpload v-model="form.frame_file"
                     vid="frame_file"
                     field="management_frame.frame_file"
                     :label="$t('management_frame.frame_file')"
                     :placeholder="$t('management_frame.frame_file')"
                     class-container="main-form_field"
                     rules="required"
                     hidden-asterisk
        />
      </div>
    </div>

    <div class="main-form_controller">
      <router-link tag="button"
                   :to="{ name: 'management_frame' }"
                   class="cancel-button ant-btn"
                   v-text="$t('cancel')"/>

      <a-button type="primary"
                :loading="isSubmit"
                class="save-button"
                @click.prevent="validateBeforeSubmit"
      >
        {{ $t('save') }}
      </a-button>
    </div>
  </ValidationObserver>
</template>

<script>
// Store
import { mapActions } from 'vuex'
// Components
import InputText from '@/shared/components/form/InputText'
import InputUpload from '@/shared/components/form/InputUpload'
import InputSelect from '@/shared/components/form/InputSelect'
// Others
import FormMixin from '@/shared/mixins/form.mixin'
import { scrollToErrorPlace, handleInputProtection } from '@/shared/helpers'
import { FRAME_TYPE } from '@/enum/pages/frame.enum'

export default {
  name: 'FrameFormComponent',

  components: {
    InputText,
    InputSelect,
    InputUpload
  },

  props: {
    updateMode: { type: Boolean, default: false }
  },

  mixins: [FormMixin],

  data () {
    return {
      form: {
        frame_name: null,
        frame_type: null,
        frame_file: [],
      },
      detail: {},
      isSubmit: false,
      FRAME_TYPE
    }
  },

  mounted () {
    if (this.$props.updateMode) {
      this.detail = this.$route.meta['frame_detail']
      this.fillUpdateMode()
    } else {
      this.form.frame_type = this.$route.query['type'] || FRAME_TYPE[0].value
    }
  },

  methods: {
    ...mapActions('frame', [
      'createFrame',
      'updateFrame'
    ]),

    fillUpdateMode () {
      this.form = {
        ...this.form,
        frame_name: this.detail.name,
        frame_type: this.detail.type
      }
    },

    async validateBeforeSubmit () {
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
    handleSubmit (type) {
      if (!['create', 'update'].includes(type)) {
        return console.error('The parameter\'s path is wrong or not found. ' +
          'Expected \'create\' or \'update\', please check again parameter.')
      }

      this.isSubmit = true
      const formProtected = handleInputProtection(this.form)
      const promise = type === 'create'
        ? this.createFrame(formProtected)
        : this.updateFrame(formProtected)

      promise.then(res => {
        if (res) {
          this.isSubmit = false
          this.onSuccess(this.$t('completion'), this.$t(`${type}_message_successfully`))
          this.$router.push({ name: 'management_frame' })
        } else {
          this.onError(this.$t('fail'), this.$t(`${type}_message_fail`))
          this.isSubmit = false
        }
      }).catch(() => {})
    },
  }

}
</script>

<style lang="scss" scoped></style>
