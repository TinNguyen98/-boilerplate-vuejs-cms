<template>
  <ValidationObserver ref="observer"
                      tag="form"
                      class="main-form event-page"
                      @submit.prevent="validateBeforeSubmit">
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
                         rules="required_choose"
                         hidden-asterisk
        />

        <!-- Background music -->
        <InputUpload v-model="form.background_music"
                     vid="background_music"
                     field="management_event.background_music"
                     :label="$t('management_event.background_music')"
                     :placeholder="$t('management_event.background_music_placeholder')"
                     acceptable-file-types=".mp3"
                     class-container="main-form_field"
                     rules="required_file"
                     hidden-asterisk
                     is-audio
                     is-preview
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
                     rules="required_choose"
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
                     rules="required_multi_choose"
                     multiple
                     hidden-asterisk
        />

        <!-- Collection -->
        <InputSelect v-model="form.collection"
                     vid="collection"
                     :options="collectionOption"
                     :label="$t('collection')"
                     field="collection"
                     :placeholder="$t('please_select')"
                     class-container="main-form_field mb-sm-2"
                     rules="required_multi_choose"
                     multiple
                     hidden-asterisk
        />
      </div>

      <div v-if="updateMode" class="block-field">
        <label v-text="$t('management_event.priority_event')"/>

        <div class="checkbox-animated" @click.prevent="changePriority">
          <a-checkbox class="checkbox-animated_checkbox"
                      :class="{ 'checked': isPriority }"
                      :disabled="recordDetail.status === 'upcoming'"
                      v-model="isPriority"/>
          <span class="checkbox-animated_desc"
                :class="{ 'turn-on': isPriority }"
                v-text="$t(`management_event.${isPriority ? 'open' : 'close'}_priority`)"/>
        </div>
      </div>
    </div>

    <div class="main-form_controller">
      <router-link tag="button"
                   :to="{ name: 'management_event' }"
                   class="cancel-button ant-btn"
                   v-text="$t('cancel')"/>

      <a-button type="primary"
                html-type="submit"
                :loading="isSubmit"
                class="save-button"
      >
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
import InputDatePicker from '@/shared/components/form/InputDatePicker'
import InputUpload from '@/shared/components/form/InputUpload'
import InputSelect from '@/shared/components/form/InputSelect'
// Others
import moment from 'moment'
import FormMixin from '@/shared/mixins/form.mixin'
import {
  verifyArgument,
  scrollToErrorPlace,
  handleInputProtection,
  handleRequestErrorMessage
} from '@/shared/helpers'
import { FORMAT_DATE } from '@/enums/pages/event.enum'

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
      recordDetail: {},
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
      collectionOption: [],
      isSubmit: false,
      isPriority: false,
      FORMAT_DATE
    }
  },

  mounted () {
    if (this.$props.updateMode) {
      this.recordDetail = this.detail
      this.fillUpdateMode()
    }

    this.effectMovieOption = this.fillOptionsByType('effect_movie')
    this.backgroundOption = this.fillOptionsByType('background')
    this.collectionOption = this.fillOptionsByType('collection')
  },

  computed: {
    ...mapState('event', ['detail']),
    ...mapState('frame', { frameList: 'list' }),
    ...mapState('collection', { collectionList: 'list' })
  },

  methods: {
    ...mapActions('event', [
      'createEvent',
      'updateEvent'
    ]),

    fillUpdateMode () {
      this.form = {
        ...this.form,
        id: this.recordDetail.id,
        name: this.recordDetail.name,
        time_start: moment(this.recordDetail.time_start).format(FORMAT_DATE),
        background_music: {
          old_file: true,
          name: this.recordDetail.background_music_name,
          path: this.recordDetail.background_music
        },
        effect_movie_id: this.recordDetail.effect_movie.id,
        background_frame: this.recordDetail.background_frames.length
          ? this.recordDetail.background_frames.map(i => i.id)
          : [],
        collections: this.recordDetail.collections.length
          ? this.recordDetail.collections.map(i => i.id)
          : []
      }

      // true: 1, false: 0
      this.isPriority = this.recordDetail.is_priority === 1
    },

    /**
     * @param type {string} ['effect_movie', 'background', 'collection']
     */
    fillOptionsByType (type) {
      verifyArgument(['effect_movie', 'background', 'collection'], type)
      const listDependent = type === 'collection'
        ? this.collectionList
        : this.frameList

      return listDependent.reduce((arr, item) => {
        if (item.type === type || type === 'collection') {
          arr.push({
            id: item.id,
            name: item.name,
            value: item.id
          })
        }
        return arr
      }, [])
    },

    changePriority () {
      // Block action for upcoming event
      if (this.recordDetail.status === 'upcoming') return

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
      verifyArgument(['create', 'update'], type)

      this.isSubmit = true
      let formProtected = handleInputProtection(this.form)

      if (type === 'update') {
        // Verify background_music unchanged
        if (formProtected.background_music.old_file) {
          delete formProtected.background_music
        }
        formProtected = {
          ...formProtected,
          is_priority: this.isPriority ? 1 : 0 // true: 1, false: 0
        }
      }

      const promise = type === 'create'
        ? this.createEvent(formProtected)
        : this.updateEvent(formProtected)

      promise.then(res => {
        if (res.success) {
          this.isSubmit = false
          this.onSuccess(this.$t('completion'), this.$t(`${type}_message_successfully`))
          this.$router.push({ name: 'management_event' })
        } else {
          this.isSubmit = false
          handleRequestErrorMessage(res, `${type}_message_fail`)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.event-page {
  .main-form_container {
    max-height: calc(100vh - 220.89px);
    overflow: auto;
  }
}
</style>
