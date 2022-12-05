// Others
import { stripHtmlExceptTags } from '@/shared/helpers'

export default {
  data () {
    return {
      filter: {}
    }
  },

  methods: {
    search () {
      const filterProtected = { ...this.filter }
      for (const property in filterProtected) {
        if (typeof filterProtected[property] !== 'string') break
        filterProtected[property] = stripHtmlExceptTags(filterProtected[property])
      }

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
