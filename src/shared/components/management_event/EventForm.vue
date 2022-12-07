<template>
  <ValidationObserver
    ref="observer"
    tag="form"
    class="main-form">
    <div class="main-form_container pb-4">
      <div class="main-form_row d-flex flex-wrap">
        <!-- Event name -->
        <InputText v-model="form.event_name"
                   vid="event_name"
                   field="management_event.event_name"
                   :label="$t('management_event.event_name')"
                   :placeholder="$t('management_event.event_name_placeholder')"
                   class-container="main-form_field mb-sm-2"
                   rules="required|max:100"
                   hidden-asterisk
        />

        <!-- Start time -->
        <InputDatePicker v-model="form.start_time"
                         vid="start_time"
                         field="management_event.start_time"
                         :label="$t('management_event.start_time')"
                         :format="FORMAT_DATE"
                         :value-format="FORMAT_DATE"
                         :placeholder="$t('management_event.start_time_placeholder')"
                         class-container="main-form_field mb-sm-2"
                         rules="required"
                         hidden-asterisk
        />

        <!-- Background music -->
        <InputUpload v-model="form.background_music"
                     vid="background_music"
                     field="management_event.background_music"
                     :label="$t('management_event.background_music')"
                     :placeholder="$t('management_event.background_music_placeholder')"
                     acceptable-file-types=".mp3,audio/*"
                     class-container="main-form_field"
                     rules="required"
                     hidden-asterisk
        />
      </div>

      <div class="main-form_row d-flex flex-wrap pb-5">
        <!-- Effect movie frame -->
        <InputSelect v-model="form.effect_movie_frame"
                     vid="effect_movie_frame"
                     :options="effectMovieOption"
                     :label="$t('management_event.effect_movie_frame')"
                     field="management_event.effect_movie_frame"
                     :placeholder="$t('please_select')"
                     class-container="main-form_field mb-sm-2"
                     rules="required"
                     hidden-asterisk
        />

        <!-- Background frame -->
        <InputSelect v-model="form.background_frame"
                     vid="background_frame"
                     :options="backgroundOption"
                     :label="$t('management_event.background_frame')"
                     field="management_event.background_frame"
                     :placeholder="$t('please_select')"
                     class-container="main-form_field mb-sm-2"
                     rules="required"
                     multiple
                     hidden-asterisk
        />

        <!-- Collection -->
        <InputSelect v-model="form.collection"
                     vid="collection"
                     :options="backgroundOption"
                     :label="$t('collection')"
                     field="collection"
                     :placeholder="$t('please_select')"
                     class-container="main-form_field mb-sm-2"
                     rules="required"
                     multiple
                     hidden-asterisk
        />
      </div>

      <div v-if="updateMode" class="block-field">
        <label v-text="$t('management_event.priority_event')"/>

        <div class="checkbox-animated" @click.prevent="changePriority">
          <a-checkbox class="checkbox-animated_checkbox"
                      :class="{ 'checked': isPriority }"
                      v-model="isPriority"/>
          <span class="checkbox-animated_desc"
                :class="{ 'turn-on': isPriority }"
                v-text="$t(`management_event.${isPriority ? 'close' : 'open'}_priority`)"/>
        </div>
      </div>
    </div>

    <div class="main-form_controller">
      <router-link tag="button"
                   :to="{ name: 'management_event' }"
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
import InputDatePicker from '@/shared/components/form/InputDatePicker'
import InputUpload from '@/shared/components/form/InputUpload'
import InputSelect from '@/shared/components/form/InputSelect'
// Others
import FormMixin from '@/shared/mixins/form.mixin'
import { scrollToErrorPlace, handleInputProtection } from '@/shared/helpers'
import { FORMAT_DATE } from '@/enum/pages/event.enum'

export default {
  name: 'EventFormComponent',

  components: {
    InputText,
    InputUpload,
    InputSelect,
    InputDatePicker
  },

  props: {
    updateMode: { type: Boolean, default: false }
  },

  mixins: [FormMixin],

  data () {
    return {
      form: {
        event_name: null,
        start_time: null,
        background_music: null,
        effect_movie_frame: [],
        background_frame: [],
        collection: []
      },
      detail: {},
      effectMovieOption: [
        {
          id: 0,
          name: 'Ông già noel cưỡi tuần lộc',
          value: 'ong-gia-noel-cuoi-tuan-loc'
        },
        {
          id: 1,
          name: 'Cây thông có tuyết rơi',
          value: 'cay-thong-co-tuyet-roi'
        },
        {
          id: 2,
          name: 'Hoa đoà rơi lá',
          value: 'hoa-doa-roi-la'
        }
      ],
      backgroundOption: [
        {
          id: 0,
          name: 'Chirstmas nền đỏ',
          value: 'chirstmas-nen-do'
        },
        {
          id: 1,
          name: 'Con mèo kêu gâu gâu',
          value: 'Con-meo-keu-gau-gau'
        },
        {
          id: 2,
          name: 'Chirstmas nền xanh',
          value: 'chirstmas-nen-xanh'
        }
      ],
      isSubmit: false,
      isPriority: false,
      FORMAT_DATE
    }
  },

  mounted () {
    if (this.$props.updateMode) {
      this.detail = this.$route.meta['event_detail']
      this.fillUpdateMode()
    }
  },

  methods: {
    ...mapActions('event', [
      'createEvent',
      'updateEvent'
    ]),

    fillUpdateMode () {
      this.form = {
        ...this.form,
        event_name: this.detail.name,
        start_time: this.detail.start_time,
      }
    },

    changePriority () {
       if (!this.isPriority) {
        this.$confirm({
          title: this.$t('management_event.priority_event_content'),
          content: this.$t('management_event.priority_event_desc'),
          cancelText: this.$t('popcomfirm_cancel_btn'),
          okText: this.$t('popcomfirm_accept_btn'),
          onOk: () => { this.isPriority = true }
        })
       } else {
         this.isPriority = false
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
      let formProtected = handleInputProtection(this.form)
      const promise = type === 'create'
        ? this.createEvent(formProtected)
        : this.updateEvent(formProtected)

      if (type === 'update') {
        formProtected = {
          ...formProtected,
          is_priority: this.isPriority
        }
      }

      promise.then(res => {
        if (res) {
          this.isSubmit = false
          this.onSuccess(this.$t('completion'), this.$t(`${type}_message_successfully`))
          this.$router.push({ name: 'management_event' })
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
