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
      <a-select
        :value="value ? value : undefined"
        :mode="mode"
        :disabled="disabledSelect"
        :placeholder="placeholder"
        :class="classSelect"
        @change="handleChange"
      >
        <template v-for="(option, index) in options">
          <a-select-option
            v-if="!(conditionsOption.hidden &&
                    (conditionsOption.param === option.id ||
                    conditionsOption.param === option.name.toLowerCase()))"
            :key="index"
            :disabled="disabledOption === +(option.id) || disabledOption === option.name"
            :value="option.id">
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
  name: 'InputSelect',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    vid: { type: String, required: true, default: '' },
    value: { type: [String, Array], required: true, default: '' },
    options: { type: [Array, Object], required: true, default: () => [] },
    field: { type: String, required: true, default: '' },
    label: { type: String, default: '' },
    rules: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    classSelect: { type: String, default: '' },
    // All types: default, multiple, tags
    mode: { type: String, default: 'default' },
    disabledSelect: { type: Boolean, default: false },
    disabledOption: { type: [String, Number], default: '' },
    // Addition condition for per option
    // Rule - only string: condition (true or false) | param wanna hidden
    conditionsHiddenOption: { type: String, default: null }
  },

  computed: {
    conditionsOption () {
      if (!this.conditionsHiddenOption) return { hidden: false, param: '' }

      const conditions = this.conditionsHiddenOption.split('|')[0]
      const param = this.conditionsHiddenOption.split('|')[1].toLowerCase()
      return { hidden: conditions === 'true', param }
    }
  },

  methods: {
    handleChange (value) {
      this.$emit('change', value)
    }
  }
}
</script>

<style lang="scss">
.ant-select {
  width: 100%;

  .ant-select-selection--multiple {
    .ant-select-selection__choice__remove {
      bottom: 10%
    }
  }
}
</style>
