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
      <template v-if="modeGroup && (options.length || Object.keys(options).length)">
        <a-radio-group
          :value="value"
          :class="classInput"
          @change="handleChange"
          @focus="handleFocus"
          :readOnly="!autofill || readonly"
        >
          <template v-for="(option, index) in options">
            <a-radio
              :key="index"
              :value="option.id"
            >
              {{ option.name }}
            </a-radio>
          </template>
        </a-radio-group>
      </template>

      <template v-else>
        <a-radio
          :disabled="disabled"
          :value="value"
          :class="classInput"
          @change="handleChange"
          @focus="handleFocus"
          :readOnly="!autofill || readonly"
        >
          {{ nameLabel }}
        </a-radio>
      </template>
      <!-- Message Error -->
      <span v-if="errors[0]"
            class="errors"
            v-html="errors[0]" />
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputRadio',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    vid: { type: String, required: true, default: '' },
    value: { type: [Boolean, String], required: true, default: false },
    options: { type: [Array, Object], default: () => [] },
    field: { type: String, required: true, default: '' },
    label: { type: String, default: '' },
    nameLabel: { type: String, default: '' },
    rules: { type: String, default: '' },
    modeGroup: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    classInput: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
    autofill: { type: Boolean, default: true }
  },

  methods: {
    handleChange ($event) {
      if (this.modeGroup) {
        this.$emit('change', $event.target.value)
      } else {
        this.$emit('change', $event.target.checked)
      }
    },

    handleFocus ($event) {
      if (!this.autofill) {
        $event.target.removeAttribute('readonly')
      }
    }
  }
}
</script>
