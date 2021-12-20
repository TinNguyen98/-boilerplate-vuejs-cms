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

    <pre>{{ form }}</pre>
    <pre>{{ date }}</pre>
  </div>
</template>

<script>
import InputText from '@/components/Form/InputText'
import InputSelect from '@/components/Form/InputSelect'
import InputDatePicker from '@/components/Form/InputDatePicker'
import { mapGetters } from 'vuex'

export default {
  name: 'Login',

  components: {
    InputText,
    InputSelect,
    InputDatePicker
  },

  data () {
    return {
      form: {
        user_name: '',
        password: ''
      },
      selected: '',
      date: '',
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
