<template>
  <div v-if="layout === 'auth'" class="login">
    <input-text
      v-model="form.user_name"
      vid="user_name"
      field="user_name"
      placeholder="User name"
      prefix-icon="user"
    />

    <input-text
      v-model="form.password"
      vid="password"
      type="password"
      field="password"
      placeholder="Password"
      prefix-icon="lock"
    />

    <input-select
      v-model="selected"
      :options="options"
      vid="select"
      field="select_type"
      placeholder="Please select"
    />

    <input-date-picker
      v-model="date"
      vid="select"
      field="select_type"
      placeholder="Please select date"
    />

    <input-textarea
      v-model="textarea"
      vid="textarea"
      field="textarea_field"
      placeholder="Type textarea"
    />

    <input-radio
      v-model="radio"
      vid="radio"
      field="radio_field"
      name-label="Male"
    />

    <input-radio
      v-model="radioGroup"
      :options="options"
      vid="radio_group"
      field="radio_group_field"
      mode-group
    />

    <input-checkbox
      v-model="checkbox"
      vid="checkbox"
      field="checkbox_field"
      name-label="Check me!!!"
    />
  </div>
</template>

<script>
import InputText from '@/components/Form/InputText'
import InputSelect from '@/components/Form/InputSelect'
import InputDatePicker from '@/components/Form/InputDatePicker'
import InputTextarea from '@/components/Form/InputTextarea'
import InputRadio from '@/components/Form/InputRadio'
import InputCheckbox from '@/components/Form/InputCheckbox'
import { mapGetters } from 'vuex'

export default {
  name: 'Login',

  components: {
    InputText,
    InputSelect,
    InputDatePicker,
    InputTextarea,
    InputRadio,
    InputCheckbox
  },

  data () {
    return {
      form: {
        user_name: '',
        password: ''
      },
      selected: '',
      date: '',
      textarea: '',
      radio: false,
      radioGroup: '1',
      checkbox: false,
      options: [
        {
          id: '1',
          name: 'Item 1'
        },
        {
          id: '2',
          name: 'Item 2'
        },
        {
          id: '3',
          name: 'Item 3'
        }
      ]
    }
  },

  computed: {
    ...mapGetters({ layout: 'layout' })
  }
}
</script>

<style lang="scss" scoped></style>
