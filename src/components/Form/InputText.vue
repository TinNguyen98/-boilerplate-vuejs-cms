<template>
  <ValidationProvider
    tag="div"
    :name="field"
    :vid="vid"
    :rules="rules + '|not_emoji'"
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

    <div :class="{'has_error': errors[0]}">
      <!-- Field -->
      <template v-if="!showPassword">
        <a-input
          :type="type"
          :disabled="disabled"
          :value="value"
          :class="classInput"
          :placeholder="placeholder"
          @input="handleType($event)"
          @focus="handleFocus"
          @keypress="type === 'number' ? preventE($event) : ''"
          :readOnly="!autofill || readonly"
        >
          <a-icon v-if="prefixIcon"
                  slot="prefix"
                  :type="prefixIcon" />
        </a-input>
      </template>

      <template v-else>
        <a-input-password
          :disabled="disabled"
          :value="value"
          :class="classInput"
          :placeholder="placeholder"
          @input="handleType($event)"
          @focus="handleFocus"
          @keypress="type === 'number' ? preventE($event) : ''"
          :readOnly="!autofill || readonly"
        >
          <a-icon v-if="prefixIcon"
                  slot="prefix"
                  :type="prefixIcon" />
        </a-input-password>
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
  name: 'InputText',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    vid: { type: String, required: true, default: '' },
    value: { type: [String, Number], required: true, default: '' },
    field: { type: String, required: true, default: '' },
    label: { type: String, default: '' },
    rules: { type: String, default: '' },
    type: { type: String, default: 'text' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    showPassword: { type: Boolean, default: false },
    prefixIcon: { type: String, default: '' },
    classInput: { type: String, default: '' },
    classContainer: { type: String, default: '' },
    readonly: { type: Boolean, default: false },
    autofill: { type: Boolean, default: true },
    maxlength: { type: [String, Number], default: '' }
  },

  methods: {
    preventE ($event) {
      if (($event.which !== 8 && $event.which !== 0) &&
        ($event.which < 48 || $event.which > 57)) {
        $event.preventDefault()
      }
    },

    handleType ($event) {
      this.$emit('change', $event.target.value)
    },

    handleFocus ($event) {
      if (!this.autofill) {
        $event.target.removeAttribute('readonly')
      }
    }
  }
}
</script>
