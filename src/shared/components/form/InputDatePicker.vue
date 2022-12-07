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
      <a-date-picker
        :show-time="showTime"
        :value="modelDate"
        :placeholder="placeholder"
        :locale="localeOptions[locale]"
        :disabled="disabled"
        :valueFormat="valueFormat"
        :format="format"
        @change="handleChange"/>
      <!-- Message Error -->
      <span v-if="errors[0]"
            class="errors"
            v-html="errors[0]" />
    </div>

  </ValidationProvider>
</template>

<script>
import moment from 'moment'
import en from 'ant-design-vue/lib/date-picker/locale/en_US'
import vi from 'ant-design-vue/lib/date-picker/locale/vi_VN'

export default {
  name: 'InputDatePickerComponent',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    vid: { type: String, default: '' },
    value: { type: String, default: '' },
    valueFormat: {type: String, default: 'YYYY-MM-DD HH:mm:ss'},
    field: { type: String, default: '' },
    label: { type: String, default: '' },
    rules: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    hiddenAsterisk: { type: Boolean, default: false },
    classContainer: { type: String, default: '' },
    format: { type: String, default: 'YYYY-MM-DD' },
    locale: { type: String, default: 'vi' },
    disabled: { type: Boolean, default: false },
    showTime: { type: Boolean, default: false }
  },

  computed: {
    modelDate () {
      return this.value ? moment(this.value) : null
    }
  },

  data () {
    return {
      localeOptions: { en, vi }
    }
  },

  methods: {
    handleChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss" scoped>
  .label {
    display: block;
    margin-bottom: 4px;
    font-weight: bold;
    color: #222222;
  }
  .ant-calendar-picker {
    width: 100%;
  }
</style>
