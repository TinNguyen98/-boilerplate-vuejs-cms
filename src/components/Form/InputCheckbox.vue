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

    <div :class="{ 'has_error': errors[0] }">
      <a-checkbox
        :disabled="disabled"
        :value="value"
        :class="classInput"
        :readOnly="!autofill || readonly"
        @change="handleChange"
        @focus="handleFocus"
      >
        {{ nameLabel }}
      </a-checkbox>
      <!-- Message Error -->
      <span v-if="errors[0]"
            class="errors"
            v-html="errors[0]" />
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputCheckbox',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    vid: { type: String, required: true, default: '' },
    value: { type: [Boolean, String], required: true, default: false },
    field: { type: String, required: true, default: '' },
    label: { type: String, default: '' },
    nameLabel: { type: String, default: '' },
    rules: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    classInput: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
    autofill: { type: Boolean, default: true }
  },

  methods: {
    handleChange ($event) {
      this.$emit('change', $event.target.checked)
    },

    handleFocus ($event) {
      if (!this.autofill) {
        $event.target.removeAttribute('readonly')
      }
    }
  }
}
</script>
