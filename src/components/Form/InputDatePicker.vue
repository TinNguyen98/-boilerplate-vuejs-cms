<template>
  <ValidationProvider
    tag="div"
    :name="field"
    :vid="vid"
    :rules="rules"
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

    <div :class="{'has_error': errors[0]}">
      <!-- Field -->
      <a-date-picker
        :value="value"
        :placeholder="placeholder"
        :format="format"
        :inputReadOnly="readonly"
        :locale="localeOptions[locale]"
        :disabled="disabled"
        :disabled-date="disabledToCurrentDate || disabledDateConditions
                        ? (disabledToCurrentDate ? disabledCurrentDate : disabledBasedOnCondition)
                        : null"
        @change="handleChange" />
      <!-- Message Error -->
      <span v-if="errors[0]"
            class="errors"
            v-html="errors[0]" />
    </div>

  </ValidationProvider>
</template>

<script>
import en from 'ant-design-vue/lib/date-picker/locale/en_US'
import ja from 'ant-design-vue/lib/date-picker/locale/ja_JP'
import moment from 'moment'

export default {
  name: 'InputDatePicker',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    vid: { type: String, required: true, default: '' },
    value: { type: [String, Object], required: true, default: () => {} },
    field: { type: String, required: true, default: '' },
    label: { type: String, default: '' },
    rules: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    format: { type: String, default: 'YYYY-MM-DD' },
    locale: { type: String, default: 'en' },
    disabled: { type: Boolean, default: false },
    // Addition condition for date
    // Rule - only string: date from wanna disable (probably now) | date to wanna hidden (probably now)
    disabledDateConditions: { type: String, default: '' },
    disabledToCurrentDate: { type: Boolean, default: false },
    readonly: { type: Boolean, default: false }
  },

  data () {
    return {
      localeOptions: {
        en,
        ja
      }
    }
  },

  methods: {
    /**
     * Check hidden date based on param condition
     * Params 'inclusivity' of isBetween
     *  '()' => default exclusive
     *  '(]' => right inclusive
     *  '[)' => left inclusive
     *  '[]' => all inclusive
     *
     * @param current
     * @return {Boolean}
     */
    disabledBasedOnCondition (current) {
      let date = this.disabledDateConditions
      // Replace character now to date
      if (this.disabledDateConditions.includes('now')) {
        date = this.disabledDateConditions.replaceAll('now', moment().format(this.format))
      }

      const date_from = date.split('|')[0]
      const date_to = date.split('|')[1]
      // In the case date-(from, to) wrong transmission
      if (moment(date_from).isAfter(date_to, 'days')) {
        console.warn(this.$t('parameter_wrong'))
        return false
      }
      // In the case two character now
      if (date_from === date_to) {
        return current.isSame(date_from, 'days')
      } else {
        return current && current.isBetween(date_from, date_to, 'days', '[]')
      }
    },

    disabledCurrentDate (current) {
      // Can not select days before today and today
      return current && current < moment().endOf('day')
    },

    handleChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss" scoped></style>
