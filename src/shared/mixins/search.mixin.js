// Others
import { handleInputProtection } from '@/shared/helpers'
import { debounce } from 'lodash-es'

export default {
  data () {
    return {
      filter: {}
    }
  },

  beforeDestroy () {
    this.debounceSearch().cancel()
  },

  methods: {
    search () {
      const filterProtected = handleInputProtection(this.filter)
      this.$emit('filter-changed', filterProtected)
    },

    debounceSearch () {
      return debounce(() => this.search(), 800)
    },

    reset () {
      for (const property in this.filter) {
        this.filter[property] = null
      }

      this.$emit('filter-changed', this.filter)
    }
  }
}
