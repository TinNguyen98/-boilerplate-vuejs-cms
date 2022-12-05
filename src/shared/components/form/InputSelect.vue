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
      <!-- Field -->
      <a-select
        :value="value || value == '0' ? value : undefined"
        :placeholder="placeholder"
        :disabled="disabled"
        @change="handleChange"
      >
        <template v-for="(option, index) in options">
          <a-select-option
            :key="index"
            :value="option.value"
          >
            {{ option.name }}
          </a-select-option>
        </template>
      </a-select>
      <!-- Message Error -->
      <span v-if="errors[0]"
            class="errors"
            v-html="errors[0]" />
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'InputSelectComponent',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    vid: { type: String, default: '' },
    value: { type: [String, Number, Array], default: '' },
    options: { type: [Array, Object], default: () => [] },
    field: { type: String, default: '' },
    label: { type: String, default: '' },
    rules: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    disabled: { type: Boolean, default: false }
  },

  methods: {
    handleChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss">
  .label {
    margin-bottom: 4px;
    font-weight: bold;
    color: #222222;
  }
  .ant-select {
    width: 100%;
    .ant-select-selection--multiple {
      .ant-select-selection__choice__remove {
        bottom: 10%
      }
    }
  }
</style>
