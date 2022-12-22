<template>
  <ValidationProvider tag="div"
                      :name="field"
                      :vid="vid"
                      :rules="rules"
                      :class="classContainer"
                      v-slot="{ errors }">
    <!-- Label -->
    <label v-if="label"
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
        :disabledDate="handleDisabledDate"
        :valueFormat="valueFormat"
        :format="format"
        @change="handleChange"/>

      <!-- Message Error -->
      <span v-if="errors[0]" class="errors" v-html="errors[0]"/>
    </div>

  </ValidationProvider>
</template>

<script>
// Core
import moment from 'moment'
import english from 'ant-design-vue/lib/date-picker/locale/en_US'
import vietnamese from 'ant-design-vue/lib/date-picker/locale/vi_VN'
// Helpers
import { verifyArgument } from '@/shared/helpers'

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
    locale: { type: String, default: 'vietnamese' },
    disabled: { type: Boolean, default: false },
    // before_today, today, after_today, before_and_today, after_and_today
    disabledDate: { type: String, default: '' },
    showTime: { type: Boolean, default: false }
  },

  computed: {
    modelDate () {
      return this.value ? moment(this.value) : null
    }
  },

  data () {
    return {
      localeOptions: { english, vietnamese }
    }
  },

  methods: {
    handleChange (value) {
      this.$emit('change', value)
    },

    handleDisabledDate (current) {
      if (!this.$props.disabledDate) return false
      verifyArgument([
        'before_today', 'today',
        'after_today', 'before_and_today',
        'after_and_today'],
        this.$props.disabledDate
      )

      let result = false
      switch (this.$props.disabledDate) {
        case 'before_today':
          result = moment().isAfter(current, 'day')
          break
        case 'today':
          result = moment().isSame(moment(current), 'day')
          break
        case 'after_today':
          result = moment().isBefore(moment(current), 'day')
          break
        case 'before_and_today':
          result = moment().isSameOrAfter(current, 'day')
          break
        case 'after_and_today':
          result = moment().isSameOrBefore(moment(current), 'day')
          break
      }

      return result
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
