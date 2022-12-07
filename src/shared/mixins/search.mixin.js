// Others
import { handleInputProtection } from '@/shared/helpers'

export default {
  data () {
    return {
      filter: {}
    }
  },

  methods: {
    search () {
      const filterProtected = handleInputProtection(this.filter)

      this.$emit('filter-changed', filterProtected)
    },

    reset () {
      for (const property in this.filter) {
        this.filter[property] = null
      }

      this.$emit('filter-changed', this.filter)
    }
  }
}
