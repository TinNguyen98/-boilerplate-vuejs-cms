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

    /**
     *
     * @param field {string}
     */
    reset (field) {
      if (!field) {
        for (const property in this.filter) {
          this.filter[property] = null
        }
      } else {
        this.filter[field] = null
      }

      this.$emit('filter-changed', this.filter)
    }
  }
}
